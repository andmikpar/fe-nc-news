import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../utils/api';
import { useSearchParams } from 'react-router-dom';

const Articles = ({ setIsLoading, setIsError, setPrevPage }) => {
  const [articleList, setArticleList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get('topic');

  useEffect(() => {
    setIsLoading(true);
    setPrevPage(window.location.href);

    getAllArticles(topicQuery)
      .then((articleData) => {
        setArticleList(articleData);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.code);
        setIsLoading(false);
      });
  }, [topicQuery]);

  return (
    <div className="articles">
      {articleList.map((article) => {
        return (
          <Link
            to={`/articles/${article.article_id}`}
            key={article.article_id}
            className="articleLink"
          >
            <div className="article">
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
