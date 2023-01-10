import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="navBar">
      <Link to={'/'}>
        <p className="topic">All</p>
      </Link>
    </div>
  );
};

export default Nav;
