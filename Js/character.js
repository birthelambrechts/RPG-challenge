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
    this.totalHeal = ""

    this.damage = function () {return Math.floor(Math.random() * this.maxDamage) + this.min}

    this.totalDamage = "" // + race modifiers;

    this.classBonusHuman = "";
    this.classBonusElf = "";
    this.classBonusVampire = "";

    this.itemBonusBoots = "";
    this.itemBonusStaff = "";
    this.itemBonusSword = "";
    this.itemBonusBow = "";

    this.imgHuman = "./images/human.png";
    this.imgOrc = "./images/orc.png";
    this.imgElf = "./images/elf.png";
    this.imgVampire = "./images/vampire.png";

    this.imgBoots = "./images/boots.png";
    this.imgStaff = "./images/staff.png";
    this.imgSword = "./images/swords.png";
    this.imgBow = "./images/bow.png";
}












