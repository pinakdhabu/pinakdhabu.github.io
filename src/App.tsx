import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Copy, Eye, EyeOff, RotateCcw, Hash, Key, Shield, Zap, Globe, Code, Database, BrainCircuit, RefreshCw } from 'lucide-react';
import * as crypto from './crypto';

const App: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isEncrypted, setIsEncrypted] = useState(false);
    const [showOriginal, setShowOriginal] = useState(false);
    const [algorithm, setAlgorithm] = useState('AES-256');
    const [symmetricKey, setSymmetricKey] = useState('secret-key-2024');
    const [rsaPublicKey, setRsaPublicKey] = useState('');
    const [rsaPrivateKey, setRsaPrivateKey] = useState('');
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');

    // Generate RSA key pair on component mount
    useEffect(() => {
        handleGenerateRsaKeys();
    }, []);

    // Reset output and adjust UI when algorithm changes
    useEffect(() => {
        setOutputText('');
        if (algorithm === 'SHA-256') {
            setActiveTab('encrypt');
        }
    }, [algorithm]);

    const handleGenerateRsaKeys = () => {
        const { publicKey, privateKey } = crypto.generateRsaKeyPair();
        setRsaPublicKey(publicKey);
        setRsaPrivateKey(privateKey);
    };

    const handleProcess = async () => {
        if (!inputText.trim()) return;

        let result = '';
        const isEncrypting = activeTab === 'encrypt';

        switch (algorithm) {
            case 'AES-256':
                result = isEncrypting ? crypto.aesEncrypt(inputText, symmetricKey) : crypto.aesDecrypt(inputText, symmetricKey);
                break;
            case 'ChaCha20':
                result = isEncrypting ? crypto.chacha20Encrypt(inputText, symmetricKey) : crypto.chacha20Decrypt(inputText, symmetricKey);
                break;
            case 'RSA-2048':
                result = isEncrypting ? crypto.rsaEncrypt(inputText, rsaPublicKey) : crypto.rsaDecrypt(inputText, rsaPrivateKey);
                break;
            case 'SHA-256':
                if(isEncrypting) {
                    result = await crypto.sha256Hash(inputText);
                } else {
                    result = "SHA-256 is a one-way hash and cannot be decrypted.";
                }
                break;
            case 'Caesar':
                // Using a fixed shift of 3 for simplicity
                result = crypto.caesarCipher(inputText, 3, isEncrypting);
                break;
            case 'Atbash':
                 // Atbash is its own inverse
                result = crypto.atbashCipher(inputText);
                break;
            default:
                result = "Algorithm not implemented.";
        }

        setOutputText(result);
        setIsEncrypted(isEncrypting);
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
        { name: 'ChaCha20', icon: Zap, description: 'Stream Cipher' },
        { name: 'RSA-2048', icon: Key, description: 'Public Key Cryptography' },
        { name: 'SHA-256', icon: Hash, description: 'Secure Hash Algorithm' },
        { name: 'Caesar', icon: BrainCircuit, description: 'Classical Shift Cipher' },
        { name: 'Atbash', icon: BrainCircuit, description: 'Classical Substitution Cipher' }
    ];

    const needsSymmetricKey = ['AES-256', 'ChaCha20'].includes(algorithm);
    const isRsa = algorithm === 'RSA-2048';
    const isHash = algorithm === 'SHA-256';

    const renderKeyManagement = () => {
        if (needsSymmetricKey) {
            return (
                <div className="mb-8">
                    <label className="block text-white font-medium mb-3 flex items-center">
                        <Key className="h-5 w-5 mr-2 text-green-400" />
                        Secret Key
                    </label>
                    <input
                        type="password"
                        value={symmetricKey}
                        onChange={(e) => setSymmetricKey(e.target.value)}
                        className="w-full p-4 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your secret key..."
                    />
                </div>
            );
        }

        if (isRsa) {
            return (
                <div className="mb-8 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white flex items-center">
                            <Key className="h-5 w-5 mr-2 text-green-400" />
                            RSA Key Pair
                        </h3>
                        <button onClick={handleGenerateRsaKeys} className="p-2 text-purple-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                            <RefreshCw className="h-4 w-4" />
                            <span>Generate New Keys</span>
                        </button>
                    </div>
                    <div>
                        <label className="block text-purple-300 font-medium mb-2">Public Key (for encryption)</label>
                        <textarea
                            value={rsaPublicKey}
                            onChange={(e) => setRsaPublicKey(e.target.value)}
                            className="w-full h-24 p-4 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
                            placeholder="RSA Public Key..."
                        />
                    </div>
                    <div>
                        <label className="block text-purple-300 font-medium mb-2">Private Key (for decryption)</label>
                        <textarea
                            value={rsaPrivateKey}
                            onChange={(e) => setRsaPrivateKey(e.target.value)}
                            className="w-full h-24 p-4 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
                            placeholder="RSA Private Key..."
                        />
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            <header className="relative overflow-hidden border-b border-purple-500/20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm"></div>
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
                            <div className="flex items-center space-x-2"><Globe className="h-5 w-5" /><span>Global Security</span></div>
                            <div className="flex items-center space-x-2"><Code className="h-5 w-5" /><span>Frontend</span></div>
                            <div className="flex items-center space-x-2"><Database className="h-5 w-5" /><span>Backend</span></div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center"><Shield className="h-5 w-5 mr-2 text-blue-400" />Select Encryption Algorithm</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {algorithms.map((algo) => {
                            const Icon = algo.icon;
                            return (
                                <button key={algo.name} onClick={() => setAlgorithm(algo.name)} className={`p-4 rounded-xl border-2 transition-all duration-300 ${algorithm === algo.name ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-purple-500/30 bg-purple-900/30 text-purple-200 hover:border-purple-400 hover:bg-purple-800/40'}`}>
                                    <div className="flex items-center space-x-3 mb-2"><Icon className="h-5 w-5" /><span className="font-medium">{algo.name}</span></div>
                                    <p className="text-sm opacity-80">{algo.description}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {renderKeyManagement()}

                <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-xl">
                    <button onClick={() => setActiveTab('encrypt')} className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${activeTab === 'encrypt' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'text-purple-300 hover:text-white hover:bg-slate-700/50'}`}>
                        <div className="flex items-center justify-center space-x-2"><Lock className="h-4 w-4" /><span>Encrypt</span></div>
                    </button>
                    <button onClick={() => setActiveTab('decrypt')} disabled={isHash} className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${activeTab === 'decrypt' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' : 'text-purple-300 hover:text-white hover:bg-slate-700/50'} disabled:opacity-50 disabled:cursor-not-allowed`}>
                        <div className="flex items-center justify-center space-x-2"><Unlock className="h-4 w-4" /><span>Decrypt</span></div>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-800/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">{activeTab === 'encrypt' ? 'Plain Text' : 'Ciphertext'}</h3>
                            <button onClick={handleClear} className="p-2 text-purple-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"><RotateCcw className="h-4 w-4" /></button>
                        </div>
                        <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder={activeTab === 'encrypt' ? 'Enter your message to encrypt...' : 'Paste your encrypted message here...'} className="w-full h-64 p-4 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300" />
                        <button onClick={handleProcess} disabled={!inputText.trim()} className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl">{activeTab === 'encrypt' ? 'Encrypt Message' : 'Decrypt Message'}</button>
                    </div>

                    <div className="bg-slate-800/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">{activeTab === 'encrypt' ? 'Ciphertext' : 'Decrypted Text'}</h3>
                            <div className="flex items-center space-x-2">
                                {outputText && (<button onClick={toggleShowOriginal} className="p-2 text-purple-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200">{showOriginal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>)}
                                {outputText && (<button onClick={handleCopy} className="p-2 text-purple-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"><Copy className="h-4 w-4" /></button>)}
                            </div>
                        </div>
                        <div className="relative">
                            <textarea value={outputText ? showOriginal && activeTab === 'encrypt' ? inputText : outputText : 'Your processed text will appear here...'} readOnly className="w-full h-64 p-4 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-purple-400 resize-none transition-all duration-300" />
                            {copied && (<div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm animate-pulse">Copied!</div>)}
                        </div>
                        {outputText && (<div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg"><div className="flex items-center space-x-2 text-green-300"><Shield className="h-4 w-4" /><span className="text-sm">{isEncrypted ? 'Message encrypted successfully using ' + algorithm : 'Message decrypted successfully'}</span></div></div>)}
                    </div>
                </div>

                <div className="mt-12 bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center"><Shield className="h-6 w-6 mr-2 text-blue-400" />Security Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20"><h4 className="font-medium text-blue-300 mb-2">Frontend Processing</h4><p className="text-sm text-blue-200">All encryption/decryption happens locally in your browser. No data is sent to servers.</p></div>
                        <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20"><h4 className="font-medium text-purple-300 mb-2">Backend Integration</h4><p className="text-sm text-purple-200">Ready for seamless backend integration with REST APIs and database storage.</p></div>
                        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20"><h4 className="font-medium text-green-300 mb-2">Military Grade</h4><p className="text-sm text-green-200">Supports industry-standard encryption algorithms with 256-bit security.</p></div>
                    </div>
                </div>
            </main>

            <footer className="container mx-auto px-6 py-8 mt-12 border-t border-purple-500/20">
                <div className="text-center text-purple-300">
                    <p className="mb-2">© 2024 CryptoVault - Enterprise Encryption Platform</p>
                    <p className="text-sm opacity-70">All processing occurs locally in your browser. Your data never leaves your device.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;