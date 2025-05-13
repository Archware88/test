"use client";
import Sidebar from "../components/Sidebar";
import Layout from "@/components/GeneralComponents/GeneralLayout";
import { useState } from "react";


const PaymentSettings = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <Layout>
            <div className="flex min-h-screen bg-gray-50 p-8">
                <Sidebar />
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    {/* Header */}
                    <h2 className="text-xl font-semibold">Payment Methods</h2>
                    <p className="text-gray-500">Update your payment method</p>

                    <div className="flex space-x-2.5">
                        {/* Card Details */}
                        <div className="mt-4 flex justify-between items-center bg-blue-900 text-white p-6 rounded-lg w-1/2">
                            <div className="flex">
                                <p className="text-lg font-semibold">VISA</p>
                                <div className="ml-8">
                                    <p>**** 1234</p>
                                    <p className="text-sm">Expire 09/24</p>
                                </div>
                            </div>
                            <button className="text-white border border-white px-3 py-1 rounded-md">
                                ⋮
                            </button>
                        </div>

                        {/* Add Payment Method */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="mt-4 border border-[#1B09A2] p-4 text-[#1B09A2] rounded-lg flex items-center justify-center w-1/2"
                        >
                            + Add new payment method
                        </button>
                    </div>
                    {/* Payment History */}
                   

                    {/* Sort & Filter */}
                    <div className="flex justify-between mt-4">
                        <h3 className="mt-6 text-lg font-semibold lg:w-3/4">Payment History</h3>
                        <select className="border px-3 rounded-md">
                            <option>Sort By: Ongoing</option>
                            <option>Completed</option>
                        </select>
                        <select className="border px-3 rounded-md">
                            <option>Filter by: Categories</option>
                            <option>Marketing</option>
                            <option>Cybersecurity</option>
                        </select>
                    </div>

                    {/* Table */}
                    <table className="w-full mt-4 border rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 text-left">Payment ID</th>
                                <th className="py-2 px-4 text-left">Course Title</th>
                                <th className="py-2 px-4 text-left">Date & Time</th>
                                <th className="py-2 px-4 text-left">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="py-2 px-4">001</td>
                                <td className="py-2 px-4">
                                    Advanced Marketing Tactics for Brand Growth
                                </td>
                                <td className="py-2 px-4">
                                    <strong>Oct 15, 2024</strong> <br /> Monday 09:00 - 10:00 AM
                                </td>
                                <td className="py-2 px-4">$500</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4">002</td>
                                <td className="py-2 px-4">Cybersecurity Fundamentals</td>
                                <td className="py-2 px-4">
                                    <strong>Oct 15, 2024</strong> <br /> Monday 09:00 - 10:00 AM
                                </td>
                                <td className="py-2 px-4">$500</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-between mt-6 items-center">
                        <p>Page 1 of 30</p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border rounded-md cusor-pointer">
                                1
                            </button>
                            <button className="px-3 py-1 border rounded-md cusor-pointer">
                                2
                            </button>
                            <button className="px-3 py-1 border rounded-md cusor-pointer">
                                3
                            </button>
                            <button className="px-3 py-1 border rounded-md cusor-pointer">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-[#0c000080] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-[600px] shadow-lg relative">
                        <h2 className="text-xl font-semibold mb-4">Add new card</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm">Card Name</label>
                                <input className="border p-2 w-full rounded" placeholder="Shai Hulud" />
                            </div>
                            <div>
                                <label className="block text-sm">Card Number</label>
                                <input className="border p-2 w-full rounded" placeholder="Enter Card Number" />
                            </div>
                            <div>
                                <label className="block text-sm">Expiry Date</label>
                                <input className="border p-2 w-full rounded" placeholder="MM/YY" />
                            </div>
                            <div>
                                <label className="block text-sm">CVV</label>
                                <input className="border p-2 w-full rounded" placeholder="****" />
                            </div>
                            <div>
                                <label className="block text-sm">Password</label>
                                <input type="password" className="border p-2 w-full rounded" />
                            </div>
                            <div>
                                <label className="block text-sm">Confirm Password</label>
                                <input type="password" className="border p-2 w-full rounded" />
                            </div>
                        </div>

                        <button
                            className="mt-6 w-full bg-[#1B09A2] text-white py-2 rounded"
                            onClick={() => setShowModal(false)} // replace with form submit logic later
                        >
                            Save
                        </button>

                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

        </Layout>
    );
};

export default PaymentSettings;
