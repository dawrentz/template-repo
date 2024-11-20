// imgCarouselModule.js

//declarations
const navCircleContainer = document.querySelector("#img-nav-circles");
const rightArrow = document.querySelector("#right-nav-arrow");
const imgsInCarouselContainer = document.querySelector("#all-carousel-images");
const imgNavCirclesContainer = document.querySelector("#img-nav-circles");
const navArrows = document.querySelectorAll(".nav-arrow");
//init the timer
// let timeoutId = setTimeout(rightArrow.click(), 5000);

// ====================================== Major Funcitons ====================================== //
{
  //spacer
}

//init timer
let timeoutId;
resetTimer();

export function initImgCarousel() {
  //make nav circles dynamically (number of circles depends on number of imgs)
  renderImgNavCircles(imgsInCarouselContainer, imgNavCirclesContainer);

  //add ELs to nav arrows
  navArrows.forEach((arrow) => {
    addELtoArrows(arrow);
  });

  //add resetTimerELs to all navBar clickables
  addresetTimerELtoAllNavBarClickables();
}

// ====================================== Carousel Logic ====================================== //
{
  //spacer
}

//this carousel assumes all the imgs are the same size
function slideCarousel(carouselElm, circleElm) {
  const circleNum = circleElm.getAttribute("data-link-img-num");

  carouselElm.style = `right: calc(${circleNum} * (var(--img-width) + 2rem))`;
}

// ====================================== Images ====================================== //

function findNumImgInCarousel(carouselElm) {
  const imgElmArray = collectImgElms(carouselElm);

  return imgElmArray.length;
}

function collectImgElms(carouselElm) {
  const imgElmArray = carouselElm.querySelectorAll("img");
  return imgElmArray;
}

// ====================================== Circles ====================================== //

export function renderImgNavCircles(carouselElm, circleContainer) {
  const numOfImgs = findNumImgInCarousel(carouselElm);

  for (let i = 0; i < numOfImgs; i++) {
    const navCircle = createImgNavCircle();

    addELtoCircle(carouselElm, navCircle);
    circleContainer.append(navCircle);

    //init first circle as selected
    if (i === 0) {
      addSelectedClassToCircle(navCircle);
    }
  }

  const allCircles = getAllCircles(circleContainer);
  IDstampCircles(allCircles);
}

function IDstampCircles(circleList) {
  IDstampElms("link-img-num", circleList);
}

function createImgNavCircle() {
  const navCircle = document.createElement("div");
  navCircle.classList.add("img-nav-circle");

  return navCircle;
}

function circleSelectedClassHandler(circleElm) {
  removeSelectedClassFromAllCircles();
  addSelectedClassToCircle(circleElm);
}

function addSelectedClassToCircle(circleElm) {
  circleElm.classList.add("selected");
}

function removeSelectedClassToCircle(circleElm) {
  circleElm.classList.remove("selected");
}

function removeSelectedClassFromAllCircles() {
  const allCircles = getAllCircles();

  allCircles.forEach((circle) => {
    removeSelectedClassToCircle(circle);
  });
}

function getAllCircles() {
  const allCircles = navCircleContainer.querySelectorAll(".img-nav-circle");
  return allCircles;
}

// ========== For Arrows ========== //

function clickCircle(shiftInt) {
  const selectedCircleID = getSelectedCircleID();
  const shiftedCircleID = getShiftedCircleID(selectedCircleID, shiftInt);

  const circleToClick = getCircleByIDstamp(shiftedCircleID);
  circleToClick.click();
}

function getShiftedCircleID(selectedCircleID, shiftInt) {
  //the highest ID for a circle is the number of circles minus 1. Needed to make a loop
  const highestCircleID = getAllCircles().length - 1;

  //convert to nums for addition
  let shiftedCircleID = +selectedCircleID + +shiftInt;

  if (shiftedCircleID > highestCircleID) {
    shiftedCircleID = 0;
  }
  if (shiftedCircleID < 0) {
    shiftedCircleID = highestCircleID;
  }

  //convert back to string
  return shiftedCircleID.toString();
}

function getSelectedCircleID() {
  const selectedCircle = document.querySelector(".img-nav-circle.selected");
  const selectedCircleID = selectedCircle.getAttribute("data-link-img-num");

  return selectedCircleID;
}

function getCircleByIDstamp(circleIDstamp) {
  const allCircles = getAllCircles();
  let circleToReturn;

  allCircles.forEach((circle) => {
    const currentCircleIDstamp = circle.getAttribute("data-link-img-num");

    if (currentCircleIDstamp === circleIDstamp) {
      circleToReturn = circle;
    }
  });

  return circleToReturn;
}

// ====================================== Event Listeners ====================================== //

export function addELtoArrows(leftArrowElm) {
  leftArrowElm.addEventListener("click", (event) => {
    const arrowClicked = event.target;
    const arrowShiftInt = arrowClicked.getAttribute("date-shift-int");

    clickCircle(arrowShiftInt);
  });
}

function addELtoCircle(carouselElm, circleElm) {
  circleElm.addEventListener("click", () => {
    slideCarousel(carouselElm, circleElm);
    circleSelectedClassHandler(circleElm);
  });
}

// ========== For Timer ========== //
{
  //spacer
}

//add reset timer EL to all clickable elms in nav bar
export function addresetTimerELtoAllNavBarClickables() {
  const allClickables = gatherClickableNavBarElms();

  allClickables.forEach((clickable) => {
    clickable.addEventListener("click", () => {
      resetTimer();
    });
  });
}

function handleNoNavBarClick() {
  rightArrow.click();
  resetTimer();
}

function resetTimer() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    handleNoNavBarClick();
  }, 5000);
}

function gatherClickableNavBarElms() {
  const allCircles = getAllCircles();
  const allCirclesArray = Array.from(allCircles);

  const allNavArrows = document.querySelectorAll(".nav-arrow");
  const allNavArrowsArray = Array.from(allNavArrows);

  const allClickables = [...allCirclesArray, ...allNavArrowsArray];

  return allClickables;
}

// ====================================== General ====================================== //

function IDstampElms(dataType, elmsList) {
  let i = 0;

  elmsList.forEach((elm) => {
    elm.setAttribute(`data-${dataType}`, `${i++}`);
  });
}
