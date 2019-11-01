let latestElement,
  activeObject,
  plantAngerLevel = 0,
  input = document.querySelector("input"),
  display = document.querySelector(".terminal"),
  inventory = ["bread", "paste", "a jar of dirt", "pen"],
  currentLocation = {
    room: "room",
    doors: 1,
    objectsInRoom: ["plant", "door", "planks", "cupboard", "blood", "room"]
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
    dead: false
  };

input.value = "";

document.addEventListener("keypress", logKey);

// SCEANATIOS

function logKey(e) {
  if (e.keyCode === 13 && input.value !== "") {
    //add what location different commands work

    input.placeholder = "Do what?";

    if (input.value === "start" && states.start) {
      // start
      writeToTerminal(input.value);
      writeToTerminal(
        "You find yourself in an ragged dark and gloomy room. The only light seem to come from an old dusty light bulb slowly swaying in the middle of the room. searching the room might be a good idea?"
      );
      writeToTerminal("What do you do?");
      states.start = false;
    }
    //KMS
    if (input.value === "kms") {
      // kills your self
      writeToTerminal("You killed yourself");
      states.dead = true;
      whatDoesThisDo();
    }

    //SEARCH
    if (input.value === "search") {
      actions.search = true;
      input.placeholder = "Search what?";
    } else if (actions.search && input.value === "room") {
      // search an interact
      writeToTerminal(
        "With a sweeping look over the delapitated area you identify a few things..There is one door to the place, on the righthand side of the door there is a shady looking plant. Left of the door the roof seem to have fallen in and on the floor a bunch of odd moldy planks lie in a heap.behind you on the left quite close the the planks there is a big pool of coagulated stale blood.From the pool leading to inbehind a cupboard in the corner on the oposite side of the shady plantis a trail of the congealed old looking substance. the cupboard is closed but not sealed in any obvious way."
      );
      writeToTerminal("What do you do?");
      itentifyAndSpliceFromInteractable("room");
      actions.search = false;
    } else if (actions.search && !(input.value === "room")) {
      // search FAIL
      writeToTerminal("Maybe you should search the room...?");
      actions.search = false;
    }

    //USE
    if (input.value === "use") {
      actions.use = true;

      input.placeholder = "Use what item?";
    } else if (actions.use && input.value === isInInventory(input.value)) {
      // use an item
      console.log("using an item - check");
      activeObject = input.value;
      actions.useOn = true;
      actions.use = false;

      input.placeholder = "Use " + input.value + " on what?";
      input.value = "";

      return activeObject;
    } else if (actions.useOn && input.value === isInteractable(input.value)) {
      // use item on what?
      console.log("using an item on a thing - check");

      writeToTerminal("You used " + activeObject + " on " + input.value);
      whatDoesThisDo();

      actions.useOn = false;
    } else if (actions.use && input.value !== isInInventory(input.value)) {
      // if using an item FIALS
      writeToTerminal(input.value + " is not an item");
      actions.use = false;
    } else if (actions.useOn && input.value !== isInInventory(input.value)) {
      // if using an item on something FAILS
      writeToTerminal("can't use " + activeObject + " on " + input.value);
      writeToTerminal(input.value + " is not a thing...");
      actions.useOn = false;
    }

    //GIVE
    if (input.value === "give") {
      actions.give = true;

      input.placeholder = "Give what item?";
    } else if (actions.give && input.value === isInInventory(input.value)) {
      // give an item
      console.log("giving an item - check");

      activeObject = input.value;
      actions.giveTo = true;
      actions.give = false;

      input.placeholder = "Give " + input.value + " to what or who?";
      input.value = "";

      return activeObject;
    } else if (actions.giveTo && input.value === isInteractable(input.value)) {
      // give an item to what or whom'st'd've?
      console.log("giving an item to a thing - check");

      writeToTerminal("you gave " + activeObject + " to " + input.value);
      whatDoesThisDo();

      actions.giveTo = false;
    } else if (actions.give && input.value !== isInInventory(input.value)) {
      // if giving an item FAILS
      writeToTerminal(input.value + " is not an item");
      actions.give = false;
    } else if (actions.giveTo && input.value !== isInteractable(input.value)) {
      // if giving an item to something FAILS
      writeToTerminal("can't give " + activeObject + " to " + input.value);
      writeToTerminal(input.value + " is not a thing...");
      actions.giveTo = false;
    }

    //OPEN
    if (input.value === "open") {
      actions.open = true;

      input.placeholder = "Open what?";
    } else if (actions.open && input.value === isInteractable(input.value)) {
      // open an interactable
      console.log("open a thing - check");
      actions.open = false;

      writeToTerminal("you tried opening the " + input.value);
      whatDoesThisDo();
    } else if (actions.open && input.value !== isInteractable(input.value)) {
      // open an interactable FAILS
      actions.open = false;
      writeToTerminal("you can't open that.");
    }

    //KICK
    if (input.value === "kick") {
      actions.kick = true;

      input.placeholder = "Kick what?";
    } else if (actions.kick && input.value === isInteractable(input.value)) {
      // kick an interactable
      console.log("kick a thing - check");
      actions.kick = false;

      writeToTerminal("you kicked the " + input.value);
      whatDoesThisDo();
    } else if (actions.kick && input.value !== isInteractable(input.value)) {
      // kick an interactable FAILS
      console.log("kick a thing - check");
      actions.kick = false;

      writeToTerminal("you kicked the " + input.value);
      whatDoesThisDo();
    }

    //TAKE
    if (input.value === "take") {
      actions.take = true;

      input.placeholder = "Take what?";
    } else if (actions.take && input.value === isInteractable(input.value)) {
      // take an item
      console.log("take a thing - check");
      actions.take = false;

      writeToTerminal("you try taking " + input.value);
      whatDoesThisDo();
    } else if (actions.take && input.value !== isInInventory(input.value)) {
      // take an item FAILS
      console.log("take FAIL - check");
      actions.take = false;

      writeToTerminal("you can't take that.");
      whatDoesThisDo();
    }
    input.value = "";
  }
}

