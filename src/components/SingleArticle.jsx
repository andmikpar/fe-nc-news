import { getArticleById, patchArticleVotes } from '../utils/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SingleArticle = ({ isLoading, setIsLoading }) => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [voteCount, setVoteCount] = useState(0);
  const [voted, setVoted] = useState(0);
  const [voteError, setVoteError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(articleId)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
        setVoteCount(article.votes);
      })
      .catch((err) => {
        setVoteError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleVote = (addOrMinus) => {
    if (addOrMinus === 'add') {
      setVoted(voted + 1);
      setVoteCount(voteCount + 1);
      patchArticleVotes(article.article_id, +1)
        .then((res) => {
          if (res.message) {
            setVoteError(res.message);
          }
        })
        .catch((err) => {
          return err;
        });
    } else {
      setVoted(voted - 1);
      setVoteCount(voteCount - 1);
      patchArticleVotes(article.article_id, -1)
        .then((res) => {
          if (res.message) {
            setVoteError(res.message);
          }
        })
        .catch((err) => {
          return err;
        });
    }
  };

  const Votes = () => {
    return (
      <div className="singleVotes">
        <button
          aria-label="plus1Vote"
          id="addVote"
          className="voteButton"
          disabled={voted === 0 || voted === -1 ? false : true}
          onClick={(e) => {
            handleVote('add');
          }}
        >
          <FiThumbsUp className="articleVote" />
        </button>
        <p className="voteCount">{voteCount}</p>
        <button
          aria-label="minus1Vote"
          id="minusVote"
          className="voteButton"
          disabled={voted === 0 || voted === 1 ? false : true}
          onClick={() => {
            handleVote('minus');
          }}
        >
          <FiThumbsDown className="articleVote" />
        </button>
      </div>
    );
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

            {voteError ? <p className="failedVote">{voteError}</p> : <Votes />}
          </div>
        </div>
      </div>
    );
  }
};
export default SingleArticle;
