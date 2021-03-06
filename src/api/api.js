import PropTypes from "prop-types";

export function grabAndSlide(className, power) {
  const wrapper = document.querySelector(`.${className}`);
  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const slide = (x - startX) * power;
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

grabAndSlide.propTypes = {
  className: PropTypes.string.isRequired,
};
