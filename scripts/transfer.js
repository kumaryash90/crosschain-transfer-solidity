const { ethers } = require("hardhat");
const artifact = require("../artifacts/contracts/MultiChainTestToken.sol/MultiChainTestToken.json");
//const ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const MCTT_ADDRESS = "0x43Cf390bca8cCc836F737E0bf415936877ef9CFA";
const Recipient = "0xc42D4AdcAa3fAe94bdc6A4027fa4C1b8560c70c3"

const main = async () => {
    const [admin] = await ethers.getSigners();

    const provider = new ethers.providers.JsonRpcProvider(`${process.env.ALCHEMY_ROPSTEN}`);
    const signer = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider)

    const mctt = new ethers.Contract(MCTT_ADDRESS, artifact.abi, signer);
    
    // console.log("signer balance: ", await cct.balanceOf("0x5FbDB2315678afecb367f032d93F642f64180aa3"));
    // console.log("token name: ", await cct.name());
    // console.log("receiver balance: ", await cct.balanceOf(addr1.address));

    //const tx = await mctt.transfer(Recipient, ethers.utils.parseEther("1000"));
    //const receipt = await tx.wait();
    console.log("allowance: ",await mctt.allowance("0xf4461b4a0beb5c1c2c4a0d264d6957d54c3c2f25", signer.address));
}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.log(err);
    process.exit(1);
});