import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleComments, postNewComment } from '../utils/api';
import { FiThumbsDown, FiThumbsUp, FiRefreshCcw } from 'react-icons/fi';

import { Link } from 'react-router-dom';

const ArticleComment = ({
  isError,
  isLoading,
  setIsLoading,
  setIsError,
  loggedInUser,
}) => {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState(null);
  const [sentComment, setSentComment] = useState(false);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticleComments(articleId)
      .then((result) => {
        setComments(result);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.code);
        setIsLoading(false);
      });
  }, []);

  function postComment(input) {
    setPostError(null);
    if (!input) {
      setPostError('Empty comments not allowed!');
    } else if (loggedInUser === 'Sign In') {
      setPostError('You need to sign in to comment!');
    }
    postNewComment(articleId, input, loggedInUser)
      .then((res) => {
        setInput(null);
      })
      .catch((err) => {
        return err;
      });
  }

  const RefreshButton = () => {
    return (
      <button
        className="refreshComments"
        onClick={() => {
          setIsLoading(true);
          getArticleComments(articleId)
            .then((result) => {
              setComments(result);
              setIsLoading(false);
              setSentComment(false);
            })
            .catch((err) => {
              setIsError(err.message);
              setIsLoading(false);
            });
        }}
      >
        <p>
          Refresh <FiRefreshCcw />
        </p>
      </button>
    );
  };

  if (!isLoading) {
    return (
      <div className="commentPage">
        <Link to={`/articles/${articleId}`}>
          <p className="backButton">back</p>
        </Link>

        <div className="commentContainer">
          <div className="commentadder">
            {sentComment && !postError ? (
              <p>Message posted</p>
            ) : (
              <form className="addComment">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  typeof="text"
                  value={input}
                  placeholder="add comment"
                  className="commentInput"
                ></input>

                <button
                  className="commentSubmit"
                  onClick={(e) => {
                    e.preventDefault();
                    postComment(input);
                    setSentComment(true);
                  }}
                >
                  Add
                </button>
              </form>
            )}
            {postError ? postError : <p></p>}
            {sentComment && !postError ? <RefreshButton /> : <p></p>}
          </div>

          <div className="comments">
            {comments.map((comment) => {
              return (
                <div className="comment" key={comment.comment_id}>
                  <p>{comment.body}</p>
                  <div className="commentInfo">
                    <p className="commentAuthor">User: {comment.author}</p>
                    <div className="votesContainer">
                      <FiThumbsUp className="voter" />
                      <p> {comment.votes} </p>
                      <FiThumbsDown className="voter" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default ArticleComment;
