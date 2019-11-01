let latestElement,
  activeObject,
  plantAngerLevel = 0,
  input = document.querySelector("input"),
  display = document.querySelector(".terminal"),
  inventory = ["bread", "a jar of dirt", "pen"],
  currentLocation = {
    room: "room",
    doors: 1,
    interactable: ["plant", "door", "planks", "cupboard", "blood", "room"]
  },
  actions = {
    use: false,
    useOn: false,
    give: false,
    giveTo: false,
    kick: false,
    open: false,
    take: false,
    search: false
  },
  states = {
    start: true,
    knowStan: false,
    rustyNailExists: false,
    dead: false,
    win: false
  };


/**
 * actions
 * @typedef {{use: Boolean, useOn: Boolean, give: Boolean, giveTo: Boolean, kick: Boolean, open: Boolean, take: Boolean, search: Boolean}} Actions
 */

document.addEventListener("keypress", logKey);

function logKey(event) {
  if (event.keyCode === 13 && input.value !== "") {
    const userAction = input.value.toLowerCase().trim();
    console.log(userAction);
    game(event);
  }
}
function game(event) {
  input.placeholder = "Do what?";

  // Prepare action
  switch (input.value) {
    case "kms":
    case "kill self":
    case "end life":
    case "lmao ima die":
      writeToTerminal("You killed yourself");
      states.dead = true;
      whatDoesThisDo();
      break;
    case "search":
      prepareForSearch();
      break;
    case "open":
      prepareForOpen();
      break;
    case "kick":
      prepareForKick();
      break;
    case "take":
      prepareForTake();
      break;
    case "use":
      prepareForUse();
      break;
    case "give":
      prepareForGive();
      break;

    default:
      // Run action
      if (input.value === "start" && states.start) {
        // start
        writeToTerminal(input.value);
        writeToTerminal(
          "You find yourself in an ragged dark and gloomy room. The only light seem to come from an old dusty light bulb slowly swaying in the middle of the room. searching the room might be a good idea?"
        );
        writeToTerminal("What do you do?");
        states.start = false;
      } else if (input.value === "kms") {
        // kill your self
        writeToTerminal("You killed yourself");
        states.dead = true;
        whatDoesThisDo();
      } else if (actions.search) {
        search();
      } else if (actions.open) {
        open();
      } else if (actions.kick) {
        kick();
      } else if (actions.take) {
        take();
      } else if (actions.use || actions.useOn) {
        use();
      } else if (actions.give || actions.giveTo) {
        give();
      }
  }
  input.value = "";
}

// ROOM MANAGEMENT
function isInteractable(item) {
  let isInteractable = false;

  for (let i = 0; i < currentLocation.interactable.length; i++) {
    if (currentLocation.interactable[i] === item) {
      isInteractable = true;
      return currentLocation.interactable[i];
    }
  }
  if (isInteractable === false) {
    console.log(item + " not found.");
  }
}
function pushToInteractable(item) {
  console.log(currentLocation.interactable);
  currentLocation.interactable.push(item);
  console.log(currentLocation.interactable);
}
function itentifyAndSpliceFromInteractable(item) {
  let indexOfItem = currentLocation.interactable.indexOf(item);
  if (indexOfItem > -1) {
    currentLocation.interactable.splice(indexOfItem, 1);
  }
}

// INVENTORY MANAGEMENT
function isInInventory(item) {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] === item) {
      haveItem = true;
      return inventory[i];
    }
  }
}
function itentifyAndSpliceFromInventory(item) {
  let indexOfItem = inventory.indexOf(item);
  if (indexOfItem > -1) {
    inventory.splice(indexOfItem, 1);
  }
  refreshInventory();
}
function pushToInventory(item) {
  inventory.push(item);
  refreshInventory();
}
function refreshInventory() {
  let inventoryList = document.querySelectorAll(".inventory ul li");

  // removes all listitems inb4 we rebuild the "new" list later
  for (let i = 0; (targetedItem = inventoryList[i]); i++) {
    targetedItem.parentNode.removeChild(targetedItem);
  }
  // this is where we rebuild the "new" list
  inventory.forEach(item => {
    let listNode = document.createElement("li"),
      textNode = document.createTextNode(item);
    listNode.appendChild(textNode);
    document.querySelector("ul").appendChild(listNode);
  });
}
refreshInventory();

// TERMINAL FUNCTIONALITY
/**
 * creates element and adds to .terminal class
 * @param {String} string
 */
function writeToTerminal(string) {
  let textNode = document.createTextNode(string);

  (latestElement = document.createElement("p")),
    latestElement.appendChild(textNode);
  document.querySelector(".terminal").appendChild(latestElement);
  scrollToBottom();
}
function resetTerminal() {
  let terminalContent = document.querySelectorAll(".terminal p");

  document.querySelector(".failState").style.display = "none";
  states.start = true;

  // removes all listitems inb4 we rebuild the "new" list later
  for (let i = 0; (all = terminalContent[i]); i++) {
    all.parentNode.removeChild(all);
  }
}

function scrollToBottom() {
  var element = document.querySelector(".container");
  element.scrollTop = element.scrollHeight;
}
// HELP
let clicked = false;
document.querySelector(".help").onclick = function() {
  if (clicked === false) {
    document.querySelector(".help p").style.display = "block";
    clicked = true;
  } else if (clicked === true) {
    document.querySelector(".help p").style.display = "none";
    clicked = false;
  }
};

//TEST CHAMBER
function log() {
  //   resetTerminal();
  console.log(latestElement);
  console.log(document.querySelector(".terminal p:last-child"));
}
