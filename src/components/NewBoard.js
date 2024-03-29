import Error from "./Error";
import { ACTIONS } from "../App";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import Modal from "@material-ui/core/Modal";

export default function NewBoard({
  newBoard,
  setNewBoard,
  addNewBoard,
  state,
  dispatch,
  setCreateNew,
  currentBoard,
}) {
  const boardTypes = [
    {
      name: "No Template",
      image: "",
      template: [],
    },
    {
      name: "Kanban Board",
      image: "",
      template: [
        {
          title: "Backlog",
          cards: [],
        },
        {
          title: "Design",
          cards: [],
        },
        {
          title: "To Do",
          cards: [],
        },
        {
          title: "Doing",
          cards: [],
        },
        {
          title: "Pending",
          cards: [],
        },
        {
          title: "Testing",
          cards: [],
        },
        {
          title: "Done",
          cards: [],
        },
      ],
    },
    {
      name: "Project Management",
      image: "",
      template: [
        {
          title: "Project Resources",
          cards: [],
        },
        {
          title: "Questions For Next Meeting",
          cards: [],
        },
        {
          title: "To Do",
          cards: [],
        },
        {
          title: "Pending",
          cards: [],
        },
        {
          title: "Blocked",
          cards: [],
        },
        {
          title: "Done",
          cards: [],
        },
      ],
    },
  ];
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    window.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && setCreateNew(false)
    );
  }, []);

  const createNewBoard = () => {
    if (
      state.board.find((board) => board.name === newBoardNameRef.current.value)
    ) {
      errorModalOpen("Can't add board with same name");
      return;
    } else {
      if (currentBoard) {
        currentBoard.selected = false;
      }
      const board = boardTypes.find((board) => board.name === selectedType);
      newBoard.name = newBoardNameRef.current.value;
      newBoard.type = selectedType;
      newBoard.lists = board.template;
      setNewBoard(newBoard);
      addNewBoard();
      setCreateNew(false);
      newBoardNameRef.current.value = "";
    }
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
      <Modal
        open={state.showModal.show}
        onClose={onModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Error message={message} />
      </Modal>
    );
  };

  const newBoardNameRef = useRef();

  return (
    <NewBoardContainer>
      {showErrorModal(state.showModal.message)}
      <div>
        <h1>Create new board</h1>
      </div>
      <div>
        <input ref={newBoardNameRef} placeholder="Name of new board" />
      </div>
      <div>
        <h2>Choose board template</h2>
        <div>
          {boardTypes.map((type, index) => (
            <div key={index} onClick={() => setSelectedType(type.name)}>
              <TemplateName
                color={selectedType === type.name ? "white" : null}
                shadow={selectedType === type.name ? true : false}
              >
                {type.name}
              </TemplateName>
            </div>
          ))}
        </div>
      </div>
      <div>
        <CreateButton
          onClick={() => {
            if (newBoardNameRef.current.value === "") {
              errorModalOpen("Board must have title");
            } else if (selectedType === "") {
              errorModalOpen("Please choose a template");
            } else {
              createNewBoard();
            }
          }}
        >
          Create
        </CreateButton>
      </div>
    </NewBoardContainer>
  );
}

NewBoard.propTypes = {
  newBoard: PropTypes.shape({
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    lists: PropTypes.array,
  }).isRequired,
  setNewBoard: PropTypes.func.isRequired,
  addNewBoard: PropTypes.func.isRequired,
};

const NewBoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(1.5px);
  > div:nth-child(1) {
    font-size: 3rem;
    color: white;
  }
  > div:nth-child(2) {
    text-align: center;
    width: 100%;
    > input {
      width: 50vw;
      height: 10vh;
      font-size: 3rem;
      text-align: center;
      outline: none;
      font-weight: 600;
    }
  }
  > div:nth-child(3) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: white;
    font-size: 2rem;
    margin: 2rem 0 1rem 0;
    > div {
      width: 60vw;
      align-self: center;
      border: 2px white solid;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      > div {
        align-self: center;
      }
    }
  }
`;

const TemplateName = styled.h3`
  color: ${(props) => (props.color ? props.color : "rgba(255, 255, 255, 0.5)")};
  text-shadow: ${(props) => (props.shadow ? "0px 5px 10px white" : "none")};
  :hover {
    cursor: pointer;
  }
`;

const CreateButton = styled.button`
  color: white;
  border: none;
  outline: none;
  font-size: 1.5rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 5px 0.2px;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transition: 0.2s;
  }

  &:active {
    transform: scale(0.95);
  }
`;
