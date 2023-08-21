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
        runs: 2,
      },
    },
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    "eth-mainnet": {
      timeout: 60000,
      // gasPrice: 50000000000,
      url: process.env.INFURA_MAINNET,
      accounts: [process.env.PRIVATE_KEY],
    },
    "mumbai": {
      url: process.env.MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    "arb-goerli": {
      timeout: 60000,
      gasPrice: 50000000000,
      url: process.env.ARB_GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    "bsc-testnet": {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic },
    },
    "zkevm-testnet": {
      timeout: 60000,
      gasPrice: 50000000000,
      url: process.env.ZKEVMT_URL,
      accounts: [process.env.PRIVATE_KEY],
    },

    "cic-mainnet": {
      url: "https://xapi.cicscan.com",
      accounts: [process.env.PRIVATE_KEY],
    },
    "fil-hyperspace": {
      chainId: 3141,
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
      accounts: [process.env.PRIVATE_KEY],
    },
    "fil-mainnet": {
      chainId: 314,
      url: "https://api.node.glif.io",
      accounts: [process.env.PRIVATE_KEY],
    },
    "xdc-xinfin": {
      url: "https://erpc.xinfin.network",
      accounts: [process.env.XDC_PRIVATE_KEY],
    },
    "xdc-apothem": {
      url: "https://erpc.apothem.network",
      accounts: [process.env.XDC_PRIVATE_KEY],
    },
    "op-goerli": {
      url: process.env.OPTIMISM_GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    "op-mainnet": {
      url: process.env.OPTIMISM_MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    "base-mainnet": {
      url: 'https://mainnet.base.org',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
    "base-goerli": {
      url: 'https://goerli.base.org',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
    "zora-goerli": {
      url: 'https://testnet.rpc.zora.energy/',
      accounts: [process.env.PRIVATE_KEY],
    },
    "zora-mainnet": {
      url: 'https://mainnet.rpc.zora.energy/',
      accounts: [process.env.PRIVATE_KEY],
    },
    "patex-sepolia": {
      url: "https://test-rpc.patex.io",
      accounts: [process.env.PRIVATE_KEY],
    },
    "opbnb": {
      url: "https://opbnb-testnet-rpc.bnbchain.org/",
      chainId: 5611,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 20000000000,
    },
  },
  etherscan: {
    apiKey: {
      opbnb: process.env.NODEREAL_API,
      // "base-goerli": process.env.BASE_ETHERSCAN,
      // "zora-goerli": process.env.ZORA_ETHERSCAN,
      // "patex-sepolia": process.env.PATEX_ETHERSCAN,
    },
    // apiKey: process.env.OP_ETHERSCAN,
    // apiKey: process.env.POLYGON_ETHERSCAN,
    customChains: [
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org"
        }
      },
      {
        network: "zora-goerli",
        chainId: 999,
        urls: {
          apiURL: "https://testnet.rpc.zora.energy/",
          browserURL: "https://testnet.explorer.zora.energy/"
        }
      },
      {
        network: "opbnb",
        chainId: 5611,
        urls: {
          apiURL: process.env.NODEREAL_URL,
          browserURL: "https://opbnbscan.com/",
        },
      },
    ]
  },
};
