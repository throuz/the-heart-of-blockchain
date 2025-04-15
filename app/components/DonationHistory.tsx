import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";

interface Transaction {
  signature: string;
  amount: number;
  timestamp: Date;
}

export default function DonationHistory() {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      if (!publicKey) return;

      try {
        const connection = new Connection("https://api.devnet.solana.com");
        const signatures = await connection.getSignaturesForAddress(publicKey);

        const recentTransactions = signatures.slice(0, 5).map((sig) => ({
          signature: sig.signature,
          amount: 0, // In a real app, you'd parse the transaction to get the amount
          timestamp: new Date(sig.blockTime! * 1000),
        }));

        setTransactions(recentTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [publicKey]);

  if (!publicKey) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-red-600">
      <h3 className="text-xl font-semibold text-red-600 mb-4">
        Recent Donations
      </h3>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-600">No donations yet</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <div>
                <p className="text-sm text-gray-600">
                  {tx.timestamp.toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500 truncate w-32">
                  {tx.signature}
                </p>
              </div>
              <span className="text-red-600 font-medium">{tx.amount} SOL</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
