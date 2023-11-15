import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

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
    <Transition in={isVisible} timeout={300} nodeRef={listItemRef}>
      {(state) => (
        <div
          ref={listItemRef}
          className={`card-of-book ${
            state === 'entered' ? 'visible' : 'hidden'
          }`}
          style={{
            transition: 'opacity 300ms ease-in-out',
            opacity: state === 'entered' ? 1 : 0,
          }}
        >
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
      )}
    </Transition>
  );
};

export default BooksListItem;
