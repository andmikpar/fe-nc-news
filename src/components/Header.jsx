import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
const Header = ({ loggedInUser, setIsLoading }) => {
  return (
    <div className="header">
      <h1 className="logo">Northcoders News</h1>
      <div className="loggedUser">
        <Link to={'/users'} className="loginButton">
          <BiUserCircle />
          {loggedInUser !== 'Sign In' ? (
            <p className="currentUsername">{loggedInUser.name}</p>
          ) : (
            <p className="signInLink">Sign In</p>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
