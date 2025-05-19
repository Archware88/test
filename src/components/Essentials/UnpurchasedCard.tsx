import { FiBookmark } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addSavedItem, removeSavedItem, getSavedItems } from "@/api/savedItems";
import { SavedItem } from "@/types/types";

interface UnpurchasedCardProps {
  id: number;
  image: string | null;
  title: string;
  authors: string[];
  rating: number;
  reviews: number;
  price: number;
  status: "New" | "Best Seller" | "Top Rated" | "Top Teacher";
}

const UnpurchasedCard = ({
  id,
  image,
  title,
  authors,
  rating,
  reviews,
  price,
}: UnpurchasedCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if item is saved when component mounts
  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const savedItems = await getSavedItems();
        const saved = savedItems.some((item: SavedItem) => item.course_id === id);
        setIsSaved(saved);
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };

    checkSavedStatus();
  }, [id]);

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (isSaved) {
        await removeSavedItem(id);
        toast.success("Course removed from saved items");
        setIsSaved(false);
      } else {
        await addSavedItem(id);
        toast.success("Course saved for later");
        setIsSaved(true);
      }
    } catch (error: unknown) {
      console.error("Save error:", error);
      toast.error(
        // error.response?.data?.message ||
        "You need to be logged in to save courses"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Link href={`/CourseDetails?course_id=${id}`} passHref>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden w-[95%] cursor-pointer hover:shadow-md transition-shadow duration-300 group">
        {/* Course Image */}
        <div className="relative">
          {image ? (
            <Image
              src={image}
              alt={title}
              className="w-full h-[200px] object-cover"
              width={1000}
              height={1000}
            />
          ) : (
            <div className="bg-gray-200 h-[200px] flex items-center justify-center">
              <h3 className="text-3xl font-bold text-center">{title}</h3>
            </div>
          )}
        </div>

        {/* Course Details */}
        <div className="p-4">
          <h3 className="text-base font-medium h-[52px] line-clamp-2">{title}</h3>
          <p className="text-xs text-[#010101] h-3 truncate">
            By: {authors.join(", ")}
          </p>

          <div className="flex items-center mt-2 -ml-1">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="ml-1 font-semibold">{rating}/5</span>
            <span className="text-gray-500 text-sm ml-2">
              ({reviews.toLocaleString()})
            </span>
          </div>

          <div className="flex justify-between items-center mt-3">
            <span className="text-lg font-medium text-[#1B09A2]">
              ₦ {price.toLocaleString()}
            </span>
            <button
              onClick={handleSaveClick}
              disabled={isProcessing}
              className={`text-2xl cursor-pointer transition-colors duration-200 ${isSaved
                  ? "text-[#1B09A2] hover:text-[#1B09A2]/80"
                  : "text-gray-400 hover:text-gray-600 group-hover:text-gray-500"
                }`}
              aria-label={isSaved ? "Remove from saved" : "Save for later"}
            >
              {isSaved ? <FaBookmark /> : <FiBookmark />}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UnpurchasedCard;