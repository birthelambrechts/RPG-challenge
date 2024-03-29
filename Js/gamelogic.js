import Person from "./character.js";
// Variables for race and item stats
let humanLessDamage = 0.8;
let elfReflectChance = [0.3, 0.5];
let vampireLifesteal = 0.1;

let bootsDodgeChance = 0.3;
let staffMoreHealing = 1.2;
let swordMoreDamage = 1.2;
let bowDoubleAttackChance = 0.3;

// Create nodelists for race and item buttons
let p1RaceButton = document.querySelectorAll("div.selectRaceP1 button");
let p1ItemButton = document.querySelectorAll("div.selectItemsP1 button");
let p2RaceButton = document.querySelectorAll("div.selectRaceP2 button");
let p2ItemButton = document.querySelectorAll("div.selectItemsP2 button");

// Variables for object
let p1RaceParameter;
let p1ItemParameter;
let p2RaceParameter;
let p2ItemParameter;

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

// Variables for deciding the turns and the movelog
let turnP1 = true;
let turnP2 = false;
let li = document.createElement('li')

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
        p1RaceButton[0].classList.remove("activebutton");
        p1RaceButton[1].classList.remove("activebutton");
        p1RaceButton[2].classList.remove("activebutton");
        p1RaceButton[3].classList.remove("activebutton");
        p1RaceButton[i].className = "activebutton";
    });
}

for (let i = 0; i < p1ItemButton.length; i++) {
    p1ItemButton[i].addEventListener("click", function () {
        player1.item = p1ItemButton[i].innerHTML;
        p1ItemButton[0].classList.remove("activebutton");
        p1ItemButton[1].classList.remove("activebutton");
        p1ItemButton[2].classList.remove("activebutton");
        p1ItemButton[3].classList.remove("activebutton");
        p1ItemButton[i].className = "activebutton";
    });
}

for (let i = 0; i < p2RaceButton.length; i++) {
    p2RaceButton[i].addEventListener("click", function () {
        player2.race = p2RaceButton[i].innerHTML;
        p2RaceButton[0].classList.remove("activebutton");
        p2RaceButton[1].classList.remove("activebutton");
        p2RaceButton[2].classList.remove("activebutton");
        p2RaceButton[3].classList.remove("activebutton");
        p2RaceButton[i].className = "activebutton";
    });
}

for (let i = 0; i < p2ItemButton.length; i++) {
    p2ItemButton[i].addEventListener("click", function () {
        player2.item = p2ItemButton[i].innerHTML;
        p2ItemButton[0].classList.remove("activebutton");
        p2ItemButton[1].classList.remove("activebutton");
        p2ItemButton[2].classList.remove("activebutton");
        p2ItemButton[3].classList.remove("activebutton");
        p2ItemButton[i].className = "activebutton";
    });
}

// If statements to check for race and items to apply bonuses
function applyRaceBonus(player) {
    if (player.race === "human") {
        player.classBonusHuman = humanLessDamage //20% less dmg taken
    } else if (player.race === "orc") {
        player.currentHealth = 140 //40% more hp
        player.maxHealth = 140
    } else if (player.race === "elf") {
        player.classBonusElf = elfReflectChance; // 30% reflect attack chance up to 50 dmg of hit
    } else if (player.race === "vampire") {
        player.classBonusVampire = vampireLifesteal // 10% lifesteal
    } else {}
}

function applyItemBonus(player) {
    if (player.item === "boots") {
        player.itemBonusBoots = bootsDodgeChance // 30% dodge chance
    } else if (player.item === "staff") {
        player.itemBonusStaff = staffMoreHealing // 20% more healing
    } else if (player.item === "sword") {
        player.itemBonusSword = swordMoreDamage // 30% more dmg
    } else if (player.item === "bow") {
        player.itemBonusBow = bowDoubleAttackChance // 30% chance to double attack
    } else {}
}

