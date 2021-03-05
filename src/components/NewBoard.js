import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export default function NewBoard({ newBoard, setNewBoard, addNewBoard }) {
  const boardTypes = [
    {
      name: "No Template",
      image: "",
    },
    {
      name: "Kanban Board",
      image: "",
    },
    {
      name: "Project Management",
      image: "",
    },
  ];

  const [selectedType, setSelectedType] = useState();

  return (
    <NewBoardContainer>
      <div>
        <h1>Create new board</h1>
      </div>
      <div>
        <input
          placeholder="Name of new board"
          value={newBoard.name}
          onChange={(e) => {
            setNewBoard({
              name: e.target.value,
              selected: true,
              lists: [],
              type: "",
            });
          }}
        />
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
        <button
          onClick={() => {
            newBoard.type = selectedType;
            setNewBoard(newBoard);
            addNewBoard();
          }}
        >
          Create
        </button>
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
