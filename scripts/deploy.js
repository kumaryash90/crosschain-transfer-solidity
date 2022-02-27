const { ethers } = require("hardhat");

const main = async () => {
    const [admin] = await ethers.getSigners();
    console.log("admin: ", admin.address);

    const MultiChainTestToken = await ethers.getContractFactory("MultiChainTestToken");
    const mctt = await MultiChainTestToken.deploy()
    await mctt.deployed();

    console.log("deployed at: ", faucet.address);
}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.log(err);
    process.exit(1);
});