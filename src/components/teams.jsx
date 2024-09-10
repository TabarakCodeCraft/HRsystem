import React from 'react';
import { useLocation } from 'react-router-dom';

const Teams = () => {
    const location = useLocation();
    const { subEmployees } = location.state || { subEmployees: [] }; // Use an empty array if no state is passed

    return (
        <div>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-bold text-gray-700 mb-4">الموظفون تحت إشرافي</h3>
                <div className="space-y-3">
                    {subEmployees.map((sub) => (
                        <div key={sub.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300">
                            <div>
                                <p className="text-lg font-medium text-gray-600">{sub.name}</p>
                                <p className="text-gray-500">{sub.job_title}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-green-500">إجازات: {sub.jt_leavedays} يوم</p>
                                <p className="text-blue-500">وقت مستقطع: {sub.jt_timeoff} ساعة</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Teams;
