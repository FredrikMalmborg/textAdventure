let latestElement,
  activeObject,
  plantAngerLevel = 0,
  input = document.querySelector("input"),
  display = document.querySelector(".terminal"),
  inventory = ["bread", "a jar of dirt", "pen"],
  interactable = ["plant", "door", "planks", "cupboard", "blood", "room"],
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
    rustyNailExists: false,
    dead: false,
    win: false
  },
  knowlage = {
    knowStan: false,
    knowSkeleton: false,
    knowPlant: false,
    knowRoom: false
  };

/**
 * @typedef {{use: Boolean, useOn: Boolean, give: Boolean, giveTo: Boolean, kick: Boolean, open: Boolean, take: Boolean, search: Boolean}} actions
 * @typedef {{start: Boolean,rustyNailExists: Boolean, dead: Boolean, win: Boolean}} states
 * @typedef {{knowStan: Boolean, knowSkeleton: Boolean, knowPlant: Boolean, knowRoom: Boolean}} knowlage
 */

document.addEventListener("keypress", logKey);
/**
 * If Enter is pressed the program will take whatever is input into the inputfield and make the text into lowercase and trim it.
 * If Escape is pressed the current action will be abandoned and the input.placeholder reset.
 * @param {Number} event
 */
function logKey(event) {
  if (event.keyCode === 13 && input.value !== "") {
    const userAction = input.value.toLowerCase().trim();

    input.placeholder = "Do what?";
    game();
  } else if (event.keyCode === 27) {
    (actions.use = false),
      (actions.useOn = false),
      (actions.give = false),
      (actions.giveTo = false),
      (actions.kick = false),
      (actions.open = false),
      (actions.take = false),
      (actions.search = false);
    input.value = "";
    input.placeholder = "Do what?";
  }
}
/**
 * Based on what command you write it will impact the gameboard and open up new possibilitys of interaction and itemuse.
 * @param {String}
 */
function game() {
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

  for (let i = 0; i < interactable.length; i++) {
    if (interactable[i] === item) {
      isInteractable = true;
      return interactable[i];
    }
  }
  if (isInteractable === false) {
    writeToTerminal(item + " not found");
  }
}
function pushToInteractable(item) {
  interactable.push(item);
}
function itentifyAndSpliceFromInteractable(item) {
  let indexOfItem = interactable.indexOf(item);
  if (indexOfItem > -1) {
    interactable.splice(indexOfItem, 1);
  }
}

// INVENTORY MANAGEMENT

/**
 * Check if chosen string exists within the inventory array
 * @param {String} item
 * @returns
 */
function isInInventory(item) {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] === item) {
      haveItem = true;
      return inventory[i];
    }
  }
}
/**
 * Find out what the index of chosen string is within the inventory list, and splice from list.
 * And with the refreshInventory() function it displays the new inventory.
 * Otherwise do nothing
 * @param {String} item
 */
function itentifyAndSpliceFromInventory(item) {
  let indexOfItem = inventory.indexOf(item);
  if (indexOfItem > -1) {
    inventory.splice(indexOfItem, 1);
  }
  refreshInventory();
}

/**
 * send item to the Inventory array and with the refreshInventory() function it displays the new inventory.
 * @param {String} item
 */
function pushToInventory(item) {
  inventory.push(item);
  refreshInventory();
}

/**
 * looks through the inventory array, saves all elements to a let. Then remove all of the array items and rebuild the new inventory with any changes made.
 */
function refreshInventory() {
  let inventoryList = document.querySelectorAll(".inventory ul li");

  for (let i = 0; (targetedItem = inventoryList[i]); i++) {
    targetedItem.parentNode.removeChild(targetedItem);
  }
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
 * Creates <p> and adds to .terminal class with the string as content
 * @param {String} string
 */
function writeToTerminal(string) {
  let textNode = document.createTextNode(string);

  (latestElement = document.createElement("p")),
    latestElement.appendChild(textNode);
  document.querySelector(".terminal").appendChild(latestElement);
  scrollToBottom();
}

/**
 * Keep the scrollbar in the bottom of the window whenever new text is written out
 */
function scrollToBottom() {
  var element = document.querySelector(".container");
  element.scrollTop = element.scrollHeight;
}

// HELP
let helpClick = false;
document.querySelector(".help").onclick = function() {
  if (helpClick === false) {
    document.querySelector(".help p").style.display = "block";
    helpClick = true;
  } else if (helpClick === true) {
    document.querySelector(".help p").style.display = "none";
    helpClick = false;
  }
};

//MAP
/**
 * Updates the map when new informaton is revealed.
 */
function map() {
  let roomArray = document.querySelectorAll(".map img");
  if (knowlage.knowRoom) {
    roomArray[3].style.opacity = "1";
  }
  if (knowlage.knowRoom && knowlage.knowPlant) {
    roomArray[1].style.opacity = "1";
    roomArray[3].style.opacity = "0";
  }
  if (knowlage.knowRoom && knowlage.knowSkeleton) {
    roomArray[2].style.opacity = "1";
    roomArray[3].style.opacity = "0";
  }
  if (knowlage.knowPlant && knowlage.knowSkeleton) {
    roomArray[0].style.opacity = "1";
    roomArray[1].style.opacity = "0";
    roomArray[2].style.opacity = "0";
    roomArray[3].style.opacity = "0";
  }
}
