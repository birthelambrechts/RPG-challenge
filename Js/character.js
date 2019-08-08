export default function Person(defaultName, race, item) {
    this.name = defaultName
    this.race = race;
    this.item = item;
    this.currentHealth = 100;
    this.maxHealth = 100;

    this.min = 3;
    this.maxDamage = 20;
    this.maxHealing = 30;

    this.heal = function() {return Math.floor(Math.random() * this.maxHealing) + this.min}

    this.damage = function () {return Math.floor(Math.random() * this.maxDamage) + this.min}

    this.totalDamage = "" // + race modifiers;

    this.classBonusHuman = "";
    this.classBonusElf = "";
    this.classBonusVampire = "";

    this.itemBonusBoots = "";
    this.itemBonusStaff = "";
    this.itemBonusSword = "";
    this.itemBonusBow = "";

    this.imgHuman = "./images/Toy.png";
    this.imgOrc = "./images/lolly.png";
    this.imgElf = "./images/Toy.png";
    this.imgVampire = "./images/lolly.png";

    this.imgBoots = "./images/lolly.png";
    this.imgStaff = "./images/Toy.png";
    this.imgSword = "./images/lolly.png";
    this.imgBow = "./images/Toy.png";
}












