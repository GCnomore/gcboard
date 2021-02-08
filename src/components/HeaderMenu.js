import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faPlus,
  faInfoCircle,
  faBell,
  faStar,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

import '../styles/HeaderMenu.css';

export default function HeaderMenu() {
  return (
    <div className="headerMenuWrapper">
      <Grid container className="topSection">
        <section className="topLeftSection">
          <a href="/">
            <FontAwesomeIcon icon={faBars} />
          </a>
          <a href="/">Boards</a>
        </section>
        <section className="topRightSection">
          <a href="/">
            <FontAwesomeIcon icon={faPlus} />
          </a>
          <a href="/">
            <FontAwesomeIcon icon={faInfoCircle} />
          </a>
          <a href="/">
            <FontAwesomeIcon icon={faBell} />
          </a>
          <a href="/">Profile</a>
        </section>
      </Grid>
      <Grid container className="bottomSection">
        <section className="botLeftSection">
          <a href="/">Board View</a>
          <a href="/">Board Name</a>
          <a href="/">
            <FontAwesomeIcon icon={faStar} />
          </a>
          |<a href="/">Some other options</a>
        </section>
        <section className="botRightSection">
          <a href="/">
            <FontAwesomeIcon icon={faEllipsisH} /> Show Menu
          </a>
        </section>
      </Grid>
    </div>
  );
}
