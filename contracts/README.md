# namespace smart contracts

Hardhat Commands:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
npx hardhat run --network mumbai scripts/deploy.js
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
  - Namespace: `0x577ca4ec6fc3d6E0621f91543a8b2d0C57382C37`
  - Visualizer: `0x58b0105237BBa9e134Eb04B29D31b206e9F255b4`
  - Themer: `0x7eCE7B493415c0fd5A72b5318C715C7002A14149`
  - Token Address: `0x8aB53D891D65b7cC32c9d4f797d251Ff4A53ee39`
- POLYGON MAINNET
  - Namespace: `0xfe409ca6CaB3fbBb7c7372F17d84c3E5A94D06E9`
  - Visualizer: ``
  - Themer: ``
  - Token: ``
