import { ethers } from "ethers";

//contract address was deployed on the citrea testnet https://explorer.testnet.citrea.xyz/address/0xf3D676ebF2Fbfa725292130c13DfEa8FCC79b00f?tab=contract
const contractAddress = "0xf3d676ebf2fbfa725292130c13dfea8fcc79b00f";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_teacher",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_date",
				"type": "uint256"
			}
		],
		"name": "addCourse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "courseCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "courses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "teacher",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export const getContract = async (providerOrSigner = null) => {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed!");
    }

    // If no provider/signer is passed, create a read-only provider
    if (!providerOrSigner) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        return new ethers.Contract(contractAddress, contractABI, provider);
    }

    // Use the passed provider/signer
    return new ethers.Contract(contractAddress, contractABI, providerOrSigner);
};