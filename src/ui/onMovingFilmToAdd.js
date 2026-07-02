import plus from "../assets/svg/plus.svg";
const onMovingFilmToAdd = (event, onDataForSeance) => {
  const filmItem = event.currentTarget;
  if (!filmItem) return;

  const icon = document.createElement("div");
  icon.className = "icon_moving-film";
  Object.assign(icon.style, {
    position: "absolute",
    zIndex: "10000",
    pointerEvents: "none",
    cursor: "grabbing",
  });
  const img = filmItem.querySelector("img");
  if (img) icon.append(img.cloneNode(true));

  const plusIcon = document.createElement("img");
  plusIcon.src = plus;
  plusIcon.className = "icon_plus";
  icon.append(plusIcon);

  document.body.append(icon);

  function moveAt(pageX, pageY) {
    icon.style.left = pageX - 25 + "px";
    icon.style.top = pageY - 25 + "px";
  }
  moveAt(event.pageX, event.pageY);

  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
  }

  function finishDrag(e) {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", finishDrag);

    icon.style.display = "none";
    const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    icon.remove();

    if (elemBelow) {
      const droppableBelow = elemBelow.closest(".admin-settings__hall-item");
      if (droppableBelow) {
        const popup = document.querySelector(".popup_create-seans");
        if (popup) popup.classList.remove("hidden");
        const filmName =
          filmItem.querySelector(".admin-settings__movie-name")?.textContent ||
          "Без названия";
        const hallName =
          droppableBelow.querySelector(".admin-settings__hall-title")
            ?.textContent || "Без названия";

        if (onDataForSeance) {
          onDataForSeance({ hall: hallName, film: filmName });
        }
      }
    }
  }

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", finishDrag);

  icon.ondragstart = () => false;
};

export default onMovingFilmToAdd;
