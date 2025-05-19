import { FiStar } from "react-icons/fi";
import Image from "next/image";

interface PurchasedCardProps {
  image: string | null;
  title: string;
  authors: string[];
  rating: number;
  progress: number;
}
const PurchasedCard = ({ image, title, authors, rating, progress }: PurchasedCardProps) => {
  return (
    <div className="bg-white shadow-md shadow-gray rounded-lg overflow-hidden">
      {/* Course Image */}
      <div>
        <Image src={image || '/assets/images/course-placeholder.jpg'} alt={title} className="w-full h-48 object-cover" height={350} width={350} />
      </div>

      {/* Course Details */}
      <div className="p-4">
        {/* Course Title */}
        <h3 className="text-base font-semibold">{title}</h3>

        {/* Authors */}
        <p className="text-xs text-gray-500">By: {authors.join(", ")}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <FiStar
              key={index}
              className={index < rating ? "text-yellow-500" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-gray-700 text-sm">Your Rating</span>
        </div>

        {/* Progress Bar */}

        <div className="mt-3 flex">
          {progress > 0 && (
            <div className="h-2 bg-gray-300 rounded-full mt-1 w-1/2 mr-3">
              <div
                className="h-2 bg-[#88D613] rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          <p className="text-xs">
            {progress === 0 ? "START LEARNING" : `${progress}% complete`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchasedCard;

