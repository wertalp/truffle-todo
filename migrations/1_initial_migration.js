const Migrations = artifacts.require("Migrations");
const ToDO = artifacts.require("Todo");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(ToDo);
};
