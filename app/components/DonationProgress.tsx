interface DonationProgressProps {
  currentAmount: number;
  goalAmount: number;
  title: string;
}

export default function DonationProgress({
  currentAmount,
  goalAmount,
  title,
}: DonationProgressProps) {
  const progress = (currentAmount / goalAmount) * 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-red-600">
      <h3 className="text-xl font-semibold text-red-600 mb-4">{title}</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Raised: {currentAmount} SOL</span>
          <span>Goal: {goalAmount} SOL</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-red-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 text-right">
          {Math.round(progress)}% of goal reached
        </p>
      </div>
    </div>
  );
}
