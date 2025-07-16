'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const BlogGridCard = ({ post }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(' ').length || 0;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  };

  return (
    <article
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
    >
      {/* Imagen con overlay gradiente */}
      <div className="relative h-56 overflow-hidden">
        <Image
          width={500}
          height={500}
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Badge de categoría */}
        {post.category && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Título */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Resumen */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.summary}</p>

        {/* Metadatos */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {/* Autor */}
            {post.author && (
              <div className="flex items-center space-x-2">
                {post.author.avatar && (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span className="font-medium">{post.author.name}</span>
              </div>
            )}

            {/* Fecha */}
            {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          </div>

          {/* Tiempo de lectura */}
          {post.content && (
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{getReadingTime(post.content)} min</span>
            </span>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Indicador de hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </article>
  );
};

export default BlogGridCard;
