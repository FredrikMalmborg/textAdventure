/**
 * initiate the use action
 */
function prepareForSearch() {
  actions.search = true;
  input.placeholder = "Search what?";
}
/**
 * initiate the open action
 */
function prepareForOpen() {
  actions.open = true;
  input.placeholder = "Open what?";
}
/**
 * initiate the kick action
 */
function prepareForKick() {
  actions.kick = true;
  input.placeholder = "Kick what?";
}
/**
 * initiate the take action
 */
function prepareForTake() {
  actions.take = true;
  input.placeholder = "Take what?";
}
/**
 * initiate the use action
 */
function prepareForUse() {
  actions.use = true;
  input.placeholder = "Use what item?";
}
/**
 * initiate the give action
 */
function prepareForGive() {
  actions.give = true;
  input.placeholder = "Give what item?";
}

//--------------------------------------//
/**
 * Checks if the search action is initiated and if it is check if the input does match an element in the interactable array.
 * Output any valid results in the terminal.
 */
function search(userInput) {
  if (userInput === "room") {
    // search an interactable
    writeToTerminal(
      "With a sweeping look over the delapitated area you identify a few things..There is one door to the place, on the righthand side of the door there is a shady looking plant. Left of the door the roof seem to have fallen in and on the floor a bunch of odd moldy planks lie in a heap.behind you on the left quite close the the planks there is a big pool of coagulated stale blood.From the pool leading to inbehind a cupboard in the corner on the oposite side of the shady plant is a trail of the congealed old looking substance. the cupboard is closed but not sealed in any obvious way."
    );
    knowlage.knowRoom = true;
    actions.search = false;
    writeToTerminal("What do you do?");
    itentifyAndSpliceFromInteractable("room");
    map();
  }
  if (actions.search && interactable.includes(userInput)) {
    console.log("search success");
    writeToTerminal("You searched the " + userInput);
    whatDoesThisDo();
    actions.search = false;
  } else if (actions.search && !interactable.includes(userInput)) {
    // search FAIL
    writeToTerminal("You can't search that?");
    actions.search = false;
  }
}
/**
 * Checks if the open action is initiated and if it is check if the input does match an element in the interactable array.
 * Output any valid results in the terminal.
 */
function open(userInput) {
  if (actions.open && interactable.includes(userInput)) {
    // open an interactable
    actions.open = false;

    writeToTerminal("you tried opening the " + userInput);
    whatDoesThisDo();
  } else if (actions.open && !interactable.includes(userInput)) {
    // open an interactable FAILS
    actions.open = false;
    writeToTerminal("you can't open that.");
  }
}
/**
 * Checks if the kick action is initiated and if it is check if the input does match an element in the interactable array.
 * Output any valid results in the terminal.
 */
function kick(userInput) {
  if (actions.kick && interactable.includes(userInput)) {
    // kick an interactable
    actions.kick = false;

    writeToTerminal("you kicked the " + userInput);
    whatDoesThisDo();
  } else if (actions.kick && !interactable.includes(userInput)) {
    // kick an interactable FAILS
    actions.kick = false;

    writeToTerminal("you kicked the " + userInput);
    whatDoesThisDo();
  }
}
/**
 * Checks if the take action is initiated and if it is check if the input does match an element in the interactable array.
 * Output any valid results in the terminal.
 */
function take(userInput) {
  if (actions.take && interactable.includes(userInput)) {
    // take an item
    actions.take = false;

    writeToTerminal("you try taking " + userInput);
    whatDoesThisDo();
  } else if (actions.take && !interactable.includes(userInput)) {
    // take an item FAILS
    actions.take = false;

    writeToTerminal("you can't take that.");
    whatDoesThisDo();
  }
}
/**
 * Checks if the use action is initiated and if it is check if the input does match an element in the inventory array.
 * Then checks if the useOn action is initiated and if it is check if the input does match an element in the interactable array.
 * Output any valid results in the terminal.
 */
function use(userInput) {
  if (inventory.includes(userInput)) {
    activeObject = userInput;
    actions.useOn = true;
    actions.use = false;

    input.placeholder = "Use " + userInput + " on what?";
    input.value = "";

    return activeObject;
  } else if (actions.useOn && interactable.includes(userInput)) {
    writeToTerminal("You used " + activeObject + " on " + userInput);
    whatDoesThisDo();

    actions.useOn = false;
  } else if (!inventory.includes(userInput)) {
    writeToTerminal(userInput + " is not an item");
    actions.use = false;
  } else if (actions.useOn && !interactable.includes(userInput)) {
    writeToTerminal("can't use " + activeObject + " on " + userInput);
    writeToTerminal(userInput + " is not a thing...");
    actions.useOn = false;
  }
}
/**
 * Checks if the give action is initiated and if it is check if the input does match an element in the inventory array.
 * Then checks if the giveTo action is initiated and if it is check if the input does match an element in the interactable array.
 * Output any valid results in the terminal.
 */
function give(userInput) {
  if (inventory.includes(userInput)) {
    // give an item

    activeObject = userInput;
    actions.giveTo = true;
    actions.give = false;

    input.placeholder = "Give " + userInput + " to what or who?";
    input.value = "";

    return activeObject;
  } else if (actions.giveTo && interactable.includes(userInput)) {
    // give an item to what or whom'st'd've?

    writeToTerminal("you gave " + activeObject + " to " + userInput);
    whatDoesThisDo();

    actions.giveTo = false;
  } else if (!interactable.includes(userInput)) {
    // if giving an item FAILS
    writeToTerminal(userInput + " is not an item");
    actions.give = false;
  } else if (actions.giveTo && !interactable.includes(userInput)) {
    // if giving an item to something FAILS
    writeToTerminal("can't give " + activeObject + " to " + userInput);
    writeToTerminal(userInput + " is not a thing...");
    actions.giveTo = false;
  }
}

input.value = "";
