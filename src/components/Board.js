import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
  const renderList = () => {
    return list.map((item) => {
      return (
        <div className="boardList">
          <section className="listHeader">
            <div className="title">{item.title}</div>
            <div className="menu"></div>
          </section>
          <section>{listItems(item.title)}</section>
          <section>
            <FontAwesomeIcon icon={faPlus} /> Add another card
          </section>
        </div>
      );
    });
  };

  const listItems = (listTitle) => {
    const cards = list.filter((item) => item.title == listTitle);
    console.log(cards[0].cards);
    return cards[0].cards.map((item) => {
      return <div className="listItems">{item.title}</div>;
    });
  };

  return (
    <Grid container className="boardWrapper">
      {renderList()}
      <div className="addList">
        <FontAwesomeIcon icon={faPlus} /> Add another list
      </div>
    </Grid>
  );
}
