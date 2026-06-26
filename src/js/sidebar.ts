
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
