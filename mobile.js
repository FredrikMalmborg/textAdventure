//MOBILE INVENTORY
let invClick = false;
document.querySelector(".inventory").onclick = function() {
  if (invClick === false) {
    console.log("show");
    document.querySelector(".inventory").classList.add("invMob");
    invClick = true;
  } else if (invClick === true) {
    console.log("hide");
    document.querySelector(".inventory").classList.remove("invMob");
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
