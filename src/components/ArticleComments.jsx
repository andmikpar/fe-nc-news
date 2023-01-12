import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleComments, postNewComment } from '../utils/api';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ArticleComment = ({ isLoading, setIsLoading, setIsError }) => {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');

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
    return postNewComment(articleId, input);
  }

  if (!isLoading) {
    return (
      <div>
        <Link to={`/articles/${articleId}`}>
          <p className="backButton">back</p>
        </Link>
        <div className="commentContainer">
          <div className="commentadder">
            <form className="addComment">
              <input
                onChange={(e) => setInput(e.target.value)}
                typeof="text"
                placeholder="add comment"
                className="commentInput"
              ></input>

              <button
                className="commentSubmit"
                onClick={(e) => {
                  postComment(input);
                }}
              >
                Add
              </button>
            </form>
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
