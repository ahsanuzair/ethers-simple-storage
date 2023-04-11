const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //connect script to local blockchain

  const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:7545");
  const wallet = new ethers.Wallet(
    "0x389ce775d55e3071793cc38a6587e0231aac7fb37f6ba9494e5726a8051b0166",
    provider
  );
  //to deploy we need abi and binary compiled code. so we read from two files .abi and .bin using fs-extra

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  //contract factory is an object used to deploy conteact
  const contractFactory = ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying, please wait...");
  const contract = await contractFactory.deploy();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
