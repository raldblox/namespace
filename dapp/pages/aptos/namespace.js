import Head from 'next/head'
import React, { useEffect, useState } from 'react';

import { AptosClient } from "aptos";
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import cmHelper from '@/helpers/candyMachineHelper';
import ConnectWalletButton from '@/helpers/Aptos/ConnectWalletButton';
import { candyMachineAddress, collectionName, collectionCoverUrl, collectionBackgroundUrl, MaxMint, NODE_URL, CONTRACT_ADDRESS, COLLECTION_SIZE, SERVICE_NAME } from "@/helpers/candyMachineInfo"

import Spinner from "react-bootstrap/Spinner"
import Modal from "react-bootstrap/Modal"

import { toast } from 'react-toastify';

const aptosClient = new AptosClient(NODE_URL);
const autoCmRefresh = 10000;

export default function Home() {
    const wallet = useWallet();
    const [isFetchignCmData, setIsFetchignCmData] = useState(false)
    const [candyMachineData, setCandyMachineData] = useState({ data: {}, fetch: fetchCandyMachineData })
    const [timeLeftToMint, setTimeLeftToMint] = useState({ presale: "", public: "", timeout: null })

    const [mintInfo, setMintInfo] = useState({ numToMint: 1, minting: false, success: false, mintedNfts: [] })

    const [canMint, setCanMint] = useState(false)

    useEffect(() => {
        if (!wallet.autoConnect && wallet.wallet?.adapter) {
            wallet.connect();
        }
    }, [wallet.autoConnect, wallet.wallet, wallet.connect]);


    const [decActive, setDecActive] = useState(false);
    const [incActive, setIncActive] = useState(true);
    const [notificationActive, setNotificationActive] = useState(false);

    const incrementMintAmount = async () => {
        const mintfee = document.getElementById("mintfee")
        const mintAmount = document.getElementById("mintAmount")

        if (mintInfo.numToMint === 1) {
            setDecActive(current => !current);
            mintInfo.numToMint++;
            mintfee.textContent = `${(candyMachineData.data.mintFee * mintInfo.numToMint).toFixed(2)} $APT`
            mintAmount.textContent = mintInfo.numToMint
        }

        else if (mintInfo.numToMint === MaxMint - 1) {
            setIncActive(current => !current);
            mintInfo.numToMint++;
            mintfee.textContent = `${(candyMachineData.data.mintFee * mintInfo.numToMint).toFixed(2)} $APT`
            mintAmount.textContent = mintInfo.numToMint
        }

        else if (mintInfo.numToMint < MaxMint) {
            mintInfo.numToMint++;
            mintfee.textContent = `${(candyMachineData.data.mintFee * mintInfo.numToMint).toFixed(2)} $APT`
            mintAmount.textContent = mintInfo.numToMint
        }
    }

    const decrementMintAmount = async () => {

        const mintfee = document.getElementById("mintfee")
        const mintAmount = document.getElementById("mintAmount")

        if (mintInfo.numToMint === 2) {
            setDecActive(current => !current);
            mintInfo.numToMint--;
            mintfee.textContent = `${(candyMachineData.data.mintFee * mintInfo.numToMint).toFixed(2)} $APT`
            mintAmount.textContent = mintInfo.numToMint
        }

        else if (mintInfo.numToMint === MaxMint) {
            setIncActive(current => !current);
            mintInfo.numToMint--;
            mintfee.textContent = `${(candyMachineData.data.mintFee * mintInfo.numToMint).toFixed(2)} $APT`
            mintAmount.textContent = mintInfo.numToMint
        }

        else if (mintInfo.numToMint > 1) {
            mintInfo.numToMint--;
            mintfee.textContent = `${(candyMachineData.data.mintFee * mintInfo.numToMint).toFixed(2)} $APT`
            mintAmount.textContent = mintInfo.numToMint

        }
    }

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const mint = async () => {
        if (wallet.account?.address?.toString() === undefined) {
            setNotificationActive(current => !current);
            await timeout(3000);
            setNotificationActive(current => !current);
        }
        if (wallet.account?.address?.toString() === undefined || mintInfo.minting) return;

        console.log(wallet.account?.address?.toString());
        setMintInfo({ ...mintInfo, minting: true })
        // Generate a transactions
        const payload = {
            type: "entry_function_payload",
            function: `${CONTRACT_ADDRESS}::${SERVICE_NAME}::mint_tokens`,
            type_arguments: [],
            arguments: [
                candyMachineAddress,
                collectionName,
                mintInfo.numToMint,
            ]
        };

        let txInfo;
        try {
            const txHash = await wallet.signAndSubmitTransaction(payload);
            console.log(txHash);
            txInfo = await aptosClient.waitForTransactionWithResult(txHash.hash)
        } catch (err) {
            txInfo = {
                success: false,
                vm_status: err.message,
            }
        }
        handleMintTxResult(txInfo)
        if (txInfo.success) setCandyMachineData({ ...candyMachineData, data: { ...candyMachineData.data, numMintedTokens: (parseInt(candyMachineData.data.numMintedTokens) + parseInt(mintInfo.numToMint)).toString() } })
    }

    async function handleMintTxResult(txInfo) {
        console.log(txInfo);
        const mintSuccess = txInfo.success;
        console.log(mintSuccess ? "Mint success!" : `Mint failure, an error occured.`)

        let mintedNfts = []
        if (!mintSuccess) {
            /// Handled error messages
            const handledErrorMessages = new Map([
                ["Failed to sign transaction", "An error occured while signing."],
                ["Move abort in 0x1::coin: EINSUFFICIENT_BALANCE(0x10006): Not enough coins to complete transaction", "Insufficient funds to mint."],
            ]);

            const txStatusError = txInfo.vm_status;
            console.error(`Mint not successful: ${txStatusError}`);
            let errorMessage = handledErrorMessages.get(txStatusError);
            errorMessage = errorMessage === undefined ? "Unkown error occured. Try again." : errorMessage;

            toast.error(errorMessage);
        } else {
            mintedNfts = await cmHelper.getMintedNfts(aptosClient, candyMachineData.data.tokenDataHandle, candyMachineData.data.cmResourceAccount, collectionName, txInfo)
            toast.success("Minting success!")
        }


        setMintInfo({ ...mintInfo, minting: false, success: mintSuccess, mintedNfts })
    }



    async function fetchCandyMachineData(indicateIsFetching = false) {
        console.log("Fetching candy machine data...")
        if (indicateIsFetching) setIsFetchignCmData(true)
        const cmResourceAccount = await cmHelper.getCandyMachineResourceAccount();
        if (cmResourceAccount === null) {
            setCandyMachineData({ ...candyMachineData, data: {} })
            setIsFetchignCmData(false)
            return
        }

        const collectionInfo = await cmHelper.getCandyMachineCollectionInfo(cmResourceAccount);
        const configData = await cmHelper.getCandyMachineConfigData(collectionInfo.candyMachineConfigHandle);
        setCandyMachineData({ ...candyMachineData, data: { cmResourceAccount, ...collectionInfo, ...configData } })
        setIsFetchignCmData(false)
    }

    function verifyTimeLeftToMint() {
        const mintTimersTimeout = setTimeout(verifyTimeLeftToMint, 1000)
        if (candyMachineData.data.presaleMintTime === undefined || candyMachineData.data.publicMintTime === undefined) return

        const currentTime = Math.round(new Date().getTime() / 1000);
        setTimeLeftToMint({ timeout: mintTimersTimeout, presale: cmHelper.getTimeDifference(currentTime, candyMachineData.data.presaleMintTime), public: cmHelper.getTimeDifference(currentTime, candyMachineData.data.publicMintTime) })
    }

    useEffect(() => {
        fetchCandyMachineData();
        async function fetchCandyMachineData() {
            const cmResourceAccount = await cmHelper.getCandyMachineResourceAccount();
            const collectionInfo = await cmHelper.getCandyMachineCollectionInfo(cmResourceAccount);
            const configData = await cmHelper.getCandyMachineConfigData(collectionInfo.candyMachineConfigHandle);
            setCandyMachineData({ ...candyMachineData, data: { cmResourceAccount, ...collectionInfo, ...configData } })
        }
        const interval = setInterval(() => {
            fetchCandyMachineData();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        clearTimeout(timeLeftToMint.timeout)
        verifyTimeLeftToMint()
        console.log(candyMachineData.data)
    }, [candyMachineData])

    // useEffect(() => {
    //   setCanMint(wallet.connected && candyMachineData.data.isPublic && parseInt(candyMachineData.data.numUploadedTokens) > parseInt(candyMachineData.data.numMintedTokens) && timeLeftToMint.presale === "LIVE")
    // }, [wallet, candyMachineData, timeLeftToMint])
    useEffect(() => {
        setCanMint(true)
    }, [wallet, candyMachineData, timeLeftToMint])

    return (
        <div className="bg-gray-500">
            <div className="">
                <Head>
                    <title>Namespace Token</title>
                    <meta name="description" content="Aptos Names and Spaces" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                </Head>
                <img
                    src={collectionBackgroundUrl}
                    alt={'background'}
                    className=""
                />
                <div
                    className=""
                ></div>
                <main className="">
                    <h1 className="">
                        {collectionName}
                    </h1>
                    <div className="">
                        <ConnectWalletButton connectButton={!wallet.connected} className="d-flex" />
                    </div>
                    <img src={collectionCoverUrl} className="" />
                    <div id="collection-info" className="text-white d-flex flex-column align-items-center" style={{ width: "80%" }}>
                        {isFetchignCmData ? <Spinner animation="border" role="status" className="mt-5"><span className="visually-hidden">Loading...</span></Spinner> :
                            <>
                                <div className="my-3 d-flex align-items-center">
                                    <div className="">
                                        <button onClick={incrementMintAmount} className="" style={{ border: incActive ? '' : '1px solid grey' }}>▲</button>
                                        <button onClick={decrementMintAmount} className="" style={{ border: decActive ? '' : '1px solid grey' }}>▼</button>
                                    </div>
                                    <div id="mint-amount-input" className={` me-3`}>
                                        <p style={{ marginTop: "15px" }} id="mintAmount">{mintInfo.numToMint}</p>
                                    </div>
                                    <button className="" onClick={mint} disabled={!canMint}>{mintInfo.minting ? <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> : "Mint"}</button>
                                </div>
                            </>}
                        <div className="">
                            <div className="">
                                <h6>Minted Names:</h6>
                                <h6>{candyMachineData.data.numMintedTokens} / {COLLECTION_SIZE}</h6>
                            </div>
                            <div className="">
                                <h6>Minted Spaces:</h6>
                                <h6>{candyMachineData.data.numMintedTokens} / {COLLECTION_SIZE}</h6>
                            </div>
                            <div className="">
                                <h6>Mint fees: </h6>
                                <h6 id="mintfee">{candyMachineData.data.mintFee * mintInfo.numToMint} $APT</h6>
                            </div>
                        </div>
                        <div className="" style={{ opacity: notificationActive ? '1' : '' }}>
                            <h6 className="">Please connect your wallet</h6>
                        </div>
                    </div>

                    <Modal id="mint-results-modal" show={mintInfo.success} onHide={() => setMintInfo({ ...mintInfo, success: false, mintedNfts: [] })} centered size="lg">
                        <Modal.Body className="pt-5 pb-3 d-flex flex-column align-items-center">
                            <div className="my-5 d-flex justify-content-center w-100" style={{ flexWrap: "wrap" }}>
                                {mintInfo.mintedNfts.map(mintedNft => <div key={mintedNft.name} className={` d-flex flex-column mx-3`}>
                                    <h5 className="mt-2 text-center text-white">{mintedNft.name}</h5>
                                </div>)}
                            </div>
                        </Modal.Body>
                    </Modal>
                </main>
            </div>
        </div>
    )
}
