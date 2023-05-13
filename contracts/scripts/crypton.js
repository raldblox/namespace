const fs = require("fs");
const path = require("path");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deployer:", deployer.address);
    console.log(
        "Balance:",
        ethers.utils.formatEther(await deployer.getBalance())
    );
    const Namespace = "0x44B0b339cFf4DC737ad3C35f33C6262e3Df45BDC";
    const namespace = await ethers.getContractAt("Namespace", Namespace);
    const allNamesFilePath = path.join(__dirname, "allNames.json");
    const allNames = JSON.parse(fs.readFileSync(allNamesFilePath, "utf8"));

    // create an object to store the status of the airdrop
    const airdropStatus = {
        total: allNames.length,
        successful: 0,
        failed: 0,
        skipped: 0,
        skippedNames: []
    };

    for (const nameObj of allNames) {
        const { name, tokenOwner } = nameObj;
        console.log(`Checking name: ${name}`);
        const resolvedId = await namespace.getTokenIds(name);
        if (resolvedId === 0) {
            console.log(`Name ${name} is already taken, skipping...`);
            airdropStatus.skipped++;
            airdropStatus.skippedNames.push(name);
            continue;
        }

        console.log("Token Supply:", await namespace.tokenSupply());

        console.log(`Creating name: ${name} : ${tokenOwner}`);
        // create the name
        const tx = await namespace.createName(name, tokenOwner);
        await tx.wait();
        console.log(`Created ${name}`);

        // check the status of the transaction
        if (tx.status === 1) {
            airdropStatus.successful++;
        } else {
            airdropStatus.failed++;
        }
    }

    // write the airdrop status to a JSON file
    const outputFilePath = path.join(__dirname, "airdropStatus.json");
    fs.writeFileSync(outputFilePath, JSON.stringify(airdropStatus));
    console.log("Airdrop Status:", airdropStatus);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
