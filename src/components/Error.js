import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components/macro";

export default function Error({ message }) {
  return (
    <ErrorContainer>
      <div>{message}</div>
    </ErrorContainer>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

const errorPopUp = keyframes`
   from{
      opacity: 0
   }
   to{
      opacity: 1
   }
`;

const ErrorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  height: fit-content;
  padding: 10vh 5vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${errorPopUp} 1s;
  backdrop-filter: blur(15px) opacity(0.7);
  border-radius: 0.4rem;
  > div {
    color: white;
    font-size: 3rem;
  }
`;
