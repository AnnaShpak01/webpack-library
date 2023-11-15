import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

type BookItemType = {
  name: string;
  author: string;
  genre: string;
  pages: number;
  status: string;
  onDelete: () => void;
};

const BooksListItem = ({
  name,
  author,
  genre,
  pages,
  status,
  onDelete,
}: BookItemType) => {
  const listItemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      classNames="fade"
      nodeRef={listItemRef}
      unmountOnExit
    >
      <div ref={listItemRef} className={`card-of-book`}>
        <div className="card-name">{name}</div>
        <div className="card-author">{author}</div>
        <div className="card-genre">{genre}</div>
        <div className="card-pages">{pages}</div>
        <div className="card-status">{status}</div>
        <div>
          <span onClick={onDelete} className="badge bordered rounded-pill">
            <button
              type="button"
              className="btn-close btn-close"
              aria-label="Close"
            ></button>
          </span>
        </div>
      </div>
    </CSSTransition>
  );
};

export default BooksListItem;
