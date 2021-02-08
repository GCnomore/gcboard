import React, { useState } from "react";
import { AddAnotherList } from "./api/AddAnotherList";

import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/Board.css";

export default function Board() {
  const [list, setList] = useState([
    {
      title: "Sample",
      cards: [
        {
          title: "Sample Card",
          description: "Enter the description for this card",
          activities: "Isaac added this card to Sample",
          comments: "First comment",
          timeStamp: "Feb 3, 2021 9:55 AM",
        },
        {
          title: "Sample Card2",
          description: "Enter the description for this card",
          activities: "Isaac added this card to Sample",
          comments: "First comment",
          timeStamp: "Feb 3, 2021 9:55 AM",
        },
      ],
    },
  ]);
  const [addList, setAddList] = useState(false);

  const renderList = () => {
    return list.map((item) => {
      return (
        <div className="boardList">
          <section className="listHeader">
            <div className="listMenu">
              <a>
                <FontAwesomeIcon icon={faEllipsisH} />
              </a>
            </div>
            <div className="listTitle">
              <a>{item.title}</a>
            </div>
          </section>
          <section>{listItems(item.title)}</section>
          <section>
            <a>
              <FontAwesomeIcon icon={faPlus} /> Add another card
            </a>
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
      <div className="boardList">
        {addList ? (
          <AddAnotherList setAddList={setAddList} />
        ) : (
          <a onClick={() => setAddList(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add another list
          </a>
        )}
      </div>
    </Grid>
  );
}