// Apply race and item bonus to players and hides create char screen
document.getElementById("ready").addEventListener("click", function () {
    applyRaceBonus(player1);
    applyItemBonus(player1);
    applyRaceBonus(player2);
    applyItemBonus(player2);
    startBattleCheck();
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

function startBattleCheck() {
    if (player1.race !== undefined && player1.item !== undefined && player2.race !== undefined && player1.item !== undefined) {
        removeStartscreen();
    } else {
        document.getElementById("ready").innerHTML = "Select everything!!!"
    }
}

// ||-------Move list-------||
// Adding attack, heal, turn and log functions to corresponding buttons
attackButtonP1.addEventListener("click", function () {
    attack(player1, player2);
    createLogP1()
    turnP1 = false;
    turnP2 = true;
    nextTurn();
    showbloodP1()
})

attackButtonP2.addEventListener("click", function () {
    attack(player2, player1)
    createLogP2()
    turnP2 = false;
    turnP1 = true;
    nextTurn();
    showbloodP2()
})

healButtonP1.addEventListener("click", function () {
    heal(player1);
    healLogP1();
    turnP1 = false;
    turnP2 = true;
    nextTurn();
})

healButtonP2.addEventListener("click", function () {
    heal(player2);
    healLogP2();
    turnP2 = false;
    turnP1 = true;
    nextTurn();
})

// Attack function with all the modifiers
function attack(your, opponent) {

    switch (your.item) {
        case "sword":
            your.totalDamage = Math.floor(your.damage() * your.itemBonusSword)
            console.log("sword");
            break;
        case "bow":
            if (Math.random() <= your.itemBonusBow) {
                your.totalDamage = your.damage() * 2;

            } else {
                your.totalDamage = your.damage();

            }
            console.log("bow");
            break;
        default:
            your.totalDamage = your.damage();
            break;
    }

    if (opponent.item == "boots") {
        if (Math.random() <= opponent.itemBonusBoots) {
            your.totalDamage = 0;
        }
    }

    //Race de-modifiers
    switch (opponent.race) {
        case "human":
            your.totalDamage = Math.floor(your.totalDamage * opponent.classBonusHuman);
            console.log("human");
            break;
        case "elf":
            let reflectValue;
            if (Math.random() <= opponent.classBonusElf[0]) {
                reflectValue = Math.floor(your.totalDamage * opponent.classBonusElf[1]);
                your.currentHealth -= reflectValue;
            }
            console.log("elf");
            break;
            //still needs some fixing => heals before attack
        case "vampire":
            var health = opponent.currentHealth + Math.floor(your.currentHealth * opponent.classBonusVampire);
            if (health > opponent.maxHealth) {
                opponent.currentHealth = opponent.maxHealth;

            } else {
                opponent.currentHealth = health;
            }
            console.log("vampire");
            break;
    }

    // if (your.item === "sword") {
    //     console.log("sword");
    //     your.totalDamage = Math.floor(your.damage() * your.itemBonusSword)
    // } else if (opponent.item === "boots") {
    //     console.log("boots");
    //     let dodgeChance;
    //     if (Math.random() <= opponent.itemBonusBoots) {
    //         your.totalDamage = 0;
    //         console.log("enemy dodged")
    //     } else {
    //         your.totalDamage = your.damage()
    //     }
    // } else if (your.item === "bow") {
    //     let doubleAttackValue;
    //     if (Math.random() <= your.itemBonusBow) {
    //         doubleAttackValue = your.damage();
    //         console.log("double attack");
    //     } else {
    //         doubleAttackValue = 0
    //     }
    //     your.totalDamage = your.damage() + doubleAttackValue
    // } else if (opponent.race === "human") {
    //     console.log("take 20% less damage");
    //     your.totalDamage = Math.floor(your.damage() * opponent.classBonusHuman)
    // } else if (opponent.race === "elf") {
    //     let reflectValue;
    //     if (Math.random() <= opponent.classBonusElf[0]) {
    //         reflectValue = Math.floor(your.damage() * opponent.classBonusElf[1])
    //         your.currentHealth -= reflectValue
    //         console.log("elf reflected your attack")
    //     } else if (opponent.race === "vampire") {
    //         your.totalDamage = your.damage();
    //         //opponent.currentHealth += your.currentHealth * opponent.classBonusVampire
    //     } else {
    //         your.totalDamage = your.damage()
    //     }
    // } else {
    //     your.totalDamage = your.damage();
    // }

    opponent.currentHealth -= your.totalDamage;

    //vampireLifestealCheck(your);
    healthBars();
};

// Heal function 
function heal(your) {
    let healingAmount = your.heal();
    if (your.currentHealth + healingAmount < your.maxHealth)
        if (your.item === "staff") {
            your.totalHeal = Math.floor(your.heal() * your.itemBonusStaff)
            console.log("You healed 20% more")
        } else {
            your.totalHeal = your.heal();
        }
    else {
        your.totalHeal = 0
    }
    your.currentHealth += your.totalHeal;
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
        document.getElementById("winnerscreenContent").innerHTML = inputFieldP2.value + " wins";
    }
    if (player2.currentHealth < 1) {
        removeBattlescreen()
        document.getElementById("winnerscreenContent").innerHTML = inputFieldP1.value + " wins";
    }
}

function createLogP1() {
    let li = document.createElement('li')
    let logP1 = inputFieldP1.value + " dealed " + player1.totalDamage + " damage."
    li.innerHTML = logP1
    document.getElementById("log").prepend(li)
}

function createLogP2() {
    let li = document.createElement('li')
    let logP2 = inputFieldP2.value + " dealed " + player2.totalDamage + " damage."
    li.innerHTML = logP2
    document.getElementById("log").prepend(li)
}

document.getElementById("healP1").addEventListener("click", healLogP1);

function healLogP1() {
    let heallogP1 = inputFieldP1.value + " healed " + player1.totalHeal + "."
    li.innerHTML = heallogP1
    document.getElementById("log").prepend(li)
}

function healLogP2() {
    let heallogP2 = inputFieldP2.value + "healed " + player2.totalHeal + "."
    li.innerHTML = heallogP2
    document.getElementById("log").prepend(li)
}

// Disables the opponents buttons when it's your turn (true, false) 
function nextTurn() {

    if (turnP1 === true) {
        attackButtonP1.disabled = false;
        healButtonP1.disabled = false;
        yieldButtonP1.disabled = false;
        attackButtonP2.disabled = true;
        healButtonP2.disabled = true;
        yieldButtonP2.disabled = true;
    } else if (turnP2 === true) {
        attackButtonP2.disabled = false;
        healButtonP2.disabled = false;
        yieldButtonP2.disabled = false;
        attackButtonP1.disabled = true;
        healButtonP1.disabled = true;
        yieldButtonP1.disabled = true;
    }

}

// When it's your turn checks if your race is a vampire and does lifesteal
function vampireLifestealCheck(your) {
    if (your.race === "vampire") {
        var health = your.currentHealth + Math.ceil(your.classBonusVampire * your.totalDamage);
        if (health > your.maxHealth) {
            your.currentHealth = your.maxHealth;

        } else {
            your.currentHealth = health;
        }
    }
}


function showbloodP1() {
    document.getElementById("bloodyP2").style.display = "block";
    blood = setTimeout(showbloodtimerP1, 400);
}
let blood;

function showbloodtimerP1() {
    document.getElementById("bloodyP2").style.display = "none"
}
showbloodtimerP1()

function showbloodP2() {
    document.getElementById("bloodyP1").style.display = "block";
    blood1 = setTimeout(showbloodtimerP2, 400);
}
let blood1;

function showbloodtimerP2() {
    document.getElementById("bloodyP1").style.display = "none"
}
showbloodtimerP2()


//function setToBlack()
//{setTimeout ( "setToBlack()", 1000 );document.getElementById("colourButton").style.color = "#000000";}

// ||-------Start the battle-------||
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