import Person from "./character.js";

let p1RaceParameter = "";
let p1ItemParameter = "";
let p2RaceParameter = "";
let p2ItemParameter = "";

let player1 = new Person("player 1", p1RaceParameter, p1ItemParameter);
let player2 = new Person("player 2", p2RaceParameter, p2ItemParameter);

document.getElementById("test").addEventListener("click", function(){
    console.log(player1);
    console.log(player2)
})