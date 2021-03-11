import HeaderMenu from "./components/HeaderMenu";
import Board from "./components/Board";
import bgImg from "./assets/javascript-golden-logo-programming-language-brown-metal-background-creative-javascript-logo-besthqwallpapers.com-2133x1200.jpg";
import styled from "styled-components";
import { useReducer } from "react";

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
        currentBoard: action.payload.newBoard,
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
    currentBoard: localStorage.getItem("data")
      ? [JSON.parse(localStorage.getItem("data"))]
      : [],
  });
  return (
    <AppContainer>
      <HeaderMenu state={state} dispatch={dispatch} />
      <Board state={state} dispatch={dispatch} />
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
