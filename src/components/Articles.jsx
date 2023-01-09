import { useEffect, useState } from 'react';
import { getAllArticles } from '../utils/api';

const Articles = () => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    getAllArticles().then((articleData) => {
      setArticleList(articleData);
    });
  }, []);

  return (
    <div className="articles">
      {articleList.map((article) => {
        return (
          <div className="article">
            <p className="articleTitle">{article.title}</p>
            <p>Written By: {article.author}</p>
            <p>Votes: {article.votes} </p>
            <p> Comments: {article.comment_count}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Articles;
