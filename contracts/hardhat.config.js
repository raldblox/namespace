require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");
require("dotenv").config();

const { mnemonic } = require("./secrets.json");

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI,
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      timeout: 60000,
      gasPrice: 50000000000,
      url: process.env.ALCHEMY_ARBGOERLI,
      accounts: [process.env.PRIVATE_KEY],
    },
    hardhat: {},
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic },
    },
    mumbai: {
      timeout: 60000,
      gasPrice: 50000000000,
      url: process.env.INFURA_MUMBAI,
      accounts: [process.env.PRIVATE_KEY],
    },
    zkevmt: {
      timeout: 60000,
      gasPrice: 50000000000,
      url: process.env.ALCHEMY_ZKEVMT,
      accounts: [process.env.PRIVATE_KEY],
    },
    mainnet: {
      timeout: 60000,
      gasPrice: 50000000000,
      url: process.env.INFURA_MAINNET,
      accounts: [process.env.PRIVATE_KEY],
    },
    cic: {
      url: "https://xapi.cicscan.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    hyperspace: {
      chainId: 3141,
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
      accounts: [process.env.PRIVATE_KEY],
    },
    filecoinmainnet: {
      chainId: 314,
      url: "https://api.node.glif.io",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSCTESTNET,
    },
    apiKey: {
      arbGoerli: process.env.ARBGOERLI,
    },
    // apiKey: process.env.API_ARBISCAN, // arb
    apiKey: process.env.API_POLYGONSCAN, // polygon
  },
};
