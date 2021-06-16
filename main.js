
//constants, wont be changed (frequently)
const totalMoney = 1200;
const maxHealth = 100;
const maxActionADay = 3;



//economy
var currentMoney = 0;
var health;
var eatPrice = 320;
var workIncome = 140;

var loseHealth = 16;
var gainHealth = 8;
//actions
var dayElapsed = 0;
var actionCount = 0;


var totalDed = 0;
var tS = 0;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

//used let to distinguish that these are html. 
let eatText = document.querySelector("#eatText");
let healthText = document.querySelector("#healthText");
let daysText = document.querySelector("#daysText");

let eatButton = document.querySelector("#eat");
let workButton = document.querySelector("#work");
let proceedButton = document.querySelector('#proceedToNextDay');

let  infoText = document.querySelector("#info");

//loader
let  loader = document.querySelector('#loader');
//ded
let  ded = document.querySelector('#ded');
let dedCount = document.querySelector("#dedCount");


function start()
{
      ded.style.display = "none";
       
    currentMoney = totalMoney;
    health = maxHealth * 0.8;
    
    totalDed = localStorage.getItem("DedCount");
    tS = localStorage.getItem("tS");
    
    
    proceedButton.style.display = 'none';
    
    infoText.textContent = "After each day, you will lose " + loseHealth + " health.  You can do maximum of " + maxActionADay
     + " activity a day. So maintain everything carefully. It is a prototype of Text-based Survival Management game, fully written in HTML, CSS and JavaScript. May further be improved in a game engine.";
    updateUI();
    loader.style.display = "none";
    
}
function eat()
{
   if(currentMoney >= eatPrice){
      currentMoney -= eatPrice;
      health = clamp(health+gainHealth,0,maxHealth);
      
      actionTaken();
      updateUI();
    }
}
function work()
{
      currentMoney += workIncome;
      
      actionTaken();
      updateUI();
}

function actionTaken()
{
      actionCount++;
      if(actionCount >= maxActionADay)
      {
          //ACTIVATE PROCEED TO NEXT BUTTON
          proceedButton.style.display = 'inline';
          //disable interaction
          toggleInteraction(0);
          
      }
}
function proceedToNextDay()
{  
      actionCount = 0;
      dayElapsed++;
      tS++;
      
      //reduce health
      health = clamp(health-loseHealth,0,maxHealth);
      proceedButton.style.display = 'none';
      
      
      //enable interaction
       toggleInteraction(1);
      
      updateUI();
}
function toggleInteraction(q)
{
    if(q == 0){
          //DISABLE THE INTERACTION BUTTONS
          eatButton.style.pointerEvents = 'none';
          eatButton.style.background = 'rgba(0,0,0,0.1)';
          eatButton.style.boxShadow= '0px 0px';
		  
          workButton.style.pointerEvents = 'none';
          workButton.style.background = 'rgba(0,0,0,0.1)';
		  workButton.style.boxShadow= '0px 0px';
          }
    else
       {
          eatButton.style.pointerEvents = 'auto';
          workButton.style.pointerEvents = 'auto';
          
           eatButton.style.background = 'rgba(255, 255, 255, 0)';
		   eatButton.style.boxShadow= '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
		   
		   workButton.style.boxShadow= '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
           workButton.style.background = 'rgba(255, 255, 255, 0)';
       }
       
}

function updateUI()
{
  eatText.textContent = "Money: " + currentMoney;
  //eatText.textContent = "Money: " + tS;
   healthText.textContent = "Health: " +health + "/" + maxHealth;
   daysText.textContent = "Day Survived: " + dayElapsed;
   
   eatButton.textContent = "Eat (-" + eatPrice.toString() + "Mo|+" + gainHealth+ "HP)";
   workButton.textContent = "Work (+" + workIncome.toString() + "Mo)";
    
   
   
   if(health == 0)
   {
      
       totalDed++;
       dedCount.textContent = "Total Ded: " + totalDed + " | Total Survived:" + tS;
       localStorage.setItem("DedCount",totalDed);
       localStorage.setItem("tS", tS);
       ded.style.display = "flex";
   }
}
