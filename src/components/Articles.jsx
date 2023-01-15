import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from '../utils/api';
import { useSearchParams } from 'react-router-dom';

const Articles = ({ setIsLoading, setIsError, setPrevPage, isLoading }) => {
  const [articleList, setArticleList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort_by, setSort_By] = useState(null);
  const [order_by, setOrder_By] = useState(null);
  const topicQuery = searchParams.get('topic');

  useEffect(() => {
    setIsLoading(true);
    setPrevPage(window.location.href);

    getAllArticles(topicQuery, sort_by, order_by)
      .then((articleData) => {
        setArticleList(articleData);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.code);
        setIsLoading(false);
      });
  }, [topicQuery, sort_by, order_by]);

  function buttonFiller(param) {
    const valuesArray = [
      'created_at',
      'votes',
      'comment_count',
      'title',
      'author',
      'ASC',
      'DESC',
    ];

    const optionName = [
      'Date',
      'Votes',
      'Number of Comments',
      ' Alphabetically',
      'Author',
      'Ascending',
      'Descending',
    ];
    if (!param) {
      return 'Choose One';
    } else {
      for (let i = 0; i < valuesArray.length; i++) {
        if (param === valuesArray[i]) {
          return optionName[i];
        }
      }
    }
  }

  if (!isLoading)
    return (
      <div className="articles">
        <div className="sort">
          <form
            onChange={(e) => {
              setSort_By(e.target.value);
            }}
          >
            <label>Sort by:</label>
            <select name="sortQuery" id="sortQuery">
              <option value="" disabled selected hidden>
                {buttonFiller(sort_by)}
              </option>
              <option value="created_at">Date</option>
              <option value="votes">Votes</option>
              <option value="comment_count">Number of Comments</option>
              <option value="title">Alphabetically</option>
              <option value="author">Author</option>
            </select>
          </form>
        </div>
        <div className="order">
          <form
            onChange={(e) => {
              setOrder_By(e.target.value);
            }}
          >
            <label>Order by:</label>
            <select name="orderQuery" id="orderQuery">
              <option value="" disabled selected hidden>
                {buttonFiller(order_by)}
              </option>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
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
