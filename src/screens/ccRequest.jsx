import React, { useState } from 'react';
import Sidebar from '../components/sidbar';
import { Modal, Button, Input, DatePicker, Select, message } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

const CcRequest = () => {
    // Local state to manage requests
    const [requests, setRequests] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newRequest, setNewRequest] = useState({
        description: '',
        request_type: '',
        date_from: '',
        date_to: ''
    });
    const [isConfirmLoading, setIsConfirmLoading] = useState(false);

    // Modal form data handler
    const handleFormChange = (field, value) => {
        setNewRequest({
            ...newRequest,
            [field]: value
        });
    };

    // Handle Date Range selection
    const handleDateRangeChange = (dates) => {
        if (dates) {
            setNewRequest({
                ...newRequest,
                date_from: moment(dates[0]).format('YYYY-MM-DD HH:mm:ss'),
                date_to: moment(dates[1]).format('YYYY-MM-DD HH:mm:ss')
            });
        }
    };

    // Open the modal to create request
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Submit the new request (simulating API call)
    const handleCreateRequest = () => {
        if (!newRequest.description || !newRequest.request_type || !newRequest.date_from || !newRequest.date_to) {
            message.error('Please fill in all fields!');
            return;
        }

        setIsConfirmLoading(true);
        setTimeout(() => {
            setRequests([...requests, { ...newRequest, id: requests.length + 1, status: 'pending' }]);
            setNewRequest({ description: '', request_type: '', date_from: '', date_to: '' });
            setIsModalVisible(false);
            setIsConfirmLoading(false);
            message.success('Request created successfully!');
        }, 1000); // Simulate API delay
    };

    // Confirm a request by changing its state
    const handleConfirmRequest = (id) => {
        setRequests(requests.map(request =>
            request.id === id ? { ...request, status: 'approved' } : request
        ));
        message.success('Request confirmed!');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 ml-40 mt-16">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Manage Requests</h1>
                        <Button type="primary" onClick={showModal}>
                            Create Request
                        </Button>

                        {/* Request Table */}
                        <table className="min-w-full bg-white mt-6">
                            <thead>
                                <tr className="w-full bg-gray-200 border-b">
                                    <th className="py-3 px-6 text-left text-gray-600">ID</th>
                                    <th className="py-3 px-6 text-left text-gray-600">Description</th>
                                    <th className="py-3 px-6 text-left text-gray-600">Request Type</th>
                                    <th className="py-3 px-6 text-left text-gray-600">Date From</th>
                                    <th className="py-3 px-6 text-left text-gray-600">Date To</th>
                                    <th className="py-3 px-6 text-left text-gray-600">Status</th>
                                    <th className="py-3 px-6 text-left text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.length > 0 ? (
                                    requests.map(request => (
                                        <tr key={request.id} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-6">{request.id}</td>
                                            <td className="py-3 px-6">{request.description}</td>
                                            <td className="py-3 px-6 capitalize">{request.request_type.replace('_', ' ')}</td>
                                            <td className="py-3 px-6">{request.date_from}</td>
                                            <td className="py-3 px-6">{request.date_to}</td>
                                            <td className="py-3 px-6">{request.status}</td>
                                            <td className="py-3 px-6">
                                                {request.status === 'pending' && (
                                                    <Button
                                                        type="primary"
                                                        onClick={() => handleConfirmRequest(request.id)}
                                                    >
                                                        Confirm
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="py-3 px-6 text-center">No requests found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for creating a request */}
            <Modal
                title="Create Request"
                visible={isModalVisible}
                onOk={handleCreateRequest}
                confirmLoading={isConfirmLoading}
                onCancel={() => setIsModalVisible(false)}
            >
                <Input
                    placeholder="Description"
                    value={newRequest.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    className="mb-3"
                />
                <Select
                    placeholder="Select Request Type"
                    value={newRequest.request_type}
                    onChange={(value) => handleFormChange('request_type', value)}
                    className="w-full mb-3"
                >
                    <Option value="paid_leave">Paid Leave</Option>
                    <Option value="unpaid_leave">Unpaid Leave</Option>
                    <Option value="admin_leave">Admin Leave</Option>
                </Select>
                <RangePicker
                    showTime
                    onChange={handleDateRangeChange}
                    className="w-full"
                />
            </Modal>
            <div dir='rtl'> <Sidebar className="w-80" /> </div>

        </div>
    );
};

export default CcRequest;
