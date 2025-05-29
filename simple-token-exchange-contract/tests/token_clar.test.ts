import { describe, it, expect } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const deployer = accounts.get('deployer')!;
const wallet1 = accounts.get('wallet_1')!;
const wallet2 = accounts.get('wallet_2')!;

describe('token_clar contract tests', () => {
  it('can be initialized with initial supply', () => {
    const initialSupply = 1000000;
    
    const initialize = simnet.callPublicFn(
      'token_clar', 
      'initialize', 
      [Cl.uint(initialSupply)], 
      deployer
    );
    
    expect(initialize.result).toBeOk(Cl.bool(true));
    
    // Check total supply
    const totalSupply = simnet.callReadOnlyFn('token_clar', 'get-total-supply', [], deployer);
    expect(totalSupply.result).toBeOk(Cl.uint(initialSupply));
    
    // Check deployer balance
    const balance = simnet.callReadOnlyFn(
      'token_clar', 
      'get-balance', 
      [Cl.principal(deployer)], 
      deployer
    );
    expect(balance.result).toBeOk(Cl.uint(initialSupply));
  });

  it('only allows contract owner to initialize', () => {
    const initialSupply = 1000000;
    
    const initialize = simnet.callPublicFn(
      'token_clar', 
      'initialize', 
      [Cl.uint(initialSupply)], 
      wallet1
    );
    
    expect(initialize.result).toBeErr(Cl.uint(100)); // err-owner-only
  });

  it('can transfer tokens between accounts', () => {
    const initialSupply = 1000000;
    const transferAmount = 100;
    
    // Initialize contract
    simnet.callPublicFn('token_clar', 'initialize', [Cl.uint(initialSupply)], deployer);
    
    // Transfer from deployer to wallet1
    const transfer = simnet.callPublicFn(
      'token_clar', 
      'transfer', 
      [
        Cl.uint(transferAmount),
        Cl.principal(deployer),
        Cl.principal(wallet1),
        Cl.none()
      ], 
      deployer
    );
    
    expect(transfer.result).toBeOk(Cl.bool(true));
    
    // Check balances
    const deployerBalance = simnet.callReadOnlyFn(
      'token_clar', 
      'get-balance', 
      [Cl.principal(deployer)], 
      deployer
    );
    expect(deployerBalance.result).toBeOk(Cl.uint(initialSupply - transferAmount));
    
    const wallet1Balance = simnet.callReadOnlyFn(
      'token_clar', 
      'get-balance', 
      [Cl.principal(wallet1)], 
      deployer
    );
    expect(wallet1Balance.result).toBeOk(Cl.uint(transferAmount));
  });

  it('cannot transfer more tokens than balance', () => {
    const initialSupply = 1000000;
    const transferAmount = initialSupply + 1;
    
    // Initialize contract
    simnet.callPublicFn('token_clar', 'initialize', [Cl.uint(initialSupply)], deployer);
    
    // Try to transfer more than balance
    const transfer = simnet.callPublicFn(
      'token_clar', 
      'transfer', 
      [
        Cl.uint(transferAmount),
        Cl.principal(deployer),
        Cl.principal(wallet1),
        Cl.none()
      ], 
      deployer
    );
    
    expect(transfer.result).toBeErr(Cl.uint(102)); // err-insufficient-balance
  });

  it('cannot transfer zero amounts', () => {
    const initialSupply = 1000000;
    
    // Initialize contract
    simnet.callPublicFn('token_clar', 'initialize', [Cl.uint(initialSupply)], deployer);
    
    // Try to transfer zero amount
    const transfer = simnet.callPublicFn(
      'token_clar', 
      'transfer', 
      [
        Cl.uint(0),
        Cl.principal(deployer),
        Cl.principal(wallet1),
        Cl.none()
      ], 
      deployer
    );
    
    expect(transfer.result).toBeErr(Cl.uint(103)); // err-invalid-amount
  });

  it('only allows token owner to transfer their tokens', () => {
    const initialSupply = 1000000;
    const transferAmount = 100;
    
    // Initialize contract
    simnet.callPublicFn('token_clar', 'initialize', [Cl.uint(initialSupply)], deployer);
    
    // wallet1 tries to transfer deployer's tokens (should fail)
    const transfer = simnet.callPublicFn(
      'token_clar', 
      'transfer', 
      [
        Cl.uint(transferAmount),
        Cl.principal(deployer),
        Cl.principal(wallet2),
        Cl.none()
      ], 
      wallet1
    );
    
    expect(transfer.result).toBeErr(Cl.uint(101)); // err-not-token-owner
  });

  it('can mint new tokens (owner only)', () => {
    const initialSupply = 1000000;
    const mintAmount = 500;
    
    // Initialize contract
    simnet.callPublicFn('token_clar', 'initialize', [Cl.uint(initialSupply)], deployer);
    
    // Mint tokens to wallet1
    const mint = simnet.callPublicFn(
      'token_clar', 
      'mint', 
      [
        Cl.uint(mintAmount),
        Cl.principal(wallet1)
      ], 
      deployer
    );
    
    expect(mint.result).toBeOk(Cl.bool(true));
    
    // Check total supply increased
    const totalSupply = simnet.callReadOnlyFn('token_clar', 'get-total-supply', [], deployer);
    expect(totalSupply.result).toBeOk(Cl.uint(initialSupply + mintAmount));
    
    // Check wallet1 balance
    const wallet1Balance = simnet.callReadOnlyFn(
      'token_clar', 
      'get-balance', 
      [Cl.principal(wallet1)], 
      deployer
    );
    expect(wallet1Balance.result).toBeOk(Cl.uint(mintAmount));
  });

  it('only allows owner to mint tokens', () => {
    const initialSupply = 1000000;
    const mintAmount = 500;
    
    // Initialize contract
    simnet.callPublicFn('token_clar', 'initialize', [Cl.uint(initialSupply)], deployer);
    
    // wallet1 tries to mint tokens (should fail)
    const mint = simnet.callPublicFn(
      'token_clar', 
      'mint', 
      [
        Cl.uint(mintAmount),
        Cl.principal(wallet1)
      ], 
      wallet1
    );
    
    expect(mint.result).toBeErr(Cl.uint(100)); // err-owner-only
  });

  it('can get token metadata', () => {
    // Get token name
    const name = simnet.callReadOnlyFn('token_clar', 'get-name', [], deployer);
    expect(name.result).toBeOk(Cl.stringAscii("Simple Token"));
    
    // Get token symbol
    const symbol = simnet.callReadOnlyFn('token_clar', 'get-symbol', [], deployer);
    expect(symbol.result).toBeOk(Cl.stringAscii("SIMPLE"));
    
    // Get token decimals
    const decimals = simnet.callReadOnlyFn('token_clar', 'get-decimals', [], deployer);
    expect(decimals.result).toBeOk(Cl.uint(6));
  });

  it('can deposit STX', () => {
    const depositAmount = 1000;
    
    // Make a deposit
    const deposit = simnet.callPublicFn(
      'token_clar', 
      'deposit', 
      [Cl.uint(depositAmount)], 
      wallet1
    );
    
    expect(deposit.result).toBeOk(Cl.bool(true));
    
    // Check total deposits
    const totalDeposits = simnet.callReadOnlyFn('token_clar', 'get-total-deposits', [], wallet1);
    expect(totalDeposits.result).toBeOk(Cl.uint(depositAmount));
    
    // Check user's deposit balance
    const balance = simnet.callReadOnlyFn('token_clar', 'get-balance-by-sender', [], wallet1);
    expect(balance.result).toBeOk(
      Cl.some(Cl.tuple({ amount: Cl.uint(depositAmount) }))
    );
  });

  it('cannot deposit zero STX', () => {
    // Try to deposit zero amount
    const deposit = simnet.callPublicFn(
      'token_clar', 
      'deposit', 
      [Cl.uint(0)], 
      wallet1
    );
    
    expect(deposit.result).toBeErr(Cl.uint(103)); // err-invalid-amount
  });

  it('can burn tokens', () => {
    const initialSupply = 1000000;
    const burnAmount = 100;
    
    // Initialize contract
    simnet.callPublicFn('token_clar', 'initialize', [Cl.uint(initialSupply)], deployer);
    
    // Burn tokens from deployer
    const burn = simnet.callPublicFn(
      'token_clar', 
      'burn', 
      [
        Cl.uint(burnAmount),
        Cl.principal(deployer)
      ], 
      deployer
    );
    
    expect(burn.result).toBeOk(Cl.bool(true));
    
    // Check total supply decreased
    const totalSupply = simnet.callReadOnlyFn('token_clar', 'get-total-supply', [], deployer);
    expect(totalSupply.result).toBeOk(Cl.uint(initialSupply - burnAmount));
    
    // Check deployer balance decreased
    const deployerBalance = simnet.callReadOnlyFn(
      'token_clar', 
      'get-balance', 
      [Cl.principal(deployer)], 
      deployer
    );
    expect(deployerBalance.result).toBeOk(Cl.uint(initialSupply - burnAmount));
  });

  it('cannot burn more tokens than balance', () => {
    const initialSupply = 1000000;
    const burnAmount = initialSupply + 1;
    
    // Initialize contract
    simnet.callPublicFn('token_clar', 'initialize', [Cl.uint(initialSupply)], deployer);
    
    // Try to burn more than balance
    const burn = simnet.callPublicFn(
      'token_clar', 
      'burn', 
      [
        Cl.uint(burnAmount),
        Cl.principal(deployer)
      ], 
      deployer
    );
    
    expect(burn.result).toBeErr(Cl.uint(102)); // err-insufficient-balance
  });
});