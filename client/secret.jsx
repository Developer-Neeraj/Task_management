// apiConfig.js

let apiHostName;

if (window.location.hostname === "localhost") {
  apiHostName = "http://localhost:5100/api"; // Set your local API URL here
} else {
  apiHostName = "https://task-management-46e6.vercel.app/api"; // Set your Vercel API URL here
}

export default apiHostName;
