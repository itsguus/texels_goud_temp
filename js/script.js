// -------------- BASICS --------------
function page(name) { if (document.body.classList.contains(name)) return true; return false; }
function pageContains(el) { if (document.querySelector(el)) return true; return false; }
function arrowFunction(el) { const menu = el.closest('li').querySelector("ul.sub"), li = menu.parentNode; if (el.checked) { menu.style = `height: ${menu.getAttribute('data-height')}px`; li.classList.add("open"); li.style = `margin-bottom: ${menu.getAttribute('data-height')}px`; } else { menu.style = "height: 0; "; li.classList.remove("open"); li.style = "margin-bottom: 0;"; } }
const escToExitMenu = () => { window.addEventListener("keydown", (e) => { if (document.querySelector("input.burger").checked && e.key == "Escape") document.querySelector("input.burger").checked = false; }); }
const setArrows = () => { const menus = document.querySelectorAll("nav#mobile ul.sub"); menus.forEach(menu => { menu.setAttribute("data-height", menu.offsetHeight); menu.style = "height:0"; }); document.querySelectorAll("nav#mobile input").forEach(input => { input.checked = false; }); }

// -------------- FUNCTIONS --------------
function setToolTipListeners() {
    const allToolTips = document.querySelectorAll(".tooltip");
    window.addEventListener("resize", () => {
        allToolTips.forEach(tip => {
            checkToolTip(tip);
        });
    });


    allToolTips.forEach(tip => {
        checkToolTip(tip);
    });

    const sections = document.querySelectorAll("section.slideshow");
    sections.forEach(section => {
        activateToolTips(section);
    });
}

function activateToolTips(section) {
    const slides = section.querySelectorAll("ul li");
    const activeSlide = slides.length > 1 ? slides[1].getAttribute('data-id') : slides[0].getAttribute("data-id"),
        linkedToolTips = section.querySelectorAll(`.tooltip[data-for="${activeSlide}"]`);

    linkedToolTips.forEach(toolTip => {
        toolTip.dataset.visible = true;
    });
}

function checkToolTip(tip) {
    if (!tip) return;
    const article = tip.querySelector("article"),
        articleWidth = article.offsetWidth,
        rem = 20,
        leftRightDistanceRem = 1.25,
        left = tip.getBoundingClientRect().left + (leftRightDistanceRem * rem) + rem,
        top = tip.getBoundingClientRect().top - document.querySelector("header").offsetHeight;



    if (window.innerWidth > left + articleWidth) tip.dataset.orientation_x = "right";
    else tip.dataset.orientation_x = "left";

    if ((top - article.offsetHeight + (0.75 * rem)) + rem < 0) tip.dataset.orientation_y = "bottom";
    else tip.dataset.orientation_y = "top";



    if (article.getBoundingClientRect().left < rem) tip.dataset.out_bound = true;
    else tip.dataset.out_bound = false;
}

function slide(el, dir) {
    const section = el.closest("section.slideshow");
    if (section.dataset.animating == "true") return;
    section.dataset.animating = true;
    const slider = section.querySelector(".slider"),
        animationTime = 500,
        allToolTips = section.querySelectorAll(".tooltip"),
        ul = slider.querySelector("ul"),
        first = ul.querySelector("li:first-of-type"),
        last = ul.querySelector("li:last-of-type");

    allToolTips.forEach(tip => {
        tip.dataset.visible = false;
    });

    if (dir == 1) {
        slider.style = `transform: translate3d(-200%,0,0)`;
        setTimeout(() => {
            slider.style = `transition: 0s; transform: translateX(-100%);`;
            ul.insertBefore(first, last.nextSibling);
        }, animationTime);
    } else {
        slider.style = `transform: translate3d(-0%,0,0)`;
        setTimeout(() => {
            slider.style = `transition: 0s; transform: translateX(-100%);`;
            ul.insertBefore(last, first);
        }, animationTime);
    }
    setTimeout(() => {
        checkToolTip(ul.querySelectorAll("li")[1].querySelector(".tooltip"));
        activateToolTips(section);
        section.dataset.animating = false;
    }, animationTime + 20);
}

function nextPic(el, dir) {
    const figure = el.closest("figure"),
        ul = figure.querySelector("ul"),
        first = ul.querySelector("li:first-of-type"),
        last = ul.querySelector("li:last-of-type");

    (dir > 1) ? ul.insertBefore(first, last.nextSibling) : ul.insertBefore(last, first);
}

// -------------- CALLS --------------
if (pageContains(".tooltip")) {
    setToolTipListeners();
}