# CryptoVault - Enterprise-Grade Encryption Suite

CryptoVault is a modern, client-side web application that provides a suite of tools for encrypting, decrypting, and hashing text. It leverages powerful, industry-standard cryptographic libraries to perform all operations directly in your browser, ensuring that your data remains private and never leaves your machine.

## ✨ Features

- **Multiple Algorithms:** Supports a wide range of cryptographic algorithms to suit various security needs.
  - **Symmetric:** AES-256, ChaCha20
  - **Asymmetric:** RSA-2048
  - **Hashing:** SHA-256
  - **Classical:** Caesar Cipher, Atbash Cipher
- **Client-Side Security:** All cryptographic operations are performed locally in the user's browser. No data is ever sent to a server.
- **Interactive UI:** A sleek, modern interface built with React and Tailwind CSS allows for easy switching between encryption and decryption modes.
- **Key Management:**
  - Securely input your secret key for symmetric ciphers.
  - Generate, view, and use RSA-2048 public/private key pairs for asymmetric encryption.
- **Ease of Use:**
  - One-click copy for ciphertext or decrypted messages.
  - Clear inputs and reset the state with a single button.
  - Responsive design that works on various screen sizes.

## 🛠️ Technologies Used

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Cryptography:**
  - [crypto-js](https.github.com/brix/crypto-js): For AES and ChaCha20 implementations.
  - [node-forge](https://github.com/digitalbazaar/forge): For RSA key generation and encryption/decryption.
  - [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API): For robust SHA-256 hashing.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pinakdhabu/pinakdhabu.github.io.git
   cd pinakdhabu.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or the next available port).

2. **Build for production:**
   ```bash
   npm run build
   ```
   This command generates a `dist` directory with the optimized, static assets for deployment.

3. **Lint the codebase:**
   ```bash
   npm run lint
   ```
   This command runs ESLint to check for code quality and style issues.

## 🔐 How It Works

The application is structured into two main parts:

1.  **`App.tsx`**: The main React component that handles the user interface, state management (input text, output text, selected algorithm, keys), and user interactions.
2.  **`crypto.ts`**: A dedicated module that encapsulates all cryptographic logic. It exports functions for each supported algorithm, making the main component cleaner and more focused on the UI. This modular approach allows for easier maintenance and testing of the core crypto functions.

All processing is triggered by user actions in the UI and executed securely within the browser's JavaScript environment.

---

© 2024 CryptoVault - Enterprise Encryption Platform
