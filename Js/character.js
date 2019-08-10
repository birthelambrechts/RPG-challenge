export default function Person(defaultName, race, item) {
    this.name = defaultName
    this.race = race;
    this.item = item;
    this.currentHealth = 100;
    this.maxHealth = 100;

    this.min = 3;
    this.maxDamage = 20;
    this.maxHealing = 8;

    this.heal = function() {return Math.floor(Math.random() * this.maxHealing) + this.min}
    this.totalHeal = 0;

    this.damage = function () {return Math.floor(Math.random() * this.maxDamage) + this.min}

    this.totalDamage = 0; // + race modifiers;

    this.classBonusHuman = 0;
    this.classBonusElf = 0;
    this.classBonusVampire = 0;

    this.itemBonusBoots = 0;
    this.itemBonusStaff = 0;
    this.itemBonusSword = 0;
    this.itemBonusBow = 0;

    this.imgHuman = "./images/human.png";
    this.imgOrc = "./images/orc.png";
    this.imgElf = "./images/elf.png";
    this.imgVampire = "./images/vampire.png";

    this.imgBoots = "./images/boots.png";
    this.imgStaff = "./images/staff.png";
    this.imgSword = "./images/swords.png";
    this.imgBow = "./images/bow.png";
}












