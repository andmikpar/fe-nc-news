import { getArticleById } from '../utils/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { FiThumbsUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SingleArticle = ({ isLoading, setIsLoading, setIsError }) => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getArticleById(articleId)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.code);
        setIsLoading(false);
      });
  }, []);

  if (!isLoading) {
    return (
      <div className="singleArticleContainer">
        <div className="singleArticle">
          <p className="singleTitle">{article.title}</p>

          <p className="singleAuthor">Author: {article.author}</p>
          <br></br>
          <p className="singleDate">
            Published on:{' '}
            {new Date(article.created_at).toLocaleDateString('en-gb')}
          </p>

          <p className="singleBody">{article.body}</p>
          <div className="singleArticleInteractions">
            <Link
              to={`/articles/${articleId}/comments`}
              className="commentLink"
            >
              <button>
                <p className="singleComments">
                  <BiCommentDetail />
                  {article.comment_count}
                </p>
              </button>
            </Link>
            <p className="singleVotes">
              <FiThumbsUp />
              {article.votes}
            </p>
          </div>
        </div>
      </div>
    );
  }
};
export default SingleArticle;
