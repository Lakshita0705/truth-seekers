
// NewsAPI service
// Uses the free NewsAPI.org API

const API_KEY = "YOUR_NEWS_API_KEY"; // Replace with your API key
const BASE_URL = "https://newsapi.org/v2";

export type NewsArticle = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export type NewsResponse = {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
};

export const fetchTopHeadlines = async (
  country: string = "us",
  category?: string
): Promise<NewsResponse> => {
  let url = `${BASE_URL}/top-headlines?country=${country}`;
  
  if (category) {
    url += `&category=${category}`;
  }
  
  url += `&apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching headlines:", error);
    return {
      status: "error",
      totalResults: 0,
      articles: [],
    };
  }
};

export const searchNews = async (query: string): Promise<NewsResponse> => {
  const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to search news');
    }
    return await response.json();
  } catch (error) {
    console.error("Error searching news:", error);
    return {
      status: "error",
      totalResults: 0,
      articles: [],
    };
  }
};
