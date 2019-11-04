// STORY MANAGEMENT
/**
 * @param{}
 */
function whatDoesThisDo() {
  if (states.dead) {
    setTimeout(function() {
      document.querySelector(".failState").style.display = "flex";
    }, 1500);
  } // deathstate
  else if (states.win) {
    setTimeout(function() {
      document.querySelector(".winState").style.display = "flex";
    }, 2000);
  } // deathstate
  else if (
    latestElement.innerHTML === "you gave " + activeObject + " to plant" &&
    latestElement.innerHTML !== "you gave pen to plant"
  ) {
    plantAngerLevel++;
    knowlage.knowPlant = true;
    writeToTerminal(
      "'Ey kiddo, wattchu doin', i don't want nona that garbage' said the pland in a raspy voice. 'Got a smoke tho?'"
    );
    map();
    if (plantAngerLevel > 1) {
      states.dead = true;
      writeToTerminal("The plant is annoyed and eats you whole...");
      whatDoesThisDo();
    } // you have angered the plant, and it kills you
  } else if (latestElement.innerHTML === "you kicked the plant") {
    plantAngerLevel++;
    knowlage.knowPlant = true;
    writeToTerminal("'Eeyeyehy, wattchu up to you lil shit!! STOP IT!'");
    map();
    if (plantAngerLevel > 1) {
      states.dead = true;
      writeToTerminal("The plant is annoyed and eats you whole...");
      whatDoesThisDo();
    } // you have angered the plant, and it kills you
  } else if (latestElement.innerHTML === "you gave pen to plant") {
    writeToTerminal(
      "'Yeeeee boaayh, gimmie that smogg' the plant takes the pen and starts smoking it like a madman." +
        "in a few moments the plant dies from lungcancer. in the last moments of the plants life it gave you it's 'life essence'"
    );
    itentifyAndSpliceFromInventory(activeObject);
    pushToInventory("life essence");
  } else if (latestElement.innerHTML === "you tried opening the cupboard") {
    knowlage.knowSkeleton = true;
    writeToTerminal(
      "the cupboard opens with ease. in the back of the cupboard there is a large hole. and sitting on the " +
        "other side of the hole beteeen the cupboard and the wall is most likely the source of the bloody mess. a skeleton"
    );
    pushToInteractable("skeleton");
    map();
  } else if (latestElement.innerHTML === "you kicked the planks") {
    writeToTerminal(
      "In the act of kicking the planks you anger them. And everyone know that you dont want to mess with angry" +
        " planks. The pile of planks try to throw one of it's rusty, semi poisonous nails at you. But since it still a pile" +
        " of planks it is not so good at aiming and misses all your vital parts and lands on the floor in front of you."
    );
    pushToInteractable("rusty nail");
    states.rustyNailExists = true;
  } else if (
    latestElement.innerHTML === "you try taking rusty nail" &&
    states.rustyNailExists
  ) {
    writeToTerminal("You pick up the rusty nail");
    pushToInventory("rusty nail");
  } else if (latestElement.innerHTML === "you gave life essence to skeleton") {
    writeToTerminal(
      "The skeleton rattles a bit, then stands up, stretching his bones and yawnes. 'ooooo exellent my good sire, " +
        "i have missed this putrid air in my non-existent lungs for a good while now. I do appreciate this most glorious act of kindness " +
        "but why have you not yet left throught that door? It looks brittle to me, or if you have any pointy objects i could try picking the lock for you.'"
    );
    itentifyAndSpliceFromInventory("life essence");
  } else if (latestElement.innerHTML === "you gave rusty nail to skeleton") {
    itentifyAndSpliceFromInventory("rusty nail");
    writeToTerminal(
      "'Exellent laddie, let's get out of here!'" +
        "Stan the skeleton takes the rusty nail from your hand and with sniperelite precision he picks the lock and the door opens"
    );
    +" YOU WON THE GAME ";
    states.win = true;
    whatDoesThisDo();
  } else if (latestElement.innerHTML === "you kicked the door") {
    writeToTerminal(
      "The door was obviously made from really bad material so the kick broke down the door on the first try. " +
        " YOU WON THE GAME "
    );
    if (knowlage.knowStan) {
      writeToTerminal("Too bad stan has to stay behind...");
    }

    states.win = true;
    whatDoesThisDo();
  } else if (latestElement.innerHTML === "You searched the skeleton") {
    writeToTerminal(
      "Upon a closer look at the skeleton you can see that he has a nametag on, it says STAN"
    );
    pushToInteractable("stan");
    knowlage.knowStan = true;
  } else {
    writeToTerminal("That didn't seem to do anything...");
  }
}
