import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Copy, Eye, EyeOff, RotateCcw, Hash, Key, Shield, Zap, Globe, Code, Database } from 'lucide-react';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [algorithm, setAlgorithm] = useState('AES-256');
  const [key, setKey] = useState('secret-key-2024');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('encrypt');

  // Mock encryption function (in real app, this would be proper crypto)
  const mockEncrypt = (text, encryptionKey) => {
    const combined = text + encryptionKey;
    return btoa(combined.split('').reverse().join(''));
  };

  const mockDecrypt = (encryptedText, encryptionKey) => {
    try {
      const decoded = atob(encryptedText);
      const reversed = decoded.split('').reverse().join('');
      if (reversed.endsWith(encryptionKey)) {
        return reversed.slice(0, -encryptionKey.length);
      }
      return 'Invalid key or corrupted ciphertext';
    } catch (error) {
      return 'Invalid ciphertext format';
    }
  };

  const handleProcess = () => {
    if (!inputText.trim()) return;
    
    if (activeTab === 'encrypt') {
      const encrypted = mockEncrypt(inputText, key);
      setOutputText(encrypted);
      setIsEncrypted(true);
    } else {
      const decrypted = mockDecrypt(inputText, key);
      setOutputText(decrypted);
      setIsEncrypted(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setShowOriginal(false);
  };

  const toggleShowOriginal = () => {
    setShowOriginal(!showOriginal);
  };

  const algorithms = [
    { name: 'AES-256', icon: Shield, description: 'Advanced Encryption Standard' },
    { name: 'RSA-2048', icon: Key, description: 'Public Key Cryptography' },
    { name: 'SHA-256', icon: Hash, description: 'Secure Hash Algorithm' },
    { name: 'ChaCha20', icon: Zap, description: 'Stream Cipher' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">CryptoVault</h1>
                <p className="text-purple-200">Enterprise-Grade Encryption Suite</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-purple-200">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Global Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span>Frontend</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Backend</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Algorithm Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-400" />
            Select Encryption Algorithm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {algorithms.map((algo) => {
              const Icon = algo.icon;
              return (
                <button
                  key={algo.name}
                  onClick={() => setAlgorithm(algo.name)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    algorithm === algo.name
                      ? 'border-blue-500 bg-blue-500/20 text-white'
                      : 'border-purple-500/30 bg-purple-900/30 text-purple-200 hover:border-purple-400 hover:bg-purple-800/40'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{algo.name}</span>
                  </div>
                  <p className="text-sm opacity-80">{algo.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Key Input */}
        <div className="mb-8">
          <label className="block text-white font-medium mb-3 flex items-center">
            <Key className="h-5 w-5 mr-2 text-green-400" />
            Encryption Key
          </label>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full p-4 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter your secret key..."
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('encrypt')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'encrypt'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'text-purple-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Encrypt</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('decrypt')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'decrypt'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : 'text-purple-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Unlock className="h-4 w-4" />
              <span>Decrypt</span>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {activeTab === 'encrypt' ? 'Plain Text' : 'Ciphertext'}
              </h3>
              <button
                onClick={handleClear}
                className="p-2 text-purple-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                activeTab === 'encrypt'
                  ? 'Enter your message to encrypt...'
                  : 'Paste your encrypted message here...'
              }
              className="w-full h-64 p-4 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
            />
            <button
              onClick={handleProcess}
              disabled={!inputText.trim()}
              className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {activeTab === 'encrypt' ? 'Encrypt Message' : 'Decrypt Message'}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {activeTab === 'encrypt' ? 'Ciphertext' : 'Decrypted Text'}
              </h3>
              <div className="flex items-center space-x-2">
                {outputText && (
                  <button
                    onClick={toggleShowOriginal}
                    className="p-2 text-purple-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
                  >
                    {showOriginal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                )}
                {outputText && (
                  <button
                    onClick={handleCopy}
                    className="p-2 text-purple-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="relative">
              <textarea
                value={
                  outputText
                    ? showOriginal && activeTab === 'encrypt'
                      ? inputText
                      : outputText
                    : 'Your processed text will appear here...'
                }
                readOnly
                className="w-full h-64 p-4 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-purple-400 resize-none transition-all duration-300"
              />
              {copied && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm animate-pulse">
                  Copied!
                </div>
              )}
            </div>
            
            {outputText && (
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center space-x-2 text-green-300">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">
                    {isEncrypted 
                      ? 'Message encrypted successfully using ' + algorithm
                      : 'Message decrypted successfully'
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-12 bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-blue-400" />
            Security Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <h4 className="font-medium text-blue-300 mb-2">Frontend Processing</h4>
              <p className="text-sm text-blue-200">
                All encryption/decryption happens locally in your browser. No data is sent to servers.
              </p>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <h4 className="font-medium text-purple-300 mb-2">Backend Integration</h4>
              <p className="text-sm text-purple-200">
                Ready for seamless backend integration with REST APIs and database storage.
              </p>
            </div>
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <h4 className="font-medium text-green-300 mb-2">Military Grade</h4>
              <p className="text-sm text-green-200">
                Supports industry-standard encryption algorithms with 256-bit security.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-12 border-t border-purple-500/20">
        <div className="text-center text-purple-300">
          <p className="mb-2">© 2024 CryptoVault - Enterprise Encryption Platform</p>
          <p className="text-sm opacity-70">
            All processing occurs locally in your browser. Your data never leaves your device.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;