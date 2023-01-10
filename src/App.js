import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import SingleArticle from './components/SingleArticle';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [IsError, setIsError] = useState(false);
  const [articleId, setArticleId] = useState();

  if (IsError) {
    return (
      <div className="App">
        <Header />
        <Nav />
        {console.log(IsError)}
        <p>Sorry, something went wrong</p>
        <p>{IsError}</p>
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
          <p>Loading Articles</p>
        </div>
      ) : (
        <p></p>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Articles
              setIsError={setIsError}
              setIsLoading={setIsLoading}
              setArticleId={setArticleId}
            />
          }
        />
        <Route
          path="/articles/:articleId"
          element={
            <SingleArticle
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
