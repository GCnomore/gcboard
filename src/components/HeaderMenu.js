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
          <a>
            <FontAwesomeIcon icon={faBars} />
          </a>
          <a>Boards</a>
        </section>
        <section className="topRightSection">
          <a>
            <FontAwesomeIcon icon={faPlus} />
          </a>
          <a>
            <FontAwesomeIcon icon={faInfoCircle} />
          </a>
          <a>
            <FontAwesomeIcon icon={faBell} />
          </a>
          <a>Profile</a>
        </section>
      </Grid>
      <Grid container className="bottomSection">
        <section className="botLeftSection">
          <a>Board View</a>
          <a>Board Name</a>
          <a>
            <FontAwesomeIcon icon={faStar} />
          </a>
          |<a>Some other options</a>
        </section>
        <section className="botRightSection">
          <a>
            <FontAwesomeIcon icon={faEllipsisH} /> Show Menu
          </a>
        </section>
      </Grid>
    </div>
  );
}
