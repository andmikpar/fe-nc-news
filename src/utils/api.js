import axios from 'axios';

const myApi = axios.create({
  baseURL: 'https://nc-news-k43r.onrender.com/api',
});

export const getAllArticles = () => {
  return myApi.get('/articles').then((res) => {
    return res.data.articles;
  });
};

export const getArticleById = (articleId) => {
  return myApi.get(`/articles/${articleId}`).then((res) => {
    return res.data.article;
  });
};

export const getArticleComments = (articleId) => {
  return myApi.get(`/articles/${articleId}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const patchArticleVotes = (articleId, num) => {
  return myApi
    .patch(`/articles/${articleId}`, { inc_votes: num })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const postNewComment = (article_id, input, loggedInUser) => {
  return myApi
    .post(`/articles/${article_id}/comments`, {
      username: loggedInUser.username,
      body: input,
    })
    .then((res) => {})
    .catch((err) => {
      return err.message;
    });
};

export const getUsers = () => {
  return myApi.get('/users').then((res) => {
    return res.data.users;
  });
};
