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

- [ ] Create unique names of each addresses
  - [ ] Each name has owner
  - [ ] Each name connects to multiple spaces
- [ ] Create spaces for communities or organizations
  - [ ] Each space has owner and creator
  - [ ] Each name has domain for identification
  - [ ] Each space holds names or members
  - [ ] Spaces recieve portion of connection fees from members
  - [ ] Fund is withdrawable only by space owner
  - [ ] Space owner can add connection fees
  - [ ] Maximum %share is 50 percent of total fees
- [ ] Create namespaces by connecting name to spaces
  - [ ] Connecting to spaces incur fees set by space owners
  - [ ] Each namespace has dashboard or control room
  - [ ] Each namespace can link wallet addresses
  - [ ] Each namespace can create shareble links
  - [ ] Each namespace can upload and store files
