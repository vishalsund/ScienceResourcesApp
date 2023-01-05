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

let activeSim = "acceleration"

// Connections
const simUpdates = {}

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

// Variables
const vars = {
    "acceleration": {
        distance: 10,
        acceleration: 2,
        velocity: 0,
    }
}

const varUpdates = {}
const sinvarObjects = document.getElementById("variables").children
for (let i = 0; i < sinvarObjects.length; i++)
{
    const variableObjects = sinvarObjects.item(i).children
    const simname = sinvarObjects.item(i).dataset["simname"]

    sinvarObjects.item(i).style.display="none"

    function simUpdate()
    {
        sinvarObjects.item(i).style.display = activeSim == simname?"block":"none"
    }

    simUpdates[simname] = simUpdate
    simUpdate()

    for (let j = 0; j < variableObjects.length; j++)
    {
        const varObject = variableObjects.item(j)
        const varInput = varObject.children.item(1)
        const name = varObject.dataset["varname"]

        varInput.value = vars[simname][name]
        varInput.addEventListener("change", () => {
            vars[simname][name] = varInput.value
            varUpdates[simname]()
            console.log(name, vars[simname][name])
        })
    }
}

// Acceleration Sim
let sims = {};
(() => {

    const accLabel = document.getElementById("acc-sim-acc-label")
    const velLabel = document.getElementById("acc-sim-vel-label")
    const posLabel = document.getElementById("acc-sim-pos-label")
    const targetLabel = document.getElementById("acc-sim-line-pos")

    const car = document.getElementById("acc-sim-car")

    const simVars = vars["acceleration"]

    // Initial Variables
    let initialVelocity
    let acceleration

    let targetPos
    let pos = 0
    let velocity

    function updateVarDisplay()
    {
        accLabel.innerHTML = digits(acceleration, 2)
        velLabel.innerHTML = digits(velocity, 2)
        posLabel.innerHTML = digits(pos, 2)
        targetLabel.innerHTML = digits(targetPos, 2)
    }

    function updateStartVars()
    {
        targetPos = simVars.distance
        initialVelocity = simVars.velocity
        acceleration = simVars.acceleration
        velocity = initialVelocity

        updateVarDisplay()
    }

    varUpdates["acceleration"] = updateStartVars

    updateStartVars()

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

        updateVarDisplay()
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

const simSelection = document.getElementById("simulation-selection")
simSelection.onchange = () => {
    activeSim = simSelection.value
    document.body.dataset.activesim = activeSim

    Object.keys(simUpdates).map((key) => {
        simUpdates[key]()
    })
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