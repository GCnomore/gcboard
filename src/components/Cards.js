import "../styles/Cards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";

export default function Cards({ data, title }) {
  return (
    <div className="cardsContainer">
      <div className="cardHeader">
        <div>
          <h1>{data.data.title}</h1>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div>in list {data.title}</div>
      </div>
      <div className="cardContentWrapper">
        <div className="cardContentLeft">
          <div className="description">
            <h2>Description</h2>
            <input></input>
          </div>
          <div className="activity">
            <h2>Activity</h2>
            <Button variant="contained" color="secondary">
              Show Details
            </Button>
          </div>
          <input></input>
        </div>
        <div className="cardContentRight">
          <div className="addToCard">
            <h2>Add to card</h2>
            <div>Label</div>
            <div>Checklist</div>
            <div>Start Date</div>
            <div>Due Date</div>
            <div>Attachment</div>
            <div>Cover</div>
            <div>Label</div>
            <div>Label</div>
          </div>
          <div className="actions">
            <h2>Actions</h2>
            <div>Move</div>
            <div>Delete</div>
          </div>
        </div>
      </div>
    </div>
  );
}
