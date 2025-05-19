// contexts/CartContext.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getCartItems } from "@/api/cart";

const CartContext = createContext({
    cartCount: 0,
    updateCartCount: () => { },
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartCount, setCartCount] = useState(0);

    const updateCartCount = async () => {
        try {
            const items = await getCartItems();
            setCartCount(items?.length || 0);
        } catch (error) {
            console.error("Error updating cart count:", error);
        }
    };

    // Initialize cart count on mount
    useEffect(() => {
        updateCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);