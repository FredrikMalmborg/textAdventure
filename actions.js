function prepareForSearch() {
  actions.search = true;
  input.placeholder = "Search what?";
}
function prepareForOpen() {
  actions.open = true;
  input.placeholder = "Open what?";
}
function prepareForKick() {
  actions.kick = true;
  input.placeholder = "Kick what?";
}
function prepareForTake() {
  actions.take = true;
  input.placeholder = "Take what?";
}
function prepareForUse() {
  actions.use = true;
  input.placeholder = "Use what item?";
}
function prepareForGive() {
  actions.give = true;
  input.placeholder = "Give what item?";
}

//--------------------------------------//

function search() {
  if (input.value === "room") {
    // search an interactable
    writeToTerminal(
      "With a sweeping look over the delapitated area you identify a few things..There is one door to the place, on the righthand side of the door there is a shady looking plant. Left of the door the roof seem to have fallen in and on the floor a bunch of odd moldy planks lie in a heap.behind you on the left quite close the the planks there is a big pool of coagulated stale blood.From the pool leading to inbehind a cupboard in the corner on the oposite side of the shady plantis a trail of the congealed old looking substance. the cupboard is closed but not sealed in any obvious way."
    );
    knowlage.knowRoom = true;
    actions.search = false;
    writeToTerminal("What do you do?");
    itentifyAndSpliceFromInteractable("room");
    map();
  }
  if (actions.search && input.value === isInteractable(input.value)) {
    writeToTerminal("You searched the " + input.value);
    whatDoesThisDo();
    actions.search = false;
  } else if (actions.search && input.value !== isInteractable(input.value)) {
    // search FAIL
    writeToTerminal("You can't search that?");
    actions.search = false;
  }
}
function open() {
  if (actions.open && input.value === isInteractable(input.value)) {
    // open an interactable
    actions.open = false;

    writeToTerminal("you tried opening the " + input.value);
    whatDoesThisDo();
  } else if (actions.open && input.value !== isInteractable(input.value)) {
    // open an interactable FAILS
    actions.open = false;
    writeToTerminal("you can't open that.");
  }
}
function kick() {
  if (actions.kick && input.value === isInteractable(input.value)) {
    // kick an interactable
    actions.kick = false;

    writeToTerminal("you kicked the " + input.value);
    whatDoesThisDo();
  } else if (actions.kick && input.value !== isInteractable(input.value)) {
    // kick an interactable FAILS
    actions.kick = false;

    writeToTerminal("you kicked the " + input.value);
    whatDoesThisDo();
  }
}
function take() {
  if (actions.take && input.value === isInteractable(input.value)) {
    // take an item
    actions.take = false;

    writeToTerminal("you try taking " + input.value);
    whatDoesThisDo();
  } else if (actions.take && input.value !== isInInventory(input.value)) {
    // take an item FAILS
    actions.take = false;

    writeToTerminal("you can't take that.");
    whatDoesThisDo();
  }
}
function use() {
  if (input.value === isInInventory(input.value)) {
    activeObject = input.value;
    actions.useOn = true;
    actions.use = false;

    input.placeholder = "Use " + input.value + " on what?";
    input.value = "";

    return activeObject;
  } else if (actions.useOn && input.value === isInteractable(input.value)) {
    writeToTerminal("You used " + activeObject + " on " + input.value);
    whatDoesThisDo();

    actions.useOn = false;
  } else if (input.value !== isInInventory(input.value)) {
    writeToTerminal(input.value + " is not an item");
    actions.use = false;
  } else if (actions.useOn && input.value !== isInInventory(input.value)) {
    writeToTerminal("can't use " + activeObject + " on " + input.value);
    writeToTerminal(input.value + " is not a thing...");
    actions.useOn = false;
  }
}
function give() {
  if (input.value === isInInventory(input.value)) {
    // give an item

    activeObject = input.value;
    actions.giveTo = true;
    actions.give = false;

    input.placeholder = "Give " + input.value + " to what or who?";
    input.value = "";

    return activeObject;
  } else if (actions.giveTo && input.value === isInteractable(input.value)) {
    // give an item to what or whom'st'd've?

    writeToTerminal("you gave " + activeObject + " to " + input.value);
    whatDoesThisDo();

    actions.giveTo = false;
  } else if (input.value !== isInInventory(input.value)) {
    // if giving an item FAILS
    writeToTerminal(input.value + " is not an item");
    actions.give = false;
  } else if (actions.giveTo && input.value !== isInteractable(input.value)) {
    // if giving an item to something FAILS
    writeToTerminal("can't give " + activeObject + " to " + input.value);
    writeToTerminal(input.value + " is not a thing...");
    actions.giveTo = false;
  }
}

input.value = "";
