import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <div className="App">
        <Header />
        <Nav />

        <p>Sorry, something went wrong</p>
        <p>{isError}</p>
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
            <Articles setIsError={setIsError} setIsLoading={setIsLoading} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
