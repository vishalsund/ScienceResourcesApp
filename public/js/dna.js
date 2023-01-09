function update(){
    var mrna = "";
    var input = document.getElementById("input-codon").value;
    let ans = "";
    var over = false;
    for(let i = 0; i<input.length; i+=3){
        for(let x =0; x<3; x++){
            if(input[i+x]=="A"){
                mrna+="U";
            }
            else if(input[i+x]=="C"){
                mrna+="G";
            }
            else if(input[i+x]=="T"){
                mrna+="A";
            }else{
                mrna+="C";
            }
        }
        var curr = input[i]+input[i+1]+input[i+2];
        if((curr=="TGA")||(curr=="TAG")||(curr=="TAA")){
            ans = mrna;
            over = true;
        }
        mrna+=" ";
    }
    if(over){
        document.getElementById("mrna-output").innerHTML = ans;
    }else{
        document.getElementById("mrna-output").innerHTML = mrna;
    }
    var prot = "";
    var list = [
        ["GTA", "GTG", "GTC", "GTT"],
        ["GGG", "GGA", "GGC", "GGT"],
        ["GCG", "GCA", "GCC", "GCT"],
        ["GAG", "GAA"],["GAC", "GAT"],
        ["CTG", "CTA", "CTC", "CTT"],
        ["CGG", "CGA", "CGC", "CGT"],
        ["CCG", "CCA", "CCC", "CCT"],
        ["CAG", "CAA"],["CAC", "CAT"],
        ["ATG"],["ATA", "ATC", "ATT"],
        ["AGG", "AGA"],["AGC", "AGT"],
        ["ACG", "ACA", "ACC", "ACT"],
        ["AAG", "AAA"],["AAC", "AAT"],
        ["TTG", "TTA"],["TTC", "TTT"],
        ["TGG"],["TGA"],["TGC", 'TGT'],
        ["TCG", "TCA", "TCC", "TCT"],
        ["TAG", "TAA"],["TAC", "TAT"]
    ];
    let ans1 = "";
    var proteins = ["VAL", "GLY", "ALA", "GLU", "ASP", "LEU", "ARG", "PRO", "GLN", "HIS", "MET", "ILE", "ARG", "SER", "THR", "LYS", "ASN", "LEU", "PHE", "TRP", "STOP", "CYS", "SER", "STOP", "TYR"];
    for(let i =0; i<input.length; i+=3){
        var curr = input[i]+input[i+1]+input[i+2];
        for(let x =0; x<list.length; x++){
            for(let y =0; y<list[x].length; y++){
                if(curr==list[x][y]){
                    prot+=proteins[x]+" ";
                    if(x == 20 || x ==23){
                        ans1 = prot;
                    }
                }
            }
        }
    }
    if(over){
        document.getElementById("protein-output").innerHTML = ans1;
    }else{
        document.getElementById("protein-output").innerHTML = prot;
    }
}
document.getElementById("submit").onclick = () => update();
document.getElementById("title").onclick = () => window.location.href = "../index.html";