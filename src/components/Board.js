import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Lists from "./Lists";
import NewBoard from "./NewBoard";
import { grabAndSlide } from "../api/api";
import { ACTIONS } from "../App";

import Modal from "@material-ui/core/Modal";
import styled from "styled-components/macro";

export default function Board({ state, dispatch }) {
  const activeBoard = state.currentBoard.find((board) => board.selected);
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
  }, [changeName]);

  const handleModalOpen = (cardData, listTitle) => {
    setOpen(true);
    setEditCard({ data: cardData, listTitle });
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
          activeBoard={activeBoard}
        />
      </Modal>
    );
  };

  const addNewBoard = () => {
    state.currentBoard.length === 0
      ? dispatch({
          type: ACTIONS.CURRENT_BOARD,
          payload: { newBoard: [newBoard] },
        })
      : dispatch({
          type: ACTIONS.CURRENT_BOARD,
          payload: { newBoard: [...state.currentBoard, newBoard] },
        });
  };

  const changeBoardName = () => {
    activeBoard.name = changeName.name;
    const newBoard = state.currentBoard;
    dispatch({ type: ACTIONS.CURRENT_BOARD, payload: { newBoard } });
    setChangeName({ name: changeName.name, show: false });
  };

  return (
    <BoardWrapper className="boardWrapper">
      {state.currentBoard.length === 0 ? (
        <>
          <NewBoard
            newBoard={newBoard}
            setNewBoard={setNewBoard}
            addNewBoard={addNewBoard}
            state={state}
            dispatch={dispatch}
          />
        </>
      ) : (
        <>
          <BoardTitle>
            {changeName.show ? (
              <input
                defaultValue={activeBoard.name}
                autoFocus={true}
                onChange={(e) => {
                  setChangeName({ name: e.target.value, show: true });
                }}
                onKeyDown={(e) => {
                  e.target.value !== "" &&
                    e.key === "Enter" &&
                    changeBoardName();
                }}
              ></input>
            ) : (
              <h1
                onClick={() =>
                  setChangeName({ name: changeName.name, show: true })
                }
              >
                {activeBoard.name}
              </h1>
            )}
          </BoardTitle>
          <Lists
            state={state}
            dispatch={dispatch}
            handleModalOpen={handleModalOpen}
            setOpen={setOpen}
            activeBoard={activeBoard}
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
  overflow: hidden;
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
