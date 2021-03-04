import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components/macro";

export default function Cards({ cardData }) {
  const [card, setCard] = useState(cardData.data);
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");
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
    card.description = description;
    setCard(card);
    setDescription("");
  };

  useEffect(() => {
    return () => {
      console.log("card");
    };
  }, []);

  return (
    <CardsContainer>
      <CardHeader>
        <div>
          <h1>{card.title}</h1>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <CardTimeStamp>Created {card.timeStamp}</CardTimeStamp>
        <div>in list {cardData.cardTitle}</div>
      </CardHeader>
      <CardContentWrapper>
        <CardContentLeft>
          <Description>
            <div>
              <h2>Description</h2>
              <MenuItem>Edit</MenuItem>
            </div>
            <div>
              {card.description ? (
                <div>{card.description}</div>
              ) : (
                <CardInput
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={(e) => {
                    (e.code === "Enter" || e.code === "NumpadEnter") &&
                      addDescription(e.target.value);
                  }}
                ></CardInput>
              )}
            </div>
          </Description>
          <CommentsContainer>
            <div>
              <h2>Comments</h2>
              <MenuItem>Show Details</MenuItem>
            </div>
            <Comments>
              {card.comments ? (
                <>
                  {card.comments.map((comment, index) => (
                    <div key={index}>
                      <span>{comment.text}</span>
                      <TimeStamp>{comment.created}</TimeStamp>
                    </div>
                  ))}
                </>
              ) : null}
            </Comments>
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
              <MenuItem>Delete</MenuItem>
            </div>
          </div>
        </CardContentRight>
      </CardContentWrapper>
    </CardsContainer>
  );
}

const CardsContainer = styled.div`
  width: 60vw;
  height: 70vh;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  color: white;
  backdrop-filter: blur(15px) opacity(0.7);
`;

const CardHeader = styled.div`
  > div {
    display: flex;
    justify-content: space-between;
    > h1 {
      margin: 0;
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
    justify-content: space-between;
    margin: 1rem 0;

    > span:nth-child(1) {
      overflow-wrap: anywhere;
    }
  }
`;

const TimeStamp = styled.span`
  margin-left: 1rem;
  font-size: 0.8rem;
  text-align: right;
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
