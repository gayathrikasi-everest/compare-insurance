
import React from 'react';

interface ExpandedPlanDetailsProps {
  planId: string | null;
  plans: Array<{
    id: string;
    name: string;
    description: string;
    features: string[];
  }>;
}

const ExpandedPlanDetails: React.FC<ExpandedPlanDetailsProps> = ({ planId, plans }) => {
  if (!planId) return null;
  
  const plan = plans.find(p => p.id === planId);
  if (!plan) return null;
  
  return (
    <div className="glass-card backdrop-blur-md bg-white/70 border border-white/20 shadow-xl p-6 mt-4 animate-fade-in">
      <h3 className="text-xl font-bold text-cc-blue mb-2">{plan.name}</h3>
      <p className="text-gray-600 mb-4">{plan.description}</p>
      <h4 className="font-semibold text-cc-blue mt-4 mb-2">Key Features:</h4>
      <ul className="list-disc pl-5 space-y-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="text-gray-700">{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpandedPlanDetails;
