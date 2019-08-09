import Person from "./character.js";

// Create nodelists for race and item buttons
let p1RaceButton = document.querySelectorAll("div.selectRaceP1 button");
let p1ItemButton = document.querySelectorAll("div.selectItemsP1 button");
let p2RaceButton = document.querySelectorAll("div.selectRaceP2 button");
let p2ItemButton = document.querySelectorAll("div.selectItemsP2 button");

// Variables for object
let p1RaceParameter = "";
let p1ItemParameter = "";
let p2RaceParameter = "";
let p2ItemParameter = "";

// Variables for input field
let inputFieldP1 = document.getElementById("InputNameP1");
let inputFieldP2 = document.getElementById("InputNameP2");
let inputTextP1 = document.getElementById("nameP1");
let inputTextP2 = document.getElementById("nameP2");

// Variables for battle screen
let attackButtonP1 = document.getElementById("attackP1");
let healButtonP1 = document.getElementById("healP1");
let yieldButtonP1 = document.getElementById("yieldP1");
let attackButtonP2 = document.getElementById("attackP2");
let healButtonP2 = document.getElementById("healP2");
let yieldButtonP2 = document.getElementById("yieldP2")


// ||-------Player creation-------||
let player1 = new Person("player 1", p1RaceParameter, p1ItemParameter);
let player2 = new Person("player 2", p2RaceParameter, p2ItemParameter);


// Stores the name in the object and writes 
inputFieldP1.onkeyup = function () {
    player1.name = inputFieldP1.value;
    inputTextP1.innerHTML = player1.name
}

inputFieldP2.onkeyup = function () {
    player2.name = inputFieldP2.value;
    inputTextP2.innerHTML = player2.name
}

// Gets the innerHTML value of the button and stores that in a variable so we can use that variable to create our object (player1, player2)
for (let i = 0; i < p1RaceButton.length; i++) {
    p1RaceButton[i].addEventListener("click", function () {
        player1.race = p1RaceButton[i].innerHTML;
        p1RaceButton[i].className = "activebutton";
    });
}

for (let i = 0; i < p1ItemButton.length; i++) {
    p1ItemButton[i].addEventListener("click", function () {
        player1.item = p1ItemButton[i].innerHTML;
        p1ItemButton[i].className = "activebutton";
    });
}

for (let i = 0; i < p2RaceButton.length; i++) {
    p2RaceButton[i].addEventListener("click", function () {
        player2.race = p2RaceButton[i].innerHTML;
        p2RaceButton[i].className = "activebutton";
    });
}

for (let i = 0; i < p2ItemButton.length; i++) {
    p2ItemButton[i].addEventListener("click", function () {
        player2.item = p2ItemButton[i].innerHTML;
        p2ItemButton[i].className = "activebutton";
    });
}

// If statements to check for race and items to apply bonuses
function applyRaceBonus(player) {
    if (player.race === "human") {
        player.classBonusHuman = 1.2 //20% less dmg taken
    } else if (player.race === "orc") {
        player.currentHealth = 140 //40% more hp
        player.maxHealth = 140
    } else if (player.race === "elf") {
        player.classBonusElf = [0.3, 0.5]; // 30% reflect attack chance up to 50 dmg of hit
    } else if (player.race === "vampire") {
        player.classBonusVampire = "0.1" // 10% lifesteal
    } else {}
}

function applyItemBonus(player) {
    if (player.item === "boots") {
        player.itemBonusBoots = 0.3 // 30% dodge chance
    } else if (player.item === "staff") {
        player.itemBonusStaff = 1.2 // 20% more healing
    } else if (player.item = "sword") {
        player.itemBonusSword = 1.3 // 30% more dmg
    } else if (player.item === "bow") {
        player.itemBonusBow = "0.3" // 30% chance to double attack
    } else {}
}

// Apply race and item bonus to players and hides create char screen
document.getElementById("ready").addEventListener("click", function () {
    applyRaceBonus(player1);
    applyItemBonus(player1);
    applyRaceBonus(player2);
    applyItemBonus(player2);
    playerCheck();
})

function hidebattlescreen() {
    document.getElementById("battlescreen").style.display = "none";
}

hidebattlescreen()

function hidewinnerscreen() {
    document.getElementById("winnerscreen").style.display = "none";
}

hidewinnerscreen()

function removeStartscreen() {
    let element = document.getElementById("startscreen");
    element.remove("startscreen");
    document.getElementById("battlescreen").style.display = "block";
    healthBars()
}

function removeBattlescreen() {
    let elements = document.getElementById("battlescreen");
    elements.remove("battlescreen");
    document.getElementById("winnerscreen").style.display = "block";
}

