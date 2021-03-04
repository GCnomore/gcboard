import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlus,
  faInfoCircle,
  faBell,
  faStar,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components/macro";

export default function HeaderMenu() {
  return (
    <HeaderMenuWrapper>
      <Grid container>
        <TopLeftSection>
          <MenuItem href="/">
            <FontAwesomeIcon icon={faBars} />
          </MenuItem>
          <MenuItem href="/">Boards</MenuItem>
        </TopLeftSection>
        <section>
          <MenuItem href="/">
            <FontAwesomeIcon icon={faPlus} />
          </MenuItem>
          <MenuItem href="/">
            <FontAwesomeIcon icon={faInfoCircle} />
          </MenuItem>
          <MenuItem href="/">
            <FontAwesomeIcon icon={faBell} />
          </MenuItem>
          <MenuItem href="/">Profile</MenuItem>
        </section>
      </Grid>
      <Grid container>
        <section>
          <MenuItem href="/">Board View</MenuItem>
          <MenuItem href="/">Board Name</MenuItem>
          <MenuItem href="/">
            <FontAwesomeIcon icon={faStar} />
          </MenuItem>
          |<MenuItem href="/">Some other options</MenuItem>
        </section>
        <section>
          <MenuItem href="/">
            <FontAwesomeIcon icon={faEllipsisH} /> Show Menu
          </MenuItem>
        </section>
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

const TopLeftSection = styled.div`
  margin: 0 0.25rem 0.5rem 0.25rem;
`;

const MenuItem = styled.a`
  margin: 0 0.25rem 0 0.25rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1.5px);
  color: #fff;
  font-weight: 500;
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
