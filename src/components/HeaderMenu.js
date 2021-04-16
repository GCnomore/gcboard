import Grid from "@material-ui/core/Grid";
import Weather from "./Weather";
import News from "./News";
import TimeAndDate from "./TimeAndDate";
import { ACTIONS } from "../App";
import styled from "styled-components/macro";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function HeaderMenu({ state, dispatch }) {
  return (
    <HeaderMenuWrapper>
      <Grid container>
        <LeftSection>
          <Weather />
        </LeftSection>
        {/* <News /> */}
        <RightSection>
          <MenuItem href="/">
            <FontAwesomeIcon icon={faPlus} />
          </MenuItem>
          <MenuItem href="/">
            <FontAwesomeIcon icon={faInfoCircle} />
          </MenuItem>
          <MenuItem>Boards</MenuItem>
          <MenuItem
            onClick={() => {
              dispatch({
                type: ACTIONS.SHOW_MODAL,
                payload: { show: true, message: "" },
              });
            }}
          >
            Profile
          </MenuItem>
          <TimeAndDate />
        </RightSection>
      </Grid>
    </HeaderMenuWrapper>
  );
}

const HeaderMenuWrapper = styled.div`
  width: 100vw;
  position: fixed;
  margin-top: 1rem;
  > div {
    justify-content: space-between;
  }
  > :nth-child(2) {
    margin-top: 1rem;
  }
`;

const LeftSection = styled.div`
  margin: 0 0.25rem 0.5rem 0.25rem;
  display: flex;
`;

const RightSection = styled.div`
  text-align: right;
  margin-right: 0.25rem;
`;

const MenuItem = styled.button`
  border: none;
  text-decoration: underline;
  font-size: 0.8rem;
  margin: 0 0.25rem 0 0.25rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1.5px);
  color: #fff;
  font-weight: 600;
  transition: 0.25s;
  &:hover {
    opacity: 0.7;
    transition: 0.25s;
    cursor: pointer;
  }
  &:active {
    background-color: #1c1c1b;
    opacity: 1;
  }
`;
