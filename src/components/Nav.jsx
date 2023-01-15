import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../utils/api';

const Nav = ({ setIsLoading, setIsError }) => {
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopicList(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err);
      });
  }, []);

  return (
    <div className="topics">
      <Link to={'/'} className="topicLink">
        <p className="topicName"> All </p>
      </Link>

      {topicList.map((topic) => {
        return (
          <Link
            to={`/?topic=${topic.slug}`}
            key={topic.slug}
            className="topicLink"
          >
            <div className="topic" key={topic.slug}>
              <p className="topicName">{topic.slug}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Nav;
