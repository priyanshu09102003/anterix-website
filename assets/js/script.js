
const addEventOnElement = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
};

// Navbar Toggling for mobile devices
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const overlay = document.querySelector("[data-overlay]");
const navLinks = document.querySelectorAll("[data-nav-link]"); // Menu links

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    navToggleBtn.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
};

// Close Navbar when a menu item is clicked
const closeNavbar = function () {
    if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        navToggleBtn.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("nav-active");
    }
};

// Add event listeners
addEventOnElement([navToggleBtn, overlay], "click", toggleNavbar);
addEventOnElement(navLinks, "click", closeNavbar); // Close menu on link click

//SWIPER

let swiperCards = new Swiper('.news_content', {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints:{
        600:{
            slidesPerView: 2,
        }, 
        968:{
            slidesPerView: 3,
        },
    },
  
  });


//   Galactic Guide

let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});
backButton.onclick = function(){
    carousel.classList.remove('showDetail');
}

// Solar VIEW

// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Get the target div
const solarCarousel = document.getElementById("Solar_carousel");

// Create a Three.js Scene
const scene = new THREE.Scene();

// Create a Camera
const camera = new THREE.PerspectiveCamera(
  75,
  solarCarousel.clientWidth / solarCarousel.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 10);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(solarCarousel.clientWidth, solarCarousel.clientHeight);
solarCarousel.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 5;
controls.maxDistance = 100;

// Load the 3D Model
const loader = new GLTFLoader();
const modelPath = "/3D MODEL/scene.gltf";

let object;
loader.load(
  modelPath,
  function (gltf) {
    object = gltf.scene;
    object.position.set(0, 0, 0);
    object.scale.set(2, 2, 2);
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error("Error loading model:", error);
  }
);

// Lighting
const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
topLight.position.set(5, 10, 5);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x444444, 1.2);
scene.add(ambientLight);

// Starry Background
function createStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starVertices = [];
  for (let i = 0; i < 5000; i++) {
    let x = (Math.random() - 0.5) * 2000;
    let y = (Math.random() - 0.5) * 2000;
    let z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
  }
  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1, opacity: 0.8, transparent: true });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}
createStars();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  if (object) {
    object.rotation.y += 0.005;
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize Handling
window.addEventListener("resize", () => {
  camera.aspect = solarCarousel.clientWidth / solarCarousel.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(solarCarousel.clientWidth, solarCarousel.clientHeight);
});

// ROCKETRY

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq__faq-item");

  // Remove all active classes on page load
  faqItems.forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".faq-item__detail").style.maxHeight = null;
  });

  // Toggle active class on click
  faqItems.forEach(item => {
      const header = item.querySelector(".faq-item__summary");
      const content = item.querySelector(".faq-item__detail");

      item.addEventListener("click", function () {
          const isActive = item.classList.contains("active");

          // Close all items first
          faqItems.forEach(faq => {
              faq.classList.remove("active");
              faq.querySelector(".faq-item__detail").style.maxHeight = null;
          });

          // Open only the clicked one
          if (!isActive) {
              item.classList.add("active");
              content.style.maxHeight = `${content.scrollHeight}px`;
          }
      });
  });
});



addListenersToItems(items, handleItemClick)

items[0].click()

