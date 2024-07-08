// Import custom stuff
import "../ts/bsl";

// Import instant page for faster navigation
import "instant.page";

// Import Alpine.js and its plugins
import Alpine from "alpinejs";
import focus from "@alpinejs/focus";
import intersect from "@alpinejs/intersect";
import persist from "@alpinejs/persist";

// Register Alpine plugins
// persist: to persist data across page loads
// focus: to manage focus state
// intersect: to handle element visibility
Alpine.plugin(persist);
Alpine.plugin(focus);
Alpine.plugin(intersect);

// Assign Alpine to the window object to make it globally accessible
window.Alpine = Alpine;

// Start Alpine.js
Alpine.start();