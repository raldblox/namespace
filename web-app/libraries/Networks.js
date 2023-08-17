export const ChainNetwork = {
    "ethereum-mainnet": {
        params: [{
            chainId: 1,
            rpcUrls: ["https://mainnet.infura.io/v3/"],
            chainName: "Ethereum Mainnet",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            blockExplorerUrls: ["https://etherscan.io"]
        }],
    },
    "polygon-mainnet": {
        params: [{
            chainId: 137,
            rpcUrls: ["https://polygon.llamarpc.com"],
            chainName: "Polygon Mainnet",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            blockExplorerUrls: ["https://polygonscan.com/"]
        }],
    },
    "polygon-zkEVM": {
        params: [{
            chainId: 1101,
            rpcUrls: ["https://rpc.ankr.com/polygon_zkevm"],
            chainName: "Polygon Mainnet",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://zkevm.polygonscan.com"]
        }],
    },
    "polygon-mumbai": {
        params: [{
            chainId: 80001,
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            chainName: "Polygon Mumbai",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com"]
        }],
    },
    "optimism-goerli": {
        params: [{
            chainId: 420,
            rpcUrls: ["https://endpoints.omniatech.io/v1/op/goerli/public"],
            chainName: "Optimism Goerli Testnet",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://optimism-goerli.blockscout.com"]
        }],
    },
    "opbnb-testnet": {
        params: [{
            chainId: 5611,
            rpcUrls: ["https://opbnb-testnet-rpc.bnbchain.org/"],
            chainName: "opBNB Testnet",
            nativeCurrency: {
                name: "tcBNB",
                symbol: "tcBNB",
                decimals: 18
            },
            blockExplorerUrls: ["https://bscscan.com"]
        }],
    },
    "base-goerli": {
        params: [{
            chainId: 84531,
            rpcUrls: ["https://base-goerli.public.blastapi.io"],
            chainName: "Base Goerli Testnet",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://goerli.basescan.org"]
        }],
    },
    "zora-goerli": {
        params: [{
            chainId: 999,
            rpcUrls: ["https://testnet.rpc.zora.energy"],
            chainName: "Zora Goerli Testnet",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://testnet.explorer.zora.energy"]
        }],
    },
};