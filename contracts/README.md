# namespace smart contracts

Hardhat Commands:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
npx hardhat run --network mumbai scripts/deploy.js
npx hardhat run --network zkevm scripts/deploy.js
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
  Namespace: [0x1444Db00d1038bd9a0D5952C3FEb16a23Ab84233](https://mumbai.polygonscan.com/address/0x1444Db00d1038bd9a0D5952C3FEb16a23Ab84233#code)
  Token: [0x07001EaA10d6b835AACf9E11f56D6cbe0e2b5476](https://mumbai.polygonscan.com/address/0x07001EaA10d6b835AACf9E11f56D6cbe0e2b5476#code)
  Themer: 0x5Fdf3BcBFCbf68C9AaC19276Ae952D441D86E98d
  Visualizer: 0x27E69fe0Bc66E19Aa0D089edF90c3227c5eE5963
- POLYGON MAINNET
  - Namespace: `0xfe409ca6CaB3fbBb7c7372F17d84c3E5A94D06E9`
  - Visualizer: ``
  - Themer: ``
  - Token: ``
