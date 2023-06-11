export default function handler(req, res) {
    const { name } = req.query

    // to add: blockchain data queries

    res.status(200).json({
        space: name,
        tokenId: 0,
        ownerAddress: "0xResolvedAddress",
        creatorAddress: "0xResolvedAddress",
        spaceMembers: [
            "name0", "name1", "name2", "name3"
        ],
        fileReserved: [
            "name.space/folder/file.rar",
            "name.space/pfp/1.png"
        ]
    })
}