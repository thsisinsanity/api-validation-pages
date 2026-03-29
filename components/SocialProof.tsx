export default function SocialProof() {
  const stats = [
    { value: "5", label: "States at launch, scaling to 50" },
    { value: "13+", label: "Data fields per response" },
    { value: "$0.25", label: "Per verification, pay-as-you-go" },
    { value: "25+", label: "License types supported" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 border-y border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
