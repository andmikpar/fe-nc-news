import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleComments, postNewComment } from '../utils/api';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
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
    if (!input) {
      setPostError('Empty comments not allowed!');
    } else
      postNewComment(articleId, input, loggedInUser)
        .then((res) => {
          setInput(null);
          if (res.message) {
            setPostError(res.message);
          }
        })
        .catch((err) => {
          return err;
        });
  }

  if (!isLoading) {
    return (
      <div className="commentPage">
        <Link to={`/articles/${articleId}`}>
          <p className="backButton">back</p>
        </Link>
        {postError ? (
          <p>{postError}</p>
        ) : (
          <div className="commentContainer">
            <div className="commentadder">
              {sentComment ? (
                <button
                  className="commentSubmit"
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
                  refresh
                </button>
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
            </div>
            {isError ? <p>{isError}</p> : <p></p>}

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
        )}
      </div>
    );
  }
};

export default ArticleComment;
