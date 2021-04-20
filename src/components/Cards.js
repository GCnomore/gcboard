import { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components/macro";
import { ACTIONS } from "../App";

export default function Cards({
  cardData,
  setOpen,
  state,
  dispatch,
  activeBoard,
}) {
  const [card, setCard] = useState(cardData.data);
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState({
    edit: card.description === "" ? true : false,
    desc: card.description,
  });
  const [editCardTitle, setEditCardTitle] = useState({
    title: "",
    edit: false,
  });
  const time =
    new Date().getHours() > 12
      ? `${new Date().getHours() - 12}:${new Date().getMinutes()}PM`
      : `${new Date().getHours()}:${new Date().getMinutes()}AM`;
  const timeStamp = `${time} ${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}`;

  const addComment = () => {
    const newComment = [
      ...card.comments,
      {
        text: comment,
        created: timeStamp,
      },
    ];
    card.comments = newComment;
    setCard(card);
    setComment("");
  };

  const addDescription = () => {
    card.description = description.desc;
    setCard(card);
    setDescription({ edit: false, desc: "" });
  };

  const deleteCard = () => {
    setOpen(false);

    const currentList = activeBoard.lists.find(
      (list) => list.title === cardData.listTitle
    );
    const newCardList = currentList.cards.filter(
      (card) => card.title !== cardData.data.title
    );
    const currentListIndex = activeBoard.lists.findIndex(
      (list) => list.title === currentList.title
    );
    activeBoard.lists[currentListIndex].cards = newCardList;
  };

  const changeCardTitle = () => {
    const newList = activeBoard.lists.find(
      (list) => list.title === cardData.listTitle
    );
    newList.cards[cardData.cardIndex].title = editCardTitle.title;

    dispatch({
      type: ACTIONS.CURRENT_BOARD,
      payload: { newBoard: [activeBoard] },
    });

    setEditCardTitle({ title: "", edit: false });
  };

  const deleteComments = (commentIndex) => {
    const newList = activeBoard.lists.find(
      (list) => list.title === cardData.listTitle
    );
    newList.cards[cardData.cardIndex].comments.splice(commentIndex, 1);
    setEditCardTitle({ title: "", edit: false });
  };

  return (
    <CardsContainer>
      <CardHeader>
        <div>
          {editCardTitle.edit ? (
            <input
              autoFocus={true}
              defaultValue={card.title}
              onChange={(e) =>
                setEditCardTitle({ title: e.target.value, edit: true })
              }
              onKeyDown={(e) =>
                (e.code === "Enter" || e.code === "NumpadEnter") &&
                changeCardTitle()
              }
            />
          ) : (
            <h1
              onClick={() =>
                setEditCardTitle({ title: card.title, edit: true })
              }
            >
              {card.title}
            </h1>
          )}

          <FontAwesomeIcon icon={faTimes} onClick={() => setOpen(false)} />
        </div>
        <CardTimeStamp>Created {card.timeStamp}</CardTimeStamp>
        <div>in list {cardData.cardTitle}</div>
      </CardHeader>
      <CardContentWrapper>
        <CardContentLeft>
          <Description>
            <div>
              <h2>Description</h2>
              <MenuItem
                onClick={() =>
                  setDescription({ edit: true, desc: card.description })
                }
              >
                Edit
              </MenuItem>
            </div>
            <div>
              {description.edit ? (
                <DescriptionInput
                  value={description.desc}
                  onChange={(e) =>
                    setDescription({ edit: true, desc: e.target.value })
                  }
                  onKeyDown={(e) => {
                    (e.code === "Enter" || e.code === "NumpadEnter") &&
                      addDescription(e.target.value);
                  }}
                />
              ) : (
                <div>{card.description}</div>
              )}
            </div>
          </Description>
          <CommentsContainer>
            <div>
              <h2>Comments</h2>
            </div>
            <div>
              <Comments>
                {card.comments ? (
                  <>
                    {card.comments.map((comment, index) => (
                      <div key={index}>
                        <div>
                          <span>{comment.text}</span>
                        </div>
                        <div>
                          <TimeStamp>{comment.created}</TimeStamp>
                          <FontAwesomeIcon
                            icon={faTimes}
                            onClick={() => deleteComments(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}
              </Comments>
            </div>
            <CardInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                (e.code === "Enter" || e.code === "NumpadEnter") &&
                  addComment();
              }}
            ></CardInput>
          </CommentsContainer>
        </CardContentLeft>
        <CardContentRight>
          <div className="addToCard">
            <h2>Add to card</h2>
            <div>
              <MenuItem>Label</MenuItem>
              <MenuItem>Checklist</MenuItem>
              <MenuItem>Start Date</MenuItem>
              <MenuItem>Due Date</MenuItem>
              <MenuItem>Attachment</MenuItem>
              <MenuItem>Cover</MenuItem>
              <MenuItem>Label</MenuItem>
              <MenuItem>Label</MenuItem>
            </div>
          </div>
          <div className="actions">
            <h2>Actions</h2>
            <div>
              <MenuItem>Move</MenuItem>
              <MenuItem onClick={() => deleteCard()}>Delete</MenuItem>
            </div>
          </div>
        </CardContentRight>
      </CardContentWrapper>
    </CardsContainer>
  );
}

Cards.propTypes = {
  cardData: PropTypes.shape({
    data: PropTypes.shape({
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          created: PropTypes.string.isRequired,
        })
      ),
      description: PropTypes.string,
      timeStamp: PropTypes.string,
      title: PropTypes.string.isRequired,
    }).isRequired,
    cardTitle: PropTypes.string,
  }),
};

const CardsContainer = styled.div`
  width: 60vw;
  height: fit-content;
  min-height: 70vh;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  color: white;
  backdrop-filter: blur(1rem) opacity(0.7);
`;

const CardHeader = styled.div`
  > div {
    display: flex;
    justify-content: space-between;

    > h1 {
      margin: 0;
    }

    > svg {
      cursor: pointer;
      font-size: 1.5rem;
    }
  }

  > div:nth-child(1) {
    > input {
      height: 2rem;
      align-self: center;
      background-color: transparent;
      outline: none;
      border: none;
      color: white;
      font-weight: 600;
      font-size: 1.5rem;
      background-color: rgba(0, 0, 0, 0.5);
    }

    > input::placeholder {
      font-size: 1.5rem;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
      font-weight: 600;
    }
  }
`;

const CardContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const CardContentLeft = styled.div`
  width: 100%;
  margin-right: 5%;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    > h2 {
      margin: 0;
    }
  }
  > div:nth-child(2) {
    margin-top: 1rem;
  }
`;

const CardContentRight = styled.div`
  width: 40%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div > div {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 70px 40px rgba(225, 225, 225, 0.1);
  }
`;
const CommentsContainer = styled(Description)`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  > div:nth-child(2) {
    height: 40vh;
    overflow-y: auto;
    overflow-x: hidden;
  }

  > h2 {
    margin: 0;
  }
  > button {
    height: fit-content;
    padding: 0.1rem 0 !important;
  }
`;

const Comments = styled.div`
  > div {
    display: flex;
    width: 100%;
    align-items: center;
    margin: 1rem 0;

    > div:nth-child(1) {
      width: 100%;
      display: flex;
      justify-content: flex-start;

      > span:nth-child(1) {
        overflow-wrap: anywhere;
      }
    }

    > div:nth-child(2) {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      > svg {
        margin: 0 0.5rem 0 1rem;
        cursor: pointer;
      }
    }
  }
`;

const TimeStamp = styled.span`
  margin-left: 1rem;
  font-size: 0.8rem;
  text-align: right;
`;

const DescriptionInput = styled.input`
  width: 100%;
`;

const CardInput = styled.input`
  width: 100%;
`;

const MenuItem = styled.a`
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  background-color: rgba(225, 225, 225, 0.1);
  backdrop-filter: blur(3.5px);
  box-shadow: 0px 0px 30px 4px rgba(225, 225, 225, 0.1);
  color: #fff;
  font-weight: 500;
  transition: 0.25s;
  height: fit-content;
  &:hover {
    opacity: 0.4;
    transition: 0.25s;
    cursor: pointer;
  }
  &:active {
    background-color: #1c1c1b;
    opacity: 1;
  }
`;

const CardTimeStamp = styled.div`
  font-size: 0.7rem;
  margin: 0.3rem 0 1.5rem 0;
`;