// STORY MANAGEMENT
function whatDoesThisDo() {

  if (states.dead) {
    setTimeout(function() {
      document.querySelector(".failState").style.display = "flex";
    }, 1500);
  } // deathstate

  else if (
    latestElement.innerHTML === "you gave " + activeObject + " to plant" &&
    latestElement.innerHTML !== "you gave pen to plant" &&
    plantAngerLevel > 0 
  ) {
    plantAngerLevel++;
    writeToTerminal(
      "The plant is annoyed and eats you whole...")
      states.dead = true
      whatDoesThisDo()
    ;
  } // you have angered the plant, and it kills you
  else if (
    latestElement.innerHTML === "you gave " + activeObject + " to plant" &&
    latestElement.innerHTML !== "you gave pen to plant"
  ) {
    plantAngerLevel++;
    writeToTerminal(
      "'Ey kiddo, wattchu doin', i don't want nona that garbage' said the pland in a raspy voice. 'Got a smoke tho?'"
    );
  } // anything but pen to plant
  else if (latestElement.innerHTML === "you gave pen to plant") {
    writeToTerminal(
      "'Yeeeee boaayh, gimmie that smogg' the plant takes the pen and starts smoking it like a madman." +
        "in a few moments the plant dies from lungcancer. in the last moments of the plants life it gave you it's 'life essence'"
    );
    itentifyAndSpliceFromInventory(activeObject);
    pushToInventory("life essence");
  } //pen to plant
  else if (latestElement.innerHTML === "you tried opening the cupboard") {
    writeToTerminal(
      "the cupboard opens with ease. in the back of the cupboard there is a large hole. and sitting on the " +
        "other side of the hole beteeen the cupboard and the wall is most likely the source of the bloody mess. a skeleton"
    );
    pushToInteractable("skeleton");
  } //open cupboard
  else if (latestElement.innerHTML === "you kicked the planks") {
    writeToTerminal(
      "In the act of kicking the planks you anger them. And everyone know that you dont want to mess with angry" +
        " planks. The pile of planks try to throw one of it's rusty, semi poisonous nails at you. But since it still a pile" +
        " of planks it is not so good at aiming and misses all your vital parts and lands on the floor in front of you."
    );
    pushToInteractable("rusty nail");
    states.rustyNailExists = true;
  } //kick planks
  else if (
    latestElement.innerHTML === "you try taking rusty nail" &&
    states.rustyNailExists
  ) {
    writeToTerminal("You pick up the rusty nail");
    pushToInventory("rusty nail");
  } //take rusty nail
  else if(latestElement.innerHTML === "you give life essence to skeleton") {
      writeToTerminal("The skeleton rattles a bit, then stands up, stretching his bones and yawnes. 'ooooo exellent my good sire, "
      + "i have missed this putrid air in my non-existent lungs for a good while now. I do appreciate this most glorious act of kindness " 
      +"but why have you not yet left throught that door? It looks brittle to me, or if you have any pointy objects i could try picking the lock for you.'")
  }
  
  else {
    writeToTerminal("That didn't seem to do anything...");
  }
}

// ROOM MANAGEMENT
function isInteractable(item) {
  let isInteractable = false;

  for (let i = 0; i < currentLocation.objectsInRoom.length; i++) {
    if (currentLocation.objectsInRoom[i] === item) {
      isInteractable = true;
      return currentLocation.objectsInRoom[i];
    }
  }
  if (isInteractable === false) {
    console.log(item + " not found.");
  }
}
function pushToInteractable(item) {
  console.log(currentLocation.objectsInRoom);
  currentLocation.objectsInRoom.push(item);
  console.log(currentLocation.objectsInRoom);
}
function itentifyAndSpliceFromInteractable(item) {
  let indexOfItem = currentLocation.objectsInRoom.indexOf(item);
  if (indexOfItem > -1) {
    currentLocation.objectsInRoom.splice(indexOfItem, 1);
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
function writeToTerminal(string) {
  let textNode = document.createTextNode(string);

  (latestElement = document.createElement("p")),
    latestElement.appendChild(textNode);
  document.querySelector(".terminal").appendChild(latestElement);
  scrollToBottom()
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
    console.log("i scrolled to bot")
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
