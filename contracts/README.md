# namespace smart contracts

Hardhat Commands:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

## FEATURE/S CHECKLIST

- [x] Create unique names of each addresses (`createName()`)
  - [x] Each name has owner
  - [x] Each name connects to multiple spaces
  - [ ] Each name has encrypted storage per address
  - [ ] Data stored by current owner only accessible by him/her
- [x] Create spaces for communities or organizations (`createSpace()`)
  - [x] Each space has owner or creator
  - [ ] Each name has domain for identification
  - [x] Each space holds names or members
  - [ ] Spaces recieve portion of connection fees from members
  - [ ] Fund is withdrawable only by space owner
  - [ ] Space owner can add connection fees
  - [ ] Maximum %share is 50 percent of total fees
- [x] Create namespaces by connecting name to spaces (`connectSpace()`)
  - [ ] Connecting to spaces incur fees set by space owners
  - [ ] Each namespace has dashboard or control room
  - [ ] Each namespace can link wallet addresses
  - [ ] Each namespace can create shareble links
  - [ ] Each namespace can upload and store files
