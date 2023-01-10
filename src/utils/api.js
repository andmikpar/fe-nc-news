import axios from 'axios';

const myApi = axios.create({
  baseURL: 'https://nc-news-k43r.onrender.com/api',
});

export const getAllArticles = () => {
  return myApi.get('/articles').then((res) => {
    return res.data.articles;
  });
};
