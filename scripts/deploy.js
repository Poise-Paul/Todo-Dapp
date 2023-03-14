const hre = require("hardhat");

async function main() {
  const TaskContact = await hre.ethers.getContractFactory("TaskContract");
  const taskContract = await TaskContact.deploy();

  await taskContract.deployed();

  console.log(`Contract deployed to ${taskContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Deployed Address 0x2BE362575F18FcC16d4bd6C0174f9c7372e231aC