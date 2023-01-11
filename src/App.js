import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SingleArticle from './components/SingleArticle';
import ArticleComment from './components/ArticleComments';
import { Link } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <div className="App">
        <Header />

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
      <Header />
      <Nav />
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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
