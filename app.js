const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById("seconds");
const tensSpan = document.getElementById("tens");

const progressBar = document.getElementById("myBar");
const eventBorder = document.getElementById("events");
const timerText = document.getElementById("text");
const title = document.getElementById("title");
const progressBorder = document.getElementById("myProgress");
const controlButtons = document.getElementsByClassName("timers");


const buttonStart = document.getElementById('button-start');
const buttonStop = document.getElementById('button-stop');
const buttonReset = document.getElementById('button-reset')

const COLORS = {
    green: "#00ff00",
    yellow: "#ffff00",
    cyan: "#00ffff",
    purple: "#ff00ff",
    red: "#ff0000"
}

const REFRESH_PERIOD = 10;  // Refreshes every 10ms;
const BAR_TIME = 0.5 * 60 * 1000;

//------------------------------------------------------//

let startTime = null;  // The time the start button was pressed in unix-time
let interval = null;  // Holds a setInterval object that advances the timer and the progress bar

function currentTime() {  // Returns the current time
    const dateObj = new Date();  // A date object for getting the time
    return dateObj.getTime();  // Returns the current time :)
}

function addLeadingZero(num) {  // Adds a leading zero to single-digit numbers
    let result = num.toString();  // Set result to a string version of num

    if (result.length == 1)   // If result is a single-digit number
        result = `0${result}`;  // Set put a zero at the beginning of result

    return result;
}

function displayTime(deltaTimeIn) {  // Given deltaTime, adds leading zeros and displays
    const minutes = Math.floor(deltaTimeIn / (60 * 1000));  // The number of minutes since start
    const seconds = Math.floor(deltaTimeIn / 1000) % 60;  // The number of seconds since start
    const tens = Math.floor(deltaTimeIn / 10) % 100;  // The number of tens since start

    minutesSpan.innerText = addLeadingZero(minutes);  // Display minutes
    secondsSpan.innerText = addLeadingZero(seconds);  // Display seconds
    tensSpan.innerText = addLeadingZero(tens);  // Display tens
}

function changeColor(color) {
    eventBorder.style.borderColor = color;  // The outline
    title.style.color = color;  // The title
    timerText.style.color = color;  // The timer's color
    timerText.style.borderColor = color;  // The timer's border
    progressBorder.style.borderColor = color;  // The border for the progress bar
    progressBar.style.backgroundColor = color;  // The progress bar
    for (const ele of controlButtons) {  // For every timer control button
        ele.style.borderColor = color;  // Set the border color to color
        ele.style.setProperty('--colorChange', color)  // Set the color for when active
        ele.style.setProperty('--backgroundChange', color)  // Set the background color for active
    }
}

function runTimer() {  // Called every 10 miliseconds
    const deltaTime = currentTime() - startTime;  // Calculates a difference in time

    let barProgress = 100 * deltaTime / BAR_TIME;  // A percentage of how much progress has been made

    if (barProgress > 100)  // If progress is over 100%
        barProgress = 100;  // Set it back to 100%

    progressBar.style.width = `${barProgress}%`;  // Set the width of the progress bar to its percent

    if (barProgress >= 25 && barProgress < 50) {
        changeColor(COLORS.cyan);
    } else if (barProgress >= 50 && barProgress < 75) {
        changeColor(COLORS.purple);
    } else if (barProgress >= 75) {
        changeColor(COLORS.red);
    } else {
        changeColor(COLORS.green);
    }

    displayTime(deltaTime);  // Display the time :3
}

function start() {  // Sets the start time and starts running the runTimer interval
    if (startTime === null)  // If startTime has not been set yet
        startTime = currentTime();  // Set it

    if (interval === null)  // If interval has not been set yet
        interval = setInterval(runTimer, REFRESH_PERIOD);  // Start the runTimer to run every REFRESH_PERIOD and store in interval
}

function stop() {  // Stops the runTimer interval
    clearInterval(interval);
    interval = null;
}

function reset() {  // Resets the startTime and clears the interval
    startTime = null;


    clearInterval(interval);
    interval = null;

    progressBar.style.width = "0";  // Resets the progress bar
    displayTime(0);  // Set timer to 00:00:00

    changeColor(COLORS.green);
}

buttonStart.addEventListener("click", start);
buttonStop.addEventListener("click", stop);
buttonReset.addEventListener("click", reset);