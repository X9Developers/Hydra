import React, {Component} from 'react'
import Web3 from 'web3'
import Navbar from './Navbar'
import Main from './Main.js'
import eVotingToken from '../abis/eVotingToken.json'
import VotingContract from '../abis/VotingContract.json'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            count: '0',
            eToken: {},
            vContract: {},
            eVotingTokenBalance: '0',
            proposalName: '',
            proposalDesc: '',
            proposalAddress: '0x0',
            proposalList: [],
            loading: true
        }
    }    

    // Check if Blockchain is connected
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    // Connect to the Blockchain using Web3 
    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else{
            window.alert('Non-Ethereum Browser detected')
        }
    }

    // Load Blockchain data 
    async loadBlockchainData() {
        const web3 = window.web3
        
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0]})
        
        // To get the Network you are connected with
        const networkID = await web3.eth.net.getId()
        console.log(networkID)

        // Load FuncToken 
        const eVotingTokenData = eVotingToken.networks[networkID]
        if(eVotingTokenData) {
            // Get web3 version of funcToken SmartContract
            const eToken = await new web3.eth.Contract(
                eVotingToken.abi, eVotingTokenData.address
            )
            this.setState({ eToken })
            console.log(eToken)   
            let eVotingTokenBalance = await eToken.methods.balanceFor(
                this.state.account).call()
                console.log(eVotingTokenBalance.toString())
            this.setState({ eVotingTokenBalance: eVotingTokenBalance.toString() })
   
        } else {
            window.alert('eVotingToken contract is not deployed on this network')
        }

       
        // Load TokenFarming 
        const VotingContractData = VotingContract.networks[networkID]
        if(VotingContractData) {
            // Get web3 version of funcToken SmartContract
            const vContract = await new web3.eth.Contract(
                VotingContract.abi, VotingContractData.address
            )
            this.setState({ vContract })
            console.log(vContract)
    } else {
            window.alert('Voting contract is not deployed on this network')
        }

        this.setState({ loading:false })
    }

    // // For getting ProposalList 
    // getProposalList = (proposalList) => {
    //     for (var i = 0; i < this.state.vContract.methods.proposalAddress.length; i++) {
    //     proposalList.push(this.state.vContract.methods.proposalAddress(i).call())
    //     }
    //     this.setState({ proposalList })
    //     console.log(proposalList)
    // }

    // For Registering Voters
    registerVoter = () => {
        this.setState({ loading: true })
        this.state.vContract.methods.registerVoter().send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
      }
    //For Registering Proposals
    registerProposal = () => {
        this.setState({ loading: true })
        this.state.vContract.methods.registerProposal(this.state.proposalName, this.state.proposalDesc).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
      }
      
    //For voteInFavour Proposals
    voteInFavour = (proposalAddress) => {
        this.setState({ loading: true })
        this.state.vContract.methods.voteInFavour(proposalAddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
      }

    //For Rejection Voting
    voteInRejection = (proposalAddress) => {
        this.setState({ loading: true })
        this.state.vContract.methods.voteInRejection(proposalAddress).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
      }      
      
    //For Calculating Winners
    Winner = () => {
        this.setState({ loading: true })
        this.state.vContract.methods.winningProposal().send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
      }    
      
      
    render() {
        let pageContent 
        if(this.state.loading) {
            pageContent = <p id="loader" className="text-center"> Loading... </p>
        } else {
            // Load data into Main Component
            pageContent = <Main 
                registerVoter = {this.registerVoter}
                registerProposal = {this.registerProposal}
                voteInFavour = {this.voteInFavour}
                voteInRejection = {this.voteInRejection}
                Winner = {this.Winner}
                getProposalList = {this.getProposalList}
            />
        }
        return (
            <div> 
                <Navbar account = {this.state.account}/>
                <br />
                <br />
                {pageContent}
            </div>
        )
    }
}
export default App