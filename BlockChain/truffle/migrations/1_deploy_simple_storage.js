const SimpleStorage = artifacts.require("Hospital");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
