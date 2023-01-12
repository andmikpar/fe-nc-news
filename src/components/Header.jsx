import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
const Header = ({ loggedInUser, setIsLoading }) => {
  return (
    <div className="header">
      <h1>Northcoders News</h1>
      <div className="loggedUser">
        <Link
          to={'/users'}
          className="loginButton"
          onClick={() => setIsLoading(true)}
        >
          <BiUserCircle />
          <p className="currentUsername">{loggedInUser}</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
