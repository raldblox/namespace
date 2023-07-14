const fs = require("fs");
const path = require("path");
const { default: axios } = require("axios");

async function main() {
  const { data } = await axios({
    method: "get",
    url: "https://gasstation-mainnet.matic.network/v2",
  });

  const maxFeePerGas = ethers.utils.parseUnits(
    Math.ceil(data.fast.maxFee) + "",
    "gwei"
  );
  const maxPriorityFeePerGas = ethers.utils.parseUnits(
    Math.ceil(data.fast.maxPriorityFee) + "",
    "gwei"
  );

  console.log("MaxGas:", ethers.utils.formatEther(maxFeePerGas), "ETH");
  console.log("MaxFee:", ethers.utils.formatEther(maxPriorityFeePerGas), "ETH");

  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log(
    "Balance:",
    ethers.utils.formatEther(await deployer.getBalance())
  );

  // Deploy NFT Themer
  const Themer = await ethers.getContractFactory("Themer");
  const themer = await Themer.deploy("POLYGON", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await themer.deployed();
  console.log("Themer:", themer.address);

  // Deploy NFT Visualizer
  const Visualizer = await ethers.getContractFactory("Visualizer");
  const visualizer = await Visualizer.deploy({
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await visualizer.deployed();
  console.log("Visualizer:", visualizer.address);

  // Deploy Namespace Contract
  const Namespace = await ethers.getContractFactory("Namespace");
  const namespace = await Namespace.deploy({
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await namespace.deployed();
  console.log("Namespace:", namespace.address);

  // Deploy Token Contract
  const NamespaceToken = await ethers.getContractFactory("NamespaceToken");
  const token = await NamespaceToken.deploy({
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await token.deployed();
  console.log("Token:", token.address);

  // Link All Contracts
  await namespace.setToken(token.address, {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  console.log("Token is connected to namespace.");
  await token.setNamespace(namespace.address, {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  console.log("Namespace is connected to token.");
  await token.setThemer(themer.address, {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  console.log("Themer is connected to token.");
  await token.setVisualizer(visualizer.address, {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  console.log("Visualizer is connected to token.");

  // CREATE SPACES
  await namespace.createSpace(
    deployer.address,
    "space",
    "namespace",
    "Connect, create, and control with Namespace.",
    "https://zoociety.xyz/assets/namespace.png",
    true,
    {
      maxFeePerGas,
      maxPriorityFeePerGas,
    }
  );
  await namespace.createSpace(
    deployer.address,
    "blox",
    "BLOXIE",
    "A space full of blo[x]es",
    "https://zoociety.xyz/assets/me.png",
    true,
    {
      maxFeePerGas,
      maxPriorityFeePerGas,
    }
  );
  await namespace.createSpace(
    deployer.address,
    "zoociety",
    "ZOOCIETY",
    "Synergistic Ecosystem of Emerging Technology",
    "https://zoociety.xyz/assets/zoociety.png",
    true,
    {
      maxFeePerGas,
      maxPriorityFeePerGas,
    }
  );
  await namespace.createSpace(
    deployer.address,
    "badge",
    "BADGIFY",
    "We make awesome digital badges on the blockchain",
    "https://zoociety.xyz/assets/badgify.png",
    true,
    {
      maxFeePerGas,
      maxPriorityFeePerGas,
    }
  );

  await namespace.createName("rald", deployer.address, {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await namespace.createName("raldblox", deployer.address, {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await namespace.createName("zoociety", deployer.address, {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await namespace.createName("badgify", deployer.address, {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await namespace.createName("namespace", deployer.address, {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });

  await namespace.connectSpace("rald", "blox", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await namespace.connectSpace("rald", "space", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await namespace.connectSpace("rald", "badge", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await namespace.connectSpace("rald", "zoociety", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await namespace.connectSpace("raldblox", "badge", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await namespace.connectSpace("raldblox", "zoociety", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await namespace.connectSpace("raldblox", "space", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });

  await token.setColor(1, "#131313", "#94ff2b", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await token.setColor(2, "#f0f8ff", "#ff0000", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await token.setColor(3, "#131313", "#00ff7f", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await token.setColor(4, "#131313", "#3399ff", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });
  await token.setColor(5, "#131313", "#00ffff", {
    maxFeePerGas,
    maxPriorityFeePerGas,
  });

  // const dataDir = path.join(__dirname, "data");
  // const tldFile = path.join(dataDir, "tld.json");
  // const tlds = JSON.parse(fs.readFileSync(tldFile, "utf8"));

  // for (const tld of tlds) {
  //   const { name, description, tld: domain } = tld;
  //   const spaceName = `${domain}`;
  //   const spaceDescription = `${description}`;
  //   const spaceImage = "https://zoociety.xyz/assets/namespace.png";

  //   await namespace.createSpace(
  //     deployer.address,
  //     spaceName,
  //     name,
  //     spaceDescription,
  //     spaceImage
  //   );
  //   console.log(`Created space for ${domain}`);
  // }

  console.log("Token Supply:", await namespace.tokenSupply());
  console.log("Member Count:", await namespace.getSpaceNames("blox"));
  console.log("All Spaces:", await namespace.getAllSpaces());
  console.log("TOKEN URI:", await token.tokenURI(1));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
