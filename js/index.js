let pickedSection

const chemSect = document.getElementById("chem-section")
const bioSect = document.getElementById("bio-section")
const phySect = document.getElementById("phy-section")

function swap(div)
{
    div.onclick = () => {
        if (pickedSection)
            pickedSection.classList.remove("selected")
    
        if (pickedSection == div)
        {   
            pickedSection = null
        } else {
            div.classList.add("selected")
            pickedSection = div
        }
    }
}

swap(chemSect)
swap(bioSect)
swap(phySect)

const subSects = document.getElementsByClassName("sub-sect")
for (let i = 0; i < subSects.length; i++)
{
    // subSects.item(i)
    subSects.item(i).onclick = () => {
        window.location.href = subSects.item(i).dataset.link
    }
}