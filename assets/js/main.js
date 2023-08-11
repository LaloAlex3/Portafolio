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
const images = ["https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_1280.jpg", "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_960_720.jpg", "https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_1280.jpg"];
const bgColorsBody = ["#77b1a9a6", "#3d7b80a6", "#6d9788a6"];
const body = document.querySelector("#skills");
const selectOptions = document.querySelector("#select-options");
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");


//Select options from skills
const codingSkills = document.querySelector("#coding-skills");
const devopsSkills = document.querySelector("#devops-skills");
const designSkills = document.querySelector("#design-skills");
const proyects = document.querySelector("#proyects");

const coding = document.getElementById("skills-cards-codign");
const devop = document.getElementById("skills-cards-devops");
const design = document.getElementById("skills-cards-design");
//declaramos nuestros archivos que vamos a leer
const fileSkills = "assets/json/skills.json";
const fileProyects = "assets/json/proyects.json";
const fileExperience = "assets/json/experience.json";
const fileEducation = "assets/json/education.json";
const info = document.querySelector(".info-skill");
const informacion = document.querySelector(".info");
//Declaramos una variable para guardar los datos del archivo
let dataSkills, dataProyects, dataExperience, dataEducation;


function showSkills(index) {
  if (index == 0) {
    coding.style.display = "";
    devop.style.display = "none";
    design.style.display = "none";
  } else if (index == 1) {
    coding.style.display = "none";
    devop.style.display = "";
    design.style.display = "none";
  }
  else if (index == 2) {
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
  selectOptions.style.backgroundImage = `url(${images[index]})`;
  activeItem = item;
  offsetMenuBorder(activeItem, menuBorder);
  showSkills(index);
  closeInfo();
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
  dataProyects = await fetch(fileProyects).then(async (response) => await response.json());
  // dataExperience = await fetch(fileExperience).then(async (response) => await response.json());
  // dataEducation = await fetch(fileEducation).then(async (response) => await response.json());
}

const chargeInfo = (name, descrip, link) => {
  let template = "";
  template = `<h1 class="name-card">${name}</h1>
              <p class="info-card">${descrip}</p>
              <a target="_blank" href="${link}"><button class="btn">Read More</button></a>
  `;
  informacion.innerHTML = template;
}
const showInfo = () => {
  info.style.visibility = "visible";
  info.style.opacity = "1";
  info.style.width = "30%";
  info.style.padding = "1% 1% 1% 1%";
}
const closeInfo = () => {
  info.style.visibility = "collapse";
  info.style.opacity = "0";
  info.style.width = "0%";
  info.style.padding = "0% 0% 0% 0%";
}

const pintarSkills = async () => {
  let templateC = "", templateD = "", templateDO = "", tem = "";
  await dataSkills.forEach(function (skill) {
    let typeSkill = skill.type;
    tem = "";
    tem = `
        <li id="${skill.alter}" class="complete-card" onclick="showInfo();
        chargeInfo('${skill.alter}','${skill.descrip}','${skill.link}');" >
          <div class="frame-card">
            <div class="card" id="card">
              <img src="${skill.img}"
                alt="${skill.alter}" srcset="">
                <tool-tip role="tooltip">
                   <b>${skill.alter}</b>
                </tool-tip> 
              <h3 class="name-card">${skill.level}<br>${skill.time}</h3> 
            </div>
          </div>
        </li>
    `;
    switch (typeSkill) {
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
  });
};

const pintarProyects = async () => {
  let templateProyect = "";
  await dataProyects.forEach(function (proyect) {
    templateProyect += `
          <div class="card_2" style="background-image:url(${proyect.img});">
            <div class="content">
                <h2 class="title">${proyect.name}</h2>
                <p class="copy">${proyect.descrip}</p>
                <a target="_blank" href="${proyect.url}"><button class="btn">Show now</button></a>
            </div>
          </div>
    `;
    proyects.innerHTML = templateProyect;
  });
}
const init = async () => {
  await loadData();
  pintarSkills();
  pintarProyects();
}

init();

