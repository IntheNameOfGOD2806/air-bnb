'use client'
import { useState } from "react";
import { FaCheck, FaStar, FaUserAlt, FaHeadset, FaUsers, FaCogs, FaInfinity, FaTools } from "react-icons/fa";
import Navbar from "../NavBar/navbar";

const PricingSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const pricingData = [
    {
      id: 1,
      title: "Starter Plan",
      price: "$9.99",
      features: [
        { text: "Limited access", icon: <FaUserAlt /> },
        { text: "Basic support", icon: <FaHeadset /> },
        { text: "Single user", icon: <FaUsers /> }
      ],
      popular: false
    },
    {
      id: 2,
      title: "Pro Plan", 
      price: "$29.99",
      features: [
        { text: "Advanced access", icon: <FaTools /> },
        { text: "Priority support", icon: <FaHeadset /> },
        { text: "Multiple users", icon: <FaUsers /> }
      ],
      popular: true
    },
    {
      id: 3,
      title: "Enterprise Plan",
      price: "$49.99", 
      features: [
        { text: "Full access", icon: <FaCogs /> },
        { text: "24/7 support", icon: <FaHeadset /> },
        { text: "Unlimited users", icon: <FaInfinity /> }
      ],
      popular: false
    },
    {
      id: 4,
      title: "Ultimate Plan",
      price: "$99.99",
      features: [
        { text: "Comprehensive access", icon: <FaCogs /> },
        { text: "Dedicated support", icon: <FaHeadset /> },
        { text: "Custom integrations", icon: <FaTools /> }
      ],
      popular: false
    }
  ];

  return (
    <>
     <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
            Choose Your Perfect Plan
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Select the plan that best suits your needs
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pricingData.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl shadow-lg transition-all duration-300 
                ${hoveredCard === plan.id ? "transform -translate-y-2 shadow-xl bg-orange-50/30" : ""} 
                ${plan.popular ? "border-2 border-green-500" : "border border-gray-200"}
                hover:bg-orange-50/30`}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <span className="inline-flex items-center px-6 py-2 rounded-full text-sm font-semibold bg-green-500 text-white shadow-lg">
                    <FaStar className="mr-2" /> Popular Choice
                  </span>
                </div>
              )}

              <div className="p-8 bg-white rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                <p className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="ml-2 text-base font-medium text-gray-500">/month</span>
                </p>

                <ul className="mt-8 space-y-5">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="flex-shrink-0 h-6 w-6 text-green-500">
                        {feature.icon}
                      </span>
                      <span className="ml-4 text-base text-gray-700">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <button
                    className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 
                      ${hoveredCard === plan.id ? "bg-green-600 transform scale-105" : "bg-green-500"} 
                      hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
   
  );
};

export default PricingSection;