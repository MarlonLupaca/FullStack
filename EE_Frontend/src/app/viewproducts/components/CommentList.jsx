'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentItem from './CommentItem';
import API_BASE_URL from '@/app/config/apiConfig';

const CommentList = ({ productCode, reviews: initialReviews, loading: initialLoading, error: initialError }) => {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [loadingReviews, setLoadingReviews] = useState(initialLoading);
  const [errorReviews, setErrorReviews] = useState(initialError);

  useEffect(() => {
    const fetchReviewsWithUserNames = async () => {
      setLoadingReviews(true);
      setErrorReviews(null);
      try {
        const fetchedReviews = await Promise.all(
          (initialReviews || []).map(async (review) => {
            try {
              const userResponse = await axios.get(`${API_BASE_URL}/orchestrator/clients/${review.userCode}`);
              return { ...review, userName: userResponse.data.fullname || 'Anónimo' };
            } catch (userError) {
              console.error('Error fetching user info for review:', userError);
              return { ...review, userName: 'Anónimo' };
            }
          })
        );
        setReviews(fetchedReviews);
      } catch (error) {
        setErrorReviews('Error al cargar las reseñas.');
        console.error('Error fetching reviews:', error);
      } finally {
        setLoadingReviews(false);
      }
    };

    if (productCode && initialReviews) {
      fetchReviewsWithUserNames();
    }
  }, [productCode, initialReviews]);

  if (loadingReviews) {
    return <div>Cargando reseñas...</div>;
  }

  if (errorReviews) {
    return <div className="text-red-500">{errorReviews}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="divide-y divide-gray-200 px-5 max-h-[50vh] overflow-hidden overflow-y-auto">
        {reviews.length > 0 ? (
          reviews.map((review) => <CommentItem key={review.id} review={review} />)
        ) : (
          <div className="py-6 text-gray-500 italic">Sin comentarios aún.</div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
