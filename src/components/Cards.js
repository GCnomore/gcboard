import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

export default function Cards({ cardData }) {
  console.log(cardData);
  return (
    <CardsContainer>
      <CardHeader>
        <div>
          <h1>{cardData.data.title}</h1>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div>in list {cardData.title}</div>
      </CardHeader>
      <CardContentWrapper>
        <CardContentLeft>
          <Description>
            <div>
              <h2>Description</h2>
              <MenuItem>Edit</MenuItem>
            </div>
            <div>
              {cardData.data.description ? (
                <div>{cardData.data.description}</div>
              ) : (
                <CardInput></CardInput>
              )}
            </div>
          </Description>
          <CommentsContainer>
            <div>
              <h2>Comments</h2>
              <MenuItem>Show Details</MenuItem>
            </div>
            <Comments>
              {cardData.data.comments ? (
                <>
                  <span>{cardData.data.comments}</span>
                  <TimeStamp>{cardData.data.timeStamp}</TimeStamp>
                </>
              ) : null}
            </Comments>
            <CardInput></CardInput>
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
  display: flex;
  justify-content: space-between;
`;

const TimeStamp = styled.span`
  margin-left: 1rem;
  font-size: 0.8rem;
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
