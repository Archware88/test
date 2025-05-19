"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getSavedItems, addSavedItem, removeSavedItem } from "@/api/savedItems";

interface SavedItem {
    id: number;
    course_id: number;
    // Add other properties if your saved items have more fields
    [key: string]: string | number; // or any other type that makes sense
}

interface SavedItemsContextType {
    savedItems: SavedItem[];
    addToSaved: (courseId: number) => Promise<void>;
    removeFromSaved: (courseId: number) => Promise<void>;
    isSaved: (courseId: number) => boolean;
}

const SavedItemsContext = createContext<SavedItemsContextType>({
    savedItems: [],
    addToSaved: async () => { },
    removeFromSaved: async () => { },
    isSaved: () => false,
});

interface SavedItemsProviderProps {
    children: ReactNode;
}

// contexts/SavedItemsContext.tsx
export const SavedItemsProvider = ({ children }: SavedItemsProviderProps) => {
    const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

    const fetchSavedItems = async () => {
        console.log("Fetching saved items...");
        try {
            const items = await getSavedItems();
            console.log("Fetched items:", items);
            setSavedItems(items as SavedItem[]);
        } catch (error) {
            console.error("Error fetching saved items:", error);
            setSavedItems([]);
        }
    };

    const addToSaved = async (courseId: number) => {
        console.log("Adding to saved:", courseId);
        try {
            const result = await addSavedItem(courseId);
            console.log("Add result:", result);
            await fetchSavedItems();
        } catch (error) {
            console.error("Error adding saved item:", error);
            throw error;
        }
    };

    const removeFromSaved = async (courseId: number) => {
        console.log("Removing from saved:", courseId);
        try {
            await removeSavedItem(courseId);
            console.log("Remove successful");
            await fetchSavedItems();
        } catch (error) {
            console.error("Error removing saved item:", error);
            throw error;
        }
    };

    const isSaved = (courseId: number): boolean => {
        return savedItems.some(item => item.course_id === courseId);
    };

    useEffect(() => {
        fetchSavedItems();
    }, []);

    return (
        <SavedItemsContext.Provider
            value={{ savedItems, addToSaved, removeFromSaved, isSaved }}
        >
            {children}
        </SavedItemsContext.Provider>
    );
};

export const useSavedItems = (): SavedItemsContextType => {
    const context = useContext(SavedItemsContext);
    if (context === undefined) {
        throw new Error('useSavedItems must be used within a SavedItemsProvider');
    }
    return context;
};