function playerCheck() {
    if (player1.race !== undefined && player1.item !== undefined && player2.race !== undefined && player1.item !== undefined) {
        removeStartscreen();
    } else {
        document.getElementById("ready").innerHTML = "error"
    }
}

// ||-------Move list-------||
// Attack
attackButtonP1.addEventListener("click", function () {
    attackOfPlayer1();
})


function attackOfPlayer1() {
    let doubleAttack = 0;
    if (player1.item === "bow") {
        if (Math.random() <= 1) { //
            doubleAttack = player1.damage();
        } else {
            doubleAttack = 0
        }
        player1.totalDamage = player1.damage() + doubleAttack
    } else if (player1.item === "sword") {
        player1.totalDamage = Math.floor(player1.damage() * player1.itemBonusSword)
    } else {
        player1.totalDamage = player1.damage();
    }
    player2.currentHealth -= player1.totalDamage;
    healthBars();
};



// function attackTest(your, opponent) {
//     let doubleAttack;
//     if (your.item === "sword") {
//         your.totalDamage = Math.floor(your.damage() * your.itemBonusSword)
//     } else if (your.item === "bow") {
//         if (Math.random() <= 1) { //
//             doubleAttack = your.damage();
//         } else {
//             doubleAttack = 0
//         }
//         your.totalDamage = your.damage() + doubleAttack
//     } else {
//         your.totalDamage = your.damage();
//     }
//     opponent.currentHealth -= your.totalDamage;
//     healthBars();
//     console.log("why does this run first")
// }


document.getElementById("attackP1").addEventListener("click", createLogP1);

function createLogP1(){
    let li = document.createElement('li')
    let logP1 = inputFieldP1.value + " dealed " + player1.totalDamage + " damage."
    li.innerHTML = logP1 
    document.getElementById("log").prepend(li)
}

document.getElementById("attackP2").addEventListener("click", createLogP2);

function createLogP2(){
    let li = document.createElement('li')
    let logP2 = inputFieldP2.value + " dealed " + player2.totalDamage + " damage."
    li.innerHTML = logP2 
    document.getElementById("log").prepend(li)
}

document.getElementById("healP1").addEventListener("click", healLogP1);

function healLogP1(){
    let li = document.createElement('li')
    let heallogP1 = inputFieldP1.value + " healed " + player1.maxDamage + "." 
    li.innerHTML = heallogP1 
    document.getElementById("log").prepend(li)
}

document.getElementById("healP2").addEventListener("click", healLogP2);

function healLogP2(){
    let li = document.createElement('li')
    let heallogP2 = inputFieldP2.value + "healed " + player2.maxDamage + "." 
    li.innerHTML = heallogP2 
    document.getElementById("log").prepend(li)
}


healButtonP1.addEventListener("click", healOfPlayer1)

function healOfPlayer1() {
    player1.currentHealth += player1.heal();
    healthBars();
}

attackButtonP2.addEventListener("click", attackOfPlayer2)

function attackOfPlayer2() {
    player1.currentHealth -= player2.damage();
    healthBars();
}

healButtonP2.addEventListener("click", healOfPlayer2)

function healOfPlayer2() {
    player2.currentHealth += player2.damage();
    healthBars();
}

function healthBars() {
    document.getElementById("healthNumber1").innerHTML = player1.currentHealth + "/" + player1.maxHealth;
    document.getElementById("health1").value = player1.currentHealth;
    document.getElementById("health1").max = player1.maxHealth;
    document.getElementById("healthNumber2").innerHTML = player2.currentHealth + "/" + player2.maxHealth;
    document.getElementById("health2").value = player2.currentHealth;
    document.getElementById("health2").max = player2.maxHealth;
    if (player1.currentHealth < 1) {
        removeBattlescreen()
        document.getElementById("winnerscreen").innerHTML = inputFieldP2.value + " wins";
    }
    if (player2.currentHealth < 1) {
        removeBattlescreen()
        document.getElementById("winnerscreen").innerHTML = inputFieldP1.value + " wins";
    }
}


document.getElementById("HumanP1").addEventListener("click", healthBars)


// function nextTurn() {
//     let turnP1 = true;
//     let turnP2 = false;
//     if (turnP1 = true) {
//         attackButtonP2.disabled = true;
//         healButtonP2.disabled = true;
//         // yieldButtonP2.disabled = true;
//         turnP1 = false;
//         turnP2 = true
//     } else if (turnP2 = true) {
//         attackButtonP1.disabled = true;
//         healButtonP2.disabled = true;
//         // yieldButtonP2.disabled = true;
//         turnP2 = false;
//         turnP1 = true;
//     } else {}
// }


// ||-------Start the battle-------||



