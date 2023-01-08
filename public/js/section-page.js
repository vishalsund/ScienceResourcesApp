const sect1 = document.getElementById("section1")
const sect2 = document.getElementById("section2")
const sect3 = document.getElementById("section3")

sect1.onclick = () => window.location.href = sect1.dataset.link
sect2.onclick = () => window.location.href = sect2.dataset.link
sect3.onclick = () => window.location.href = sect3.dataset.link

document.getElementById("title").onclick = () => window.location.href = "../index.html"