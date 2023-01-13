import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../utils/api';
import { useSearchParams } from 'react-router-dom';

const Articles = ({ setIsLoading, setIsError, setPrevPage }) => {
  const [articleList, setArticleList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort_by, setSort_By] = useState('');
  const topicQuery = searchParams.get('topic');
  const sortByQuery = searchParams.get('sort_by');
  console.log(sortByQuery);

  useEffect(() => {
    setIsLoading(true);
    setPrevPage(window.location.href);

    getAllArticles(topicQuery, sort_by)
      .then((articleData) => {
        setArticleList(articleData);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.code);
        setIsLoading(false);
      });
  }, [topicQuery, sortByQuery]);

  return (
    <div className="articles">
      <div className="order">
        <form
          onChange={(e) => {
            setSort_By(e.target.value);
          }}
        >
          <label>Order by:</label>
          <select name="sortQuery" id="sortQuery">
            <option value="" disabled selected hidden>
              Choose one
            </option>
            <option value="article_id">Article ID</option>
            <option value="created_at">Date</option>
          </select>
        </form>
      </div>
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
