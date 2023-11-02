import React from 'react';

const RevenueCounts = ({ dailyRevenue, weeklyRevenue, monthlyRevenue }) => {
    return (
        <div className="p-4 bg-white rounded-lg border-2 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Revenue Counts</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Daily Revenue */}
                <div className="border p-4 rounded shadow-md">
                    <h3 className="text-lg font-semibold mb-2 text-center">Daily Revenue</h3>
                    <div className="text-gray-600 text-center">
                        <div>Revenue: ₹ {dailyRevenue?.revenue.toFixed(2)}</div>
                    </div>
                </div>

                {/* Weekly Revenue */}
                <div className="border p-4 rounded shadow-md">
                    <h3 className="text-lg font-semibold mb-2 text-center">Weekly Revenue</h3>
                    <div className="text-gray-600 text-center">
                        <div>Revenue: ₹ {weeklyRevenue?.revenue.toFixed(2)}</div>
                    </div>
                </div>

                {/* Monthly Revenue */}
                <div className="border p-4 rounded shadow-md">
                    <h3 className="text-lg font-semibold mb-2 text-center">Monthly Revenue</h3>
                    <div className="text-gray-600 text-center">
                        <div>Revenue: ₹ {monthlyRevenue?.revenue.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueCounts;
