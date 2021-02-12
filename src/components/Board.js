import React, { useState, useEffect, useRef } from "react";

import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
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
    {
      title: "Sample2",
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
  const [addList, setAddList] = useState({
    add: false,
    title: "",
  });
  const [newCard, setNewCard] = useState();

  const ref = useRef();
  useEffect(() => {
    ref.current = addList;
  }, [addList]);
  const prevAddList = ref.current;

  const renderAddList = () => {
    return (
      <div className="addList">
        <input
          placeholder="Enter list title"
          onChange={(e) => {
            setAddList({ add: true, title: e.target.value });
          }}
        />
        <div>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setList([
                ...list,
                {
                  title: addList.title,
                  cards: [],
                },
              ]);
              setAddList({ add: false });
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

  const renderAddCard = () => {
    return (
      <div className="addCard hide">
        <input
          placeholder="Enter card title"
          onChange={(e) => {
            setNewCard(e.target.value);
          }}
        />
        <div>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              const container =
                e.target.parentNode.parentNode.parentNode.parentNode
                  .lastElementChild;
              container.classList.remove("hide");
              const listTitle =
                container.parentNode.parentNode.firstElementChild
                  .lastElementChild.firstElementChild.innerText;
              console.log(listTitle);
              addCard(listTitle);
            }}
          >
            Add
          </Button>
          <FontAwesomeIcon
            className="xBtn"
            icon={faTimes}
            onClick={(e) => {
              const container =
                e.target.parentNode.parentNode.parentNode.parentNode
                  .lastElementChild;

              const _container =
                e.target.parentNode.parentNode.parentNode.parentNode
                  .firstElementChild;

              if (
                container.classList[0] === "addCardBtn" &&
                _container.classList[0] === "addCard"
              ) {
                container.classList.remove("hide");
                _container.classList.add("hide");
              }
            }}
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
          <section>{renderCards(item.title)}</section>
          <section>
            {renderAddCard()}
            <div
              className="addCardBtn"
              onClick={(e) => {
                e.target.parentNode.firstElementChild.classList.remove("hide");
                e.target.classList.add("hide");
              }}
            >
              <FontAwesomeIcon icon={faPlus} /> Add another card
            </div>
          </section>
        </div>
      );
    });
  };

  const renderCards = (listTitle) => {
    const cards = list.filter((item) => item.title === listTitle);

    return cards[0].cards.map((item) => {
      return <div className="listItems">{item.title}</div>;
    });
  };

  const addCard = (listTitle) => {
    //newCard == card title
    const targetList = list.filter((item) => item.title === listTitle);
    setList();
  };

  return (
    <div className="boardWrapper">
      {renderList()}
      <div className="boardList">
        {addList.add ? (
          renderAddList()
        ) : (
          <div
            onClick={() =>
              setAddList({
                add: true,
                title: addList.title,
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
