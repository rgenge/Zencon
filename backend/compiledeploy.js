const Web3 = require("web3");

async function main() {
  // Configuring compilation configuration and compiling contract
  const fs = require("fs");
  const solc = require('solc');
  const input = fs.readFileSync('Storage.sol');
  const output = solc.compile(input.toString(), 1);
  const bytecode = output.contracts[':Storage'].bytecode;
  const abi = JSON.parse(output.contracts[':Storage'].interface);
  // Configuring the connection to an Ethereum node and 
  const network = process.env.ETHEREUM_NETWORK || "localhost";
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      'http://localhost:7545',
    ),
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);

  // Using the signing account to deploy the contract
  const contract = new web3.eth.Contract(abi);
  contract.options.data = bytecode;
  const deployTx = contract.deploy();
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: await deployTx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining deployment transaction ...`);
    });
  console.log(`Contract deployed at ${deployedContract.options.address}`);
  console.log(
    `Contract address: ${deployedContract.options.address}`,
  );
}

require("dotenv").config();
main();
