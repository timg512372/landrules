require('dotenv').config();
const Web3 = require('web3');
const contractAbi = require('../../build/contracts/LandRules.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

function initializeWeb3() {
    var provider = new HDWalletProvider(process.env.MNEMONIC, process.env.NETWORK, 0, 10);

    const web3 = new Web3(provider);
    web3.setProvider(provider);

    const contractInstance = new web3.eth.Contract(contractAbi.abi, process.env.CONTRACT_ADDRESS);

    return { web3, contractInstance };
}

async function ownsToken(tokenId, address) {
    const { web3, contractInstance } = initializeWeb3();
    let owner = await contractInstance.methods.ownerOf(tokenId).call();
    return owner.toLowerCase() == address.toLowerCase();
}

module.exports = { initializeWeb3, ownsToken };
