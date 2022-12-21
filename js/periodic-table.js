var pictureList = [
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Chemical_Group_Block_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Standard_State_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Atomic_Mass_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Electron_Configuration_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Oxidation_States_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Electronegativity_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Atomic_Radius_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Ionization_Energy_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Electron_Affinity_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Melting_Point_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Boiling_Point_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Density_PubChem.png",
    "img/Periodic Tables/Periodic_Table_of_Elements_w_Year_Discovered_PubChem.png",
];
function switchImage() {
    var selection = document.getElementById("periodictables");
    var chosen = selection.value;
    document.getElementById("periodictable").src = "../"+pictureList[chosen];
};