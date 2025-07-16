'use client';

import React from 'react';
import Header from '../../Components/Header';
import posts from '../../data/blogPosts';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Clock, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function BlogDetailPage({ params }) {
  const resolvedParams = React.use(params);
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto mt-24 py-32 px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl text-gray-400">📄</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Contenido no encontrado</h1>
            <p className="text-gray-600 mb-8">El artículo que buscas no existe o ha sido movido.</p>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${post.title} - ${post.summary}`;

  const handleShare = (platform) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
        shareText
      )}`,
      instagram: '#', // Instagram no permite compartir URLs directamente
    };

    if (platform !== 'instagram') {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative">
        {/* Imagen de fondo con overlay */}
        <div className="relative h-96 overflow-hidden">
          <Image src={post.image1} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </div>

        {/* Contenido del hero */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al blog
              </Link>
            </nav>

            {/* Categoría */}
            {post.category && (
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
            )}

            {/* Título */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>

            {/* Resumen */}
            <p className="text-xl text-white/90 mb-6 max-w-3xl leading-relaxed">{post.summary}</p>

            {/* Metadatos */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              {post.author && (
                <div className="flex items-center space-x-3">
                  {post.author.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white/30"
                    />
                  )}
                  <div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{post.author.name}</span>
                    </div>
                    {post.author.role && <span className="text-sm text-white/60">{post.author.role}</span>}
                  </div>
                </div>
              )}

              {post.publishedAt && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{getReadingTime(post.content)} min de lectura</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Contenido del artículo */}
          <article className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none text-gray-800 prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
              {post.content
                .split('\n')
                .filter((p) => p.trim() !== '')
                .map((paragraph, i) => {
                  // Detectar si es un título (empieza con ##)
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={i} className="text-2xl font-bold mt-12 mb-6 text-gray-900">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  // Detectar si es un subtítulo (empieza con ###)
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={i} className="text-xl font-semibold mt-8 mb-4 text-gray-900">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  // Párrafo normal
                  return (
                    <p key={i} className="mb-6 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Etiquetas</h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sección de compartir */}
          <div className="bg-gray-50 p-8 md:p-12 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartir este artículo
                </h3>
                <p className="text-gray-600">¿Te gustó este contenido? Compártelo con tus amigos</p>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Compartir en Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center w-12 h-12 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Compartir en Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare('instagram')}
                  className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Compartir en Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación adicional */}
        <div className="mt-12 mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-md border border-gray-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ver más artículos
          </Link>
        </div>
      </div>
    </div>
  );
}
