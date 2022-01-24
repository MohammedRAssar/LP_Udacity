/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 * 
 * Created by: Mohammed Rezk Assar
 */


/* Define Global Variables */
const allSections   =   [...document.querySelectorAll("section")];
const ul            =   document.querySelector("ul");
const li            =   document.querySelector("li");
const fragment      =   document.createDocumentFragment();
/* End Global Variables */

/* Define Observer's variables */
const cb            =   entries => {
    if(entries[0].isIntersecting) {
        entries[0].target.classList.add("your-active-class",);
    } else {
        entries[0].target.classList.remove("your-active-class");
    }
};

const options       =   {
    root: null,
    rootMargin: '0px',
    threshold: 0.65
};

const obs           =   new IntersectionObserver(cb, options);
/* End Observer's variables*/

/* Function to build the navigation bar dynamically */
function addNav() {
    // Looping each section on the HTML file
    for (const section of allSections) {
        // Create <li> for each section
        const listItem   =   document.createElement("li");
        // Create <a> for each section
        const linkAnchor =   document.createElement("a");
        // Add section id dynamically to the created <a> "href"
        linkAnchor.href = `#${section.id}`
        // Add the section's data-nav to <li> to dynamically name it to the section it's connected to
        linkAnchor.textContent = section.dataset.nav;
        // Add the css class to li anchor - <li><a class="menu__link"> 
        linkAnchor.classList.add("menu__link");
        // Smooth scrolling to section on <li> click
        linkAnchor.addEventListener("click", e => {
            e.preventDefault();
            section.scrollIntoView({behavior: "smooth"})
        });
        // Append each <a> to it's <li>
        listItem.appendChild(linkAnchor);
        // Append the <li> created to the previously defined fragmnet variable
        fragment.appendChild(listItem);
    }
    // Append each <li> to the created <ul> in the HTML document
    ul.appendChild(fragment);
}

// Performe addNav function when the HTML document is completely loaded
document.addEventListener("DOMContentLoaded", addNav);
/* End Function to build the navigation bar dynamically*/


/* Change active class for sections and navigation menu items in the viewport */
window.addEventListener("scroll", function (_) {  // Using a single function to apply active state to <section> and <li>
        /*
        ** Check if the section is in the viewport and adds "your-active-class" to it
        ** If it's not in the viewport then "your-active-class" is removed from it
        */
        allSections.forEach(section => {
            obs.observe(section);
            /*
            ** In the loop, Select element with <a href ="#section.id"> and assign it to variable
            ** It will return the <li><a> created in addNav function
            ** Then check if the section contains "you-active-class" which means it's in the viewport
            ** and add "active" class created in the CSS file to it
            ** if it's not then remove "active" class from it
            */
            const link = document.querySelector(`[href="#${section.id}"]`);
            if (section.classList.contains("your-active-class")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

    });