// Log
// // function moveLog(race,damage,maxHealth){
//     // for (y = 0; y < 3; y++) {
// // document.getElementById("log").innerHTML = `${race} dealed ${damage} damage`;
// }
// moveLog()


//link images to buttons
document.getElementById("HumanP1").addEventListener("click", function () {
    document.getElementById("imageP1").src = player1.imgHuman;
    document.getElementById("avatarP1").src = player1.imgHuman;
    document.getElementById('raceExplP1').innerHTML = "20% less damage taken";
});

document.getElementById("OrcP1").addEventListener("click", function () {
    document.getElementById("imageP1").src = player1.imgOrc;
    document.getElementById("avatarP1").src = player1.imgOrc;
    document.getElementById('raceExplP1').innerHTML = "40% more max health";
});

document.getElementById("ElfP1").addEventListener("click", function () {
    document.getElementById("imageP1").src = player1.imgElf;
    document.getElementById("avatarP1").src = player1.imgElf;
    document.getElementById('raceExplP1').innerHTML = "30% chance to reflect, 50% of the original hit.";
});

document.getElementById("VampireP1").addEventListener("click", function () {
    document.getElementById("imageP1").src = player1.imgVampire;
    document.getElementById("avatarP1").src = player1.imgVampire;
    document.getElementById('raceExplP1').innerHTML = "10% lifesteal at start of the vampire's turn.";
});


document.getElementById("BootsP1").addEventListener("click", function () {
    document.getElementById("imageItemP1").src = player1.imgBoots;
    document.getElementById("ItemLogoP1").src = player1.imgBoots;
    document.getElementById('itemExplP1').innerHTML = "30% chance to dodge an attack"
});

document.getElementById("StaffP1").addEventListener("click", function () {
    document.getElementById("imageItemP1").src = player1.imgStaff;
    document.getElementById("ItemLogoP1").src = player1.imgStaff;
    document.getElementById('itemExplP1').innerHTML = "20% increase in healing"
});

document.getElementById("SwordP1").addEventListener("click", function () {
    document.getElementById("imageItemP1").src = player1.imgSword;
    document.getElementById("ItemLogoP1").src = player1.imgSword;
    document.getElementById('itemExplP1').innerHTML = "30% more damage"
});

document.getElementById("BowP1").addEventListener("click", function () {
    document.getElementById("imageItemP1").src = player1.imgBow;
    document.getElementById("ItemLogoP1").src = player1.imgBow;
    document.getElementById('itemExplP1').innerHTML = "30% chance to attack twice"
});


document.getElementById("HumanP2").addEventListener("click", function () {
    document.getElementById("imageP2").src = player2.imgHuman;
    document.getElementById("avatarP2").src = player2.imgHuman;
    document.getElementById('raceExplP2').innerHTML = "20% less damage taken";
});

document.getElementById("OrcP2").addEventListener("click", function () {
    document.getElementById("imageP2").src = player2.imgOrc;
    document.getElementById("avatarP2").src = player2.imgOrc;
    document.getElementById('raceExplP2').innerHTML = "40% more max health";
});

document.getElementById("ElfP2").addEventListener("click", function () {
    document.getElementById("imageP2").src = player2.imgElf;
    document.getElementById("avatarP2").src = player2.imgElf;
    document.getElementById('raceExplP2').innerHTML = "30% chance to reflect, 50% of the original hit.";
});

document.getElementById("VampireP2").addEventListener("click", function () {
    document.getElementById("imageP2").src = player2.imgVampire;
    document.getElementById("avatarP2").src = player2.imgVampire;
    document.getElementById('raceExplP2').innerHTML = "10% lifesteal at start of the vampire's turn.";
});


document.getElementById("BootsP2").addEventListener("click", function () {
    document.getElementById("imageItemP2").src = player2.imgBoots;
    document.getElementById("ItemLogoP2").src = player2.imgBoots;
    document.getElementById('itemExplP2').innerHTML = "30% chance to dodge an attack"
});

document.getElementById("StaffP2").addEventListener("click", function () {
    document.getElementById("imageItemP2").src = player2.imgStaff;
    document.getElementById("ItemLogoP2").src = player2.imgStaff;
    document.getElementById('itemExplP2').innerHTML = "20% increase in healing"
});

document.getElementById("SwordP2").addEventListener("click", function () {
    document.getElementById("imageItemP2").src = player2.imgSword;
    document.getElementById("ItemLogoP2").src = player2.imgSword;
    document.getElementById('itemExplP2').innerHTML = "30% more damage"
});

document.getElementById("BowP2").addEventListener("click", function () {
    document.getElementById("imageItemP2").src = player2.imgBow;
    document.getElementById("ItemLogoP2").src = player2.imgBow;
    document.getElementById('itemExplP2').innerHTML = "30% chance to attack twice"
});