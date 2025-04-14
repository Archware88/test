import { FiBookmark } from "react-icons/fi";
import Image from "next/image";

interface UnpurchasedCardProps {
  image: string;
  title: string;
  authors: string[];
  rating: number;
  reviews: number;
  price: string;
  status: "New" | "Best Seller" | "Top Rated" | "Top Teacher"
}

const UnpurchasedCard = ({
  image,
  title,
  authors,
  rating,
  reviews,
  price,
  status,
}: UnpurchasedCardProps) => {
  // Map status to styles
  const statusStyles = {
    New: "bg-[#88D613]",
    "Best Seller": "bg-[#88D613]",
    "Top Rated": "bg-yellow-500",
    "Top Teacher": "bg-purple-500",
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {/* Course Image */}
      <div className="relative">
        <Image src={image} alt={title} className="w-full h-48 object-cover" width={100} height={100} />

        {/* Status Badge */}
        {status && (
          <span
            className={`absolute bottom-2 left-2 text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[status]}`}
          >
            {status}
          </span>
        )}
      </div>

      {/* Course Details */}
      <div className="p-4">
        {/* Course Title */}
        <h3 className="text-base font-semibold">{title}</h3>

        {/* Authors */}
        <p className="text-xs text-gray-500">By: {authors.join(", ")}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-lg">⭐</span>
          <span className="ml-1 font-semibold">{rating}/5</span>
          <span className="text-gray-500 text-sm ml-2">
            ({reviews.toLocaleString()})
          </span>
        </div>

        {/* Price & Bookmark */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-[#1B09A2]">
            ₦ {price.toLocaleString()}
          </span>
          <button className="text-gray-600 text-2xl">
            <FiBookmark />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnpurchasedCard;
