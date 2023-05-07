const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployer:", deployer.address);
  console.log(
    "Balance:",
    ethers.utils.formatEther(await deployer.getBalance())
  );

  const namespaceMumbai = "0xA7FDFb03768d1f2419c966c84C23Fe7B084f6541"; // deployed on mainnet on remix
  const namespace = await ethers.getContractAt("Namespace", namespaceMumbai);
  console.log("Namespace:", namespace.address);

  const namespaceToken = "0xc135E331A5802ff98F0E21a7A02e3b9FaFF284EA"; // deployed on mainnet on remix
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
