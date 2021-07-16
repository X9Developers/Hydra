var VotingContract = artifacts.require("VotingContract")
var eVotingToken = artifacts.require("eVotingToken")

module.exports = async function(deployer) {

// Deploy eVotingContract
await deployer.deploy(eVotingToken)
// Fetch the address of deployed eVotingContract
const eVote = await eVotingToken.deployed()

// Deploy votingContract
await deployer.deploy(VotingContract, eVote.address)
await VotingContract.deployed()
};