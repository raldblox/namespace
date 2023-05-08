const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployer:", deployer.address);
  console.log(
    "Balance:",
    ethers.utils.formatEther(await deployer.getBalance())
  );

  const namespaceMumbai = "0xBa2BF82362586f1048f105926C219185bbdE942f"; // deployed on mainnet on remix
  const namespace = await ethers.getContractAt("Namespace", namespaceMumbai);
  console.log("Namespace:", namespace.address);

  const namespaceToken = "0x27d93c74aa31EbdF197BA5ecbB0533373054978a"; // deployed on mainnet on remix
  const token = await ethers.getContractAt("NamespaceToken", namespaceToken);
  console.log("Token:", token.address);

  const dataDir = path.join(__dirname, "data");
  const tldFile = path.join(dataDir, "tld.json");
  const tlds = JSON.parse(fs.readFileSync(tldFile, "utf8"));

  for (const tld of tlds) {
    const { name, description, tld: domain } = tld;
    const spaceName = `${domain}`;
    const spaceDescription = `${description}`;
    const spaceImage = "https://zoociety.xyz/assets/namespace.png";

    await namespace.createSpace(
      deployer.address,
      spaceName,
      name,
      spaceDescription,
      spaceImage
    );
    console.log(`Created space for ${domain}`);
  }

  console.log("Token Supply:", await namespace.tokenSupply());
  console.log("All Spaces:", await namespace.getAllSpaces());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
