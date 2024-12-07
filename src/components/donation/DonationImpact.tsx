import { Card } from "@/components/ui/card";

export const DonationImpact = () => {
  return (
    <Card className="p-6 bg-gray-900 border-gray-700">
      <h2 className="font-semibold mb-4 text-white">Your Impact</h2>
      <div className="space-y-4">
        {[
          { label: "Help provide Scout uniforms", icon: "👕" },
          { label: "Support merit badge activities", icon: "🏅" },
          { label: "Contribute to camping equipment", icon: "⛺" },
        ].map((impact, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-300">
            <span className="text-xl">{impact.icon}</span>
            <span className="text-sm">{impact.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};