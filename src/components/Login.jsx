import { useState, useEffect } from 'react';
import { getUsers } from '../utils/api';
import { Link } from 'react-router-dom';

const Login = ({ setLoggedInUser, setIsLoading, setIsError, isLoading }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUsers()
      .then((userData) => {
        setUserList(userData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err);
      });
  }, []);

  return (
    <div>
      <h2>Choose who to sign in as</h2>
      <br></br>
      <div className="users">
        {userList.map((user) => {
          return (
            <Link
              to={`/`}
              className="userCard"
              onClick={() => {
                setLoggedInUser(user);
              }}
            >
              <div className="user" key={user.username}>
                <p className="username">{user.username}</p>
                <img
                  src={user.avatar_url}
                  alt="user avatar"
                  className="avatar"
                ></img>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Login;
