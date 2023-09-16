import React, { useState } from 'react';
//import { Divider, Form, Input, Button, Segment, Message, Select } from 'semantic-ui-react';
import record from '../backend/record';
import web3 from '../backend/web3';

async function saveTransaction(recipientAddress, _amount, _pay_id) {
  // Get the current user's MetaMask account.
  const account = await web3.eth.getAccounts();
  const clientaddr =recipientAddress;
  const amount = _amount;
  let pay_id = _pay_id;
  const date = new Date();
  // Create a new transaction object.
  try {
    const accounts = await web3.eth.getAccounts();
    console.log(amount);
    console.log(clientaddr);
    console.log(date);
    console.log(pay_id);
    await record.methods.setPayment(
    clientaddr,date,amount, pay_id).send({from:accounts[0]});
    alert("Transaction executed");
    }
  catch (err){
    alert ("Transaction failed");
    }  

  // Save the transaction to a database.
}

const SendMoneyButton = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    try {
     let transf = await web3.eth.sendTransaction({
        from: account,
        to: recipientAddress,
        value: web3.utils.toHex(web3.utils.toWei(amount.toString(), 'ether')),
      });
      console.log(transf);
      saveTransaction(recipientAddress, amount, transf['transactionHash']);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient address"
        onChange={(e) => setRecipientAddress(e.target.value)}
        
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSubmit}>Send money</button>
    </div>
  );
};

export default SendMoneyButton;