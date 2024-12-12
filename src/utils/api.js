import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const fetchNews = async (query = "") => {
  try {
    const response = await axios.get(`${BASE_URL}posts`);

    if (query) {
      return response.data.filter((post) => post.title.includes(query));
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error.message);
    throw new Error("Failed to fetch news. Please try again later.");
  }
};
