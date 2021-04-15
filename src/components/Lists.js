import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import Error from "./Error";
import PropTypes from "prop-types";
import { ACTIONS } from "../App";

import styled from "styled-components/macro";
import {
  faEllipsisH,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@material-ui/core/Modal";

export default function Lists({ state, dispatch, handleModalOpen, setOpen }) {
  const currentBoard = state.currentBoard.filter((board) => board.selected);
  const [card, setCard] = useState("");
  const [editListTitle, setEditListTitle] = useState({
    listTitle: "",
    edit: false,
  });
  const [newListTitle, setNewListTItle] = useState("");

  const { lists } = currentBoard[0];

  editListTitle.edit &&
    window.addEventListener(
      "keydown",
      (e) =>
        e.code === "Escape" && setEditListTitle({ listTitle: "", edit: false })
    );

  useEffect(() => {
    localStorage.setItem("gc_board_data", JSON.stringify(currentBoard[0]));
  }, [currentBoard]);

  const renderAddCard = (index, listTitle) => {
    const show = state.showAddCard
      ? state.showAddCard.id === index
        ? state.showAddCard.show
        : false
      : false;
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
              if (card !== "") {
                addCard(listTitle);
              } else {
                errorModalOpen("Card must have title");
              }
            }}
          >
            Add
          </Button>
          <XButton>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                if (index === state.showAddCard.id) {
                  dispatch({ type: ACTIONS.ADD_CARD, index });
                }
              }}
            />
          </XButton>
        </div>
      </AddCard>
    );
  };

  const renderCards = (listTitle) => {
    if (lists.length !== 0) {
      const cards = lists.filter((list) => list.title === listTitle);

      return cards[0].cards.map((item, index) => {
        return (
          <ListItems
            key={index}
            onClick={() => {
              setOpen(true);
              handleModalOpen(item, cards[0].title);
            }}
          >
            {item.title}
          </ListItems>
        );
      });
    } else {
      return null;
    }
  };

  const renderAddList = () => {
    return (
      <AddList>
        <input
          placeholder="Enter list title"
          onChange={(e) => {
            dispatch({
              type: ACTIONS.ADD_LIST,
              add: true,
              value: e.target.value,
            });
          }}
        />
        <div>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              addList();
            }}
          >
            Add
          </Button>
          <XButton>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                dispatch({ type: ACTIONS.ADD_LIST, add: false, value: "" });
              }}
            />
          </XButton>
        </div>
      </AddList>
    );
  };

  const showListMenu = (listTitle, index) => {
    return (
      <ListMenu className="listMenu">
        <div className="listMenu">Sort by</div>
        <div
          className="listMenu"
          onClick={() => {
            deleteList(listTitle);
            dispatch({ type: ACTIONS.LIST_MENU, index });
          }}
        >
          Delete
        </div>
      </ListMenu>
    );
  };

  const errorModalOpen = (message) => {
    dispatch({ type: ACTIONS.SHOW_MODAL, payload: { show: true, message } });
  };

  const onModalClose = () => {
    dispatch({
      type: ACTIONS.SHOW_MODAL,
      payload: { show: false, message: "" },
    });
  };

  const showErrorModal = (message) => {
    return (
      <Modal
        open={state.showModal.show}
        onClose={onModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Error message={message} />
      </Modal>
    );
  };

  const addCard = (listTitle) => {
    const time =
      new Date().getHours() > 12
        ? `${new Date().getHours() - 12}:${new Date().getMinutes()}PM`
        : `${new Date().getHours()}:${new Date().getMinutes()}AM`;
    const timeStamp = `${time} ${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}`;
    const newCard = {
      title: card,
      timeStamp,
      description: "",
      comments: [
        { text: `This card was created by Isaac`, created: timeStamp },
      ],
    };
    const list = lists.find((item) => item.title === listTitle);
    list.cards = [...list.cards, newCard];
    const newList = [...lists];
    const newBoard = {
      name: currentBoard[0].name,
      selected: currentBoard[0].selected,
      lists: newList,
      id: currentBoard[0].id,
      type: currentBoard[0].type,
    };
    dispatch({
      type: ACTIONS.CURRENT_BOARD,
      payload: { newBoard: [newBoard] },
    });
    setCard("");
  };

  const addList = () => {
    if (state.addList.title !== "") {
      const newBoard = {
        name: currentBoard[0].name,
        selected: currentBoard[0].selected,
        lists: lists
          ? [...lists, { title: state.addList.title, cards: [] }]
          : [{ title: state.addList.title, cards: [] }],
        type: currentBoard[0].type,
        id: currentBoard[0].id,
      };
      dispatch({
        type: ACTIONS.CURRENT_BOARD,
        payload: { newBoard: [newBoard] },
      });
      dispatch({ type: ACTIONS.ADD_LIST, add: false, value: "" });
    } else {
      errorModalOpen("List must have title");
    }
  };

  const deleteList = (listTitle) => {
    const updatedList = lists.filter((item) => item.title !== listTitle);
    const newBoard = {
      name: currentBoard[0].name,
      selected: currentBoard[0].selected,
      lists: updatedList,
      type: currentBoard[0].type,
      id: currentBoard[0].id,
    };
    dispatch({
      type: ACTIONS.CURRENT_BOARD,
      payload: { newBoard: [newBoard] },
    });
  };

  return (
    <ListContainer>
      {showErrorModal(state.showModal.message)}

      <div>
        {lists.map((item, index) => {
          const show =
            state.showAddCard.id === index ? !state.showAddCard.show : true;

          return (
            <List key={index} className="list">
              {state.listMenu
                ? state.listMenu.id === index &&
                  state.listMenu.show &&
                  showListMenu(item.title, index)
                : null}
              <ListHeader>
                <div
                  onClick={() => {
                    dispatch({ type: ACTIONS.LIST_MENU, index });
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
                <ListTitle
                  onClick={() =>
                    setEditListTitle({ listTitle: item.title, edit: true })
                  }
                >
                  {editListTitle.edit &&
                  editListTitle.listTitle === item.title ? (
                    <input
                      placeholder={item.title}
                      onChange={(e) => setNewListTItle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.code === "Enter") {
                          setEditListTitle({ listTitle: "", edit: false });

                          setNewListTItle("");
                        }
                      }}
                    />
                  ) : (
                    <a rel="noreferrer">{item.title}</a>
                  )}
                </ListTitle>
              </ListHeader>

              <section>{renderCards(item.title)}</section>
              <section>
                {renderAddCard(index, item.title)}
                <AddAnotherCard
                  show={show}
                  onClick={(e) => {
                    dispatch({ type: ACTIONS.ADD_CARD, index });
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add another card
                </AddAnotherCard>
              </section>
            </List>
          );
        })}
        <AddAnotherList>
          {state.addList.add ? (
            renderAddList()
          ) : (
            <div
              onClick={() =>
                dispatch({
                  type: ACTIONS.ADD_LIST,
                  add: true,
                  value: state.addList.title,
                })
              }
            >
              <FontAwesomeIcon icon={faPlus} />{" "}
              {lists.length !== 0 ? "Add Another List" : "Add a list"}
            </div>
          )}
        </AddAnotherList>
      </div>
    </ListContainer>
  );
}

Lists.propTypes = {
  state: PropTypes.shape({
    addList: PropTypes.shape({
      add: PropTypes.bool.isRequired,
      title: PropTypes.string,
    }).isRequired,
    currentBoard: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        lists: PropTypes.array,
      })
    ),
    listMenu: PropTypes.shape({
      id: PropTypes.number,
      show: PropTypes.bool.isRequired,
    }).isRequired,
    showAddCard: PropTypes.shape({
      id: PropTypes.number,
      show: PropTypes.bool.isRequired,
    }).isRequired,
    showModal: PropTypes.shape({
      show: PropTypes.bool.isRequired,
      message: PropTypes.string,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

/*




Styles





*/

const ListContainer = styled.div`
  width: 100%;
  height: fit-content;
  margin-top: 26vh;
  > div {
    display: flex;
  }
`;

const List = styled.div`
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
  > div:nth-child(1) {
    cursor: pointer;
    width: fit-content;
    position: absolute;
  }
`;

const ListTitle = styled.div`
  height: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  > a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    align-self: center;
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

const AddAnotherList = styled(List)``;

const ListMenu = styled.div`
  position: absolute;
  background-color: rgba(102, 101, 99, 0.568);
  backdrop-filter: blur(1.5px);
  width: 95.5%;
  text-align: center;
  font-weight: 600;
  bottom: 105%;
  z-index: -10;
  > div {
    padding: 0.5rem 0;
    cursor: pointer;
  }
`;
