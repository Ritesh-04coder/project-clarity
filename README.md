
# 🪙 Simple Token Transfer Contract

A Fungible Token Smart Contract on Stacks

---

## 📘 Project Description

Simple Token is a secure, feature-rich fungible token smart contract developed in Clarity for the Stacks blockchain. It enables users to mint, burn, transfer tokens, and deposit STX. Designed with strict access control and thoughtful error handling, the contract ensures only authorized interactions are permitted, while also maintaining flexibility for future enhancements. It follows the SIP-010 token standard for compatibility and ease of integration.

---

## 🎯 Project Vision

The goal of Simple Token is to provide a clean, minimalistic, yet powerful template for fungible token contracts on the Stacks blockchain. It aims to serve as a secure foundation for more complex decentralized finance (DeFi) applications or custom token utilities in future Web3 projects. By prioritizing clarity, modularity, and strong test coverage, this project aspires to set a high standard for Clarity-based token development.

---

## ✨ Key Features

* 🔐 **Owner-controlled initialization** of token supply  
* 🔄 **Token transfers** with support for optional memos  
* 🛠️ **Minting and burning functionality**, restricted to authorized users  
* 💰 **STX deposit tracking**, allowing users to deposit native tokens  
* 📊 **Read-only metadata access** for name, symbol, decimals, balances, and total supply  
* ⚠️ **Error handling** with clear error codes (`u100` to `u103`)  
* 🛡️ **Strict ownership enforcement** to protect sensitive actions  
* ✅ **SIP-010 compatible design** for seamless ecosystem integration  

---

## 🔮 Future Scope

* 🔁 Add automated token distribution mechanisms (e.g., airdrops or vesting)  
* 🧾 Enable withdrawal of deposited STX  
* 🔗 Integration with front-end dApps (React/Next.js UI)  
* 🧪 CI/CD pipeline for automated contract testing and deployment  
* 🔐 Role-based access control for multi-admin capabilities  
* 🏛️ Governance features for decentralized decision making  
* 🔄 Cross-chain bridge compatibility  
* 📈 Advanced DeFi integrations (staking, yield farming)  
* 🎯 NFT marketplace integration capabilities  
* 🔒 Multi-signature wallet support  

---

## 🌐 Live Frontend Demo

Access the front-end dApp here:  
👉 **[Simple Token Web App](https://tokedapp.vercel.app/)**

---

## 📜 Contract Details

### 🧾 Deployed Contract Address

```
ST8XXC6QZ6RJ390F7J7VZEX9S8Q3NF3E3K842BK3.token_clar
```

![Contract Deployment Screenshot](https://github.com/user-attachments/assets/06187d3b-b8bb-4237-8a93-ffd6611d9331)

---

### 📋 Contract Specifications

| Property         | Value                 |
|------------------|-----------------------|
| **Contract Name**| `token_clar`          |
| **Token Name**   | Simple Token          |
| **Decimals**     | 6                     |
| **Standard**     | SIP-010               |
| **Network**      | Stacks Blockchain     |
| **Language**     | Clarity               |

---

### 🔍 Contract Functions

#### Read-Only Functions
- `get-name` — Returns token name  
- `get-symbol` — Returns token symbol  
- `get-decimals` — Returns decimal places  
- `get-balance` — Returns user balance  
- `get-total-supply` — Returns total token supply  
- `get-stx-balance` — Returns STX deposit balance  

#### Public Functions
- `transfer` — Transfer tokens between addresses  
- `mint` — Mint new tokens (owner only)  
- `burn` — Burn existing tokens (owner only)  
- `deposit-stx` — Deposit STX to contract  

---

### 🔎 Block Explorer Links

- **Testnet**: [View on Testnet Explorer](https://explorer.stacks.co/?chain=testnet)

---

## 💻 Installation Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)  
- [Clarinet](https://github.com/hirosystems/clarinet)  
- [Git](https://git-scm.com/)  

---

### 🍎 macOS Installation
```bash
brew install clarinet
git clone https://github.com/Ritesh-04coder/project-clarity.git
cd simple-token
npm install
```

### 🪟 Windows Installation
```powershell
choco install clarinet
git clone https://github.com/Ritesh-04coder/project-clarity.git
cd simple-token
npm install
```

### 🐧 Linux Installation
```bash
curl -L https://github.com/hirosystems/clarinet/releases/latest/download/clarinet-linux-x64.tar.gz | tar xz
sudo mv clarinet /usr/local/bin/
git clone https://github.com/neutron420/project-clarity.git
cd simple-token
npm install
```

---

## 🚀 Deployment Guide

### 1. Local Deployment
```bash
clarinet console
::deploy_contract token_clar .contracts/token_clar.clar
```

### 2. Testnet Deployment
```bash
clarinet deploy --network=testnet
clarinet deployment show --network=testnet
```

### 3. Mainnet Deployment
```bash
clarinet deploy --network=mainnet
clarinet deployment show --network=mainnet
```

---

## 🧪 Testing

Run comprehensive tests:
```bash
clarinet test
clarinet test --coverage
```

### Test Coverage
- ✅ Token initialization and metadata  
- ✅ Transfer functionality with validations  
- ✅ Minting and burning restrictions  
- ✅ STX deposit tracking  
- ✅ Error handling and edge cases  
- ✅ Ownership and access control  

---

## 📁 Project Structure

```
simple-token/
├── contracts/
│   └── token_clar.clar          # Main token contract
├── tests/
│   └── token_clar_test.ts       # Test suite
├── settings/
│   └── Devnet.toml              # Network configuration
├── README.md                    # Project documentation
├── Clarinet.toml                # Clarinet configuration
└── package.json                 # Dependencies
```

---

## 🤝 Contributing

1. Fork the repository  
2. Create feature branch (`git checkout -b feature/AmazingFeature`)  
3. Commit changes (`git commit -m 'Add AmazingFeature'`)  
4. Push to branch (`git push origin feature/AmazingFeature`)  
5. Open Pull Request  

---

## 📄 License

This project is released under the MIT License. See [LICENSE](LICENSE) file for details.

---

## 🆘 Support

- 📧 **Email**: fnaticritesh2004@gmail.com
