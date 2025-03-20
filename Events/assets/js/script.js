'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElemOnScroll);


// VIDEO OVERLAY
document.addEventListener("DOMContentLoaded", function () {
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("trailerVideo");

    openModal.addEventListener("click", function () {
        video.pause(); // Pause first to ensure reset works
        video.currentTime = 0; // Reset video time
        modal.style.display = "flex";
        video.play();
    });

    function closeVideoModal() {
        modal.style.display = "none";
        video.pause();
        video.currentTime = 0; // Reset video when closing
    }

    closeModal.addEventListener("click", closeVideoModal);

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeVideoModal();
        }
    });
});


// IMAGE FULL SCREEN

document.addEventListener("DOMContentLoaded", function () {
    const pictureModal = document.getElementById("pictureModal");
    const modalPicture = document.getElementById("modalPicture");
    const closePictureModal = document.getElementById("closePictureModal");

    document.querySelectorAll(".view-picture").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const imgElement = this.closest(".project-card").querySelector(".img-cover");
            modalPicture.src = imgElement.src;

            // Adjust modal width & height based on image orientation
            const img = new Image();
            img.src = imgElement.src;
            img.onload = function () {
                if (img.width > img.height) {
                    modalPicture.style.width = "80vw";  // Horizontal image
                    modalPicture.style.height = "auto";
                } else {
                    modalPicture.style.height = "80vh"; // Vertical image
                    modalPicture.style.width = "auto";
                }
            };

            pictureModal.style.display = "flex";
        });
    });

    function closeModal() {
        pictureModal.style.display = "none";
    }

    closePictureModal.addEventListener("click", closeModal);

    window.addEventListener("click", function (event) {
        if (event.target === pictureModal) {
            closeModal();
        }
    });
});

