require("@nomiclabs/hardhat-ethers");
require("dotenv").config();


module.exports = {
  solidity: "0.8.3",
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_RINKEBY,
      accounts: [process.env.ADMIN_PRIVATE_KEY]
    },
    ropsten: {
      url: process.env.ALCHEMY_ROPSTEN,
      accounts: [process.env.ADMIN_PRIVATE_KEY]
    }
  },
};
