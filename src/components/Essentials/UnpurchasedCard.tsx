import { FiBookmark } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

interface UnpurchasedCardProps {
  id: number;
  image: string | null;
  title: string;
  authors: string[];
  rating: number;
  reviews: number;
  price: number;
  status: "New" | "Best Seller" | "Top Rated" | "Top Teacher"
}

const UnpurchasedCard = ({
  id,
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
    <Link href={`/CourseDetails?course_id=${id}`}>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden w-[95%] cursor-pointer hover:shadow-md transition-shadow duration-300">
        {/* Course Image */}
        <div className="relative">
          <Image src={image || '/assets/images/course-placeholder.jpg'} alt={title} className="w-full h-[200px] object-cover" width={1000} height={1000} />
          {status && (
            <span className={`absolute bottom-2 left-2 text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[status]}`}>
              {status}
            </span>
          )}
        </div>

        {/* Course Details */}
        <div className="p-4">
          <h3 className="text-base font-medium h-[52px]">{title}</h3>
          <p className="text-xs text-[#010101] h-3">By: {authors.join(", ")}</p>

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
            <button className="text-gray-600 text-2xl">
              <FiBookmark />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );

};

export default UnpurchasedCard;
