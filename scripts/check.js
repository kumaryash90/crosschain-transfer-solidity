const { ethers } = require("hardhat");
const artifact = require("../artifacts/contracts/CrossChainToken.sol/CrossChainToken.json");
//const ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ADDRESS = "0x9FA3e5e10d7941E3e92a512eC40F9F96186F2AC6";

const main = async () => {
    const [admin, addr1] = await ethers.getSigners();

    const provider = new ethers.providers.JsonRpcProvider(`${process.env.ALCHEMY_RINKEBY}`);
    const signer = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider)

    const cct = new ethers.Contract(ADDRESS, artifact.abi, signer);
    
    console.log("signer balance: ", await cct.balanceOf("0x5FbDB2315678afecb367f032d93F642f64180aa3"));
    console.log("token name: ", await cct.name());
    // console.log("receiver balance: ", await cct.balanceOf(addr1.address));
}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.log(err);
    process.exit(1);
});