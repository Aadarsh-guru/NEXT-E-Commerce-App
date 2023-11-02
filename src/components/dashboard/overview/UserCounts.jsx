import React from 'react';

const UserCounts = ({ dailyUserCounts, weeklyUserCounts, monthlyUserCounts }) => {
    return (
        <div className="p-4 bg-white rounded-lg border-2 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">User Sign-up Counts</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Daily User Sign-up Counts */}
                <div className="border p-4 rounded shadow-md">
                    <h3 className="text-lg font-semibold mb-2 text-center">Daily User Sign-up</h3>
                    <div className="text-gray-600 text-center">
                        <div>{dailyUserCounts?.signUpCount}</div>
                    </div>
                </div>

                {/* Weekly User Sign-up Counts */}
                <div className="border p-4 rounded shadow-md">
                    <h3 className="text-lg font-semibold mb-2 text-center">Weekly User Sign-up</h3>
                    <div className="text-gray-600 text-center">
                        <div>{weeklyUserCounts?.signUpCount}</div>
                    </div>
                </div>

                {/* Monthly User Sign-up Counts */}
                <div className="border p-4 rounded shadow-md">
                    <h3 className="text-lg font-semibold mb-2 text-center">Monthly User Sign-up</h3>
                    <div className="text-gray-600 text-center">
                        <div>{monthlyUserCounts?.signUpCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCounts;
