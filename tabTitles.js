const tabTitles = [
    "@#98!pQ&*a",
    "$5^&K!p@9B",
    "!T7@#f2$%G",
    "*&@X3$P!Q#",
    "6@9!#y*%J$",
];

let index = 0;

function updateTabTitle() {
    document.title = tabTitles[index];
    index = (index + 1) % tabTitles.length;
}

updateTabTitle();

setInterval(updateTabTitle, 500);
