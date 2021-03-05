import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Lists from "./Lists";
import NewBoard from "./NewBoard";
import { grabAndSlide } from "../api/api";
import { ACTIONS } from "../App";

import Modal from "@material-ui/core/Modal";
import styled from "styled-components/macro";

export default function Board({ state, dispatch }) {
  const [editCard, setEditCard] = useState();
  const [open, setOpen] = useState(false);
  const [newBoard, setNewBoard] = useState({
    name: "",
    selected: true,
    lists: [],
    type: "",
  });

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => e.code === "Escape" && setOpen(false)
    );
    grabAndSlide("boardWrapper");
  }, []);

  const handleModalOpen = (cardData, cardTitle) => {
    setOpen(true);
    setEditCard({ data: cardData, cardTitle });
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
        <Cards cardData={editCard} />
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

  return (
    <BoardWrapper className="boardWrapper">
      {state.currentBoard.length === 0 ? (
        <>
          <NewBoard
            newBoard={newBoard}
            setNewBoard={setNewBoard}
            addNewBoard={addNewBoard}
          />
        </>
      ) : (
        <>
          <Lists
            state={state}
            dispatch={dispatch}
            handleModalOpen={handleModalOpen}
            setOpen={setOpen}
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
  overflow-x: auto;
  display: flex;
  &:active {
    cursor: grabbing;
  }
`;
