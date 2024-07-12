require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const TESTNET_PRIVATE_KEY =
    process.env.TESTNET_PRIVATE_KEY || "";
module.exports = {
  solidity: "0.8.3",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY || "",
      accounts: [TESTNET_PRIVATE_KEY]
    },
    ropsten: {
      url: process.env.ALCHEMY_ROPSTEN || "",
      accounts: [TESTNET_PRIVATE_KEY]
    }
  },
};
