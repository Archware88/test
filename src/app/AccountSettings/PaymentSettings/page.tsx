"use client";
import Sidebar from "../components/Sidebar";
import Layout from "@/components/GeneralComponents/GeneralLayout";
import { useState } from "react";

const PaymentSettings = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <Layout>
            <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
                <Sidebar />

                <div className="flex-1 p-4 md:p-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Payment Methods</h2>
                            <p className="text-gray-500">Update your payment method</p>
                        </div>

                        {/* Payment Cards */}
                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            {/* Card Details */}
                            <div className="flex-1 bg-blue-900 text-white p-4 md:p-6 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <p className="text-lg font-semibold">VISA</p>
                                        <div>
                                            <p>**** 1234</p>
                                            <p className="text-sm">Expire 09/24</p>
                                        </div>
                                    </div>
                                    <button className="text-white border border-white px-3 py-1 rounded-md">
                                        ⋮
                                    </button>
                                </div>
                            </div>

                            {/* Add Payment Method */}
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex-1 border border-[#1B09A2] p-4 text-[#1B09A2] rounded-lg flex items-center justify-center gap-2"
                            >
                                <span>+</span>
                                <span>Add new payment method</span>
                            </button>
                        </div>

                        {/* Payment History */}
                        <div className="mb-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                                <h3 className="text-lg font-semibold">Payment History</h3>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <select className="border px-3 py-2 rounded-md text-sm">
                                        <option>Sort By: Ongoing</option>
                                        <option>Completed</option>
                                    </select>
                                    <select className="border px-3 py-2 rounded-md text-sm">
                                        <option>Filter by: Categories</option>
                                        <option>Marketing</option>
                                        <option>Cybersecurity</option>
                                    </select>
                                </div>
                            </div>

                            {/* Table - Responsive */}
                            <div className="overflow-x-auto">
                                <table className="w-full border rounded-lg">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-4 text-left text-sm">Payment ID</th>
                                            <th className="py-2 px-4 text-left text-sm">Course Title</th>
                                            <th className="py-2 px-4 text-left text-sm">Date & Time</th>
                                            <th className="py-2 px-4 text-left text-sm">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t">
                                            <td className="py-2 px-4 text-sm">001</td>
                                            <td className="py-2 px-4 text-sm">
                                                Advanced Marketing Tactics
                                            </td>
                                            <td className="py-2 px-4 text-sm">
                                                <strong>Oct 15, 2024</strong> <br /> Monday 09:00 - 10:00 AM
                                            </td>
                                            <td className="py-2 px-4 text-sm">$500</td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="py-2 px-4 text-sm">002</td>
                                            <td className="py-2 px-4 text-sm">Cybersecurity Fundamentals</td>
                                            <td className="py-2 px-4 text-sm">
                                                <strong>Oct 15, 2024</strong> <br /> Monday 09:00 - 10:00 AM
                                            </td>
                                            <td className="py-2 px-4 text-sm">$500</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-sm">Page 1 of 30</p>
                            <div className="flex gap-2">
                                {[1, 2, 3].map((page) => (
                                    <button
                                        key={page}
                                        className="px-3 py-1 border rounded-md text-sm cursor-pointer"
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button className="px-3 py-1 border rounded-md text-sm cursor-pointer">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add new card</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm mb-1">Card Name</label>
                                <input className="border p-2 w-full rounded text-sm" placeholder="Shai Hulud" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Card Number</label>
                                <input className="border p-2 w-full rounded text-sm" placeholder="Enter Card Number" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-1">Expiry Date</label>
                                    <input className="border p-2 w-full rounded text-sm" placeholder="MM/YY" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">CVV</label>
                                    <input className="border p-2 w-full rounded text-sm" placeholder="****" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Password</label>
                                <input type="password" className="border p-2 w-full rounded text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Confirm Password</label>
                                <input type="password" className="border p-2 w-full rounded text-sm" />
                            </div>
                        </div>

                        <button
                            className="mt-6 w-full bg-[#1B09A2] text-white py-2 rounded text-sm"
                            onClick={() => setShowModal(false)}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default PaymentSettings;