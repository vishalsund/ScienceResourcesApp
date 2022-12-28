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

// Acceleration Sim
(() => {
    const playButton = document.getElementById("play-sim-button")

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

    let startTime

    function update()
    {
        let dt = deltaTime()

        let t = (new Date().getTime()-startTime)/1000
        pos = Math.min(changeX(initialVelocity, acceleration, t), targetPos)
        velocity = getVel(initialVelocity, acceleration, t)

        updateVars()
        let alpha = Math.min(pos / targetPos, 1)

        car.style.transform = `translate(calc(${alpha*40}vw - ${alpha*3.5}vh))`

        if (alpha < 1)
            requestAnimationFrame(update)
    }

    playButton.onclick = () => {
        console.log("play")
        startTime = new Date().getTime()
        update()
    }
})()