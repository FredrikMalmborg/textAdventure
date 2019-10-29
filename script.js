
let input = document.querySelector("input"),
    display = document.querySelector(".terminal"),
    lastInput = document.querySelector(".terminal p:last-child"),
    secondToLastInput = document.querySelector(".terminal p:nth-last-child(2)"),
    inventory = ["bread", "paste", "a jar of dirt", "pen"],
    CurrentLocation = {
    room: "bottom",
    doors: 1,
    interactions: ["door", "corder", "plant"]
}


document.addEventListener('keypress', logKey);

function logKey(e) {
    if (` ${e.code}` === " Enter" && input.value !== "") {//add what location different commands work
        writeToTerminal(input.value)

        input.placeholder = "do something"
        

        if (input.value === "use") {
            input.placeholder = "Use what item?"
        }else if(input.value === "help"){
            writeToTerminal("Hi, welcome to my game! You can use items by typing 'use' then enter, then the item you'll want to use. You can find your inventory on the right side. Good luck!")
        }else if(document.querySelector(".terminal p:nth-last-child(2)").innerHTML === "use" && input.value === isInInventory(input.value)){
            console.log("You used " + input.value)
            writeToTerminal("You used " + input.value)
        }
        input.value = ""
    }
}

function isInInventory(item) {
    let haveItem = false;

    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] === item) {
            haveItem = true;
            return inventory[i]
        }
    }
    if (haveItem === false) {
        console.log(item + " not found.")
    }
}
/**
 * 
 * @param {string} x 
 */
function writeToTerminal(x) {
    let listNode = document.createElement('p'),
        textNode = document.createTextNode(x)

    listNode.appendChild(textNode)
    document.querySelector(".terminal").appendChild(listNode)


    if (secondToLastInput === "use") {
        console.log("use me daddy")
    }
}

function log() {
    console.log(document.querySelector(".terminal p:last-child").innerHTML)
    console.log(document.querySelector(".terminal p:nth-last-child(2)").innerHTML)
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