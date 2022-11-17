const { network } = require("hardhat");
const { developmentChains, BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ deployments, getNamedAccounts }) => {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	log("====================================================================");

	const transactions = await deploy("Transactions", {
		from: deployer,
		log: true,
		waitConfirmations: developmentChains.includes(network.name) ? 1 : BLOCK_CONFIRMATIONS,
	});

	if (!developmentChains.includes(network.name)) {
		await verify(transactions.address);
	}
};

module.exports.tags = ["all"];
