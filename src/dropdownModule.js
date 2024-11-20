// dropdownModule.js

export function dropdownEventHandler(eventElm, dropdownElm) {
  eventElm.addEventListener("mouseover", () => {
    dropdownElm.classList.remove("hidden");

    eventElm.addEventListener("mouseout", () => {
      dropdownElm.classList.add("hidden");
    });
  });
}
