import React from 'react';

const OrderCounts = ({ dailyCounts, weeklyCounts, monthlyCounts }) => {
  return (
    <div className="p-4 bg-white border-2 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">Orders Status</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Counts */}
        <div className="border p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-center">Daily Counts</h2>
          <div className="text-gray-600">
            <div className="mb-2">Placed: {dailyCounts?.placed}</div>
            <div className="mb-2">Canceled: {dailyCounts?.canceled}</div>
            <div className="mb-2">Shipped: {dailyCounts?.shipped}</div>
            <div>Delivered: {dailyCounts?.delivered}</div>
          </div>
        </div>

        {/* Weekly Counts */}
        <div className="border p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-center">Weekly Counts</h2>
          <div className="text-gray-600">
            <div className="mb-2">Placed: {weeklyCounts?.placed}</div>
            <div className="mb-2">Canceled: {weeklyCounts?.canceled}</div>
            <div className="mb-2">Shipped: {weeklyCounts?.shipped}</div>
            <div>Delivered: {weeklyCounts?.delivered}</div>
          </div>
        </div>

        {/* Monthly Counts */}
        <div className="border p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-center">Monthly Counts</h2>
          <div className="text-gray-600">
            <div className="mb-2">Placed: {monthlyCounts?.placed}</div>
            <div className="mb-2">Canceled: {monthlyCounts?.canceled}</div>
            <div className="mb-2">Shipped: {monthlyCounts?.shipped}</div>
            <div>Delivered: {monthlyCounts?.delivered}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCounts;
