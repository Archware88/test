// api/savedItems.ts
import { get, post, del } from "./api";
import { SavedItem } from "@/types/types";


export const getSavedItems = async (): Promise<SavedItem[]> => {
  console.log("Fetching saved items...");
  const response = await get("/saved-items");
  console.log("Saved items response:", response);
 return response as SavedItem[];
};

export const addSavedItem = async (courseId: number) => {
  console.log("Attempting to save course:", courseId);
  const response = await post(`/saved-items/${courseId}`);
  console.log("Save response:", response);
  return response;
};

export const removeSavedItem = async (courseId: number) => {
  console.log("Attempting to remove course:", courseId);
  const response = await del(`/saved-items/${courseId}`);
  console.log("Remove response:", response);
  return response;
};
