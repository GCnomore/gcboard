import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function AddAnotherList(props) {
  const { setAddList } = props;
  return (
    <div className="addList">
      <input placeholder="Enter list title" />
      <div>
        <Button variant="contained">Add</Button>
        <FontAwesomeIcon
          className="xBtn"
          icon={faTimes}
          onClick={() => setAddList(false)}
        />
      </div>
    </div>
  );
}
