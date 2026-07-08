// ==========================================
// NORTHSTAR LOGISTICS EMAIL SYSTEM
// ==========================================


// ------------------------------------------
// Verify User Login
// ------------------------------------------

const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);


if (!currentUser) {

    window.location.href = "index.html";

}


// Display logged-in user

document.getElementById("loggedInUser").textContent =
    currentUser.name;



// ------------------------------------------
// Email Database
// ------------------------------------------

let inbox = [

    {
        id: 1,

        from: "HR Department",

        subject: "Welcome to Northstar Logistics",

        body:
`Hello ${currentUser.name},

Welcome to Northstar Logistics!

Your employee account has been successfully created.

Please complete your cybersecurity training before Friday.

Thank you,
Human Resources`
    },


    {
        id: 2,

        from: "Fleet Management",

        subject: "Vehicle Maintenance Schedule",

        body:
`Reminder:

Fleet maintenance will occur this Saturday.

Please review the updated vehicle schedule.

Thank you,
Fleet Management`
    },


    {
        id: 3,

        from: "Dispatch",

        subject: "Updated Delivery Procedures",

        body:
`New delivery procedures have been uploaded.

Please review the changes before your next shift.

Dispatch Team`
    }

];


let sent = [];

let selectedEmail = null;



// ------------------------------------------
// Display Inbox
// ------------------------------------------

function loadInbox() {


    const container =
        document.getElementById("emailContainer");


    container.innerHTML = "";


    inbox.forEach(email => {


        const div =
        document.createElement("div");


        div.className = "emailItem";


        div.innerHTML = `

            <div class="emailSender">
                ${email.from}
            </div>

            <div>
                ${email.subject}
            </div>

            <div class="emailPreview">
                ${email.body.substring(0,60)}...
            </div>

        `;


        div.addEventListener("click", () => {

            openEmail(email);

        });


        container.appendChild(div);


    });

}



loadInbox();



// ------------------------------------------
// Open Email
// ------------------------------------------

function openEmail(email){


    selectedEmail = email;


    document.getElementById("emailSubject")
    .textContent = email.subject;


    document.getElementById("emailFrom")
    .textContent = email.from;


    document.getElementById("emailBody")
    .textContent = email.body;



    // Show reply button for IT emails

    if(email.from === "IT Support"){

        document.getElementById("replyButton")
        .style.display = "block";

    }
    else{

        document.getElementById("replyButton")
        .style.display = "none";

    }


}



// ------------------------------------------
// Compose Email Modal
// ------------------------------------------

const composeModal =
document.getElementById("composeModal");


document
.getElementById("composeBtn")
.addEventListener("click", () => {


    composeModal.style.display = "flex";


});



document
.getElementById("closeCompose")
.addEventListener("click", () => {


    composeModal.style.display = "none";


});



// ------------------------------------------
// Send Email
// ------------------------------------------

document
.getElementById("sendButton")
.addEventListener("click", () => {


    const to =
    document.getElementById("composeTo").value;


    const subject =
    document.getElementById("composeSubject").value;


    const body =
    document.getElementById("composeBody").value;



    if(!to || !subject || !body){

        alert("Please complete all fields.");

        return;

    }



    const newEmail = {


        id: Date.now(),

        from: currentUser.email || currentUser.name,

        subject: subject,

        body: body

    };



    sent.push(newEmail);



    // Password reset trigger

    if(

        to.toLowerCase()
        .includes("it")

        &&

        subject.toLowerCase()
        .includes("password")

    ){


        createITResponse();


    }



    composeModal.style.display = "none";


    clearCompose();



});



// ------------------------------------------
// IT Automated Response
// ------------------------------------------

function createITResponse(){


    const itEmail = {


        id: Date.now(),

        from:"IT Support",

        subject:"Password Reset Verification",


        body:
`Hello ${currentUser.name},

We received your password reset request.

Before we can reset your password, please verify your identity.

Security Question:

What is your favorite pet's name?

Please reply with your answer.

Thank you,

Northstar IT Support`

    };



    inbox.push(itEmail);


    loadInbox();


    alert(
        "IT Support has responded to your request."
    );

}



// ------------------------------------------
// Reply System
// ------------------------------------------

document
.getElementById("replyButton")
.addEventListener("click",()=>{


    document
    .getElementById("replyModal")
    .style.display="flex";


});



document
.getElementById("closeReply")
.addEventListener("click",()=>{


    document
    .getElementById("replyModal")
    .style.display="none";


});




// ------------------------------------------
// Send Reply
// ------------------------------------------

document
.getElementById("replySendButton")
.addEventListener("click",()=>{


    const answer =
    document.getElementById("replyText")
    .value
    .trim();



    if(
        answer.toLowerCase()
        ===
        currentUser.pet.toLowerCase()

    ){


        const flagEmail = {


            id:Date.now(),

            from:"IT Support",

            subject:
            "Password Reset Complete",


            body:
`Hello ${currentUser.name},

Your identity has been verified.

Your password reset request is complete.

Congratulations!

You have captured the flag.

FLAG{Northstar_Reset_2026}

Northstar IT Support`

        };


        inbox.push(flagEmail);


        loadInbox();



        alert(
            "Congratulations! Flag captured!"
        );


    }


    else{


        alert(
            "Incorrect answer. Identity verification failed."
        );


    }



    document
    .getElementById("replyModal")
    .style.display="none";


    document
    .getElementById("replyText")
    .value="";


});



// ------------------------------------------
// Dashboard Button
// ------------------------------------------

document
.getElementById("dashboardBtn")
.addEventListener("click",()=>{


    window.location.href="home.html";


});



// ------------------------------------------
// Inbox Button
// ------------------------------------------

document
.getElementById("inboxBtn")
.addEventListener("click",()=>{


    loadInbox();


});



// ------------------------------------------
// Sent Button
// ------------------------------------------

document
.getElementById("sentBtn")
.addEventListener("click",()=>{


    const container =
    document.getElementById("emailContainer");


    container.innerHTML="";


    sent.forEach(email=>{


        const div =
        document.createElement("div");


        div.className="emailItem";


        div.innerHTML=`

        <div class="emailSender">
            To: ${email.subject}
        </div>

        <div>
            ${email.body.substring(0,50)}
        </div>

        `;


        container.appendChild(div);


    });


});




// ------------------------------------------
// Clear Compose Form
// ------------------------------------------

function clearCompose(){


    document.getElementById("composeTo").value="";

    document.getElementById("composeSubject").value="";

    document.getElementById("composeBody").value="";


}