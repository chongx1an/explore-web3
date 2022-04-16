const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lightsaber", function () {
  it("Should pay to mint", async function () {
    const Lightsaber = await ethers.getContractFactory("Lightsaber");
    const lightsaber = await Lightsaber.deploy();
    await lightsaber.deployed();

    const recipient = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199";
    const metadataURI = "cid/lightsaber.png";

    let balance = await lightsaber.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newToken = await lightsaber.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther("0.05")});

    await newToken.wait()

    balance = await lightsaber.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await lightsaber.isTokenOwned(metadataURI)).to.equal(true);
  });
});
