export default function handler(req, res) {
  const { name } = req.query

  // to add: blockchain data queries

  res.status(200).json({
    name: name,
    tokenId: 0,
    address: "0xResolvedAddress",
    connectedSpaces: [
      "zoociety", "blox", "badge", "space"
    ],
    ownedSpaces: [
      ""
    ],
    fileReserved: [
      "name.space/folder/file.rar",
      "name.space/pfp/1.png"
    ]
  })
}