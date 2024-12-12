import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600">
          {article.body.substring(0, 100)}...
        </p>
      </div>
      <div className="px-4 pb-4 flex justify-end">
        <button className="text-blue-500 hover:text-blue-600 font-medium">
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
