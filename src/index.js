//index.js

import "./style.css";
import * as imgCarouselModule from "./imgCarouselModule.js";
import * as dropdownModule from "./dropdownModule.js";

//declarations
const navDiv = document.querySelector("#nav-div");
const navDropDown = document.querySelector("#nav-drop-down-menu");

// ====================================== Init ====================================== //

//menu dropdown El
dropdownModule.dropdownEventHandler(navDiv, navDropDown);

//handle all for img Carousel
imgCarouselModule.initImgCarousel();
