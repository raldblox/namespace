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
- [X] Set name.space to wallet addresses

### CONTRACT ADDRESSES

- POLYGON MUMBAI
  - Namespace: 0x38eeca616586d9c1A7ceaf1556341E9b58940Ca9
  - Visualizer: 0x6eb29cf7Ed29432F354781439d9a8C3440145CF6
  - Themer: 0x6770f754085c94968a97Dd051035904dc5798C3a
  - Token Address: 0xed2A268d2a8970FEf2793EfFd3113b8639e4E044
- POLYGON MAINNET
  - Namespace: ``
  - Visualizer: ``
  - Themer: ``
  - Token: ``
