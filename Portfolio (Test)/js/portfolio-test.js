function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Top scroll - Arrow

// Gets the breakpoint at which the scroll-to-top button should appear
const scrollBreakpoint = window.innerHeight * 0.2;

document.addEventListener('DOMContentLoaded', () => {
  randomizeBackgrounds();
  setupScrollListener();
  setupScrollEvent();  
});

// Scrolls window to top
function setupScrollEvent() {
  const scrollButton = document.querySelector('.scroll-top');
  
  scrollButton.addEventListener('click', (e) => {
    // Not the best solution until Safari/IE-Edge support scroll behavior
    // Window.scrollTo({ top: 0, behavior: 'smooth' });
  
    smoothVerticalScrolling(scrollButton.parentElement, 250, "top");
  });
}

// Prepares the window for a scroll event to show the scroll button
function setupScrollListener() {  
   window.addEventListener('scroll', (e) => {
     const scrollButton = document.querySelector('.scroll-top');
     
     // Const scrollOffset = document.scrollingElement.scrollTop;
     const scrollOffset = window.scrollY;
    
     if (scrollOffset >= scrollBreakpoint) {
       scrollButton.classList.add('visible');
     } else if (scrollOffset <= 0) {
       scrollButton.classList.remove('visible');
     }    
  });
}

function randomizeBackgrounds() {
  // Get all the content containers
  const contentContainers = document.querySelectorAll('.content-container');
  
  [].forEach.call(contentContainers, container => {
    // Assign random background
    container.style.background = `rgb(${randVal(colorMax)},${randVal(colorMax)},${randVal(colorMax)})`;
  });
}

// Random between 0 to max
function randVal(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Uses a timeout to scroll to top
function smoothVerticalScrolling(e, time, where) {
  // Gets the element's top position relative to the viewport
  const eTop = e.getBoundingClientRect().top;
  
  // Divides the top offset into 100 steps to be ellapsed
  const eAmt = eTop / 100;
  
  // Starting time
  let curTime = 0;
  
  // Not to exceed the desired duration
  while (curTime <= time) {
    // Call a function to execute at one hundreth of the desired scroll time
    window.setTimeout(SVS_B, curTime, eAmt, where);
    // Increase by one hundreth of the desired time to execute exactly 100 times
    curTime += time / 100;
  }
}

function SVS_B(eAmt, where) {
  // Scroll by half the hundredth of the top offset if destination is not top (since to center only involves scrolling either in the top or bottom half of the window)
  if(where == "center" || where == "") {
    window.scrollBy(0, eAmt / 2); 
  }
  // Otherwise scroll the full amount
  if (where == "top") {
    window.scrollBy(0, eAmt);
  }    
}