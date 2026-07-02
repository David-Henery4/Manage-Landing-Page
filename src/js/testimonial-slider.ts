// Get the main slider wrapper, the track that moves, and the button container.
const sliderContainerOuter = document.getElementById("slider-container-outer");
const sliderContainerInner = document.getElementById("slider-container-inner");
const sliderButtonsContainer = document.getElementById(
  "slider-buttons-container",
) as HTMLDivElement | null;

// Stop here if the required slider elements are missing.
if (!sliderContainerOuter || !sliderContainerInner || !sliderButtonsContainer) {
  throw new Error("Slider elements were not found.");
}

// Track the current slide and drag state.
let activeIndex = 0;
let isDragging = false;
let startX = 0;
let dragOffset = 0;
let currentTranslate = 0;

// Collect all testimonial cards and the navigation buttons.
const slides = Array.from(
  sliderContainerInner.querySelectorAll<HTMLDivElement>(
    ".slider-container-slide",
  ),
);
const buttons = Array.from(
  sliderButtonsContainer.querySelectorAll<HTMLButtonElement>(
    "[data-slide-button]",
  ),
);

// Update the active state of each dot button.
/**
 * Updates the active styling of the slide navigation buttons.
 */
const updateButtons = () => {
  buttons.forEach((button, index) => {
    button.classList.toggle("slider-button--active", index === activeIndex);
  });
};

// Apply a horizontal translation to the slider track.
/**
 * Applies a horizontal transform to the slider track.
 *
 * @param {number} translateX - The pixel value to move the track horizontally.
 */
const setSliderTransform = (translateX: number) => {
  sliderContainerInner.style.transform = `translateX(${translateX}px)`;
};

// Center the currently active slide inside the viewport.
/**
 * Repositions the slider so the active slide is centered in the viewport.
 */
const updateSliderPosition = () => {
  if (!slides.length) return;

  const activeSlide = slides[activeIndex];
  const outerWidth = sliderContainerOuter.clientWidth;
  const activeSlideLeft = activeSlide.offsetLeft;
  const activeSlideWidth = activeSlide.getBoundingClientRect().width;
  currentTranslate = outerWidth / 2 - (activeSlideLeft + activeSlideWidth / 2);
  setSliderTransform(currentTranslate);
};

// Start dragging the slider when the pointer is pressed.
/**
 * Handles the start of a drag interaction.
 *
 * @param {PointerEvent} event - The pointer event fired when the user presses on the slider.
 */
const handlePointerDown = (event: PointerEvent) => {
  isDragging = true;
  startX = event.clientX;
  dragOffset = 0;
  sliderContainerInner.style.transition = "none";
  sliderContainerInner.classList.add("is-dragging");
  event.preventDefault();

  sliderContainerInner.setPointerCapture(event.pointerId);
};

// Move the slider with the pointer while dragging.
/**
 * Updates the slider position while the user is dragging it.
 *
 * @param {PointerEvent} event - The pointer event fired as the user moves the slider.
 */
const handlePointerMove = (event: PointerEvent) => {
  if (!isDragging) return;

  dragOffset = event.clientX - startX;
  setSliderTransform(currentTranslate + dragOffset);
  event.preventDefault();
};

// Finish the drag and snap to the next or previous slide if enough distance was covered.
/**
 * Ends a drag interaction and snaps to the next or previous slide if needed.
 *
 * @param {PointerEvent} event - The pointer event fired when the drag ends.
 */
const handlePointerUp = (event: PointerEvent) => {
  if (!isDragging) return;

  isDragging = false;
  sliderContainerInner.classList.remove("is-dragging");
  sliderContainerInner.style.transition = "transform 0.3s ease-in-out";

  const threshold = sliderContainerOuter.clientWidth / 4;

  if (dragOffset < -threshold) {
    activeIndex = Math.min(activeIndex + 1, slides.length - 1);
  } else if (dragOffset > threshold) {
    activeIndex = Math.max(activeIndex - 1, 0);
  }

  updateButtons();
  updateSliderPosition();

  if (sliderContainerInner.hasPointerCapture(event.pointerId)) {
    sliderContainerInner.releasePointerCapture(event.pointerId);
  }
};

// Set up the slider once the DOM is ready.
/**
 * Initializes the slider, attaches event listeners, and prepares the first render.
 */
const initSlider = () => {
  sliderContainerInner.style.transition = "transform 0.5s ease-in-out";
  updateButtons();
  updateSliderPosition();

  // Move to a slide when a dot button is clicked.
  sliderButtonsContainer.addEventListener("click", (event) => {
    const target = event.target as Element | null;
    const button = target?.closest(
      "[data-slide-button]",
    ) as HTMLButtonElement | null;

    if (!button) return;

    const index = Number(button.dataset.slideButton) - 1;
    if (Number.isNaN(index)) return;

    activeIndex = index;
    updateButtons();
    updateSliderPosition();
  });

  // Connect pointer events so the slider can be dragged.
  sliderContainerInner.addEventListener("pointerdown", handlePointerDown);
  sliderContainerInner.addEventListener("pointermove", handlePointerMove);
  sliderContainerInner.addEventListener("pointerup", handlePointerUp);
  sliderContainerInner.addEventListener("pointercancel", handlePointerUp);
  window.addEventListener("pointerup", handlePointerUp);
  window.addEventListener("resize", updateSliderPosition);
};

// Initialize the slider after the DOM is ready and again after resources load.
document.addEventListener("DOMContentLoaded", initSlider);
window.addEventListener("load", updateSliderPosition);
