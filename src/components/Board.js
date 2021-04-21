import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Lists from "./Lists";
import NewBoard from "./NewBoard";
import { grabAndSlide } from "../api/api";
import { ACTIONS } from "../App";

import Modal from "@material-ui/core/Modal";
import styled from "styled-components/macro";

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
    grabAndSlide("boardWrapper", 1.5);
  }, []);

  const handleModalOpen = (cardData, listTitle, cardIndex) => {
    setOpen(true);
    setEditCard({ data: cardData, listTitle, cardIndex });
  };

  const handleModalClose = () => {
    setOpen(false);
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
    <BoardWrapper className="boardWrapper">
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
          <Lists
            state={state}
            dispatch={dispatch}
            handleModalOpen={handleModalOpen}
            setOpen={setOpen}
            currentBoard={currentBoard}
          />
          {renderEditCard()}
        </>
      )}
    </BoardWrapper>
  );
}

/*




Styles





*/

const BoardWrapper = styled.div`
  height: 100vh;
  overflow-x: hidden;
  display: flex;
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
