let input = document.querySelector("input"),
    display = document.querySelector(".terminal"),
    inventory = ["pen", "jar-of-dirt", "paste"]

// var object = {
//     name: "pen",
//     count: 1,
//     inInventory: false
// }




document.addEventListener('keypress', logKey);
function logKey(e) {
    if (` ${e.code}` === " Enter") {

        writeToTerminal()
        
        input.placeholder = "do something"

        if(input.value === "use"){
            input.placeholder = "Use what item?"
            use();
        }else if(input.value === "help"){

        }

        input.value = ""
    }
}

function refreshInventory() {
    let inventoryList = document.querySelectorAll(".inventory ul li")

    for (let i = 0; targetedItem = inventoryList[i]; i++) {
        targetedItem.parentNode.removeChild(targetedItem)
    }

    inventory.forEach(item => {
        let listNode = document.createElement('li'),
            textNode = document.createTextNode(item)
        listNode.appendChild(textNode)
        document.querySelector("ul").appendChild(listNode)
    })
}
function use() {
    console.log("jonger")
}

function writeToTerminal() {
    let listNode = document.createElement('p'),
    textNode = document.createTextNode(input.value)

    listNode.appendChild(textNode)
    document.querySelector(".terminal").appendChild(listNode)
}




refreshInventory()