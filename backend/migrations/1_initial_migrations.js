//const Migrations = artifacts.require("Migrations");
const Record = artifacts.require("Record.sol")
module.exports = async function (deployer) {
//await deployer.deploy(Migrations);
await deployer.deploy(Record);
};