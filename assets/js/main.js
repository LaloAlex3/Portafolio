// Banner
gsap.registerPlugin(ScrollTrigger);
// const images = gsap.utils.toArray("img");
gsap.utils.toArray("section").forEach((section, index) => {
  const w = section.querySelector(".images");
  const [x, xEnd] = [w.scrollWidth * -1.25, 0];
  gsap.fromTo(
    w,
    { x },
    {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        scrub: .5,
      },
    }
  );
});

//animated-tab-bar
"use strict";
const body = document.querySelector("#skills");
const selectOptions = document.querySelector("#select-options");
const bgColorsBody = ["#77b1a9", "#3d7b80", "#6d9788"];
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");

const codingSkills = document.querySelector("#coding-skills");
const devopsSkills = document.querySelector("#devops-skills");
const designSkills = document.querySelector("#design-skills");
const coding = document.getElementById("skills-cards-codign");
const devop = document.getElementById("skills-cards-devops");
const design = document.getElementById("skills-cards-design");
//declaramos nuestros archivos que vamos a leer
const fileSkills = "assets/json/skills.json";
const fileProyects = "assets/json/proyects.json";
const fileExperience = "assets/json/experience.json";
const fileEducation = "assets/json/education.json";
const fileContact = "assets/json/contact.json";
//Declaramos una variable para guardar los datos del archivo
let dataSkills, dataProyects, dataExperience, dataEducation, dataContact;


function showSkills(index) {
  if(index == 0){
    coding.style.display="";
    devop.style.display = "none";
    design.style.display = "none";
  }else if(index == 1){
    coding.style.display = "none";
    devop.style.display = "";
    design.style.display = "none";
  }
  else if(index == 2){
    coding.style.display = "none";
    devop.style.display = "none";
    design.style.display = "";
  }
}
function clickItem(item, index) {
  menu.style.removeProperty("--timeOut");
  if (activeItem == item) return;

  if (activeItem) {
    activeItem.classList.remove("active");
  }
  item.classList.add("active");
  selectOptions.style.backgroundColor = bgColorsBody[index];
  activeItem = item;
  offsetMenuBorder(activeItem, menuBorder);
  showSkills(index);
}
function offsetMenuBorder(element, menuBorder) {
  const offsetActiveItem = element.getBoundingClientRect();
  const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth - offsetActiveItem.width) / 2) + "px";
  menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => clickItem(item, index));
});

window.addEventListener("resize", () => {
  offsetMenuBorder(activeItem, menuBorder);
  menu.style.setProperty("--timeOut", "none");
});



//Consumimos los archivos
const loadData = async () => {
  dataSkills = await fetch(fileSkills).then(async (response) => await response.json());
  // dataProyects = await fetch(fileProyects).then(async (response) => await response.json());
  // dataExperience = await fetch(fileExperience).then(async (response) => await response.json());
  // dataEducation = await fetch(fileEducation).then(async (response) => await response.json());
  // dataContact = await fetch(fileContact).then(async (response) => await response.json());
}

const pintarSkills = async () => {
  let templateC = "", templateD = "", templateDO = "", tem="";
  await dataSkills.forEach(function (skill) {
    let typeSkill = skill.type;
    tem = `
        <li class="complete-card">
          <div class="frame-card">
            <div class="card">
              <img src="${skill.img}"
                alt="${skill.alter}" srcset="">
              <h3 class="name-card">${skill.level}<br>${skill.time}</h3>
            </div>
          </div>
        </li>
    `;
    switch(typeSkill){
      case "coding":
        templateC += tem;
        codingSkills.innerHTML = templateC;
        break;
      case "devOps":
        templateDO += tem;
        devopsSkills.innerHTML = templateDO;
        break;
      case "design":
        templateD += tem;
        designSkills.innerHTML = templateD;
        break;
    }
    tem="";
  });
};
const init = async () => {
  await loadData();
  pintarSkills();
}
init();