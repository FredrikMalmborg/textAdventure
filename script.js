
let input = document.querySelector("input"),
    display = document.querySelector(".terminal"),
    inventory = ["bread", "paste", "a jar of dirt", "pen"],
    currentLocation = {
        room: "room",
        doors: 1,
        objectsInRoom: ["plant", "door", "planks", "cupboard", "blood", "skeleton", "room"],
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
        dead: false
    }

input.value = ""

document.addEventListener('keypress', logKey);

function logKey(e) {
    scene1(e)
}


// SCEANATIOS

function scene1(e) {
    if (` ${e.code}` === " Enter" && input.value !== "") {//add what location different commands work

        input.placeholder = "Do what?"

        if (input.value === "start" && states.start) {
            writeToTerminal(input.value)
            writeToTerminal("You find yourself in an ragged dark and gloomy room. The only light seem to come from an old dusty light bulb slowly swaying in the middle of the room. searching the room might be a good idea?")
            writeToTerminal("What do you do?")
            states.start = false
        }
        //KMS
        if (input.value === "kms") {
            writeToTerminal("You killed yourself")
            states.dead = true
            whatDoesThisDo()
        }

        //SEARCH
        if (input.value === "search") {
            actions.search = true
            input.placeholder = "Search what?"
        } else if (actions.search && input.value === "room") {
            writeToTerminal("With a sweeping look over the delapitated area you identyfy a few things..There is one door to the place, on the righthand side of the door there is a shady lookingplant huffing and puffing on a filthy cigar. Left of the door the roof seem to have fallen in and on the floor a bunch of odd moldy planks lie in a heap.behind you on the left quite close the the planks there is a big pool of coagulated stale blood.From the pool leading to inbehind a cupboard in the corner on the oposite side of the shady plantis a trail of the congealed old looking substance. the cupboard is closed but not sealed in any obvious way.")
            writeToTerminal("What do you do?")
            actions.search = false
        } else if (actions.search && !(input.value === "room")) {
            writeToTerminal("Maybe you should search the room...?")
            actions.search = false
        }

        //USE
        if (input.value === "use") {

            actions.use = true

            input.placeholder = "Use what item?"
        } else if (actions.use && input.value === isInInventory(input.value)) { // use an item
            console.log("using an item - check")
            usingObject = input.value
            actions.useOn = true
            actions.use = false

            input.placeholder = "Use " + input.value + " on what?"
            input.value = ""

            return usingObject

        } else if (actions.useOn && input.value === isInteractable(input.value)) { // use item on what? 
            console.log("using an item on a thing - check")

            writeToTerminal("You used " + usingObject + " on " + input.value)
            whatDoesThisDo()

            actions.useOn = false
        } else if (actions.use && input.value !== isInInventory(input.value)) { // if using an item fails 
            writeToTerminal(input.value + " is not an item")
            actions.use = false
        } else if (actions.useOn && input.value !== isInInventory(input.value)) { // if using an item on something fails 
            writeToTerminal("can't use " + usingObject + " on " + input.value)
            writeToTerminal(input.value + " is not a thing...")
            actions.useOn = false
        }

        //GIVE
        if (input.value === "give") {

            actions.give = true

            input.placeholder = "Give what item?"
        } else if (actions.give && input.value === isInInventory(input.value)) { // give an item
            console.log("giving an item - check")
            usingObject = input.value
            actions.giveTo = true
            actions.give = false

            input.placeholder = "Give " + input.value + " to what or who?"
            input.value = ""

            return usingObject

        } else if (actions.giveTo && input.value === isInteractable(input.value)) { // give an item to what or whom'st'd've? 
            console.log("giving an item to a thing - check")

            writeToTerminal("You gave " + usingObject + " to " + input.value)
            whatDoesThisDo()

            actions.useOn = false
        } else if (actions.give && input.value !== isInInventory(input.value)) { // if using an item fails 
            writeToTerminal(input.value + " is not an item")
            actions.give = false
        } else if (actions.giveTo && input.value !== isInInventory(input.value)) { // if using an item on something fails 
            writeToTerminal("can't give " + usingObject + " to " + input.value)
            writeToTerminal(input.value + " is not a thing...")
            actions.giveTo = false
        }

        //
        input.value = ""
    }

}


// STORY MANAGEMENT
function whatDoesThisDo() {
    console.log("what does this do?")
    if (states.dead) {
        setTimeout(function () {
            document.querySelector(".failState").style.display = "flex"
        }, 1000)
    }
    else if (document.querySelector(".terminal p:last-child").innerText === "you used paste on plant") {
        writeToTerminal("The plant died, and in dying gave you it's life essence. That's pretty neat!")
        pushToInventory("life essence")
        itentifyAndSpliceFromInventory(usingObject)
    }
    else if (document.querySelector(".terminal p:last-child").innerText === "you gave pen to planks") {
        writeToTerminal("The planks feels insulted by your gift and tries to throw one of it's rusty semi poisonous nail at you. Since the planks suck at throwing they miss any vital parts for your body an hit your pocket instead.")
        pushToInventory("rusty nail")
        itentifyAndSpliceFromInventory(usingObject)
    }
    else {
        writeToTerminal("That didn't seem to do anything...")
    }
}

// ROOM MANAGEMENT
function isInteractable(item) {
    let isInteractable = false;

    for (let i = 0; i < currentLocation.objectsInRoom.length; i++) {
        if (currentLocation.objectsInRoom[i] === item) {
            isInteractable = true;
            return currentLocation.objectsInRoom[i]
        }
    }
    if (isInteractable === false) {
        console.log(item + " not found.")
    }
}


// INVENTORY MANAGEMENT
function isInInventory(item) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] === item) {
            haveItem = true;
            return inventory[i]
        }
    }
}
function itentifyAndSpliceFromInventory(item) {
    let indexOfItem = inventory.indexOf(item)
    if (indexOfItem > -1) {
        inventory.splice(indexOfItem, 1)
    }
    refreshInventory()
}
function pushToInventory(item) {
    inventory.push(item)
    refreshInventory()
}
function refreshInventory() {
    let inventoryList = document.querySelectorAll(".inventory ul li")

    // removes all listitems inb4 we rebuild the "new" list later
    for (let i = 0; targetedItem = inventoryList[i]; i++) {
        targetedItem.parentNode.removeChild(targetedItem)
    }
    // this is where we rebuild the "new" list
    inventory.forEach(item => {
        let listNode = document.createElement('li'),
            textNode = document.createTextNode(item)
        listNode.appendChild(textNode)
        document.querySelector("ul").appendChild(listNode)
    })
}
refreshInventory()

// TERMINAL FUNCTIONALITY
function writeToTerminal(string) {
    let listNode = document.createElement('p'),
        textNode = document.createTextNode(string)

    listNode.appendChild(textNode)
    document.querySelector(".terminal").appendChild(listNode)
}
function resetTerminal() {
    let terminalContent = document.querySelectorAll(".terminal p")
    
    document.querySelector(".failState").style.display = "none"
    states.start = true

    // removes all listitems inb4 we rebuild the "new" list later
    for (let i = 0; all = terminalContent[i]; i++) {
        all.parentNode.removeChild(all)
    }
}

// HELP
let clicked = false
document.querySelector(".help").onclick = function () {

    if (clicked === false) {
        document.querySelector(".help p").style.display = "block"
        clicked = true
    } else if (clicked === true) {
        document.querySelector(".help p").style.display = "none"
        clicked = false
    }


}

//TEST CHAMBER
function log() {
    resetTerminal()
}