import {
  fetchCallReadOnlyFunction,
  uintCV,
  principalCV,
  noneCV,
  PostConditionMode,
  standardPrincipalCV,
} from '@stacks/transactions';

import { openContractCall } from '@stacks/connect';
import { STACKS_TESTNET } from '@stacks/network';

// Use the predefined testnet network
const network = STACKS_TESTNET;

// Get environment variables with validation
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contractName = import.meta.env.VITE_CONTRACT_NAME;

// Validate environment variables
if (!contractAddress || !contractName) {
  console.error('Missing environment variables:');
  console.error('VITE_CONTRACT_ADDRESS:', contractAddress);
  console.error('VITE_CONTRACT_NAME:', contractName);
  console.error('Please check your .env file');
}

// Helper function to validate contract info
function validateContractInfo() {
  if (!contractAddress || !contractName) {
    throw new Error(`Contract not configured properly. Address: ${contractAddress}, Name: ${contractName}`);
  }

  // Log for debugging
  console.log('Using contract:', `${contractAddress}.${contractName}`);
}

export async function getTotalSupply(sender) {
  try {
    validateContractInfo();

    console.log('Calling get-total-supply for:', `${contractAddress}.${contractName}`);

    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-total-supply',
      functionArgs: [],
      senderAddress: sender,
      network,
    });

    console.log('Total supply result:', result);
    return result.value;
  } catch (error) {
    console.error('Error in getTotalSupply:', error);
    throw error;
  }
}

export async function getBalance(sender, principal) {
  try {
    validateContractInfo();

    console.log('Calling get-balance for:', `${contractAddress}.${contractName}`, 'Principal:', principal);

    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-balance',
      functionArgs: [principalCV(principal)],
      senderAddress: sender,
      network,
    });

    console.log('Balance result:', result);
    return result.value;
  } catch (error) {
    console.error('Error in getBalance:', error);
    throw error;
  }
}

export async function initializeToken(userSession, amount) {
  try {
    validateContractInfo();

    await openContractCall({
      contractAddress,
      contractName,
      functionName: 'initialize',
      functionArgs: [uintCV(amount)],
      network,
      appDetails: {
        name: 'My Token DApp',
        icon: window.location.origin + '/logo192.png',
      },
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        console.log('Initialized token:', data);
      },
      onCancel: () => {
        console.log('Initialize transaction cancelled');
      },
    });
  } catch (error) {
    console.error('Error in initializeToken:', error);
    throw error;
  }
}

export async function transferToken(userSession, amount, sender, recipient) {
  try {
    validateContractInfo();

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error(`Invalid amount: ${amount}`);
    }

    // Validate sender
    if (!sender || typeof sender !== 'string' || !sender.startsWith('S')) {
      throw new Error(`Invalid sender address: ${sender}`);
    }

    // Validate recipient
    if (!recipient || typeof recipient !== 'string' || !recipient.startsWith('S')) {
      throw new Error(`Invalid recipient address: ${recipient}`);
    }

    console.log(`Transferring ${amount} tokens from ${sender} to ${recipient}`);

    await openContractCall({
      contractAddress,
      contractName,
      functionName: 'transfer',
      functionArgs: [
        uintCV(amount),
        standardPrincipalCV(sender),
        standardPrincipalCV(recipient),
        noneCV(), // optional memo
      ],
      network,
      appDetails: {
        name: 'My Token DApp',
        icon: window.location.origin + '/logo192.png',
      },
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        console.log('Transfer complete:', data);
      },
      onCancel: () => {
        console.log('Transfer transaction cancelled');
      },
    });
  } catch (error) {
    console.error('Error in transferToken:', error.message);
    throw error;
  }
}

// Export contract info for debugging
export const getContractInfo = () => ({
  contractAddress,
  contractName,
  fullIdentifier: `${contractAddress}.${contractName}`,
  isConfigured: !!(contractAddress && contractName),
});
