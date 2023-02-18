document.getElementById("title").onclick = () => window.location.href = "../index.html#chemistry";
function updateName(){
    var URL = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/";
    var input = document.getElementById("name-input").value;
    var image = document.getElementById("image");
    var nameOutput = document.getElementById("iupacName");
    var formulaOutput = document.getElementById("formula");
    var link = document.getElementById("more-info");
    image.src = URL+input+"/PNG";
    fetch(URL+input+"/JSON")
    .then((response) => response.json())
    .then(data =>{
        iupac = data.PC_Compounds[0].props[6].value.sval;
        iupac = iupac.charAt(0).toUpperCase()+iupac.slice(1);
        nameOutput.innerHTML = iupac;
        formula = data.PC_Compounds[0].props[16].value.sval;
        formulaOutput.innerHTML = formula;
        link.onclick = ()=>linkUpdate(input);
    })
}
function linkUpdate(query){
    window.location.href = "https://pubchem.ncbi.nlm.nih.gov/#query="+query;
}
document.getElementById("search").onclick = () =>updateName()