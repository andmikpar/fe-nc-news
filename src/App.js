import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SingleArticle from './components/SingleArticle';
import ArticleComment from './components/ArticleComments';
import { Link } from 'react-router-dom';
import Login from './components/Login';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('Sign In');
  const [prevPage, setPrevPage] = useState('');

  if (isError) {
    return (
      <div className="App">
        <Header loggedInUser={loggedInUser} setIsLoading={setIsLoading} />

        <p>Sorry, something went wrong</p>
        <p>{isError}</p>
        <Link to={'/'} className="homeLink">
          <button
            className="errorButton"
            onClick={() => {
              setIsError(null);
            }}
          >
            <p className="errorButton">Back to Homepage</p>
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="App">
      <Header loggedInUser={loggedInUser} setIsLoading={setIsLoading} />
      <Nav setIsLoading={setIsLoading} />
      {isLoading ? (
        <div className="loading">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
          <p>Loading</p>
        </div>
      ) : (
        <p></p>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Articles setIsError={setIsError} setIsLoading={setIsLoading} />
          }
        />
        <Route
          path="/articles/:articleId"
          element={
            <SingleArticle
              isLoading={isLoading}
              setIsError={setIsError}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/articles/:articleId/comments"
          element={
            <ArticleComment
              isLoading={isLoading}
              setIsError={setIsError}
              setIsLoading={setIsLoading}
              loggedInUser={loggedInUser}
              isError={isError}
              setPrevPage={setPrevPage}
            />
          }
        />
        <Route
          path="/users"
          element={
            <Login
              setLoggedInUser={setLoggedInUser}
              setIsError={setIsError}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              prevPage={prevPage}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
