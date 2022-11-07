import abi from './abi/abi.json'

// 0x2c2D22431e249EdFB5f9e7F04bDb7c7d60Fb2d6c (Polygon Mumbai Testnet)

const blockchain = new Promise((res, rej) => {
    if (typeof window.ethereum === "undefined") {
        rej("Please install MetaMask")
    }

    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0x2c2D22431e249EdFB5f9e7F04bDb7c7d60Fb2d6c");

    web3.eth.requestAccounts().then((accounts) => {
        console.log("--> My account is: ", accounts[0])
    })

    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.totalSupply().call({ from: accounts[0] }).then((supply) => {
            console.log("--> Current supply of NFT tokens is: ", supply)
        })
    })

    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.maxSupply().call({ from: accounts[0] }).then((maxsupply) => {
            console.log("--> Maximum supply of NFT tokens is: ", maxsupply)
        })
    })

    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.getOwnerBuildings().call({ from: accounts[0] }).then((buildings) => {
            console.log("--> Your buildings: ", buildings)
        })
    })

    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.totalSupply().call({ from: accounts[0] }).then((supply) => {
            contract.methods.getBuildings().call({ from: accounts[0] }).then((data) => {
                res({ supply: supply, buildings: data })
            })
        })
    })
});

export default blockchain;