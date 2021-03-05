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

export function grabAndSlide(className) {
  const wrapper = document.querySelector(`.${className}`);
  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const slide = (x - startX) * 2;
    wrapper.scrollLeft = scrollLeft - slide;
  });

  wrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener("mouseup", () => {
    isDown = false;
  });

  wrapper.addEventListener("mouseleave", () => {
    isDown = false;
  });
}
