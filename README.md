
# 🔐 Simple Token Transfer Contract on Stacks Blockchain
📄 Project Overview
This project introduces a carefully designed fungible token contract named Simple Token (SIMPLE), implemented using the Clarity smart contract language on the Stacks blockchain. The contract complies with the SIP-010 token standard and supports a wide range of core token operations. These include initializing the token with an initial supply (restricted to the contract owner), transferring tokens with optional memos for added context, minting new tokens (owner-only), and burning tokens by their holders. In addition to fungible token functionality, the contract allows users to deposit STX and tracks deposit balances.

To maintain transparency and control, it exposes various read-only functions such as get-name, get-symbol, get-decimals, get-total-supply, and get-balance. Security and correctness are enforced through strict permission checks, with custom error codes like u100 (owner-only), u101 (not-token-owner), and u103 (invalid-amount) to prevent unauthorized or invalid actions. This ensures that the deployer maintains control over sensitive operations while still enabling a flexible and decentralized token experience.

🧪 Testing and Simulations
To ensure reliability and correctness, this project includes a comprehensive test suite written in JavaScript using the vitest testing framework, integrated with Clarinet’s Simnet local blockchain environment. These tests thoroughly simulate all possible interactions with the smart contract, covering everything from initialization and token transfers to minting, burning, and STX deposits.

The test suite rigorously verifies expected behaviors and edge cases, including invalid token transfers (e.g., insufficient balance), unauthorized minting attempts, and zero-amount operations. Each function is tested against its access restrictions and logic correctness, ensuring that the contract responds with proper Clarity ok or err results in all cases.

This robust test-driven approach not only validates that the contract behaves as intended but also ensures that it remains secure, predictable, and maintainable in production deployments. By providing strong guarantees through unit testing, this project aims to uphold the highest standards of smart contract engineering on the Stacks blockchain.

This repository is intended for educational purposes and contributions. Whether you're learning Clarity, exploring the Stacks ecosystem, or contributing to open-source Web3 projects — you're welcome here!

> ✅ **Status**: Deployed on **Stacks Testnet**  
> 🧠 Learn Clarity · 🔗 Explore Smart Contracts · 🧪 Write Tests · 🌍 Build Web3

---

## 📌 Key Features

- 🔐 **Minting Control**: Only contract owner can mint new tokens
- 💸 **Secure Transfers**: Transfers between addresses with balance checks
- 📊 **Track Balances**: Read-only method to check token balances
- 🧪 **Unit Tested**: Uses Vitest with integration-ready setup
- 🔗 **Deployed on Stacks Testnet**
- 🌐 **Open to Contributions** — frontend integration, tests, docs welcome!

---

## 🧠 What You'll Learn

- 📘 Basic Clarity syntax and smart contract structure
- 📍 How to use maps to store token balances
- 🧾 Logic for minting and transferring tokens securely
- 📡 Reading/writing blockchain state data
- 🧪 Testing and simulating smart contracts with Clarinet

---

## 🧱 Smart Contract – Clarity

```
(define-map balances (principal) (uint))

(define-constant token-name "MyToken")
(define-constant token-decimals u6)
(define-constant initial-supply u1000000)

(define-public (mint (recipient principal) (amount uint))
  (begin
    (asserts! (is-eq tx-sender 'ST1234567890ABCDEFGHJKLMNPQRSTUV) (err u100)) ; only owner can mint
    (let ((current-balance (default-to u0 (map-get? balances recipient))))
      (map-set balances recipient (+ current-balance amount))
      (ok true)
    )
  )
)

(define-public (transfer (recipient principal) (amount uint))
  (let (
        (sender-balance (default-to u0 (map-get? balances tx-sender)))
        (recipient-balance (default-to u0 (map-get? balances recipient)))
      )
    (begin
      (asserts! (>= sender-balance amount) (err u101))
      (map-set balances tx-sender (- sender-balance amount))
      (map-set balances recipient (+ recipient-balance amount))
      (ok true)
    )
  )
)

(define-read-only (get-balance (user principal))
  (default-to u0 (map-get? balances user))
)
```

---

## 🔗 Deployment Info

- 🌐 **Network**: Stacks Blockchain Testnet
- 🧑‍💼 **Owner Address**: `'ST8XXC6QZ6RJ390F7J7VZEX9S8Q3NF3E3K842BK3`
- 🔍 **Explorer**: [Stacks Testnet Explorer](https://explorer.stacks.co/?chain=testnet)
- 👛 **Wallet Used**: [Leather Wallet](https://leather.io)
- [Stacks Testnet Deployment](![Screenshot 2025-05-29 181828](https://github.com/user-attachments/assets/b4c9e709-3a12-465d-ac5a-12410c4d83da)

---

## 🧪 Contract Interactions

### ➕ Mint Tokens (Owner Only)
```
(contract-call? .your-contract mint 'ST...recipient u1000)
```

### 🔁 Transfer Tokens
```
(contract-call? .your-contract transfer 'ST...recipient u100)
```

### 📊 Check Balance
```
(contract-call? .your-contract get-balance 'ST...user)
```

---

## ❗ Error Codes

| Code       | Description                         |
|------------|-------------------------------------|
| `(err u100)` | Unauthorized minting attempt        |
| `(err u101)` | Insufficient balance for transfer   |

---

## 🧰 Tech Stack

| Tool            | Purpose                                       |
|------------------|-----------------------------------------------|
| **Clarity**      | Smart contract language for Stacks            |
| **Clarinet**     | Dev tool for building/testing Stacks contracts |
| **Stacks**       | Blockchain for smart contracts and Bitcoin layers |
| **Leather Wallet** | Web3 wallet to interact with contracts       |
| **Vitest**       | Unit testing framework                         |
| *(Frontend coming soon)* | You’re welcome to contribute!      |

---

## 💻 Local Setup & Testing

### ⚙️ Prerequisites

- [Node.js](https://nodejs.org/)
- [Clarinet](https://docs.hiro.so/clarinet/installation)
- [Rust](https://www.rust-lang.org/)
- [Leather Wallet](https://leather.io)

### 🔧 Setup

```
git clone https://github.com/Ritesh-04coder/simple-token-transfer-contract.git
cd simple-token-transfer-contract
npm install
```

### 🧪 Run Tests

```
npm test
```

---

## ✨ Frontend Integration

A frontend interface is planned and contributions are encouraged! You could use:

- [Stacks.js](https://github.com/hirosystems/stacks.js)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- Leather Wallet SDK for login & transactions

---

## 🙌 Contributing

Pull requests, suggestions, and improvements are very welcome.

---

## 📚 References

- 📘 [Clarity Docs](https://docs.stacks.co/docs/write-smart-contracts/clarity-language/)
- 📘 [Clarinet Guide](https://docs.hiro.so/clarinet/introduction)
- 🔐 [Stacks.js](https://github.com/hirosystems/stacks.js)
- 🌐 [Stacks Explorer (Testnet)](https://explorer.stacks.co/?chain=testnet)
- 💼 [Leather Wallet](https://leather.io)

---

## 📄 License

This project is licensed under the **MIT License**.
