import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../utils/api';

const Articles = ({ setIsLoading, setIsError }) => {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    getAllArticles()
      .then((articleData) => {
        setArticleList(articleData);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.code);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="articles">
      {articleList.map((article) => {
        return (
          <Link to={`/articles/${article.article_id}`} className="articleLink">
            <div className="article" key={article.article_id}>
              <p className="articleTitle">{article.title}</p>
              <p>Written By: {article.author}</p>
              <p>Votes: {article.votes} </p>
              <p> Comments: {article.comment_count}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default Articles;
