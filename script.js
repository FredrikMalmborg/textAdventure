let input = document.querySelector("input"),
    display = document.querySelector(".terminal")


document.querySelector("button").onclick = function () {
    display.innerText = input.value
}



const log = document.getElementById('log');

document.addEventListener('keypress', logKey);

function logKey(e) {
    console.log(` ${e.code}`)
    if (` ${e.code}` === " Enter") {
        console.log("brug")
        display.innerText = input.value
        input.value = ""
    }
}