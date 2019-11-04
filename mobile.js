//MOBILE

let invClick = false;

document.querySelector(".inventory h2").onclick = function() {
  if (invClick === false) {
    document.querySelector(".inventory ul").classList.add("mobInv");
    invClick = true;
  } else if (invClick === true) {
    document.querySelector(".inventory ul").classList.remove("mobInv");
    invClick = false;
  }
};

let mapClick = false;
document.querySelector(".mapHolder h2").onclick = function() {
  if (mapClick === false) {
    document.querySelector(".map").classList.add("mobMap");
    document.querySelector(".terminal").style.opacity = "0.1";
    mapClick = true;
  } else if (mapClick === true) {
    document.querySelector(".map").classList.remove("mobMap");
    document.querySelector(".terminal").style.opacity = "1";
    mapClick = false;
  }
};
