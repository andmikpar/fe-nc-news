import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleComments } from '../utils/api';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';

const ArticleComment = ({ isLoading, setIsLoading, setIsError }) => {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);

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

  if (!isLoading) {
    return (
      <div className="commentContainer">
        <div className="comments">
          {comments.map((comment) => {
            return (
              <div className="comment" key={comments.comment_id}>
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
    );
  }
};

export default ArticleComment;
