import { getArticleById } from '../utils/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SingleArticle = ({ setIsLoading, setIsError }) => {
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
  console.log(article);
  return (
    <div className="singleArticle">
      <p>{article.title}</p>
      <p>{article.author}</p>
      <p>{article.created_at}</p>
      <p>{article.topic}</p>
      <p>{article.body}</p>
      <p>{article.comment_count}</p>
      <p>{article.votes}</p>
    </div>
  );
};

export default SingleArticle;
