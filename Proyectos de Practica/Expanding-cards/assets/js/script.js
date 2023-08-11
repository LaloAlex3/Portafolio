let panels;// Here we select all objetcts whit the class 'panel'
const container = document.querySelector('.container') // Here we select the container
const fileData = "assets/json/dataImages.json";  //Here we put the path of the json file
let dataImages = []; // Here we create an empty array to store the data of the json file

// Here we load the data of the json file
const loadData = async () => {
    dataImages = await fetch(fileData).then(async (response) => await response.json());
}

// Here we paint the images in the container
const paintImages = async () => {
    dataImages.forEach((image) => {
        chargeImages(image.name,image.class,image.src);
    });
};

// Here we create the elements that will be painted in the container
const chargeImages = (imgName, imgClass, imgUrl) => {
    const element = document.createElement('div');
    element.className = imgClass;
    element.style.backgroundImage = `url(${imgUrl})`;
    element.innerHTML = `<h3>${imgName}</h3>`;
    container.append(element);
};

// Here we put the actions to the panels
const putAccions = async () => {
    //We loop through all the panels and add an event listener to each one of them
    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            removeActiveClasses();
            panel.classList.add('active');
        });
    });
}
// This function removes the class 'active' from all the panels
const removeActiveClasses = () => {
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
};

// Here we call the functions and initialize the program
const init = async () => {
    await loadData();
    await paintImages();
    panels = document.querySelectorAll('.panel'); // Here we select all the panels 
    await putAccions();
}

init();