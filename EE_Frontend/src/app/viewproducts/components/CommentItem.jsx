import React from 'react';
import RatingStars from './RatingStars';

const CommentItem = ({ review }) => {
  return (
    <div className="py-6 first:pt-0">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div>
          <p className="font-medium text-gray-800">{review.userName || 'Anónimo'}</p> {/* Usar review.userName */}
          <div className="flex items-center mt-1 mb-2">
            <RatingStars rating={review.rating} />
            {review.date && <span className="ml-2 text-sm text-gray-500">{review.date}</span>}{' '}
            {/* Renderizar fecha si existe */}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg mt-2">
        <p className="text-gray-600">{review.comment}</p>
      </div>
    </div>
  );
};

export default CommentItem;
