"use client";

import { useState } from "react";
import Image from "next/image";
import UserNavbar from "@/components/GeneralComponents/UserNavbar";

interface Course {
    id: number;
    title: string;
    author: string;
    updated: string;
    level: string;
    rating: number;
    reviews: number;
    price: number;
    image: string;
}

const initialCart: Course[] = [
    {
        id: 1,
        title: "Advanced Marketing Tactics for Brand Growth",
        author: "Shai Hulud & Shaodat Mapes",
        updated: "01/2025",
        level: "Beginner",
        rating: 4.7,
        reviews: 267,
        price: 30000,
        image: "/assets/images/course3.jpeg",
    },
    {
        id: 2,
        title: "Web Development Mastery: From Basics to Advanced",
        author: "Shai Hulud & Shaodat Mapes",
        updated: "01/2025",
        level: "Beginner",
        rating: 4.7,
        reviews: 267,
        price: 30000,
        image: "/assets/images/course3.jpeg",
    },
];

const savedItems: Course[] = [
    {
        id: 3,
        title: "Cybersecurity Fundamentals: Protecting Digital Assets",
        author: "Shai Hulud & Shaodat Mapes",
        updated: "01/2025",
        level: "Beginner",
        rating: 4.7,
        reviews: 267,
        price: 30000,
        image: "/cybersecurity.jpg",
    },
    {
        id: 4,
        title: "Introduction to Small Business Development Skills 101",
        author: "Shai Hulud & Shaodat Mapes",
        updated: "01/2025",
        level: "Beginner",
        rating: 4.7,
        reviews: 267,
        price: 30000,
        image: "/business.jpg",
    },
];

const ShoppingCart = () => {
    const [cart, setCart] = useState<Course[]>(initialCart);
    const [saved, setSaved] = useState<Course[]>(savedItems);
    const [voucher, setVoucher] = useState("");

    const removeFromCart = (id: number) => {
        const item = cart.find((course) => course.id === id);
        if (item) {
            setCart(cart.filter((course) => course.id !== id));
            setSaved([...saved, item]);
        }
    };

    const addToCart = (id: number) => {
        const item = saved.find((course) => course.id === id);
        if (item) {
            setSaved(saved.filter((course) => course.id !== id));
            setCart([...cart, item]);
        }
    };

    const totalPrice = cart.reduce((acc, course) => acc + course.price, 0);

    return (
        <>
        <UserNavbar/>
        <div className="mx-auto pt-44 px-[120px]">
            <h1 className="text-2xl font-medium">SHOPPING CART ({cart.length})</h1>

            <div className="flex space-x-8">
                {/* Cart Items */}
                <div className="mt-5 space-y-4 w-7/12">
                    {cart.map((course) => (
                        <div key={course.id} className="flex items-center p-4 bg-white border-2 border-[#01010111] rounded-lg">
                            <Image src={course.image} alt={course.title} className="w-24 h-24 object-cover rounded-md " height={100} width={100} />
                            <div className="ml-4 flex-grow">
                                <h2 className="font-medium">{course.title}</h2>
                                <div className="flex items-center h-6 pt-2">
                                    <p className="text-xs text-[#010101] mr-2">By {course.author}</p>
                                    <div className="w-[1px] h-3 bg-[#010101] mr-2 flex align-middle"></div>
                                    <p className="text-xs text-[#010101]"> • {course.level}</p>
                                </div>
                                <div className="flex items-center h-6 pt-2">
                                    <p className="text-xs text-[#010101]">Updated {course.updated} </p>
                                    <p className="text-xs text-[#010101] ml-2"> • ⭐ {course.rating} ({course.reviews} Reviews)</p>
                                </div>
                                <p className="text-lg font-bold text-[#1B09A2] pt-2">N {course.price.toLocaleString()}</p>
                            </div>
                            <button onClick={() => removeFromCart(course.id)} className="text-[#1B09A2] hover:underline flex items-start cusor-pointer">
                                🗑 Remove from cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* Checkout Section */}
                <div className="mt-10 p-5 bg-white shadow-lg rounded-lg w-5/12">
                    <div className="flex justify-between items-center mb-3">
                        <input
                            type="text"
                            placeholder="Have a voucher code? Input here"
                            className="border p-2 flex-grow rounded-md mr-2"
                            value={voucher}
                            onChange={(e) => setVoucher(e.target.value)}
                        />
                            <button className="bg-[#1B09A2] text-white px-4 py-2 rounded-md">Apply</button>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Price</span>
                        <span>N {totalPrice.toLocaleString()}</span>
                    </div>
                        <button className="w-full bg-[#1B09A2] text-white py-3 mt-4 rounded-md text-center cusor-pointer">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
            {/* Saved Items */}
            {saved.length > 0 && (
                <div className="mt-8 w-7/12">
                        <h2 className="text-lg font-semibold text-[#1B09A2]">Saved Items</h2>
                    <div className="mt-3 space-y-4">
                        {saved.map((course) => (
                            <div key={course.id} className="flex items-center p-4 bg-gray-100 rounded-lg">
                                <Image src={course.image} alt={course.title} className="w-20 h-20 object-cover rounded-md" height={100} width={100} />
                                <div className="ml-4 flex-grow">
                                    <h2 className="font-semibold">{course.title}</h2>
                                    <p className="text-sm text-gray-500">By {course.author} • {course.level}</p>
                                    <p className="text-lg font-bold text-blue-600">N {course.price.toLocaleString()}</p>
                                </div>
                                <button onClick={() => addToCart(course.id)} className="text-blue-600 hover:underline cusor-pointer">
                                    ➕ Add to cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>
        </>
    );
};

export default ShoppingCart;
