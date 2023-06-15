// Function to add 'loaded' class to images in component__image.liquid snippets
export default function loadImages() {
  // Select all images with class 'js:image'
  const images = document.querySelectorAll('img.js\\:image');

  // Iterate over each image
  images.forEach((img) => {

    // Set an event listener for when the image finishes loading
    img.onload = function() {
      // Cancel the timeout set for adding the 'loaded' class
      clearTimeout(this.timeout);
      // Add 'loaded' class to the image
      this.classList.add('loaded');
      // Add 'loaded' class to the grandparent of the image
      this.parentElement.parentElement.classList.add('loaded');
    }

    // Set a fallback for adding the 'loaded' class if the image doesn't load within 3 seconds
    img.timeout = setTimeout(function() {
      // Add 'loaded' class to the image
      img.classList.add('loaded');
      // Add 'loaded' class to the grandparent of the image
      img.parentElement.parentElement.classList.add('loaded');
    }, 3000);
  });
}
