# namespace smart contracts

Hardhat Commands:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
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
  - Namespace: [0xA7FDFb03768d1f2419c966c84C23Fe7B084f6541](https://mumbai.polygonscan.com/address/0xA7FDFb03768d1f2419c966c84C23Fe7B084f6541#code)
  - Token: [0xc135E331A5802ff98F0E21a7A02e3b9FaFF284EA](https://mumbai.polygonscan.com/address/0xc135E331A5802ff98F0E21a7A02e3b9FaFF284EA#code)
- POLYGON MAINNET
  - Namespace: `0xfe409ca6CaB3fbBb7c7372F17d84c3E5A94D06E9`
  - Token: `` <!-- Error: Transaction Overdraft -->
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
