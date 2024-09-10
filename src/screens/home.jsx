import React, { useState } from 'react';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import imagePOints from "../assets/images.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { Calendar, Modal, Button, message, DatePicker } from 'antd';
import Sidebar from '../components/sidbar';
import 'antd/dist/reset.css';

const Home = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

    // Open the modal to select a date range
    const toggleModal = () => {
        setIsModalVisible(true);
    };

    // Handle date selection from the DatePicker
    const onSelectDate = (date) => {
        setSelectedDate(date);
    };

    // Handle date range selection
    const handleDateRangeChange = (dates) => {
        setSelectedDateRange(dates);
    };

    // Handle modal confirm
    const handleOk = () => {
        const [startDate, endDate] = selectedDateRange;
        if (startDate && endDate) {
            message.success(`تم تحديد الفترة من ${startDate.format('YYYY-MM-DD HH:mm')} إلى ${endDate.format('YYYY-MM-DD HH:mm')}`);
            setIsModalVisible(false);
        } else {
            message.error('يرجى تحديد الفترة بشكل صحيح');
        }
    };

    // Handle modal cancel
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className='flex bg-custom-blue2 min-h-screen'>
            <div className="flex-1 mr-40">

                <header className="flex justify-between items-center bg-white shadow p-4">
                    <div className="flex items-center space-x-2">
                        <FaRegCircleUser className="w-6 h-7 rounded-full text-custom-blue" />
                        <span className="font-medium text-custom-blue">الحساب</span>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Reports Section */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-bold mb-2 text-center text-blue-500">التقارير الكاملة للتاريخ الآتي</h2>
                        {selectedDateRange[0] && selectedDateRange[1] ? (
                            <p className="text-center text-gray-500">
                                {`من ${selectedDateRange[0].format('YYYY-MM-DD HH:mm')} إلى ${selectedDateRange[1].format('YYYY-MM-DD HH:mm')}`}
                            </p>
                        ) : (
                            <p className="text-center text-gray-500">الخميس، 5 سبتمبر 2024</p>
                        )}                        <Button
                            type="primary"
                            onClick={toggleModal}
                            className="mt-4"
                        >
                            حدد التقارير التالية
                        </Button>
                    </div>

                    {/* Cards Section */}
                    <div className="grid grid-cols-4 gap-4">
                        {/* Card 1 */}
                        <div className="bg-white rounded-lg shadow p-2 text-center transform hover:scale-105 transition-all duration-200">
                            <img src={image1} className="w-10 h-10 mx-auto mb-2" />
                            <h2 className="text-sm font-bold mb-1">0</h2>
                            <p className="text-xs text-gray-600">أوقات المغادرة</p>
                            <button
                                className="mt-2 bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600"
                            >
                                عرض أوقات المغادرة
                            </button>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-lg shadow p-2 text-center transform hover:scale-105 transition-all duration-200">
                            <img src={imagePOints} className="w-10 h-10 mx-auto mb-2" />
                            <h2 className="text-sm font-bold mb-1">0</h2>
                            <p className="text-xs text-gray-600">نقاط التقييم</p>
                            <button
                                className="mt-2 bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600"
                            >
                                عرض النقاط
                            </button>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-lg shadow p-2 text-center transform hover:scale-105 transition-all duration-200">
                            <img src={image2} alt="وقت الإجازة" className="w-10 h-10 mx-auto mb-2" />
                            <h2 className="text-sm font-bold mb-1">0</h2>
                            <p className="text-xs text-gray-600">وقت الإجازة</p>
                            <button
                                className="mt-2 bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600"
                            >
                                عرض أوقات الإجازة
                            </button>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white rounded-lg shadow p-2 text-center transform hover:scale-105 transition-all duration-200">
                            <img src={image3} alt="عمل إضافي" className="w-10 h-10 mx-auto mb-2" />
                            <h2 className="text-sm font-bold mb-1">0</h2>
                            <p className="text-xs text-gray-600">عمل إضافي</p>
                            <button
                                className="mt-2 bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600"
                            >
                                عرض طلبات العمل الإضافي
                            </button>
                        </div>
                    </div>

                </main>
            </div>

            <div dir='rtl'> <Sidebar className="w-80" /> </div>

            {/* Modal for Date Range Picker */}
            <Modal
                title="حدد فترة التقرير"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="تأكيد"
                cancelText="إلغاء"
            >
                <p>حدد الفترة التي ترغب في عرض التقارير لها</p>
                <br />

                <DatePicker.RangePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    onChange={handleDateRangeChange}
                    style={{ width: '100%' }}
                />
            </Modal>
        </div>
    );
};

export default Home;
