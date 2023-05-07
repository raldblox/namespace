async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log(
    "Balance:",
    ethers.utils.formatEther(await deployer.getBalance())
  );

  // const namespaceMainnet = "0xfe409ca6CaB3fbBb7c7372F17d84c3E5A94D06E9"; // deployed on mainnet on remix
  // const namespace = await ethers.getContractAt("Namespace", namespaceMainnet);
  // console.log("Mainnet Namespace:", namespace.address);

  // Deploy Namespace Contract
  const Namespace = await ethers.getContractFactory("Namespace");
  const namespace = await Namespace.deploy();
  await namespace.deployed();
  console.log("Namespace:", namespace.address);

  // Deploy Token Contract
  const NamespaceToken = await ethers.getContractFactory("NamespaceToken");
  const token = await NamespaceToken.deploy();
  await token.deployed();
  console.log("Token:", token.address);

  // Link Namespace to Token Contract
  await namespace.setToken(token.address);
  await token.setNamespace(namespace.address);

  // Add NFT Themer to Token Contract
  const Themer = await ethers.getContractFactory("Themer");
  const themer = await Themer.deploy();
  await themer.deployed();
  console.log("Themer:", themer.address);

  // Add NFT Visualizer to Token Contract
  const Visualizer = await ethers.getContractFactory("Visualizer");
  const visualizer = await Visualizer.deploy();
  await visualizer.deployed();
  console.log("Visualizer:", visualizer.address);

  await token.setThemer(themer.address);
  await token.setVisualizer(visualizer.address);
  console.log("Verify Token:", await namespace.tokenAddress());

  await namespace.createName("rald", deployer.address);
  await namespace.createName("raldblox", deployer.address);
  await namespace.createName("zoociety", deployer.address);
  await namespace.createName("badgify", deployer.address);
  await namespace.createName("namespace", deployer.address);

  await namespace.createSpace(
    deployer.address,
    "blox",
    "RALDBLOX",
    "A space full of blo[x]",
    "https://zoociety.xyz/assets/me.png"
  );
  await namespace.createSpace(
    deployer.address,
    "zoociety",
    "ZOOCIETY",
    "Synergistic Ecosystem of Emerging Technology",
    "https://zoociety.xyz/assets/zoociety.png"
  );
  await namespace.createSpace(
    deployer.address,
    "badge",
    "BADGIFY",
    "We make awesome digital badges on the blockchain",
    "https://zoociety.xyz/assets/badgify.png"
  );
  await namespace.createSpace(
    deployer.address,
    "space",
    "namespace",
    "Unleashing Potential of Digital Identity",
    "https://zoociety.xyz/assets/namespace.png"
  );
  await namespace.connectSpace("rald", "blox");
  await namespace.connectSpace("rald", "space");
  await namespace.connectSpace("rald", "badge");
  await namespace.connectSpace("rald", "zoociety");
  await namespace.connectSpace("raldblox", "badge");
  await namespace.connectSpace("raldblox", "zoociety");
  await namespace.connectSpace("raldblox", "space");
  await token.setColor(1, "white", "blue");
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
