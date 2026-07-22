import { expect } from "chai";
import { ethers } from "hardhat";

describe("InvoiceSettlement", () => {
  async function deployFixture() {
    const [buyer, supplier, other] = await ethers.getSigners();
    const amount = ethers.parseEther("1.0");

    const Factory = await ethers.getContractFactory("InvoiceSettlement");
    const contract = await Factory.connect(buyer).deploy(supplier.address, "INV-2026-0114", {
      value: amount,
    });
    await contract.waitForDeployment();

    return { contract, buyer, supplier, other, amount };
  }

  it("starts in the Created stage holding the escrowed amount", async () => {
    const { contract, amount } = await deployFixture();
    expect(await contract.status()).to.equal(0n);
    expect(await ethers.provider.getBalance(await contract.getAddress())).to.equal(amount);
  });

  it("walks through Created -> Verified -> Approved -> Executed", async () => {
    const { contract, buyer, supplier, amount } = await deployFixture();

    await contract.connect(supplier).confirmDelivery();
    await contract.connect(buyer).verifyConditions();
    expect(await contract.status()).to.equal(1n); // Verified

    await contract.approveSettlement();
    expect(await contract.status()).to.equal(2n); // Approved

    const before = await ethers.provider.getBalance(supplier.address);
    await contract.executePayment();
    expect(await contract.status()).to.equal(3n); // Executed

    const after = await ethers.provider.getBalance(supplier.address);
    expect(after - before).to.equal(amount);
  });

  it("rejects verification before delivery is confirmed", async () => {
    const { contract, buyer } = await deployFixture();
    await expect(contract.connect(buyer).verifyConditions()).to.be.revertedWith(
      "InvoiceSettlement: delivery not yet confirmed",
    );
  });

  it("only allows the supplier to confirm delivery", async () => {
    const { contract, other } = await deployFixture();
    await expect(contract.connect(other).confirmDelivery()).to.be.revertedWith(
      "InvoiceSettlement: caller is not the supplier",
    );
  });
});
