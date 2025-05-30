
# 🔐 Simple Token Transfer Contract on Stacks Blockchain

This project showcases a **Clarity smart contract** that implements a simple token transfer system, built and deployed on the **Stacks blockchain Testnet**. It allows minting, transferring, and balance tracking for a custom token.

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
