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

  // DEPLOYMENTS ON POLYGON MAINNET
  const Namespace = "0x44B0b339cFf4DC737ad3C35f33C6262e3Df45BDC";
  const Token = "0xb374198d6D6b503Fa1f5B3908467F5CD9E7AeacE";
  const Visualizer = "0x7C4671D11EAe4732b0c5D23437ae1c6e67bf06e1";
  const Themer = "0x00D69D17444bEE3a861a052ac9d572F7B472d548";

  const namespace = await ethers.getContractAt("Namespace", Namespace);
  const token = await ethers.getContractAt("NamespaceToken", Token);
  const visualizer = await ethers.getContractAt("Visualizer", Visualizer);
  const themer = await ethers.getContractAt("Namespace", Themer);

  console.log("Namespace:", namespace.address);
  console.log("Token:", token.address);
  console.log("Themer:", themer.address);
  console.log("Visualizer:", visualizer.address);

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
