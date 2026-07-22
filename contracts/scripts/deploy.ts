import { ethers } from "hardhat";

async function main() {
  const [buyer, supplier] = await ethers.getSigners();

  const InvoiceSettlement = await ethers.getContractFactory("InvoiceSettlement");
  const invoiceAmount = ethers.parseEther("1.0");

  const contract = await InvoiceSettlement.connect(buyer).deploy(supplier.address, "INV-2026-0114", {
    value: invoiceAmount,
  });
  await contract.waitForDeployment();

  console.log(`InvoiceSettlement deployed to: ${await contract.getAddress()}`);
  console.log(`Buyer:    ${buyer.address}`);
  console.log(`Supplier: ${supplier.address}`);
  console.log(`Escrowed: ${ethers.formatEther(invoiceAmount)} ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
