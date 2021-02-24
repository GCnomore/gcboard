import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import {
  faEllipsisH,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function Board({ data, handleModalOpen, setOpen }) {
  const [card, setCard] = useState("");
  const [showAddCard, setShowAddCard] = useState({ id: null, show: false });
  const [currentList, setCurrentList] = useState(data);
  const [addList, setAddList] = useState({
    add: false,
    title: "",
  });

  const renderAddCard = (index, listTitle) => {
    const show = showAddCard.id === index ? showAddCard.show : false;
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
              addCard(listTitle);
            }}
          >
            Add
          </Button>
          <XButton>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={(e) => {
                if (index === showAddCard.id) {
                  setShowAddCard({
                    id: index,
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

  const renderCards = (listTitle) => {
    const cards = currentList.filter((item) => item.title === listTitle);

    return cards[0].cards.map((item, index) => {
      return (
        <ListItems
          key={index}
          onClick={() => {
            setOpen(true);
            handleModalOpen(item, cards[0].title);
            item.show = true;
            setCurrentList([...currentList]);
          }}
        >
          {item.title}
        </ListItems>
      );
    });
  };

  const addCard = (listTitle) => {
    const time =
      new Date().getHours() > 12
        ? `${new Date().getHours() - 12}:${new Date().getMinutes()}PM`
        : `${new Date().getHours()}:${new Date().getMinutes()}AM`;

    const newCard = {
      title: card,
      timeStamp: `${time} ${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}`,
      description: "",
      comments: `This card was created by `,
      show: false,
    };
    const list = currentList.find((item) => item.title === listTitle);
    list.cards = [...list.cards, newCard];
    const newList = [...currentList];

    setCurrentList(newList);
    setCard("");
  };

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
              setCurrentList([
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

  return (
    <>
      {currentList.map((item, i) => {
        const show = showAddCard.id === i ? !showAddCard.show : true;

        return (
          <ListContainer key={i}>
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
          </ListContainer>
        );
      })}
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
    </>
  );
}

/*




Styles





*/

const ListContainer = styled.div`
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

const XButton = styled.div`
  font-size: 2rem;
  vertical-align: middle;
`;

const AddAnotherCard = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
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

const AddAnotherList = styled(ListContainer)``;
