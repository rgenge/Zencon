import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0x4D05B72948E4704f9CB55008D0A2A8E58975cf1B' //Deployed Contract Code //Everytime contract code is changed and compiled, need to update this
);

export default instance;