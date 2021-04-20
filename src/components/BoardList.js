import { useState } from "react";

import styled from "styled-components";

export default function BoardList() {
  const [boardData, setBoardData] = useState(
    JSON.parse(localStorage.getItem("gc_board_data"))
  );

  return (
    <BoardListContainer>
      <header>
        <BoardListTitle>Created Boards</BoardListTitle>
      </header>
      <ContentsContainer>
        <section></section>
        <section></section>
      </ContentsContainer>
    </BoardListContainer>
  );
}

const BoardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  height: 60vh;
  width: 70vw;
`;

const BoardListTitle = styled.h1`
  text-align: center;
  margin: 0;
  font-size: 2rem;
  background-color: black;
  padding: 2rem 0;
`;

const ContentsContainer = styled.main`
  display: flex;
  width: 100%;
  height: 100%;

  > section:nth-child(1) {
    flex: 3;
    background-color: red;
  }

  > section:nth-child(2) {
    flex: 1;
    background-color: blue;
  }
`;
