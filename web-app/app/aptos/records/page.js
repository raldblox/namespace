"use client";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Provider, Network } from "aptos";
import { useEffect, useState } from "react";
import { Col, List, Spin } from "antd";
import { NFTStorage } from "nft.storage";
import CryptoJS from "crypto-js";

export const provider = new Provider(Network.DEVNET);
export const moduleAddress =
  "0xd9ccf18a51409e99ea372caf21ca6cf51da116c76e7e77eca5dd59663735ccde";

const page = () => {
  const [accountHasRecord, setAccountHasRecord] = useState(false);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [records, setRecords] = useState([]);
  const [CID, setCID] = useState("");
  const [status, setStatus] = useState("");

  const [recordData, setRecordData] = useState({
    name: "",
    chain: "Aptos",
    content: "",
    filename: "",
    namespace: "",
  });

  const provider = new Provider(Network.DEVNET);
  const { account, signAndSubmitTransaction } = useWallet();

  const handleUpload = (event) => {
    const content = event.target.files[0];
    const contentName = content.name;
    const fileExtension = contentName.split(".").pop();
    const newFile = new File([file], `file.${fileExtension}`);
    setRecordData((prevState) => ({
      ...prevState,
      content: newFile,
      filename: contentName,
    }));
    console.log("Content is ready.");
  };

  const storeToIPFS = async () => {
    const IPFS = new NFTStorage({
      token: process.env.IPFS_KEY,
    });
    try {
      const storedContent = await IPFS.store({
        name: recordData.name,
        filename: recordData.filename,
        description: `Content Stored with Aptos Network`,
        image: recordData.content,
        namespace: recordData.namespace,
        content: recordData.content,
      });
      let ipfsURL = storedContent.url;
      setCID(ipfsURL);
      console.log(ipfsURL);
      return ipfsURL;
    } catch (error) {
      console.log(error);
    }
  };

  const encryption = async (url) => {
    const encryptionKey = process.env.MASTER_KEY;
    const encrypted = CryptoJS.AES.encrypt(url, encryptionKey).toString();
    console.log(encrypted);
    return encrypted;
  };

  const setContentName = (event) => {
    const value = event.target.value;
    setRecordData((prevFileData) => ({
      ...prevFileData,
      name: value,
    }));
  };

  const fetchRecord = async () => {
    if (!account) return [];

    try {
      const NamespaceRecordResource = await provider.getAccountResource(
        account.address,
        `${moduleAddress}::nsrecord::NamespaceRecord`
      );

      setAccountHasRecord(true);
      // records table handle
      const tableHandle = NamespaceRecordResource.data.records.handle;
      // records table counter
      const recordCounter = NamespaceRecordResource.data.record_counter;

      const response = await fetch(
        `https://www.aptosnames.com/api/mainnet/v1/primary-name/${account.address}`
      );
      const { name } = await response.json();
      console.log(name);

      let records = [];
      let counter = 1;
      while (counter <= recordCounter) {
        const tableItem = {
          key_type: "u64",
          value_type: `${moduleAddress}::nsrecord::Record`,
          key: `${counter}`,
        };
        const record = await provider.getTableItem(tableHandle, tableItem);
        records.push(record);
        counter++;
      }
      // set records in local state
      setRecords(records);
    } catch (e) {
      setAccountHasRecord(false);
    }
  };

  const addNewRecord = async () => {
    if (!account) return [];
    setTransactionInProgress(true);

    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::nsrecord::create_record`,
      type_arguments: [],
      arguments: [],
    };

    try {
      /// sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      // wait for transaction
      await provider.waitForTransaction(response.hash);
      setAccountHasRecord(true);
    } catch (error) {
      setAccountHasRecord(false);
    }

    setTransactionInProgress(false);
  };

  const onRecordAdded = async (encrypted) => {
    if (!account) return;
    setTransactionInProgress(true);
    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::nsrecord::record_hash`,
      type_arguments: [],
      arguments: [encrypted],
    };

    const latestId =
      records.length > 0
        ? parseInt(records[records.length - 1].record_id) + 1
        : 1;

    const newRecordToPush = {
      address: account.address,
      shared_publicly: false,
      content: encrypted,
      record_id: String(latestId),
    };

    try {
      const response = await signAndSubmitTransaction(payload);
      await provider.waitForTransaction(response.hash);

      let newRecords = [...records];

      newRecords.push(newRecordToPush);
      setRecords(newRecords);
      CID("");
    } catch (error) {
      console.log("error", error);
    } finally {
      setTransactionInProgress(false);
    }
  };

  const onCheckboxChange = async (event, recordId) => {
    if (!account) return;
    if (!event.target.checked) return;
    setTransactionInProgress(true);
    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::nsrecord::share_publicly`,
      type_arguments: [],
      arguments: [recordId],
    };

    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      // wait for transaction
      await provider.waitForTransaction(response.hash);

      setRecords((prevState) => {
        const newState = prevState.map((obj) => {
          // if record_id equals the checked recordId, update shared_publicly property
          if (obj.record_id === recordId) {
            return { ...obj, shared_publicly: true };
          }

          // otherwise return object as is
          return obj;
        });

        return newState;
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setTransactionInProgress(false);
    }
  };

  const processContent = async () => {
    setStatus("Storing to Interplanetary File System...");
    const storedContent = await storeToIPFS();
    setStatus("Securing with AES Encryption...");
    const encrypted = await encryption(storedContent);
    setStatus("Recording Contents to Aptos...");
    await onRecordAdded(encrypted);
  };

  useEffect(() => {
    fetchRecord();
  }, [account?.address]);

  return (
    <section className="">
      <h2 className="max-w-2xl p-8 lg:p-12">
        Store and Map Your Curated Contents on Decentralized Networks for Easy
        Accessibility with Namespace
      </h2>
      {!accountHasRecord ? (
        <div className="flex justify-center w-full px-8 py-8 border-t-2 border-black lg:px-12 lg:py-12">
          <Spin spinning={transactionInProgress}>
            <button onClick={addNewRecord} className="max-w-lg">
              Activate Namespace Records
            </button>
          </Spin>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 border-t-2 border-black lg:grid-cols-2">
          <div className="grid w-full col-span-1 gap-4 border-b-2 border-black lg:border-r-2">
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p>Content Name: {recordData?.name}</p>
              <p>File Name: {recordData?.filename}</p>
              <p>Network: {recordData?.chain}</p>
              <p>Aptos Name: {account?.ansName}.apt</p>
            </div>
            <div className="flex items-center px-8 lg:px-12">
              <input
                type="file"
                id="file"
                onChange={handleUpload}
                required
                className="flex items-center justify-center w-full text-sm font-medium duration-150 bg-white border rounded-lg gap-x-3 hover:bg-gray-50 active:bg-gray-100"
              />
            </div>
            <div className="flex items-center px-8 pb-12 lg:px-12">
              <div className="flex items-center w-full gap-2 p-2 border rounded-md">
                <input
                  onChange={(event) => setContentName(event)}
                  placeholder="Content Name"
                  size="large"
                  value={recordData.name}
                  className="w-full p-2.5 outline-none"
                />
                <button
                  onClick={processContent}
                  className="p-2.5 rounded-md bg-accent outline-none shadow-md focus:shadow-none sm:px-5"
                >
                  Process
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-1 p-8 lg:p-12">
            <Col>
              {records && (
                <List
                  size="small"
                  bordered
                  dataSource={records}
                  renderItem={(record) => (
                    <List.Item>
                      <List.Item.Meta
                        title={record.content}
                        description={
                          <a
                            href={`https://explorer.aptoslabs.com/account/${record.address}/`}
                            target="_blank"
                          >{`${record.address.slice(
                            0,
                            6
                          )}...${record.address.slice(-5)}`}</a>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Col>
          </div>
        </div>
      )}
    </section>
  );
};

export default page;
