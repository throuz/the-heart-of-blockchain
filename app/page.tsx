"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { WalletContextProvider } from "./providers";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import Logo from "./components/Logo";
import DonationHistory from "./components/DonationHistory";
import DonationProgress from "./components/DonationProgress";
import FeaturedCauses from "./components/FeaturedCauses";

const RECIPIENT_ADDRESS = "YOUR_RECIPIENT_WALLET_ADDRESS"; // Replace with actual recipient address

export default function Home() {
  return (
    <WalletContextProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Logo />
              <div>
                <h1 className="text-4xl font-bold text-red-600">
                  The Heart of Blockchain
                </h1>
                <p className="text-gray-600">
                  Emergency Services Donation Platform
                </p>
              </div>
            </div>
            <WalletMultiButton />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <DonationProgress
              currentAmount={50}
              goalAmount={100}
              title="Current Campaign"
            />
            <DonationForm />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeaturedCauses />
            <DonationHistory />
          </div>
        </div>
      </div>
    </WalletContextProvider>
  );
}

function DonationForm() {
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleDonate = async () => {
    if (!publicKey || !amount) return;

    try {
      setStatus("Processing donation...");
      const connection = new Connection("https://api.devnet.solana.com");
      const recipient = new PublicKey(RECIPIENT_ADDRESS);
      const amountInLamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipient,
          lamports: amountInLamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      setStatus("Donation successful! Thank you for your support!");
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error processing donation. Please try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-red-600">
      <h2 className="text-2xl font-semibold mb-4 text-red-600">
        Make a Donation
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Amount (SOL)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 bg-white border-2 border-red-200 rounded text-gray-700 focus:border-red-600 focus:outline-none"
            placeholder="Enter amount"
            min="0.000000001"
            step="0.000000001"
          />
        </div>
        <button
          onClick={handleDonate}
          disabled={!publicKey || !amount}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors duration-200"
        >
          Donate Now
        </button>
        {status && (
          <p
            className={`text-center text-sm ${
              status.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
