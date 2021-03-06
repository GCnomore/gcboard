import { useState, useEffect } from "react";
import { ACTIONS } from "../App";

import styled from "styled-components/macro";

export default function BoardList({
  setBoardList,
  setCreateNew,
  state,
  dispatch,
}) {
  const [selectedBoard, setSelectedBoard] = useState();

  useEffect(() => {
    window.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && setBoardList({ show: false })
    );
  }, []);

  const createNewBoard = () => {
    setBoardList({ show: false });
    setCreateNew(true);
  };

  const openBoard = () => {
    state.board.forEach((board) => (board.selected = false));
    selectedBoard.selected = true;
    setBoardList({ show: false });
  };

  const deleteBoard = () => {
    state.board = state.board.filter((board) => board.id !== selectedBoard.id);
    if (state.board.length !== 0) {
      state.board[0].selected = true;
    }
    dispatch({
      type: ACTIONS.CURRENT_BOARD,
      payload: { newBoard: state.board },
    });
  };

  return (
    <BoardListContainer>
      <header>
        <BoardListTitle>Boards List</BoardListTitle>
      </header>
      <ContentsContainer>
        <section>
          {state.board.map((board, index) => (
            <BoardItem
              key={index}
              onClick={() => setSelectedBoard(board)}
              selected={
                selectedBoard && selectedBoard.id === board.id ? true : false
              }
            >
              <h2>{board.name}</h2>
              <h3>{board.type}</h3>
            </BoardItem>
          ))}
        </section>
        <section>
          <div>
            <h2 onClick={() => createNewBoard()}>Create new board</h2>
            <h2 onClick={() => deleteBoard()}>Delete board</h2>
            <h2 onClick={() => openBoard()}>Open board</h2>
          </div>
        </section>
      </ContentsContainer>
    </BoardListContainer>
  );
}

const BoardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  color: white;
  height: 60vh;
  width: 70vw;
`;

const BoardListTitle = styled.h1`
  text-align: center;
  margin: 0;
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2rem 0;
  text-shadow: 3px 3px 4px rgba(255, 255, 255, 0.4);
`;

const ContentsContainer = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  text-shadow: 3px 3px 4px rgba(255, 255, 255, 0.4);

  > section:nth-child(1) {
    flex: 3;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-wrap: wrap;
  }

  > section:nth-child(2) {
    flex: 1;
    border-left: 2px solid rgba(255, 255, 255, 0.7);
    background-color: rgba(0, 0, 0, 0.5);

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      > h2 {
        cursor: pointer;
      }
    }
  }
`;

const BoardItem = styled.div`
  padding: 0 2rem;
  cursor: pointer;
  height: fit-content;
  text-align: center;
  background-color: ${(props) =>
    props.selected ? "rgba(255, 255, 255, 0.1);" : "transparent"};
  transition: 0.3s ease-in-out;
`;
