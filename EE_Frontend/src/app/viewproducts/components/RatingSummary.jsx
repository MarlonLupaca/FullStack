import RatingStars from './RatingStars';

const RatingSummary = ({ rating, reviewCount }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="text-center md:text-left md:flex-1">
          <div className="text-5xl font-bold text-gray-800">{rating.toFixed(1)}</div>
          <div className="flex justify-center md:justify-start mt-2">
            <RatingStars rating={rating} />
          </div>
          <div className="text-sm text-gray-500 mt-2">Basado en {reviewCount} valoraciones</div>
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;
