import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';
import BooksPage from '../booksPage/BooksPage';

import './app.scss';
import React from 'react';

const BookShelvesPage = React.lazy(
  () => import(/* webpackPrefetch: true */ '../bookShelvesPage/BookShelvesPage')
);
const BookChallengePage = React.lazy(
  () =>
    import(/* webpackPrefetch: true */ '../bookChallengePage/BookChallengePage')
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/bookshelf" element={<BookShelvesPage />} />
            <Route path="/challenges" element={<BookChallengePage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
