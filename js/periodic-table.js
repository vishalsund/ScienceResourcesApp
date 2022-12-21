var type = $('#periodictables').find(":selected").val();
const image = document.getElementById('periodictable');
const dropdown = document.getElementById('dropdown');
image.addEventListener('click', function handleClick(){
    image.src="../img/"+type+".png";
});