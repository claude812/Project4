const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
let originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
let timer=[0,0,0];
let interval=null;
let timerRunning=false;
let errorCount=0;
let totChar=0;

const sentences=[
"Rugby is one of the best sports in the world.",
"I have loved my uni exchange in America.",
"I have made loads of friends here especially with international students",
"I hope portugal win the world cup this year.",
"I will always love my time here."]
function loadRandomString(){
const randomIndex=Math.floor(Math.random()*sentences.length);
const newText= sentences[randomIndex];
document.querySelector("#origin-text p").innerHTML= newText;
originText=newText;}
loadRandomString();
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
if(time<=9){
 return "0" + time;
 }else{
 return time;}
 }

// Run a standard minute/second/hundredths timer:
function runTimer(){
timer[2]++
if(timer[2]===100){
timer[2]=0;
timer[1]++;}
if(timer[1]===60){
timer[1]=0;
timer[0]++;}

let currentTime = `${leadingZero(timer[0])}:${leadingZero(timer[1])}:${leadingZero(timer[2])}`;

theTimer.innerHTML=currentTime;
}

// Match the text entered with the provided text on the page:
function spellCheck(){
let textEntered=testArea.value;
totChar=textEntered.length;
let originSubstring=originText.substring(0,textEntered.length);
if(textEntered ===originText){
clearInterval(interval);
testWrapper.style.borderColor="green";
calculateWPM();
saveScore(timer)}
else if(textEntered === originSubstring){
testWrapper.style.borderColor="blue";}
else{
testWrapper.style.borderColor="red";
errorCount++;}
}

// Start the timer:
function startTheTimer(){
if(!timerRunning){
timerRunning= true;
interval= setInterval(runTimer,10);}}

// Reset everything:
function reset(){
clearInterval(interval);
interval=null;
timer=[0,0,0];
timerRunning=false;
theTimer.innerHTML="00:00:00";
testArea.value="";
testWrapper.style.borderColor="grey";
loadRandomString();
errorCount = 0;
totChar = 0;}



function calculateWPM() {
let totalSeconds = timer[0] * 60 + timer[1] + timer[2] / 100;
let wpm =Math.round((totChar/5)/(totalSeconds/60));
document.getElementById("wpm").textContent=`WPM: ${wpm}`;
document.getElementById("errors").textContent = `Errors: ${errorCount}`;
}
// Event listeners for keyboard input and the reset button:
testArea.addEventListener("input", startTheTimer);
testArea.addEventListener("input", spellCheck);
resetButton.addEventListener("click", reset);
function timerToHundredths(t) {
return t[0] * 6000 + t[1] * 100 + t[2];
}
function saveScore(timer) {
let newScore = timerToHundredths(timer);
let scores = JSON.parse(localStorage.getItem("typingScores")) || [];
scores.push(newScore);
scores.sort((a, b) => a - b);
scores = scores.slice(0, 3);
localStorage.setItem("typingScores", JSON.stringify(scores));
displayScores();
}
function displayScores() {
let scores = JSON.parse(localStorage.getItem("typingScores")) || [];
let scoreList = document.getElementById("scores");
scoreList.innerHTML = "";
scores.forEach(score => {
let minutes = Math.floor(score / 6000);
let seconds = Math.floor((score % 6000) / 100);
let hundredths = score % 100;
let formatted = `${leadingZero(minutes)}:${leadingZero(seconds)}:${leadingZero(hundredths)}`;
let li = document.createElement("li");
li.textContent = formatted;
scoreList.appendChild(li);});
}
displayScores();
