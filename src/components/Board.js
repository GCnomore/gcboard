import React, { useState, useEffect, useRef } from 'react';

import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Board.css';

export default function Board() {
  const [list, setList] = useState([
    {
      title: 'Sample',
      cards: [
        {
          title: 'Sample Card',
          description: 'Enter the description for this card',
          activities: 'Isaac added this card to Sample',
          comments: 'First comment',
          timeStamp: 'Feb 3, 2021 9:55 AM',
        },
        {
          title: 'Sample Card2',
          description: 'Enter the description for this card',
          activities: 'Isaac added this card to Sample',
          comments: 'First comment',
          timeStamp: 'Feb 3, 2021 9:55 AM',
        },
      ],
    },
  ]);
  const [addList, setAddList] = useState({
    add: false,
    title: '',
  });

  const ref = useRef();
  useEffect(() => {
    ref.current = addList;
  }, [addList]);
  const prevAddList = ref.current;

  useEffect(() => {
    ref.current = list;
  }, [list]);
  const prevList = ref.current;

  const addAnotherList = () => {
    return (
      <div className="addList">
        <input
          placeholder="Enter list title"
          onChange={(e) => setAddList({ add: true, title: e.target.value })}
        />
        <div>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setList([
                prevList,
                {
                  title: addList,
                  cards: [],
                },
              ]);
            }}
          >
            Add
          </Button>
          <FontAwesomeIcon
            className="xBtn"
            icon={faTimes}
            onClick={() => setAddList({ add: false, title: prevAddList.title })}
          />
        </div>
      </div>
    );
  };

  const renderList = () => {
    return list.map((item) => {
      return (
        <div className="boardList">
          <section className="listHeader">
            <div className="listMenu">
              <a href="/">
                <FontAwesomeIcon icon={faEllipsisH} />
              </a>
            </div>
            <div className="listTitle">
              <a href="/">{item.title}</a>
            </div>
          </section>
          <section>{listItems(item.title)}</section>
          <section>
            <a href="/">
              <FontAwesomeIcon icon={faPlus} /> Add another card
            </a>
          </section>
        </div>
      );
    });
  };

  const listItems = (listTitle) => {
    const cards = list.filter((item) => item.title === listTitle);

    return cards[0].cards.map((item) => {
      return <div className="listItems">{item.title}</div>;
    });
  };

  console.log(prevList, prevAddList);

  return (
    <div container className="boardWrapper">
      {renderList()}
      <div className="boardList">
        {addList.add ? (
          addAnotherList()
        ) : (
          <div
            onClick={() =>
              setAddList({
                add: true,
                title: prevAddList ? prevAddList.title : '',
              })
            }
          >
            <FontAwesomeIcon icon={faPlus} /> Add another list
          </div>
        )}
      </div>
    </div>
  );
}
