import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Lists from "./Lists";
import NewBoard from "./NewBoard";
import { grabAndSlide } from "../api/api";

import Modal from "@material-ui/core/Modal";
import styled from "styled-components/macro";

export default function Board() {
  const [editCard, setEditCard] = useState();
  const [open, setOpen] = useState(false);
  const [newBoard, setNewBoard] = useState({
    name: "",
    selected: true,
    lists: [],
    type: "",
  });
  const [boards, setBoards] = useState(
    localStorage.getItem("data")
      ? [JSON.parse(localStorage.getItem("data"))]
      : []
  );

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
    boards.length === 0
      ? setBoards([newBoard])
      : setBoards([...boards, newBoard]);
  };
  console.log("boards@@@@@", boards);

  return (
    <BoardWrapper className="boardWrapper">
      {boards.length === 0 ? (
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
            data={boards.filter((board) => board.selected)}
            handleModalOpen={handleModalOpen}
            setOpen={setOpen}
          />
          {renderEditCard()}{" "}
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
