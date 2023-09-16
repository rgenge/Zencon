import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0xA81e1FC28D4E514D2CE7193D12144546a715816F' //Deployed Contract Code //Everytime contract code is changed and compiled, need to update this
);

export default instance;