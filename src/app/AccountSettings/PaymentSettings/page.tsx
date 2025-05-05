"use client";
import Sidebar from "../components/Sidebar";
import Layout from "@/components/GeneralComponents/GeneralLayout";

const PaymentSettings = () => {
    return (
        <Layout>
        <div className="flex min-h-screen bg-gray-50 p-8">   
            <Sidebar />       
            <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                {/* Header */}
                <h2 className="text-xl font-semibold">Payment Methods</h2>
                <p className="text-gray-500">Update your payment method</p>

                {/* Card Details */}
                <div className="mt-4 flex justify-between items-center bg-blue-900 text-white p-6 rounded-lg">
                    <div>
                        <p className="text-lg font-semibold">VISA</p>
                        <p>**** 1234</p>
                        <p className="text-sm">Expire 09/24</p>
                    </div>
                    <button className="text-white bg-blue-700 px-3 py-1 rounded-md">
                        ⋮
                    </button>
                </div>

                {/* Add Payment Method */}
                    <button className="mt-4 border border-gray-300 p-4 w-full rounded-lg cusor-pointer flex items-center justify-center">
                    + Add new payment method
                </button>

                {/* Payment History */}
                <h3 className="mt-6 text-lg font-semibold">Payment History</h3>

                {/* Sort & Filter */}
                <div className="flex justify-between mt-4">
                    <select className="border p-2 rounded-md">
                        <option>Sort By: Ongoing</option>
                        <option>Completed</option>
                    </select>
                    <select className="border p-2 rounded-md">
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
                            <td className="py-2 px-4">Advanced Marketing Tactics for Brand Growth</td>
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
                            <button className="px-3 py-1 border rounded-md cusor-pointer">1</button>
                            <button className="px-3 py-1 border rounded-md cusor-pointer">2</button>
                            <button className="px-3 py-1 border rounded-md cusor-pointer">3</button>
                            <button className="px-3 py-1 border rounded-md cusor-pointer">Next</button>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default PaymentSettings;
