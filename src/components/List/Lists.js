import { ACTIONS } from "../../App";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error from "../Error";
import PropTypes from "prop-types";
import ListItems from "./ListItems";
import AddCard from "./AddCard";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import update from "immutability-helper";

import styled from "styled-components/macro";
import { faEllipsisH, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@material-ui/core/Modal";

export default function Lists({
  list,
  listIndex,
  state,
  dispatch,
  handleModalOpen,
  setOpen,
  currentBoard,
}) {
  const [cardd, setCard] = useState("");
  const [editListTitle, setEditListTitle] = useState({
    listTitle: "",
    edit: false,
  });
  const show =
    state.showAddCard.id === listIndex ? !state.showAddCard.show : true;
  const [dndList, setDndList] = useState(list.cards);

  useEffect(() => {
    setDndList(list.cards);
  }, [list.cards]);

  const findCard = useCallback(
    (id) => {
      const card = dndList.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: dndList.indexOf(card),
      };
    },
    [dndList]
  );
  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id);
      setDndList(
        update(dndList, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, dndList, setDndList]
  );
  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  editListTitle.edit &&
    window.addEventListener(
      "keydown",
      (e) =>
        e.code === "Escape" && setEditListTitle({ listTitle: "", edit: false })
    );

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
      <Modall
        open={state.showModal.show}
        onClose={onModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Error message={message} />
      </Modall>
    );
  };

  const deleteList = () => {
    const updatedList = currentBoard.lists.filter(
      (item) => item.title !== list.title
    );
    const newBoard = {
      name: currentBoard.name,
      selected: currentBoard.selected,
      lists: updatedList,
      type: currentBoard.type,
      id: currentBoard.id,
    };
    dispatch({
      type: ACTIONS.CURRENT_BOARD,
      payload: { newBoard: [newBoard] },
    });
  };

  const changeListName = () => {
    dispatch({
      type: ACTIONS.CURRENT_BOARD,
      payload: { newBoard: state.board },
    });
    setEditListTitle({ listTitle: "", edit: false });
  };

  return (
    <div>
      {showErrorModal(state.showModal.message)}
      <List className="list">
        {state.listMenu
          ? state.listMenu.id === listIndex &&
            state.listMenu.show &&
            showListMenu(list.title, listIndex)
          : null}
        <ListHeader>
          <div
            onClick={() => {
              dispatch({ type: ACTIONS.LIST_MENU, listIndex });
            }}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
          <ListTitle
            onClick={() =>
              setEditListTitle({ listTitle: list.title, edit: true })
            }
          >
            {editListTitle.edit && editListTitle.listTitle === list.title ? (
              <input
                defaultValue={list.title}
                onChange={(e) => {
                  currentBoard.lists[listIndex].title = e.target.value;
                }}
                onKeyDown={(e) =>
                  e.target.value !== "" &&
                  (e.code === "Enter" || e.code === "NumpadEnter") &&
                  changeListName()
                }
                autoFocus={true}
              />
            ) : (
              <a rel="noreferrer">{list.title}</a>
            )}
          </ListTitle>
        </ListHeader>

        <section ref={drop}>
          {dndList.map((card, index) => {
            return (
              <ListItems
                key={index}
                card={card}
                listTitle={list.title}
                cardIndex={index}
                id={`${card.id}`}
                setOpen={setOpen}
                handleModalOpen={handleModalOpen}
                findCard={findCard}
                moveCard={moveCard}
                listIndex={listIndex}
                dndList={dndList}
                currentBoard={currentBoard}
                dispatch={dispatch}
              />
            );
          })}
        </section>
        <section>
          <AddCard
            index={listIndex}
            listTitle={list.title}
            state={state}
            card={cardd}
            setCard={setCard}
            lists={currentBoard.lists}
            dispatch={dispatch}
            errorModalOpen={errorModalOpen}
          />
          <AddAnotherCard
            show={show}
            onClick={() => {
              dispatch({ type: ACTIONS.ADD_CARD, listIndex });
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add another card
          </AddAnotherCard>
        </section>
      </List>
    </div>
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

  > input {
    height: 2rem;
    align-self: center;
    background-color: transparent;
    outline: none;
    border: none;
    color: white;
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
  }

  > input::placeholder {
    font-size: 1.5rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-weight: 600;
  }
`;

const AddAnotherCard = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  cursor: pointer;
`;

const ListMenu = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.568);
  backdrop-filter: blur(1.5px);
  width: 95.5%;
  text-align: center;
  font-weight: 600;
  bottom: 105%;
  z-index: -10;
  > div {
    padding: 0.5rem 0;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    &:hover {
      filter: brightness(50%);
      transition: 0.3s ease-in-out;
    }
  }
`;

const Modall = styled(Modal)`
  background-color: transparent;
`;
