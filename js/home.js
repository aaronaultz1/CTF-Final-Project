// Redirect if not logged in
const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "index.html";
}

// Display employee info
document.getElementById("employeeName").textContent = user.name;
document.getElementById("employeeDepartment").textContent = user.department;
document.getElementById("welcomeName").textContent = user.name;

// Current date
const today = new Date();

document.getElementById("currentDate").textContent =
today.toLocaleDateString();

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";

});