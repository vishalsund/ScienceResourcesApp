let pickedSection = null

const chemSect = document.getElementById("chem-section")
const bioSect = document.getElementById("bio-section")
const phySect = document.getElementById("phy-section")

let inAnim = false
let animId = 0

function swap(div)
{
    div.onclick = () => {
        inAnim = true
        if (pickedSection)
            pickedSection.classList.remove("selected")
    
        if (pickedSection == div)
        {   
            pickedSection = null
        } else {
            div.classList.add("selected")
            pickedSection = div
        }
        animId++;
        let currentAnim = animId

        setTimeout(() =>{
            if (animId == currentAnim)
                inAnim = false
        }, 500)
    }
}

swap(chemSect)
swap(bioSect)
swap(phySect)

const subSects = document.getElementsByClassName("sub-sect")
for (let i = 0; i < subSects.length; i++)
{
    subSects.item(i).onclick = () => {
        if (inAnim || pickedSection == null) {return}
        window.location.href = subSects.item(i).dataset.link
    }
}