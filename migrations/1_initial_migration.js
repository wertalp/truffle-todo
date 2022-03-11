const Migrations = artifacts.require("Migrations");
const ToDO = artifacts.require("Todo");
const Election = artifacts.require("Election");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(ToDO);
  deployer.deploy(Election);
};
