# namespace smart contracts

Hardhat Commands:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat size-contracts
npx hardhat run scripts/deploy.js
npx hardhat run --network mumbai scripts/deploy.js
npx hardhat run --network zkevmt scripts/deploy.js
npx hardhat run --network mainnet scripts/deploy.js
npx hardhat verify --network mumbai [CONTRACT_ADDRESS]
```

## FEATURE/S CHECKLIST

- [x] Create unique names of each addresses (`createName()`)
  - [x] Each name has owner
  - [x] Each name connects to multiple spaces
  - [x] Each name has encrypted storage per address
  - [x] Data stored by current owner link to him/her
- [x] Create spaces for communities or organizations (`createSpace()`)
  - [x] Each space has owner or creator
  - [x] Each space has full org name for identification
  - [x] Each space holds names or members
  - [x] Spaces connection transfer membership fees from members
  - [x] Space owner can add connection fees
- [x] Create namespaces by connecting name to spaces (`connectSpace()`)
  - [x] Connecting to spaces incur fees set by space owners
  - [x] Each namespace can link links
  - [x] Each namespace can create shareble links
- [x] Add Interface for other contracts to connect
- [x] Create NFT Visuals and Themes
  - [x] Each Space NFT showcase community logo
  - [x] Each Name NFT showcase spaces with it community logo
  - [x] Showcasing spaces is in type or slide effect
- [x] Set name.space to wallet addresses

### CONTRACT ADDRESSES

- POLYGON MUMBAI
  Namespace: 0x2B707d2821fd13B6335cFB4fE47B702E78b01496
  Token: 0xE81d6DDd31cd9075b7b19861E554D3BE29CB9db8
  Themer: 0x5095F56e8159887F343184858B84dC1196d5dfdD
  Visualizer: 0x182C1d4A7709d0aEf387271537524919E1974763
- POLYGON MAINNET
  - Namespace: [0x44B0b339cFf4DC737ad3C35f33C6262e3Df45BDC](https://polygonscan.com/address/0x44B0b339cFf4DC737ad3C35f33C6262e3Df45BDC#code)
  - Token: [0xb374198d6D6b503Fa1f5B3908467F5CD9E7AeacE](https://polygonscan.com/address/0xb374198d6D6b503Fa1f5B3908467F5CD9E7AeacE#code)
  - Visualizer: `0x7C4671D11EAe4732b0c5D23437ae1c6e67bf06e1`
  - Themer: `0x00D69D17444bEE3a861a052ac9d572F7B472d548`
- POLYGON ZKEVM TESTNET
  - Namespace: `` <!-- Gas on bridging is too much, reaching 1.5ETH est. fees -->
  - Token: ``
- FILECOIN HYPERSPACE
  - Namespace: `0xBC38956bE0f26B00D621F2736A28F2e890AE31cD`
  - Visualizer: ``
- CIC MAINNET
  - Namespace: `0xdeb133D2687Cbe9844C23b89A52e10CAbdF6662F`
  - Visualizer: `0xA70E4B68B10154158235ED27247F315D7d6F22bD`
  - Themer: `0x6771Fd90f43C18628A3e7f37d4754Ff4e889B8ed`
  - Token: `0xb355511953Ff6DeBCE443730c9d471e3F6B9b209`
