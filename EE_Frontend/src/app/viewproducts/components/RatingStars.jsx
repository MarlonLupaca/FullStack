import { FaStar } from 'react-icons/fa6';

const RatingStars = ({ rating }) => {
  return (
    <div className="flex">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <FaStar key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
    </div>
  );
};

export default RatingStars;
