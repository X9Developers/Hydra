const express = require("express");
const path = require("path");
const cron = require("node-cron");
const fs = require("fs");
const { readFileSync } = require('fs');
const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction;
var contractInfo = require('./contractABI');

const app = express();
const port = process.env.PORT || "8000";

const infura = "https://rinkeby.infura.io/v3/49909763e62f4e1f947ea70b2c343db2"
const web3 = new Web3(new Web3.providers.HttpProvider(infura));


// Read Addresses from a filename in the same directory
// function readFileData() {
//     console.log("Fetching Addresses...")
//     const toAddress = readFileSync('data/data.txt').toString().replace(/\r\n/g,'\n').split('\n');
//     if(toAddress) {
//     console.log("Fetched & Stored...")
//     }else console.log("Failed.....")

//     return toAddress;
// }

var startBlock = 	8726485;

// Either Pass toAddress array of addresses to the returnETH function
// or specify the array parameters manually
// var toAddress = readFileData();

// To check if the textFile addresses are stored in the array
// console.log(toAddress);




//Start Cronjob
app.listen(port, () => {
    cron.schedule("*/3 * * * * *", async function(){

        currentBlockNum = await web3.eth.getBlockNumber();
        diff = currentBlockNum - startBlock;

        console.log(currentBlockNum, startBlock);

        if (diff < 1){
            return;
        }

        startBlock = currentBlockNum;

        var abi = contractInfo.abi;
        var address = contractInfo.contractAddress;
        var toadd = address;
        var pk = "6ef9a97de30a780a301edc85dd09aa6536318ecca2fd709c2c0d3e6734842621";
        web3.eth.defaultAccount = "0x14CaEEE23C4e50F25C2adE5308338db5368b2486";

        web3.eth.getTransactionCount(web3.eth.defaultAccount, async function (err, nonce) {
            console.log("nonce value is ", nonce);
            const contract = new web3.eth.Contract(abi, address, {
            from: web3.eth.defaultAccount ,
            gas: 5000000,
            })

            const arrayData = await contract.methods.getUserAddress().call();
            var file = fs.createWriteStream('data/data.txt');        
            const unique = [...new Set(arrayData)];
            console.log('writing to the file');
            console.log(unique);
            console.log('File updated');

            file.on('error', function(err) { /* error handling */ });
            unique.forEach(value => file.write(`${value}\r\n`));;
            file.end();
            
            // const functionAbi = contract.methods.getUserAddress().encodeABI();
            // var details = {
            // "nonce": nonce,
            // "gasPrice": web3.utils.toHex(web3.utils.toWei('47', 'gwei')),
            // "gas": 5000000,
            // "to": address,
            // "value": 0,
            // "data": functionAbi,
            // };
            // const transaction = new EthereumTx(details, {chain: 'rinkeby'});
            // transaction.sign(Buffer.from(pk, 'hex') );
            // var rawData = '0x' + transaction.serialize().toString('hex');
            // web3.eth.sendSignedTransaction(rawData)
            // .on('transactionHash', function(hash){
            // console.log(['transferToStaging Trx Hash:' + hash]);
            // })
            // .on('receipt', function(receipt){
            // console.log(['transferToStaging Receipt:', receipt]);
            // })
            // .on('error', console.error);
            });        

        console.log("");
    } );

    console.log(`scheduler server start on port :${port}`);
  });


// // 31 days = "0 */744 * * *""
