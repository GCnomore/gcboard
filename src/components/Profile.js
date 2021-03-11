import styled from "styled-components";

export default function Profile() {
  return (
    <ProfileContainer>
      <div>
        <div>Profile name</div>
        <div>Email</div>
      </div>
      <div>
        <div>Boards</div>
      </div>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
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
  backdrop-filter: blur(15px) opacity(0.7);
  border-radius: 0.4rem;
`;
