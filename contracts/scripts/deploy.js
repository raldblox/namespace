async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log(
    "Balance:",
    ethers.utils.formatEther(await deployer.getBalance())
  );

  const Namespace = await ethers.getContractFactory("Namespace");
  const namespace = await Namespace.deploy();
  await namespace.deployed();
  console.log("Namespace:", namespace.address);

  const Visualizer = await ethers.getContractFactory("Visualizer");
  const visualizer = await Visualizer.deploy();
  await visualizer.deployed();
  console.log("Visualizer:", visualizer.address);

  const Themer = await ethers.getContractFactory("Themer");
  const themer = await Themer.deploy();
  await themer.deployed();
  console.log("Themer:", themer.address);
  console.log("Token Address:", await namespace.tokenAddress());

  const token = await ethers.getContractAt(
    "NamespaceToken",
    await namespace.tokenAddress()
  );

  await token.setThemer(themer.address);
  await token.setVisualizer(visualizer.address);

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
  await namespace.connectSpace("rald", "blox");
  await namespace.connectSpace("rald", "badge");
  await namespace.connectSpace("rald", "zoociety");
  await namespace.connectSpace("raldblox", "badge");
  await namespace.connectSpace("raldblox", "zoociety");
  console.log("Token Supply:", await namespace.tokenSupply());
  console.log("Member Count:", await namespace.getSpaceNames("blox"));
  console.log("All Spaces:", await namespace.getAllSpaces());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
