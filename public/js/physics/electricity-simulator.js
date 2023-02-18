const solveFor = document.getElementById("solve-select")
document.getElementById("title").onclick = () => {window.location.href = "../index.html#physics"}
const VoltsInput = document.getElementById("Volts-Input")
const ResistanceInput = document.getElementById("Resistance-Input")
const AmpsInput = document.getElementById("Amps-Input")

function updateCalc()
{
    const solving = solveFor.value

    const volts = parseFloat(VoltsInput.value) || 1
    const resistance = parseFloat(ResistanceInput.value) || 1
    const amps = parseFloat(AmpsInput.value) || 1

    if (solving == "Voltage")
    {
        VoltsInput.value = resistance * amps
    } else if (solving == "Amps") {
        AmpsInput.value = volts / resistance
    } else {
        ResistanceInput.value = amps / volts
    }
}

VoltsInput.onchange = updateCalc
ResistanceInput.onchange = updateCalc
AmpsInput.onchange = updateCalc