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
        <div className="viewOptions">
          <div className="dropdown">
            <button className="dropbtn">Sort By</button>
            <div className="dropdown-content">
              <button
                className="dropdownOption"
                value="created_at"
                onClick={(e) => {
                  setSort_By(e.target.value);
                }}
              >
                Date
              </button>
              <button
                className="dropdownOption"
                value="votes"
                onClick={(e) => {
                  setSort_By(e.target.value);
                }}
              >
                Votes
              </button>
              <button
                className="dropdownOption"
                value="comment_count"
                onClick={(e) => {
                  setSort_By(e.target.value);
                }}
              >
                Number of Comments
              </button>
              <button
                className="dropdownOption"
                value="title"
                onClick={(e) => {
                  setSort_By(e.target.value);
                }}
              >
                Alphabetically
              </button>

              <button
                className="dropdownOption"
                value="author"
                onClick={(e) => {
                  setSort_By(e.target.value);
                }}
              >
                Author
              </button>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">Order By</button>
            <div className="dropdown-content">
              <button
                className="dropdownOption"
                value="DESC"
                onClick={(e) => {
                  setOrder_By(e.target.value);
                }}
              >
                Descending
              </button>
              <button
                className="dropdownOption"
                value="ASC"
                onClick={(e) => {
                  setOrder_By(e.target.value);
                }}
              >
                Ascending
              </button>
            </div>
          </div>
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
