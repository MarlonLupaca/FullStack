'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaSmile } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

const MessageInput = ({ inputMessage, setInputMessage, onSubmit }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleEmojiClick = (emojiData) => {
    setInputMessage((prev) => prev + emojiData.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className="relative">
      {showEmojiPicker && (
        <div ref={pickerRef} className="absolute bottom-14 left-4 z-50">
          <div className="shadow-lg rounded-xl overflow-hidden">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="p-4 bg-white border-t border-gray-200 flex items-center">
        <button
          type="button"
          onClick={toggleEmojiPicker}
          className="text-gray-600 hover:text-teal-500 transition-colors mr-2"
        >
          <FaSmile size={22} />
        </button>

        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
        />

        <button
          type="submit"
          className="ml-2 rounded-full bg-teal-500 text-white p-3 shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-colors duration-200"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
