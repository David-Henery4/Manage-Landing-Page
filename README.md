# Frontend Mentor - Manage landing page solution

This is a solution to the [Manage landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/manage-landing-page-SLXqC6P5).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- See all testimonials in a horizontal slider
- Receive an error message when the newsletter sign up `form` is submitted if:
  - The `input` field is empty
  - The email address is not formatted correctly

### Screenshot

![Home](./public/images/home-header-screenshot.png)


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [AstroJS](https://astro.build/) - JS Framework

### What I learned

#### Notes on building the sidebar

Can use aside, dialog element, div & with input invisible checkbox
(div & with input invisible checkbox - not ideal - Would need work with more aria-labels & etc to make it work.)
(Dialog can be akward to style because it comes woth buit-in default styles. Like a max-width & height.)

#### Decided to use the dialog

Here, I decided to use the dialog element for the sidebar because I haven't worked with the dialog element before and I wanted to use it to see how it works.

The dialog element comes with a set of default native behaviours and methods in javascript that allow to toggle the element. The methods like ".showModal()" & ".close" toggle the "open" attribute on the dialog element which pops up the dialog element, we can then add the required styles based on the "open" state. 

It also comes with a native overlay element which allows the dialog to be toggled by clicking on it, which is another plus, but I didn't need the overlay for this design.

```js
const dialogElement = document.getElementById("sidebar-menu") as HTMLDialogElement;
const openButton = document.getElementById("sidebar-open-toggle")!;
const closeButton = document.getElementById("sidebar-close-toggle")!;

openButton.addEventListener("click", () => {
  dialogElement.showModal()
  openButton.setAttribute("aria-expanded", "true")
})

closeButton.addEventListener("click", () => {
  dialogElement.close()
  openButton.setAttribute("aria-expanded", "false");
})

dialogElement.addEventListener("close", () => {
  openButton.setAttribute("aria-expanded", "false");
  openButton.focus();
});
```

It was Fairly easy to get up and running, the only thing was the styling and animation of the slide in. On it's own by default it is definitly geared towards pop up modals rather than sidebars but they do provide benefits like, accessibility, has an in-built backdrop overlay (Can be styled by ::backdrop pseudo element), can be exited natively by using the keyboard "esc" button and navigated by keyboard & also has focus trapping.

The problem I had with the animation was the dialog modal was being opened immediately and not applying the styles I needed for the animation. To solve this I had to use the "@starting-style" rule and the "allow-discrete" transition behaviour.

The "@starting-style" rule lets us add styles to elements **after** they are created/displayed. This especially helps when you need to have an animation, transform or transition. The reason being is that if you were to apply directly to the element these styles wouldn't have any effect because they only apply **before** the element is created or added. So it would skip any animation or transition applied. 

The "allow-discrete" transition behaviour only applies to certain transition properties that don't really transiton normally. This properties are called "discrete" properties. Transition properties like "display" for example, is a discrete property, it doesn't transition well natively, it doesn't have in-between values that it can transition from, it can only transition instantly. "allow-discrete" creates a smooth effect that allows us to transition out in a smoother way, rather than an abrupt, immediate transition. It allows it to transition alongside other elements that can. These couldn't previously participate in transitions in a useful way.

Although it doesn't really make a descrete property animate smoothly, it just appears that way. It includes the property in the transition timeline, and switches its value at the appropriate point (typically the start or end of the transition), instead of changing it immediately. This lets you combine discrete properties with smoothly animatable ones (like opacity or transform) to create natural-looking enter and exit animations.

```css
dialog {
  position: fixed;
  top: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: var(--color-secondary);
  z-index: 2000;
  border: none;
  padding: 24px;
  max-width: none;
  max-height: none;
  /* opacity: 0; */
  transform: translateX(-100%);
  transition: all 0.3s allow-discrete;
  @media (width >= 768px) {
    display: none;
  }
}

dialog[open] {
  transform: translateX(0);
}

@starting-style {
  dialog[open] {
    transform: translateX(-100%);
  }
}
```

### Useful resources

- [The CSS "@starting-style{}" rule](https://www.joshwcomeau.com/css/starting-style/)

- [Using dialog element for a sidebar & styling it](https://www.matthewberger.ca/blog/dialog-mobile-nav)

- [MDN Docs | "@starting-style{}"](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style)

- [MDN Docs | Allow-descrete](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-behavior)

- [MDN Docs | Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)

## Author

- Website - [David Henery](https://www.djhwebdevelopment.com/)
- Frontend Mentor - [@David-Henery4](https://www.frontendmentor.io/profile/David-Henery4)
- LinkedIn - [David Henery](https://www.linkedin.com/in/david-henery-725458241/e)


