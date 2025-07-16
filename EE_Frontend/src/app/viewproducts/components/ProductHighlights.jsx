const ProductHighlights = ({ highlights }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Características destacadas:</h3>
      <ul className="mt-2 space-y-3">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start">
            <span className="bg-teal-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </span>
            <span className="text-gray-600">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductHighlights;
