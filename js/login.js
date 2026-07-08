// ---------------------------
// Fake Employee Database
// ---------------------------

const users = [

{
    username: "j.smith",
    password: "Truck2026!",
    name: "Jordan Smith",
    department: "Dispatch",
    pet: "Buddy"
},

{
    username: "m.jones",
    password: "Welcome1",
    name: "Melissa Jones",
    department: "HR",
    pet: "Shadow"
},

{
    username: "a.carter",
    password: "ITSecure!",
    name: "Alex Carter",
    department: "IT",
    pet: "Pixel"
}

];

// ---------------------------
// Login
// ---------------------------

document
.getElementById("loginForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const user =
        users.find(u =>
            u.username === username &&
            u.password === password
        );

    if(user){

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        window.location.href = "home.html";

    }
    else{

        document.getElementById("errorMessage").textContent =
            "Invalid username or password.";
    }

});