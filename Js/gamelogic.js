import Person from "./character.js";

// Create nodelists for race and item buttons
let p1RaceButton = document.querySelectorAll("div.selectRaceP1 button");
let p1ItemButton = document.querySelectorAll("div.selectItemsP1 button")
let p2RaceButton = document.querySelectorAll("div.selectRaceP2 button")
let p2ItemButton = document.querySelectorAll("div.selectItemsP2 button")

// These are used as parameters to create out object
let p1RaceParameter
let p1ItemParameter
let p2RaceParameter
let p2ItemParameter

let player1 = new Person(p1RaceParameter, p1ItemParameter)
let player2 = new Person(p2RaceParameter, p2ItemParameter)

// Gets the innerHTML value of the button and stores that in a variable so we can use that variable to create our object (player1, player2)
for (let i = 0; i < p1RaceButton.length; i++) {
    p1RaceButton[i].addEventListener("click", function () {
        p1RaceParameter = p1RaceButton[i].innerHTML;
        p1RaceButton[i].className = "activebutton";
        player1.race = p1RaceParameter
        console.log(p1RaceParameter)
        p1ApplyRaceBonus()
    });
}

for (let i = 0; i < p1ItemButton.length; i++) {
    p1ItemButton[i].addEventListener("click", function () {
        p1ItemParameter = p1ItemButton[i].innerHTML;
        p1ItemButton[i].className = "activebutton";
        player1.item = p1ItemParameter
        console.log(p1ItemParameter)
    });
}

for (let i = 0; i < p2RaceButton.length; i++) {
    p2RaceButton[i].addEventListener("click", function () {
        p2RaceParameter = p2RaceButton[i].innerHTML;
        p2RaceButton[i].className = "activebutton";
        player2.race = p2RaceParameter
        console.log(p2RaceParameter)
    });
}

for (let i = 0; i < p2ItemButton.length; i++) {
    p2ItemButton[i].addEventListener("click", function () {
        p2ItemParameter = p2ItemButton[i].innerHTML;
        p2ItemButton[i].className = "activebutton";
        player2.item = p2ItemParameter
        console.log(p2ItemParameter)
    });
}

document.getElementById("selectP1").addEventListener("click", function(){
    p1ApplyRaceBonus();
    p1ApplyItemBonus();
});

document.getElementById("selectP2").addEventListener("click", function(){
    p2ApplyRaceBonus();
    p2ApplyRaceBonus();
});


document.getElementById("objecttest").addEventListener("click", function(){
    console.log(player1)
    console.log(player2)
})

function p1ApplyRaceBonus() {
    if (player1.race === "human") {
        player1.classBonusHuman = 0.2 //20% less dmg taken
        console.log(player1.race)
    } else if (player1.race === "orc") {
        player1.currentHealth = 140 //40% more hp
        player1.maxHealth = 140
    } else if (player1.race === "elf") {
        player1.classBonusElf = [0.3, 0.5]; // 30% reflect attack chance up to 50 dmg of hit
    } else if (player1.race === "vampire") {
        player1.classBonusVampire = "0.1" // 10% lifesteal
    } else {}
}

function p1ApplyItemBonus() {
    if (player1.item === "boots") {
        player1.itemBonusBoots = 0.3 // 30% dodge chance
    } else if (player1.item === "staff") {
        player1.itemBonusStaff = 0.2 // 20% more healing
    } else if (player1.item = "sword") {
        player1.itemBonusSword = 0.3 // 30% more dmg
    } else if (player1.item === "bow") {
        player1.itemBonusBow = "0.3" // 30% chance to double attack
    } else {}
}


function p2ApplyRaceBonus() {
    if (player2.race === "human") {
        player2.classBonusHuman = 0.2
    } else if (player2.race === "orc") {
        player2.currentHealth = 140
        player2.maxHealth = 140
    } else if (player2.race === "elf") {
        player2.classBonusElf = [0.3, 0.5];
    } else if (player2.race === "vampire") {
        player2.classBonusVampire = "0.1"
    } else {}
}

function p2ApplyItemBonus() {
    if (player2.item === "boots") {
        player2.itemBonusBoots = 0.3 // 30% dodge chance
    } else if (player2.item === "staff") {
        player2.itemBonusStaff = 0.2 // 20% more healing
    } else if (player2.item === "sword") {
        player2.itemBonusSword = 0.3 // 30% more dmg
    } else if (player2.item === "bow") {
        player2.itemBonusBow = "0.3" // 30% chance to double attack
    } else {}
}

// attack 
// p1AttackButton.addEventListener("click", attackOfPlayer1)

// function attackOfPlayer1() {
//     console.log("click")
//     player2.currentHealth -= Math.floor(Math.random() * player1.maxDamage) + player1.min
//     console.log(player2.currentHealth)

// }


document.getElementById("ready").addEventListener("click", removeStartscreen)

function hidebattlescreen() {
    document.getElementById("battlescreen").style.visibility = "hidden";
}

hidebattlescreen()

function removeStartscreen() {
    var element = document.getElementById("startscreen");
    element.remove("startscreen");
    document.getElementById("battlescreen").style.visibility = "visible";
}


document.getElementById("healthNumber1").innerHTML = player1.currentHealth + "/" + player1.maxHealth;


document.getElementById("healthNumber2").innerHTML = player2.currentHealth + "/" + player2.maxHealth;




document.getElementById("health1").value = player1.currentHealth

document.getElementById("health2").value = player2.currentHealth;

document.getElementById("health1").max = player1.maxHealth;

document.getElementById("health2").max = player2.maxHealth;

    
// // function moveLog(race,damage,maxHealth){
//     // for (y = 0; y < 3; y++) {
// // document.getElementById("log").innerHTML = `${race} dealed ${damage} damage`;
// }
// moveLog()

function myFunction() {
    console.log("do myFunction")
    document.getElementById("nameP1").innerHTML = `${playerName}`;
    console.log(x)
}
