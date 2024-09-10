import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidbar';

// Sample data to simulate API response
const sampleData = [
    {
        id: 193,
        parent_id: [2, "Mr.Krabs"],
        employee_id: [3, "Spongebob"],
        name: "",
        days_requested: 0.0,
        hours_requested: 0.0,
        request_type: "over_time",
        manager_approved: "approved",
        hr_approved: "pending",
        datetime_from: "2024-09-04 14:19:00",
        datetime_to: "2024-09-04 14:19:00",
        date_from: false,
        date_to: false,
        create_date: "2024-09-04 11:24:09"
    },
    {
        id: 194,
        parent_id: [2, "Mr.Krabs"],
        employee_id: [4, "Patrick"],
        name: "",
        days_requested: 1.0,
        hours_requested: 8.0,
        request_type: "sick_leave",
        manager_approved: "pending",
        hr_approved: "pending",
        datetime_from: "2024-09-05 09:00:00",
        datetime_to: "2024-09-05 17:00:00",
        date_from: false,
        date_to: false,
        create_date: "2024-09-05 08:00:00"
    },
    {
        id: 195,
        parent_id: [2, "Mr.Krabs"],
        employee_id: [5, "Squidward"],
        name: "",
        days_requested: 0.5,
        hours_requested: 4.0,
        request_type: "vacation",
        manager_approved: "pending",
        hr_approved: "approved",
        datetime_from: "2024-09-06 12:00:00",
        datetime_to: "2024-09-06 16:00:00",
        date_from: false,
        date_to: false,
        create_date: "2024-09-06 11:00:00"
    }
];

const Requests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Simulate fetching data from API
        // Replace this with actual API call
        setRequests(sampleData);
    }, []);

    const handleConfirm = (id) => {
        // Implement confirmation logic here (e.g., send a PUT request to update the request status)
        console.log(`Request ${id} confirmed`);

        setRequests(prevRequests => prevRequests.map(request =>
            request.id === id ? { ...request, hr_approved: "confirmed" } : request
        ));
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 pt-16 ml-40 bg-gray-100">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-5 border-b border-gray-200">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Requests</h1>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="w-full bg-gray-200 border-b">
                                    <th className="py-3 px-4 text-left text-gray-600">ID</th>
                                    <th className="py-3 px-4 text-left text-gray-600">Parent</th>
                                    <th className="py-3 px-4 text-left text-gray-600">Employee</th>
                                    <th className="py-3 px-4 text-left text-gray-600">Type</th>
                                    <th className="py-3 px-4 text-left text-gray-600">Manager</th>
                                    <th className="py-3 px-4 text-left text-gray-600">HRApproved</th>
                                    <th className="py-3 px-4 text-left text-gray-600">From Date</th>
                                    <th className="py-3 px-4 text-left text-gray-600">To Date</th>
                                    <th className="py-3 px-4 text-left text-gray-600">Created</th>
                                    <th className="py-3 px-4 text-left text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(request => (
                                    <tr key={request.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-3">{request.id}</td>
                                        <td className="py-3 px-3">{request.parent_id[1]}</td>
                                        <td className="py-3 px-3">{request.employee_id[1]}</td>
                                        <td className="py-3 px-3 capitalize">{request.request_type.replace('_', ' ')}</td>
                                        <td className="py-3 px-3">{request.manager_approved}</td>
                                        <td className="py-3 px-3">{request.hr_approved}</td>
                                        <td className="py-3 px-3">{request.datetime_from}</td>
                                        <td className="py-3 px-3">{request.datetime_to}</td>
                                        <td className="py-3 px-3">{request.create_date}</td>
                                        <td className="py-3 px-3">
                                            {request.hr_approved === 'pending' && (
                                                <button
                                                    onClick={() => handleConfirm(request.id)}
                                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    Confirm
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div dir='rtl'> <Sidebar  className="w-80" /> </div>

        </div>
    );
};

export default Requests;
