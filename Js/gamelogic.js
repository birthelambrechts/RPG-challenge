import Person from "./character.js";

let p1ClassButton = document.getElementById("p1class");
let p2ClassButton = document.getElementById("p2class");
let p1ItemButton = document.getElementById("p1item");
let p2ItemButton = document.getElementById("p2item");
let p1AttackButton = document.getElementById("p1attack");


let human = "human";
let orc = "orc";
let elf = "elf";
let vampire = "vampire";

let boots = "boots";
let staff = "staff";
let sword = "sword";
let bow = "bow";

let player1 = new Person("", "")
let player2 = new Person("", "")

// Link me to event listener player 1 race
if (player1.race === "human") {
    player1.classBonusHuman = 0.2 //20% less dmg taken
} else if (player1.race === "orc") {
    player1.currentHealth = 140 //40% more hp
    player1.maxHealth = 140
} else if (player1.race === "elf") {
    player1.classBonusElf = [0.3, 0.5]; // 30% reflect attack chance up to 50 dmg of hit
} else if (player1.race === "vampire") {
    player1.classBonusVampire = "0.1" // 10% lifesteal
} else {}


// Link me to event listener player 2 race
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


// Link me to event listener player 1 item
if (player1.item === "boots") {
    player1.itemBonusBoots = 0.3 // 30% dodge chance
} else if (player1.item === "staff") {
    player1.itemBonusStaff = 0.2 // 20% more healing
} else if (player1.item = "sword") {
    player1.itemBonusSword = 0.3 // 30% more dmg
} else if (player1.item === "bow") {
    player1.itemBonusBow = "0.3" // 30% chance to double attack
} else {}

// Link me to event listener player 2 item
if (player2.item === "boots") {
    player2.itemBonusBoots = 0.3 // 30% dodge chance
} else if (player2.item === "staff") {
    player2.itemBonusStaff = 0.2 // 20% more healing
} else if (player2.item === "sword") {
    player2.itemBonusSword = 0.3 // 30% more dmg
} else if (player2.item === "bow") {
    player2.itemBonusBow = "0.3" // 30% chance to double attack
} else {}

// attack 
// p1AttackButton.addEventListener("click", attackOfPlayer1)

// function attackOfPlayer1() {
//     console.log("click")
//     player2.currentHealth -= Math.floor(Math.random() * player1.maxDamage) + player1.min
//     console.log(player2.currentHealth)

// }



console.log(player1)
console.log(player2)


