document.getElementById("title").onclick = () => {window.location.href = "../index.html"}

// Library

function changeX(vel, acc, t)
{
    return vel * t + .5*acc*t*t
}

function getVel(vel, acc, t)
{
    return vel + acc*t;
}

function digits(value, place)
{
    let scale = Math.pow(10, place)
    return Math.round(value*scale)/scale
}

let lastFrameTimeStamp = new Date().getTime()
function deltaTime()
{
    let d = (new Date().getTime() - lastFrameTimeStamp)/1000;
    lastFrameTimeStamp = new Date().getTime()
    return d
}

const playButton = document.getElementById("play-sim-button")
const simContainer = document.getElementById("sim-container")

let firstPlay = true
let inAnim = false
let paused = false

function updateButton()
{
    if (firstPlay)
    {
       playButton.dataset.state = "play"
    } else if(inAnim) {
        if (paused) 
            playButton.dataset.state = "play"
        else 
            playButton.dataset.state = "paused"
    } else {paused
        playButton.dataset.state = "replay"
    }
}

function togglePause()
{
    paused = !paused
    updateButton()
}

updateButton()

// Acceleration Sim
let sims = {};
(() => {

    const accLabel = document.getElementById("acc-sim-acc-label")
    const velLabel = document.getElementById("acc-sim-vel-label")
    const posLabel = document.getElementById("acc-sim-pos-label")

    const car = document.getElementById("acc-sim-car")

    // Initial Variables
    let initialPos = 0
    let initialVelocity = 0
    let acceleration = 2
    let targetPos = 10
    let pos = initialPos
    let velocity = initialVelocity

    function updateVars()
    {
        accLabel.innerHTML = digits(acceleration, 2)
        velLabel.innerHTML = digits(velocity, 2)
        posLabel.innerHTML = digits(pos, 2)
    }

    let elaspsedTime

    function update()
    {
        let dt = deltaTime()
        if (paused) {
            requestAnimationFrame(update)
            return
        }

        elaspsedTime += dt

        pos = Math.min(changeX(initialVelocity, acceleration, elaspsedTime), targetPos)
        velocity = getVel(initialVelocity, acceleration, elaspsedTime)

        updateVars()
        let alpha = Math.min(pos / targetPos, 1)

        car.style.transform = `translate(calc(${alpha*40}vw - ${alpha*3.5}vh))`

        if (alpha < 1)
            requestAnimationFrame(update)
        else  {
            inAnim = false
            updateButton()
        }
    }

    sims.acceleration = () => {
        elaspsedTime = 0
        update()
    }
})()

let activeSim = "acceleration"
const simSelection = document.getElementById("simulation-selection")
simSelection.onchange = () => {
    activeSim = simSelection.value
    simContainer.dataset.sim = activeSim
}

playButton.onclick = () => {
    if (!inAnim) {
        inAnim = true
        firstPlay = false
        deltaTime()
        updateButton()
        sims.acceleration()
    } else {
        togglePause()
    }
}

const posToggle = document.getElementById("pos-toggle")
const velToggle = document.getElementById("vel-toggle")
const accToggle = document.getElementById("acc-toggle")

let posToggled = true
let velToggled = true
let accToggled = true

posToggle.onclick = () => {
    console.log("click")
    posToggled = !posToggled
    posToggle.dataset.toggle = posToggled
    simContainer.dataset.pos = posToggled
}

velToggle.onclick = () => {
    velToggled = !velToggled
    velToggle.dataset.toggle = velToggled
    simContainer.dataset.vel = velToggled
}

accToggle.onclick = () => {
    accToggled = !accToggled
    accToggle.dataset.toggle = accToggled
    simContainer.dataset.acc = accToggled
}