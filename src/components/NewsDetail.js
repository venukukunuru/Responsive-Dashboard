import React from "react";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();
  const news = {
    1: { title: "News Title 1", content: "Content for news 1" },
    2: { title: "News Title 2", content: "Content for news 2" },
  };

  const newsItem = news[id];

  if (!newsItem) {
    return <div>News not found!</div>;
  }

  return (
    <div>
      <h1>{newsItem.title}</h1>
      <p>{newsItem.content}</p>
    </div>
  );
};

export default NewsDetail;
