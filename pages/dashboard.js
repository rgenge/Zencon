/* global BigInt */
import React, { PureComponent } from 'react';
import { Link } from '../routes';
import Layout from '../components/Layout';
import record from '../backend/record';
import web3 from '../backend/web3';
import { Router } from '../routes';
export default class Dashboard extends PureComponent {
 
    static async getInitialProps() {  
     //   const accounts = await web3.eth.getAccounts();
        const allClients = await record.methods.getClients().call();
        const allForms = await record.methods.searchForms(allClients[0]).call();
        const allTransfers = await record.methods.searchPayment(allClients[0]).call();
        const amount1 = allTransfers['0']; 
        console.log(allTransfers);

        async function getAllPayments() {
          const payments = {};
          const paymentCount = await record.methods.getPaymentsCount().call();
          for (let i = 0; i < paymentCount; i++) {
            const address = allClients[0];
            console.log(paymentCount);
            const result = await record.methods.searchPayment(address).call();

            const [clientAddress, date, amount, pay_id] = Object.values(result);
            payments[address] = { clientAddress, date, amount, pay_id };
          }
        }
        getAllPayments();


        return {allClients, amount1, allForms};
    }
    renderClients = () => {
      return this.props.allClients.map((allClients) => {
         return(
            <div>
              <li>{allClients.name}</li>
              <p>{allClients.gender}</p>            
            </div>
         )
       })}
    
    render() 
    {
        return (
            <Layout>

              <p>
               {this.props.allClients[0]}
               <br></br>
               {this.props.allTransfers}               
             
            </p>
            
            </Layout>
        );
    }
};