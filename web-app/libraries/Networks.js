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
            chainName: "Polygon zkEVM Mainnet",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://zkevm.polygonscan.com"]
        }],
    },
    "patex-mainnet": {
        params: [{
            chainId: 789,
            rpcUrls: ["https://rpc.patex.io/"],
            chainName: "Patex Network",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://patexscan.io/"]
        }],
    },
    "pego-mainnet": {
        params: [{
            chainId: 20201022,
            rpcUrls: ["https://pegorpc.com"],
            chainName: "PEGO Mainnet",
            nativeCurrency: {
                name: "PEGO",
                symbol: "PG",
                decimals: 18
            },
            blockExplorerUrls: [""]
        }],
    },
    "xdc-mainnet": {
        params: [{
            chainId: 50,
            rpcUrls: ["https://rpc.xinfin.network"],
            chainName: "XinFin",
            nativeCurrency: {
                name: "XDC",
                symbol: "XDC",
                decimals: 18
            },
            blockExplorerUrls: ["https://explorer.xinfin.network/"]
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

    "xdc-testnet": {
        params: [{
            chainId: 50,
            rpcUrls: ["https://rpc.xinfin.network"],
            chainName: "Apothem",
            nativeCurrency: {
                name: "TXDC",
                symbol: "TXDC",
                decimals: 18
            },
            blockExplorerUrls: ["https://explorer.apothem.network/"]
        }],
    },

    "patex-sepolia": {
        params: [{
            chainId: 471100,
            rpcUrls: ["https://test-rpc.patex.io/"],
            chainName: "Patex Sepolia Testnet",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://testnet.patexscan.io/"]
        }],
    },
};