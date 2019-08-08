export default function Person(race, item) {
    this.race = race;
    this.item = item;
    this.currentHealth = 100;
    this.maxHealth = 100;

    this.min = 3;
    this.maxDamage = 20;
    this.maxHealing = 30;

    this.heal = function() {return Math.floor(Math.random() * this.maxHealing) + this.min}

    this.damage = function () {return Math.floor(Math.random() * this.maxDamage) + this.min}

    this.totalDamage = this.damage // + race modifiers;

    this.classBonusHuman = "";
    this.classBonusElf = "";
    this.classBonusVampire = "";

    this.itemBonusBoots = "";
    this.itemBonusStaff = "";
    this.itemBonusSword = "";
    this.itemBonusBow = "";
    
    this.test = function(){return}

    // displayChar(this.race,this.item,this.maxHealth);
}












