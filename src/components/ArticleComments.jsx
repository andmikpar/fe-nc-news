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
  setPrevPage,
}) => {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState(null);
  const [sentComment, setSentComment] = useState(false);
  const [postError, setPostError] = useState(null);

  function performGet() {
    getArticleComments(articleId)
      .then((result) => {
        setComments(result);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.code);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    performGet();
    setPrevPage(document.location.pathname);
  }, []);

  function updateList() {
    const newComment = {
      author: loggedInUser.username,
      body: input,
      votes: 0,
    };

    setComments([newComment, ...comments]);
  }

  function removeRender() {
    performGet();
    return postError;
  }

  function postComment(input) {
    setPostError(null);
    if (!input) {
      setPostError('Empty comments not allowed!');
    } else if (loggedInUser === 'Sign In') {
      setPostError('You need to sign in to comment!');
    } else
      postNewComment(articleId, input, loggedInUser)
        .then((res) => {
          setPostError(res);
          setInput(null);
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

        <div className="commentContainer">
          <div className="commentadder">
            {sentComment && !postError ? (
              <div className="successMessage">Message posted!</div>
            ) : (
              <form className="addComment">
                <textarea
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  placeholder="Add comment"
                  className="commentInput"
                ></textarea>

                <button
                  className="commentSubmit"
                  onClick={(e) => {
                    e.preventDefault();
                    postComment(input);
                    !postError ? updateList() : <p></p>;
                    setSentComment(true);
                  }}
                >
                  Add
                </button>
              </form>
            )}
            <br></br>
            {postError ? (
              <div className="postFeedback"> {removeRender()}</div>
            ) : (
              <p></p>
            )}
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
