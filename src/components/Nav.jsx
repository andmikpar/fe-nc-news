import { Link } from 'react-router-dom';

const Nav = ({ setIsLoading }) => {
  return (
    <div className="navBar">
      <Link
        to={'/'}
        onClick={() => {
          setIsLoading(true);
        }}
      >
        <p className="topic">All</p>
      </Link>
    </div>
  );
};

export default Nav;
