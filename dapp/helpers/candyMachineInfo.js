export const candyMachineAddress = process.env.CANDY_MACHINE;

export const collectionName = "TestNamespace"; // Case sensitive!
export const MaxMint = 3
export const COLLECTION_SIZE = 10

export const collectionCoverUrl = process.env.CollectionCoverUrl;
export const collectionBackgroundUrl = process.env.CollectionBackgroundUrl;

export const mode = "dev"; // "dev" or "test" or "mainnet"
export let NODE_URL;
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
export const SERVICE_NAME = "ftmpad"
let FAUCET_URL;
if (mode == "dev") {
    NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
    FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
} else if (mode === "test") {
    NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";
    FAUCET_URL = "https://faucet.testnet.aptoslabs.com";
} else {
    NODE_URL = "https://fullnode.mainnet.aptoslabs.com/v1";
    FAUCET_URL = null;
}
