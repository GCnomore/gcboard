import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { grabAndSlide } from "./api/api";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function Board() {
  const [currentList, setList] = useState([
    {
      title: "Sample",
      cards: [
        {
          title: "Sample Card",
          description: "Enter the description for this card",
          activities: "Isaac added this card to Sample",
          comments: "First comment",
          timeStamp: "Feb 3, 2021 9:55 AM",
          show: false,
        },
        {
          title: "Sample Card2",
          description: "Enter the description for this card",
          activities: "Isaac added this card to Sample",
          comments: "First comment",
          timeStamp: "Feb 3, 2021 9:55 AM",
          show: false,
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
          show: false,
        },
        {
          title: "Sample Card2",
          description: "Enter the description for this card",
          activities: "Isaac added this card to Sample",
          comments: "First comment",
          timeStamp: "Feb 3, 2021 9:55 AM",
          show: false,
        },
        {
          title: "Sample Card2",
          description: "Enter the description for this card",
          activities: "Isaac added this card to Sample",
          comments: "First comment",
          timeStamp: "Feb 3, 2021 9:55 AM",
          show: false,
        },
      ],
    },
  ]);
  const [addList, setAddList] = useState({
    add: false,
    title: "",
  });
  const [card, setCard] = useState("");
  const [open, setOpen] = useState(false);
  const [editCard, setEditCard] = useState();
  const [showAddCard, setShowAddCard] = useState({ id: null, show: false });

  const handleModalOpen = (item, title) => {
    setOpen(true);
    setEditCard({ data: item, title });
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    grabAndSlide("boardWrapper");
  }, []);

  const renderAddList = () => {
    return (
      <AddList>
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
                ...currentList,
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
          <XButton>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                setAddList({ add: false, title: "" });
              }}
            />
          </XButton>
        </div>
      </AddList>
    );
  };

  const renderAddCard = (i, title) => {
    const show = showAddCard.id === i ? showAddCard.show : false;
    return (
      <AddCard show={show}>
        <input
          value={card}
          placeholder="Enter card title"
          onChange={(e) => {
            setCard(e.target.value);
          }}
        />
        <div>
          <Button
            variant="contained"
            onClick={() => {
              addCard(title);
            }}
          >
            Add
          </Button>
          <XButton>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={(e) => {
                if (i === showAddCard.id) {
                  setShowAddCard({
                    id: i,
                    show: false,
                  });
                }
              }}
            />
          </XButton>
        </div>
      </AddCard>
    );
  };

  const renderList = () => {
    return currentList.map((item, i) => {
      const show = showAddCard.id === i ? !showAddCard.show : true;
      return (
        <BoardList key={i}>
          <ListHeader>
            <div>
              <a href="/">
                <FontAwesomeIcon icon={faEllipsisH} />
              </a>
            </div>
            <ListTitle>
              <a href="/">{item.title}</a>
            </ListTitle>
          </ListHeader>
          <section>{renderCards(item.title)}</section>
          <section>
            {renderAddCard(i, item.title)}
            <AddAnotherCard
              show={show}
              onClick={(e) => {
                setShowAddCard({ id: i, show: true });
              }}
            >
              <FontAwesomeIcon icon={faPlus} /> Add another card
            </AddAnotherCard>
          </section>
        </BoardList>
      );
    });
  };

  const renderCards = (listTitle) => {
    const cards = currentList.filter((item) => item.title === listTitle);

    return cards[0].cards.map((item, i) => {
      return (
        <ListItems
          key={i}
          onClick={() => {
            handleModalOpen(item, cards[0].title);
            item.show = true;
            setList([...currentList]);
          }}
        >
          {item.title}
        </ListItems>
      );
    });
  };

  const addCard = (title) => {
    const newCard = {
      title: card,
      timeStamp: new Date(),
      description: "",
      comments: "",
      activities: "",
      show: false,
    };
    const list = currentList.find((item) => item.title === title);
    list.cards = [...list.cards, newCard];
    const newList = [...currentList];

    setList(newList);
    setCard("");
  };

  const renderEditCard = () => {
    if (editCard) {
      return (
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Cards data={editCard} />
        </Modal>
      );
    } else {
      return null;
    }
  };

  return (
    <BoardWrapper className="boardWrapper">
      {renderEditCard()}
      {renderList()}
      <AddAnotherList>
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
      </AddAnotherList>
    </BoardWrapper>
  );
}

/*




Styles





*/

const BoardWrapper = styled.div`
  padding-top: 20vh;
  height: 80vh;
  overflow-x: auto;
  display: flex;
  &:active {
    cursor: grabbing;
  }
`;

const BoardList = styled.div`
  min-width: 18rem;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1.5px);
  margin: 0 0.75rem 0 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: 500;
`;

const AddAnotherList = styled(BoardList)``;

const ListItems = styled.div`
  padding: 0.5rem;
  margin: 0.75rem 0 0.75rem 0;
  background-color: rgba(102, 101, 99, 0.568);
  backdrop-filter: blur(1.5px);
  border-radius: 0.25rem;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    filter: brightness(70%);
    transition: 0.75s;
  }
`;

const ListHeader = styled.div`
  height: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > div > a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }
`;

const ListTitle = styled.div`
  height: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
  > a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }
`;

const AddList = styled.div`
  display: flex;
  flex-direction: column;
  > input {
    height: 1.5rem;
  }
  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
`;

const AddCard = styled(AddList)`
  display: ${(props) => (props.show ? "flex" : "none")};
`;

const XButton = styled.div`
  font-size: 2rem;
  vertical-align: middle;
`;

const AddAnotherCard = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
`;
