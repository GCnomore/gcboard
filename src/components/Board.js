import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Lists from "./List/Lists";
import NewBoard from "./NewBoard";
import { ACTIONS } from "../App";

import Modal from "@material-ui/core/Modal";
import styled from "styled-components/macro";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";

export default function Board({
  state,
  dispatch,
  createNew,
  setCreateNew,
  currentBoard,
}) {
  const [editCard, setEditCard] = useState();
  const [open, setOpen] = useState(false);
  const [newBoard, setNewBoard] = useState({
    name: "",
    selected: true,
    lists: [],
    type: "",
    id: "",
  });
  const [changeName, setChangeName] = useState({ name: "", show: false });

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Escape" && setOpen(false);
      e.key === "Escape" && setChangeName({ name: "", show: false });
    });
    const wrapper = document.querySelector(".boardWrapper");
    (function () {
      wrapper.addEventListener("mousewheel", (e) => {
        wrapper.scrollLeft += e.deltaY * 1.5;
        e.preventDefault();
      });
    })();
    // grabAndSlide("boardWrapper", 1.5);
  }, []);

  const handleModalOpen = (cardData, listTitle, cardIndex) => {
    setOpen(true);
    setEditCard({ data: cardData, listTitle, cardIndex });
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const errorModalOpen = (message) => {
    dispatch({ type: ACTIONS.SHOW_MODAL, payload: { show: true, message } });
  };

  const renderEditCard = () => {
    return (
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Cards
          cardData={editCard}
          setOpen={setOpen}
          state={state}
          dispatch={dispatch}
          currentBoard={currentBoard}
        />
      </Modal>
    );
  };

  const addList = () => {
    if (state.addList.title !== "") {
      currentBoard.lists.push({ title: state.addList.title, cards: [] });
      dispatch({
        type: ACTIONS.CURRENT_BOARD,
        payload: { newBoard: [...state.board] },
      });
      dispatch({ type: ACTIONS.ADD_LIST, add: false, value: "" });
    } else {
      errorModalOpen("List must have title");
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

  const addNewBoard = () => {
    currentBoard.length === 0
      ? dispatch({
          type: ACTIONS.CURRENT_BOARD,
          payload: { newBoard: [newBoard] },
        })
      : dispatch({
          type: ACTIONS.CURRENT_BOARD,
          payload: { newBoard: [...state.board, newBoard] },
        });
  };

  const changeBoardName = () => {
    currentBoard.name = changeName.name;
    dispatch({
      type: ACTIONS.CURRENT_BOARD,
      payload: { newBoard: state.board },
    });
    setChangeName({ name: changeName.name, show: false });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardWrapper
        className="boardWrapper"
        onClick={() => console.log("click")}
      >
        {currentBoard.length === 0 || createNew ? (
          <>
            <NewBoard
              newBoard={newBoard}
              setNewBoard={setNewBoard}
              addNewBoard={addNewBoard}
              state={state}
              dispatch={dispatch}
              setCreateNew={setCreateNew}
              currentBoard={currentBoard}
            />
          </>
        ) : (
          <>
            <BoardTitle>
              {changeName.show || currentBoard.name === "" ? (
                <input
                  defaultValue={currentBoard.name}
                  autoFocus={true}
                  onChange={(e) => {
                    setChangeName({ name: e.target.value, show: true });
                  }}
                  onKeyDown={(e) => {
                    e.target.value !== "" &&
                      (e.code === "Enter" || e.code === "NumpadEnter") &&
                      changeBoardName();
                  }}
                ></input>
              ) : (
                <h1
                  onClick={() =>
                    setChangeName({ name: changeName.name, show: true })
                  }
                >
                  {currentBoard.name}
                </h1>
              )}
            </BoardTitle>
            <ListContainer>
              {currentBoard.lists.map((list, index) => {
                return (
                  <Lists
                    list={list}
                    key={index}
                    index={index}
                    state={state}
                    dispatch={dispatch}
                    handleModalOpen={handleModalOpen}
                    setOpen={setOpen}
                    currentBoard={currentBoard}
                  />
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
                    {currentBoard.lists ? "Add Another List" : "Add a list"}
                  </div>
                )}
              </AddAnotherList>
            </ListContainer>

            {/* <Lists
            state={state}
            dispatch={dispatch}
            handleModalOpen={handleModalOpen}
            setOpen={setOpen}
            currentBoard={currentBoard}
          /> */}
            {renderEditCard()}
          </>
        )}
      </BoardWrapper>
    </DndProvider>
  );
}

/*




Styles





*/

const BoardWrapper = styled.div`
  height: 100vh;
  overflow-x: scroll;
  display: flex;
  z-index: -100;
  &:active {
    cursor: grabbing;
  }
`;

const BoardTitle = styled.div`
  position: absolute;
  top: 17vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1.5px);
  color: white;
  height: 7vh;
  > h1,
  input {
    font-size: 3rem;
    margin: 0.5rem 0 0.5rem 0;
    align-self: center;
  }
  > input {
    outline: none;
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    border: none;
    color: white;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  height: fit-content;
  margin-top: 26vh;
  z-index: 100;
  display: flex;
  > div {
    display: flex;
  }
`;

const AddAnotherList = styled.div`
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

const AddList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > input {
    height: 1.5rem;
  }
  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
`;

const XButton = styled.div`
  font-size: 2rem;
  vertical-align: middle;
`;
