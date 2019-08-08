import Person from "./character.js";

// ||-------Player creation-------||
// Create nodelists for race and item buttons
let p1RaceButton = document.querySelectorAll("div.selectRaceP1 button"); 
let p1ItemButton = document.querySelectorAll("div.selectItemsP1 button");
let p2RaceButton = document.querySelectorAll("div.selectRaceP2 button");
let p2ItemButton = document.querySelectorAll("div.selectItemsP2 button");

// These are used as parameters to create out object
let p1RaceParameter;
let p1ItemParameter;
let p2RaceParameter;
let p2ItemParameter;

let player1 = new Person("player 1", p1RaceParameter, p1ItemParameter);
let player2 = new Person("player 2", p2RaceParameter, p2ItemParameter);


// Gets the innerHTML value of the button and stores that in a variable so we can use that variable to create our object (player1, player2)
for (let i = 0; i < p1RaceButton.length; i++) {
    p1RaceButton[i].addEventListener("click", function () {
        p1RaceParameter = p1RaceButton[i].innerHTML;
        p1RaceButton[i].className = "activebutton";
        player1.race = p1RaceParameter
        console.log(p1RaceParameter)
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

// FOR TESTING PURPOSES DELETE ME WHEN FINISHED
document.getElementById("objecttest").addEventListener("click", function () {
    console.log(player1)
    console.log(player2)
    doubleAttack()
})

// If statements to check for race and items to apply bonuses
function p1ApplyRaceBonus() {
    if (player1.race === "human") {
        player1.classBonusHuman = 1.2 //20% less dmg taken
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
        player1.itemBonusStaff = 1.2 // 20% more healing
    } else if (player1.item = "sword") {
        player1.itemBonusSword = 1.3 // 30% more dmg
    } else if (player1.item === "bow") {
        player1.itemBonusBow = "0.3" // 30% chance to double attack
    } else {}
}

function p2ApplyRaceBonus() {
    if (player2.race === "human") {
        player2.classBonusHuman = 1.2
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


// ||-------Move list-------||
// Attack
document.getElementById("attackP1").addEventListener("click", attackOfPlayer1)

function attackOfPlayer1() {
    let doubleAttack;
    if (player1.item === "sword") {
        player1.totalDamage = Math.floor(player1.damage() * player1.itemBonusSword)
    } else if (player1.item === "bow") {
        if (Math.random() <= 1) { //
            doubleAttack = player1.damage();
        } else {
            doubleAttack = 0 
        } 
        player1.totalDamage = player1.damage() + doubleAttack        
    } else {
        player1.totalDamage = player1.damage();
    }
    player2.currentHealth -= player1.totalDamage;
    healthBars();
    console.log(player1.totalDamage)
}


document.getElementById("healP1").addEventListener("click", healOfPlayer1)

function healOfPlayer1() {
    player1.currentHealth += player1.heal();
    healthBars();
}

document.getElementById("attackP2").addEventListener("click", attackOfPlayer2)

function attackOfPlayer2() {
    player1.currentHealth -= player2.damage();
    healthBars();
}

document.getElementById("healP2").addEventListener("click", healOfPlayer2)

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
}


document.getElementById("HumanP1").addEventListener("click", healthBars)



let attackButtonP1 = document.getElementById("attackP1");
let healButtonP1 = document.getElementById("healP1");
let yieldButtonP1 = document.getElementById("yieldP1");
let attackButtonP2 = document.getElementById("attackP2");
let healButtonP2 = document.getElementById("healP2");
let yieldButtonP2 = document.getElementById("yieldP2")


let turnP1 = true;
let turnP2 = false;



// function disableButtonTurnP1() {
//     if (turnP1 = true)
//     // healButtonP1.disabled = true;
//     // yieldButtonP1.disabled = true;
//     // attackButtonP2.disabled = true;
//     // healButtonP2.disabled = true;
//     // yieldButtonP2.disabled = true;
// }




// ||-------Start the battle-------||
document.getElementById("ready").addEventListener("click", function(){
    p1ApplyRaceBonus();
    p1ApplyItemBonus();
    p2ApplyRaceBonus();
    p2ApplyItemBonus();
    removeStartscreen();
})

function hidebattlescreen() {
    document.getElementById("battlescreen").style.display = "none";
}

hidebattlescreen()

function removeStartscreen() {
    var element = document.getElementById("startscreen");
    element.remove("startscreen");
    document.getElementById("battlescreen").style.display = "block";
    healthBars()
}




// Log
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

document.getElementById("HumanP1").addEventListener("click", function(){
    document.getElementById("imageP1").src = player1.imgHuman;
    document.getElementById("avatarP1").src = player1.imgHuman;
    document.getElementById('raceExplP1').innerHTML = "20% less damage taken";
});

    document.getElementById("OrcP1").addEventListener("click", function(){
    document.getElementById("imageP1").src = player1.imgOrc;
    document.getElementById("avatarP1").src = player1.imgOrc;
    document.getElementById('raceExplP1').innerHTML = "40% more max health";
});

    document.getElementById("ElfP1").addEventListener("click", function(){
    document.getElementById("imageP1").src = player1.imgElf;
    document.getElementById("avatarP1").src = player1.imgElf;
    document.getElementById('raceExplP1').innerHTML = "30% chance to reflect, 50% of the original hit.";
});

    document.getElementById("VampireP1").addEventListener("click", function(){
    document.getElementById("imageP1").src = player1.imgVampire;
    document.getElementById("avatarP1").src = player1.imgVampire;
    document.getElementById('raceExplP1').innerHTML = "10% lifesteal at start of the vampire's turn.";
});


    document.getElementById("BootsP1").addEventListener("click", function(){
    document.getElementById("imageItemP1").src = player1.imgBoots;
    document.getElementById("ItemLogoP1").src = player1.imgBoots;
    document.getElementById('itemExplP1').innerHTML = "30% chance to dodge an attack"
});

    document.getElementById("StaffP1").addEventListener("click", function(){
    document.getElementById("imageItemP1").src = player1.imgStaff;
    document.getElementById("ItemLogoP1").src = player1.imgStaff;
    document.getElementById('itemExplP1').innerHTML = "20% increase in healing"
});

    document.getElementById("SwordP1").addEventListener("click", function(){
    document.getElementById("imageItemP1").src = player1.imgSword;
    document.getElementById("ItemLogoP1").src = player1.imgSword;
    document.getElementById('itemExplP1').innerHTML = "30% more damage"
});

    document.getElementById("BowP1").addEventListener("click", function(){
    document.getElementById("imageItemP1").src = player1.imgBow;
    document.getElementById("ItemLogoP1").src = player1.imgBow;
    document.getElementById('itemExplP1').innerHTML = "30% chance to attack twice"
});


    document.getElementById("HumanP2").addEventListener("click", function(){
    document.getElementById("imageP2").src = player2.imgHuman;
    document.getElementById("avatarP2").src = player2.imgHuman;
    document.getElementById('raceExplP2').innerHTML = "20% less damage taken";
});

    document.getElementById("OrcP2").addEventListener("click", function(){
    document.getElementById("imageP2").src = player2.imgOrc;
    document.getElementById("avatarP2").src = player2.imgOrc;
    document.getElementById('raceExplP2').innerHTML = "40% more max health";
});

    document.getElementById("ElfP2").addEventListener("click", function(){
    document.getElementById("imageP2").src = player2.imgElf;
    document.getElementById("avatarP2").src = player2.imgElf;
    document.getElementById('raceExplP2').innerHTML = "30% chance to reflect, 50% of the original hit.";
});

    document.getElementById("VampireP2").addEventListener("click", function(){
    document.getElementById("imageP2").src = player2.imgVampire;
    document.getElementById("avatarP2").src = player2.imgVampire;
    document.getElementById('raceExplP2').innerHTML = "10% lifesteal at start of the vampire's turn.";
});


    document.getElementById("BootsP2").addEventListener("click", function(){
    document.getElementById("imageItemP2").src = player2.imgBoots;
    document.getElementById("ItemLogoP2").src = player2.imgBoots;
    document.getElementById('itemExplP2').innerHTML = "30% chance to dodge an attack"
});

    document.getElementById("StaffP2").addEventListener("click", function(){
    document.getElementById("imageItemP2").src = player2.imgStaff;
    document.getElementById("ItemLogoP2").src = player2.imgStaff;
    document.getElementById('itemExplP2').innerHTML = "20% increase in healing"
});

    document.getElementById("SwordP2").addEventListener("click", function(){
    document.getElementById("imageItemP2").src = player2.imgSword;
    document.getElementById("ItemLogoP2").src = player2.imgSword;
    document.getElementById('itemExplP2').innerHTML = "30% more damage"
});

    document.getElementById("BowP2").addEventListener("click", function(){
    document.getElementById("imageItemP2").src = player2.imgBow;
    document.getElementById("ItemLogoP2").src = player2.imgBow;
    document.getElementById('itemExplP2').innerHTML = "30% chance to attack twice"
});
