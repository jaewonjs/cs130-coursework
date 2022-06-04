const projects = document.querySelectorAll('button');

const showImage = (ev) => {
    const elem = ev.currentTarget;
    const content = elem.nextElementSibling;
    console.log(content.style);
    if (content.style.display === "block"){
        content.style.display = "none";
    } 
    else {
        content.style.display = "block";
    } 
};

for (const p of projects) {
    p.addEventListener("click", showImage);
}

