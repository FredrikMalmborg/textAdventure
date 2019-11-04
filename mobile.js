//MOBILE

let invClick = false;
let test = document.querySelector("body").style.width;

document.querySelector(".inventory h2").onclick = function() {
  if (invClick === false) {
      console.log("show inv");
      console.log(test);
      document.querySelector(".inventory ul").classList.add("mobInv");
    invClick = true;
  } else if (invClick === true) {
    console.log("hide inv");
    document.querySelector(".inventory ul").classList.remove("mobInv");
    invClick = false;
  }
};

let mapClick = false;
document.querySelector(".mapHolder h2").onclick = function() {
  if (mapClick === false) {
    console.log("show map");
    document.querySelector(".map").style.display = "block";
    document.querySelector(".terminal").style.opacity = "0.1";
    mapClick = true;
  } else if (mapClick === true) {
    console.log("hide map");
    document.querySelector(".map").style.display = "none";
    document.querySelector(".terminal").style.opacity = "1";
    mapClick = false;
  }
};
