"use client";
import React from "react";
import { Check } from "lucide-react";

export default function BillingPage() {
  const plans = [
    {
      name: "Free Plan",
      price: "₹0",
      oldPrice: "₹49",
      discount: "Free Forever",
      description: "For individuals exploring AI tools.",
      features: [
        "Access to basic AI tools",
        "Limited image generations",
        "Community support",
        "Email assistance",
      ],
      highlight: false,
    },
    {
      name: "Pro Plan",
      price: "₹199",
      oldPrice: "₹299",
      discount: "Save 33%",
      description: "For creators and professionals using AI daily.",
      features: [
        "Unlimited AI generations",
        "Access to all premium tools",
        "Faster response time",
        "Priority support",
        "Early feature access",
      ],
      highlight: true,
    },
    {
      name: "Enterprise Plan",
      price: "₹499",
      oldPrice: "₹799",
      discount: "Save 40%",
      description: "For teams and organizations scaling AI operations.",
      features: [
        "Team access (up to 10 users)",
        "Custom AI workflows",
        "Dedicated account manager",
        "Advanced analytics",
        "24/7 premium support",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fc] to-[#eef1f6] py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Pricing Plans</h1>
        <p className="text-gray-500 text-lg">
          Simple, transparent pricing for every AI creator.
        </p>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-2xl border shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl
              ${
                plan.highlight
                  ? "bg-white border-purple-500"
                  : "bg-white/70 border-gray-200 backdrop-blur-sm"
              }`}
          >
            {/* Discount Tag */}
            <span
              className={`absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full ${
                plan.highlight
                  ? "bg-purple-100 text-purple-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {plan.discount}
            </span>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {plan.name}
            </h2>
            <p className="text-gray-500 mb-6">{plan.description}</p>

            {/* Price */}
            <div className="flex items-baseline mb-6">
              <span className="text-gray-400 line-through mr-2">
                {plan.oldPrice}
              </span>
              <span className="text-4xl font-bold text-gray-900">
                {plan.price}
              </span>
              <span className="ml-2 text-gray-500 text-sm">/month</span>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start text-gray-700 text-sm">
                  <Check className="text-green-500 h-4 w-4 mt-1 mr-2" /> {feature}
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={`w-full py-2.5 rounded-lg font-medium text-sm transition ${
                plan.highlight
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              {plan.highlight ? "Upgrade Now" : "Select Plan"}
            </button>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-gray-400 text-sm mt-10">
        * All plans include access to upcoming QuickAI tools and improvements.
      </p>
    </div>
  );
}
