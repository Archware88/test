"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import UserNavbar from "@/components/GeneralComponents/UserNavbar";
import { getCartItems, removeFromCart } from "@/api/cart";
import { ICartItem, ICourse } from "@/types/types";
import Layout from "@/components/GeneralComponents/GeneralLayout";

const savedItems = [
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
    const [cart, setCart] = useState<ICourse[]>([]);
    const [voucher, setVoucher] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                setLoading(true);
                const cartItems = await getCartItems(); // ← Already returns ICartItem[] | null

                if (cartItems) {
                    const formattedCart = cartItems.map((course: ICartItem) => ({
                        id: Number(course.id),
                        title: course.title || "Unknown Course",
                        image: course.image || "/assets/images/default-course.jpg",
                        author: "Unknown Instructor",
                        updated: "N/A",
                        level: "Beginner",
                        rating: course.average_rating || 0,
                        reviews: course.students_count || 0,
                        price: course.courseprices?.[0]?.course_price || 0,
                        description: "", // add default description
                        thumbnail: "", // add default thumbnail
                        data: "",
                    }));

                    setCart(formattedCart);
                } else {
                    setCart([]);
                }
            } catch (err) {
                setError("Failed to load cart items");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, []);


    const handleRemoveFromCart = async (id: number) => {
        try {
            const success = await removeFromCart(id);
            if (success) {
                setCart(cart.filter((course) => course.id !== id));
            }
        } catch (err) {
            setError("Failed to remove item from cart");
            console.error(err);
        }
    };

    const totalPrice = cart.reduce((acc, course) => acc + course.price, 0);

    if (loading) {
        return (
            <div className="mx-auto pt-44 px-[120px]">
                <UserNavbar />
                <div className="flex justify-center items-center h-64">
                    <p>Loading your cart...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto pt-44 px-[120px]">
                <UserNavbar />
                <div className="text-red-500 p-4">{error}</div>
            </div>
        );
    }

    return (
        <>
            <Layout>
            <div className="mx-auto pt-44 mb-20 px-[120px]">
                <h1 className="text-2xl font-medium">SHOPPING CART ({cart.length})</h1>

                <div className="flex space-x-8">
                    {/* Cart Items */}
                    <div className="mt-5 space-y-4 w-7/12">
                        {cart.length > 0 ? (
                            cart.map((course) => (
                                <div key={course.id} className="flex items-center p-4 bg-white border-2 border-[#01010111] rounded-lg">
                                    <Image
                                        src={course.image || "/assets/images/default-course.jpg"}
                                        alt={course.title}
                                        className="w-24 h-24 object-cover rounded-md"
                                        height={100}
                                        width={100}
                                    />
                                    <div className="ml-4 flex-grow">
                                        <h2 className="font-medium">{course.title}</h2>
                                        <div className="flex items-center h-6 pt-2">
                                            <p className="text-xs text-[#010101] mr-2">By {course.authors}</p>
                                            <div className="w-[1px] h-3 bg-[#010101] mr-2 flex align-middle"></div>
                                            <p className="text-xs text-[#010101]"> • {course.level}</p>
                                        </div>
                                        <div className="flex items-center h-6 pt-2">
                                            <p className="text-xs text-[#010101]">Updated {course.updated}</p>
                                            <p className="text-xs text-[#010101] ml-2"> • ⭐ {course.rating} ({course.reviews} Reviews)</p>
                                        </div>
                                        <p className="text-lg font-bold text-[#1B09A2] pt-2">N {course.price.toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(course.id)}
                                        className="text-[#1B09A2] hover:underline flex items-start cursor-pointer"
                                    >
                                        🗑 Remove from cart
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center bg-white rounded-lg">
                                <p>Your cart is empty</p>
                            </div>
                        )}
                    </div>

                    {/* Checkout Section - Only shown when cart has items */}
                    {cart.length > 0 && (
                        <div className="mt-10 p-5 bg-white shadow-lg rounded-lg w-5/12">
                            <div className="flex justify-between items-center mb-3">
                                <input
                                    type="text"
                                    placeholder="Have a voucher code? Input here"
                                    className="border p-2 flex-grow rounded-md mr-2"
                                    value={voucher}
                                    onChange={(e) => setVoucher(e.target.value)}
                                />
                                <button className="bg-[#1B09A2] text-white px-4 py-2 rounded-md">
                                    Apply
                                </button>
                            </div>
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Price</span>
                                <span>N {totalPrice.toLocaleString()}</span>
                            </div>
                            <button className="w-full bg-[#1B09A2] text-white py-3 mt-4 rounded-md text-center cursor-pointer">
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>

                {/* Saved Items Section - Left as static data */}
                <div className="mt-8 w-7/12">
                    <h2 className="text-lg font-semibold text-[#1B09A2]">Saved Items</h2>
                    <div className="mt-3 space-y-4">
                        {savedItems.map((course) => (
                            <div key={course.id} className="flex items-center p-4 bg-gray-100 rounded-lg">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    className="w-20 h-20 object-cover rounded-md"
                                    height={100}
                                    width={100}
                                />
                                <div className="ml-4 flex-grow">
                                    <h2 className="font-semibold">{course.title}</h2>
                                    <p className="text-sm text-gray-500">
                                        By {course.author} • {course.level}
                                    </p>
                                    <p className="text-lg font-bold text-blue-600">
                                        N {course.price.toLocaleString()}
                                    </p>
                                </div>
                                <button className="text-blue-600 hover:underline cursor-pointer">
                                    ➕ Add to cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </Layout>
        </>
    );
};

export default ShoppingCart;