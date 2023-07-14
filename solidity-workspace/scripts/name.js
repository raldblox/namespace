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

  const nameFilePath = path.join(__dirname, "data", "name.json");
  const names = JSON.parse(fs.readFileSync(nameFilePath).toString()).names;

  for (const name of names) {
    console.log(`name: ${name}`);
    await namespace.createName(name, deployer.address);
    console.log(`Created ${name}`);
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
