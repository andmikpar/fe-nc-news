import { getArticleById, patchArticleVotes } from '../utils/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SingleArticle = ({ isLoading, setIsLoading, setIsError }) => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(articleId)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
        setVoteCount(article.votes);
      })
      .catch((err) => {
        setIsError(err.code);
        setIsLoading(false);
      });
  }, []);

  const handleVote = (addOrMinus) => {
    if (addOrMinus === 'add') {
      setVoteCount(voteCount + 1);
      patchArticleVotes(article.article_id, +1)
        .then((res) => {
          if (res.message) {
            setIsError(res.message);
          }
        })
        .catch((err) => {
          return err;
        });
    } else {
      setVoteCount(voteCount - 1);
      patchArticleVotes(article.article_id, -1);
    }
  };

  if (!isLoading) {
    return (
      <div className="singleArticleContainer">
        <div className="singleArticle">
          <p className="singleTitle">{article.title}</p>

          <p className="singleAuthor">Author: {article.author}</p>
          <br></br>
          <p className="singleDate">
            Published on:
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
            <div className="singleVotes">
              <button
                id="addVote"
                className="voteButton"
                onClick={() => {
                  handleVote('add');
                }}
              >
                <FiThumbsUp className="articleVote" />
              </button>
              <p className="voteCount">{voteCount}</p>
              <button
                id="minusVote"
                className="voteButton"
                onClick={() => {
                  handleVote('minus');
                }}
              >
                <FiThumbsDown className="articleVote" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default SingleArticle;
