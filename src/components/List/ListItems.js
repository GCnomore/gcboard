import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { ACTIONS } from "../../App";

export default function ListItems({
  card,
  listTitle,
  setOpen,
  handleModalOpen,
  cardIndex,
  id,
  findCard,
  moveCard,
  dndList,
  listIndex,
  currentBoard,
  dispatch,
}) {
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
        currentBoard.lists[listIndex].cards = dndList;
        dispatch({
          type: ACTIONS.CURRENT_BOARD,
          payload: { newBoard: [currentBoard] },
        });
      },
    }),
    [id, originalIndex, moveCard]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      canDrop: () => false,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  if (card.length !== 0) {
    return (
      <ListItemContainer
        ref={(node) => drag(drop(node))}
        isDragging={isDragging}
        onClick={() => {
          setOpen(true);
          handleModalOpen(card, listTitle, cardIndex);
        }}
      >
        <div>{card.title}</div>
        <div>
          {card.labels
            ? card.labels.map(
                (label, index) =>
                  label.selected && <LabelBox key={index} color={label.color} />
              )
            : null}
        </div>
      </ListItemContainer>
    );
  } else {
    return null;
  }
}

const ListItemContainer = styled.div`
  padding: 0.5rem;
  margin: 0.75rem 0 0.75rem 0;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  cursor: pointer;
  transition: 0.5s;
  box-shadow: 0 0 3px 0.2px white;
  display: flex;
  justify-content: space-between;
  opacity: ${(props) => (props.isDragging ? 0.8 : 1)};
  &:hover {
    filter: brightness(70%);
    transition: 0.5s;
  }
  > div:nth-child(2) {
    display: flex;
  }
`;

const LabelBox = styled.div`
  background-color: ${(props) => (props.color ? props.color : null)};
  width: 1.2rem;
  height: inherit;
`;
