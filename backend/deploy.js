const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledRecord = require('./build/Record.json');


//Link to rinkeby network by using Infura and providing seed phrase of metamask wallet
const provider = new HDWalletProvider(
    'goose master evil culture bread sell letter card capable trap comfort survey', 'http://127.0.0.1:7545',
);
// const mnemonic = 'goose master evil culture bread sell letter card capable trap comfort survey';
// const provider = new HDWalletProvider(mnemonic, 'http://localhost:7545');

const web3 = new Web3(provider);
console.log(provider); 

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    //Deploy contract to rinkeby network
    const result = await new web3.eth.Contract(JSON.parse(compiledRecord.interface))
        .deploy({ data: compiledRecord.bytecode })
        .send({gas: '10000000',maxFeePerGas: 10000000000, from: accounts[0]});

    //Display the address of the contract 
    console.log('Contract deployed to', result.options.address);

    //Always go to record.js after updating solidity code
};

deploy();