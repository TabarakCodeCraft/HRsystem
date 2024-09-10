import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidbar';
import Teams from '../components/teams';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        tz: '',
        employee_info: {
            first_name: '',
            middle_name: '',
            last_name: '',
            position: '',
            requests_allocations: {
                leave_days: 0.0,
                timeoffs: 0.0
            },
            sub_employees: []
        }
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://37.77.48.69/jt_api/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': 'frontend_lang=en_US; session_id=7ad1bcf6068db58bd6c68c9b194e8c56da70fc30',
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const navigateToTeam = () => {
        navigate('/teams', { state: { subEmployees: profile.employee_info.sub_employees } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-indigo-200" dir="rtl">
            <Sidebar className="w-64" />
            <div className="flex-1 mt-12 p-6">
                <div className="max-w-4xl mx-auto">

                    {/* Profile Header */}
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-700 mb-3">الملف الشخصي</h2>
                        <p className="text-gray-500 mb-2">الإسم: {profile.employee_info.first_name} {profile.employee_info.middle_name} {profile.employee_info.last_name}</p>
                        <p className="text-gray-500 mb-2">البريد الإلكتروني: {profile.email}</p>
                        <p className="text-gray-500">المنصب: {profile.employee_info.position}</p>
                    </div>

                    {/* Requests Allocations */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white shadow-sm rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-300">
                            <p className="text-xl font-semibold text-gray-700 mb-2">الإجازات المتاحة</p>
                            <p className="text-3xl font-bold text-green-400 mb-1">{profile.employee_info.requests_allocations.leave_days}</p>
                            <button className="bg-gradient-to-r from-green-400 to-teal-400 text-white px-4 py-1 rounded-md shadow-sm hover:shadow-lg transition duration-300">تقديم طلب</button>
                        </div>
                        <div className="bg-white shadow-sm rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-300">
                            <p className="text-xl font-semibold text-gray-700 mb-2">ساعات الوقت المستقطع</p>
                            <p className="text-3xl font-bold text-blue-400 mb-1">{profile.employee_info.requests_allocations.timeoffs}</p>
                            <button className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white px-4 py-1 rounded-md shadow-sm hover:shadow-lg transition duration-300">تقديم طلب</button>
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <button
                            onClick={navigateToTeam}
                            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-5 py-2 rounded-full shadow-sm hover:shadow-lg transition duration-300">
                            فريقي
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
