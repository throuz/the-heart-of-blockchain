interface Cause {
  id: number;
  title: string;
  description: string;
  image: string;
  currentAmount: number;
  goalAmount: number;
}

const featuredCauses: Cause[] = [
  {
    id: 1,
    title: "Emergency Medical Fund",
    description: "Support critical medical care for those in need",
    image: "🏥",
    currentAmount: 25,
    goalAmount: 100,
  },
  {
    id: 2,
    title: "Disaster Relief",
    description: "Help communities recover from natural disasters",
    image: "🌪️",
    currentAmount: 15,
    goalAmount: 50,
  },
  {
    id: 3,
    title: "Community Support",
    description: "Fund local emergency response initiatives",
    image: "🤝",
    currentAmount: 10,
    goalAmount: 30,
  },
];

export default function FeaturedCauses() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-red-600">
      <h3 className="text-xl font-semibold text-red-600 mb-4">
        Featured Causes
      </h3>
      <div className="space-y-4">
        {featuredCauses.map((cause) => (
          <div
            key={cause.id}
            className="border-b border-gray-200 pb-4 last:border-0"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{cause.image}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{cause.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {cause.description}
                </p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Raised: {cause.currentAmount} SOL</span>
                  <span>Goal: {cause.goalAmount} SOL</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-red-600 h-1.5 rounded-full"
                    style={{
                      width: `${
                        (cause.currentAmount / cause.goalAmount) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
