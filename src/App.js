import HeaderMenu from "./components/HeaderMenu";
import Board from "./components/Board";
import BoardList from "./components/BoardList";
import bgImg from "./assets/javascript-golden-logo-programming-language-brown-metal-background-creative-javascript-logo-besthqwallpapers.com-2133x1200.jpg";
import styled from "styled-components/macro";
import { useReducer, useState, useEffect } from "react";

import Modal from "@material-ui/core/Modal";

export const ACTIONS = {
  LIST_MENU: "listMenu",
  ADD_CARD: "addCard",
  ADD_LIST: "addList",
  SHOW_MODAL: "showModal",
  CURRENT_BOARD: "currentBoard",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LIST_MENU:
      return {
        ...state,
        listMenu: { id: action.index, show: !state.listMenu.show },
      };

    case ACTIONS.ADD_CARD:
      return {
        ...state,
        showAddCard: { id: action.index, show: !state.showAddCard.show },
      };
    case ACTIONS.ADD_LIST:
      return {
        ...state,
        addList: {
          add: action.add,
          title: action.value,
        },
      };
    case ACTIONS.SHOW_MODAL:
      return {
        ...state,
        showModal: {
          show: action.payload.show,
          message: action.payload.message,
        },
      };
    case ACTIONS.CURRENT_BOARD:
      return {
        ...state,
        board: action.payload.newBoard,
      };
    default:
      return {};
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    listMenu: {
      id: null,
      show: false,
    },
    showAddCard: {
      id: null,
      show: false,
    },
    addList: {
      add: false,
      title: "",
    },
    showModal: { show: false, message: "" },
    board: localStorage.getItem("gc_board_data")
      ? JSON.parse(localStorage.getItem("gc_board_data"))
      : [],
  });
  const [boardList, setBoardList] = useState({ show: false });
  const [createNew, setCreateNew] = useState(false);

  useEffect(() => {
    console.log("save local app@@@@@@@@@");
    localStorage.setItem("gc_board_data", [JSON.stringify(state.board)]);
    state.board.length === 0 && setBoardList({ show: false });
  }, [state]);

  const currentBoard = state.board.length
    ? state.board.find((board) => board.selected === true)
    : [];

  const handleModalClose = () => {
    setBoardList({ show: false });
  };

  return (
    <AppContainer>
      <HeaderMenu
        state={state}
        dispatch={dispatch}
        boardList={boardList}
        setBoardList={setBoardList}
      />
      <Board
        state={state}
        dispatch={dispatch}
        createNew={createNew}
        setCreateNew={setCreateNew}
        currentBoard={currentBoard}
      />
      {boardList.show ? (
        <BoardListModal
          open={boardList.show}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <BoardList
            setBoardList={setBoardList}
            setCreateNew={setCreateNew}
            state={state}
            dispatch={dispatch}
          />
        </BoardListModal>
      ) : null}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  height: 100vh;
  background-image: url(${bgImg});
`;

const BoardListModal = styled(Modal)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
