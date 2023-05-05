async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deployer:", deployer.address);
    console.log("Balance:", ethers.utils.formatEther(await deployer.getBalance()));


    const Namespace = await ethers.getContractFactory("Namespace");
    const namespace = await Namespace.deploy();
    await namespace.deployed();
    console.log("Namespace:", namespace.address);

    await namespace.createName("rald", { value: hre.ethers.utils.parseEther("1") });
    await namespace.createSpace("blox", "Blox", "hello", { value: hre.ethers.utils.parseEther("1") });
    await namespace.createSpace("badge", "Badgify", "digital badges", { value: hre.ethers.utils.parseEther("1") });
    await namespace.connectSpace("rald", "blox", { value: hre.ethers.utils.parseEther("1") });
    await namespace.connectSpace("rald", "badge", { value: hre.ethers.utils.parseEther("1") });
    await namespace.createNamespace("hello", "blox", { value: hre.ethers.utils.parseEther("2") });
    console.log("Token Supply:", await namespace.tokenSupply());
    console.log("Token Address:", await namespace.tokenAddress());
    console.log("Namespaces:", await namespace.getNameSpaces("rald"));
    console.log("Name Owner:", await namespace.getNameCreator("rald"));
    console.log("All Names:", await namespace.getAllNames());
    console.log("All Spaces:", await namespace.getAllSpaces());
    console.log("Space Info:", await namespace.getSpaceInfos("badge"));

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });