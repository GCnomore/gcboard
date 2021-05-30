import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

import { ACTIONS } from "../../App";
import { v4 as uuidv4 } from "uuid";

export default function AddCard({
  index,
  listTitle,
  state,
  card,
  setCard,
  lists,
  dispatch,
  errorModalOpen,
}) {
  const show = state.showAddCard
    ? state.showAddCard.id === index
      ? state.showAddCard.show
      : false
    : false;

  const addCard = (listTitle) => {
    const time =
      new Date().getHours() > 12
        ? `${new Date().getHours() - 12}:${new Date().getMinutes()}PM`
        : `${new Date().getHours()}:${new Date().getMinutes()}AM`;
    const timeStamp = `${time} ${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}`;
    const newCard = {
      id: uuidv4(),
      title: card,
      timeStamp,
      description: "",
      comments: [{ text: `Card created`, created: timeStamp }],
    };
    const list = lists.find((item) => item.title === listTitle);
    list.cards = [...list.cards, newCard];

    dispatch({
      type: ACTIONS.CURRENT_BOARD,
      payload: { newBoard: [...state.board] },
    });
    setCard("");
    console.log("setcard");
  };

  return (
    <AddCardContainer show={show}>
      <input
        value={card}
        placeholder="Enter card title"
        onChange={(e) => {
          setCard(e.target.value);
        }}
        onKeyDown={(e) => {
          e.target.value !== "" &&
            (e.code === "Enter" || e.code === "NumpadEnter") &&
            addCard(listTitle);
        }}
      />
      <div>
        <Button
          variant="contained"
          onClick={() => {
            if (card !== "") {
              addCard(listTitle);
            } else {
              errorModalOpen("Card must have title");
            }
          }}
        >
          Add
        </Button>
        <XButton>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => {
              if (index === state.showAddCard.id) {
                dispatch({ type: ACTIONS.ADD_CARD, index });
              }
            }}
          />
        </XButton>
      </div>
    </AddCardContainer>
  );
}
const AddCardContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  > input {
    height: 1.5rem;
  }
  > div {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
`;

const XButton = styled.div`
  font-size: 2rem;
  vertical-align: middle;
`;
