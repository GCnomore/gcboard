import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import '../styles/HeaderMenu.css';

export default function HeaderMenu() {
  return (
    <div className="headerMenuWrapper">
      <Grid container className="topSection">
        <section className="topLeftSection">
          <a>Home</a>
          <a>Boards</a>
          <input placeholder="Search"></input>
        </section>
        <section className="topRightSection">
          <a>Create</a>
          <a>Info</a>
          <a>Notifications</a>
          <a>Profile</a>
        </section>
      </Grid>
      <Grid container className="bottomSection">
        <section className="botLeftSection">
          <a>Board View</a>
          <a>Board Name</a>
          <a>Star</a>|<a>Some other options</a>
        </section>
        <section className="botRightSection">
          <a>Show Menu</a>
        </section>
      </Grid>
    </div>
  );
}
