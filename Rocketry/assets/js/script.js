
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
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);



/**
 * active header when window scroll down to 100px
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


document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById("playVideo");
    const videoOverlay = document.getElementById("videoOverlay");
    const videoPlayer = document.getElementById("videoPlayer");
    const closeBtn = document.getElementById("closeBtn");

    // Prevent default behavior of <a> tag to stop jumping to top
    playButton.addEventListener("click", function (event) {
        event.preventDefault(); // Stops the page from jumping to the top
        videoOverlay.style.display = "flex"; // Show overlay
        videoPlayer.currentTime = 0; // Start video from beginning
        videoPlayer.play(); // Play video
    });

    // Close video overlay when close button is clicked
    closeBtn.addEventListener("click", function () {
        videoOverlay.style.display = "none"; // Hide overlay
        videoPlayer.pause(); // Pause video
        videoPlayer.currentTime = 0; // Reset video
    });
});


// GIF

document.addEventListener("DOMContentLoaded", function () {
    const gifOverlay = document.getElementById("gifOverlay");
    const gifImage = document.getElementById("gifImage");
    const closeGifBtn = document.getElementById("closeGifBtn");

    // Select all "Explore More" buttons
    document.querySelectorAll(".explore-btn").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // ✅ Prevents scrolling to top

            let gifSrc = this.getAttribute("data-gif"); // Get GIF source
            gifImage.src = gifSrc; // Set GIF source
            gifOverlay.style.display = "flex"; // Show overlay
        });
    });

    // Close overlay
    closeGifBtn.addEventListener("click", function () {
        gifOverlay.style.display = "none";
        gifImage.src = ""; // Reset GIF
    });

    // Close overlay when clicking outside the container
    gifOverlay.addEventListener("click", function (event) {
        if (event.target === gifOverlay) {
            gifOverlay.style.display = "none";
            gifImage.src = ""; // Reset GIF
        }
    });
});

// HERO VIDEO OVERLAY
function heroOpenVideo() {
    document.getElementById("hero-videoOverlay").style.display = "flex";
  }
  
  function heroCloseVideo() {
    let iframe = document.getElementById("hero-videoPlayer");
    let src = iframe.src; 
    iframe.src = ""; // Stops video playback
    iframe.src = src; // Resets the video
    document.getElementById("hero-videoOverlay").style.display = "none";
  }
  