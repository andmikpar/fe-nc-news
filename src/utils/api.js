import axios from 'axios';

const myApi = axios.create({
  baseURL: 'https://nc-news-k43r.onrender.com/api',
});

export const getAllArticles = (topic, sorted_by, ordered_by) => {
  return myApi
    .get('/articles', { params: { topic, sorted_by, ordered_by } })
    .then((res) => {
      return res.data.articles;
    })
    .catch((err) => {
      return err;
    });
};

export const getArticleById = (articleId) => {
  return myApi
    .get(`/articles/${articleId}`)
    .then((res) => {
      return res.data.article;
    })
    .catch((err) => {
      return err;
    });
};

export const getArticleComments = (articleId) => {
  return myApi
    .get(`/articles/${articleId}/comments`)
    .then((res) => {
      return res.data.comments;
    })
    .catch((err) => {
      return err;
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
  return myApi
    .get('/users')
    .then((res) => {
      return res.data.users;
    })
    .catch((err) => {
      return err;
    });
};

export const getTopics = () => {
  return myApi
    .get(`/topics`)
    .then((res) => {
      return res.data.topics;
    })
    .catch((err) => {
      return err;
    });
};
