const { providers } = require("ethers");
const { ethers } = require("hardhat");
const artifact = require("../artifacts/contracts/CrossChainToken.sol/CrossChainToken.json");
const ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const PROVIDERS = {
    rinkeby: process.env.ALCHEMY_RINKEBY,
    ropsten: process.env.ALCHEMY_ROPSTEN
}

const TOKEN_ADDRESS = {
    rinkeby: "0x9FA3e5e10d7941E3e92a512eC40F9F96186F2AC6",
    ropsten: "0x3b5Df53438e9BA4b5547069D94E77eb3a2B9C7bf"
}

const receiveOutside = async (signer, from, to, amount) => {
    console.log("here");
    const cct = new ethers.Contract(TOKEN_ADDRESS.ropsten, artifact.abi, signer);
    const tx = await cct.receiveOutside(from, to, amount);
    const receipt = await tx.wait();
    console.log("receipt outside: ", receipt.events);
}

const main = async () => {
    const [admin, addr1] = await ethers.getSigners();
    let stop = false;

    const provider_rinkeby = new ethers.providers.JsonRpcProvider(`${PROVIDERS.rinkeby}`);
    const signer_rinkeby = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider_rinkeby)
    
    const provider_ropsten = new ethers.providers.JsonRpcProvider(`${PROVIDERS.ropsten}`);
    const signer_ropsten = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider_ropsten)

    const cct = new ethers.Contract(TOKEN_ADDRESS.rinkeby, artifact.abi, signer_rinkeby);
    cct.on("TransferOutside", async (from, to, amount) => {
        console.log(`TransferOutside: from:${from}  to: ${to}  amount: ${amount}`);
        console.log("balance of sender: ", await cct.balanceOf(from));
        await receiveOutside(signer_ropsten, from, to, amount);
    });
    cct.on("ReceiveOutside", async (from, to, amount) => {
        console.log(`ReceiveOutside: from:${from}  to: ${to}  amount: ${amount}`);
        console.log("receiver balance: ", await cct.balanceOf(to));
        stop = true;
    });

    const tx = await cct.transferOutside(signer_rinkeby.address, ethers.utils.parseEther("35"));
    const receipt = await tx.wait();

    console.log("receipt: ", receipt.events);

    const promise = new Promise((resolve, reject) => {
        setTimeout(async () => {
            resolve();
        }, 10000);
    });
    await promise;
}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.log(err);
    process.exit(1);
});