import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Lists from "./Lists";
import { grabAndSlide } from "./api/api";

import Modal from "@material-ui/core/Modal";
import styled from "styled-components";

export default function Board() {
  const [editCard, setEditCard] = useState();
  const [open, setOpen] = useState(false);
  const [addList, setAddList] = useState({
    add: false,
    title: "",
  });

  const listData = [
    {
      title: "Sample",
      cards: [
        {
          title: "Sample Card",
          description: "Enter the description for this card",
          comments: "First comment",
          timeStamp: "Feb 3, 2021 9:55 AM",
          show: false,
        },
        {
          title: "Sample Card2",
          description: "Enter the description for this card",
          comments: "First comment",
          timeStamp: "Feb 3, 2021 9:55 AM",
          show: false,
        },
      ],
    },
    {
      title: "Sample2",
      cards: [
        {
          title: "Sample Card",
          description: "Enter the description for this card",
          comments: "First comment",
          timeStamp: "Feb 3, 2021 9:55 AM",
          show: false,
        },
        {
          title: "Sample Card2",
          description: "Enter the description for this card",
          comments: "First comment",
          timeStamp: "Feb 3, 2021 9:55 AM",
          show: false,
        },
        {
          title: "Sample Card2",
          description: "Enter the description for this card",
          comments: "First comment",
          timeStamp: "Feb 3, 2021 9:55 AM",
          show: false,
        },
      ],
    },
  ];

  useEffect(() => {
    grabAndSlide("boardWrapper");
  }, []);

  const handleModalOpen = (cardData, cardTitle) => {
    setOpen(true);
    setEditCard({ data: cardData, cardTitle });
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const renderEditCard = () => {
    if (editCard) {
      return (
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Cards cardData={editCard} />
        </Modal>
      );
    } else {
      return null;
    }
  };

  return (
    <BoardWrapper className="boardWrapper">
      <Lists
        data={listData}
        handleModalOpen={handleModalOpen}
        setOpen={setOpen}
      />
      {renderEditCard()}
    </BoardWrapper>
  );
}

/*




Styles





*/

const BoardWrapper = styled.div`
  padding-top: 20vh;
  height: 80vh;
  overflow-x: auto;
  display: flex;
  &:active {
    cursor: grabbing;
  }
`;

const AddList = styled.div`
  display: flex;
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
