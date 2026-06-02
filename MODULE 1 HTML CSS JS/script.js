console.log("Welcome to the Community Portal");

window.onload = () => {
    alert("Page Loaded Successfully");
};

/* Events Data */

const events = [
{
name:"Music Festival",
category:"music",
seats:20
},
{
name:"Sports Meet",
category:"sports",
seats:15
},
{
name:"Web Workshop",
category:"workshop",
seats:25
}
];

const eventContainer =
document.querySelector("#eventContainer");

/* Display Events */

function displayEvents(list){

eventContainer.innerHTML="";

list.forEach(event=>{

const card=document.createElement("div");

card.classList.add("eventCard");

card.innerHTML=`
<h3>${event.name}</h3>
<p>Seats Available: ${event.seats}</p>
<button onclick="registerEvent('${event.name}')">
Register
</button>
`;

eventContainer.appendChild(card);

});
}

displayEvents(events);

/* Register Event */

function registerEvent(name){

alert("Registered for "+name);

}

/* Filter */

document
.getElementById("eventCategory")
.onchange=function(){

let value=this.value;

if(value==="all"){
displayEvents(events);
}
else{
let filtered=
events.filter(
e=>e.category===value
);

displayEvents(filtered);
}
};

/* Form */

document
.getElementById("registrationForm")
.addEventListener("submit",function(e){

e.preventDefault();

let name=
document.getElementById("name").value;

document
.getElementById("result")
.textContent=
"Registration Successful, "+name;

});

/* Phone Validation */

document
.getElementById("phone")
.addEventListener("blur",function(){

let phone=this.value;

if(phone.length!==10){
alert("Phone number must be 10 digits");
}

});

/* Character Counter */

document
.getElementById("message")
.addEventListener("keyup",function(){

document
.getElementById("count")
.textContent=this.value.length;

});

/* Double Click Image */

document
.querySelectorAll(".gallery-img")
.forEach(img=>{

img.ondblclick=function(){

this.style.width="400px";

};

});

/* Video Event */

document
.getElementById("promoVideo")
.oncanplay=function(){

document
.getElementById("videoStatus")
.innerHTML=
"Video Ready To Play";

};

/* Geolocation */

document
.getElementById("locationBtn")
.addEventListener("click",()=>{

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(

(position)=>{

document
.getElementById("locationResult")
.innerHTML=
`Latitude :
${position.coords.latitude}
<br>
Longitude :
${position.coords.longitude}`;

},

(error)=>{
alert(error.message);
},

{
enableHighAccuracy:true,
timeout:5000
}

);

}

});

/* Local Storage */

const eventType=
document.getElementById("eventType");

eventType.value=
localStorage.getItem("eventType")
|| eventType.value;

eventType.addEventListener("change",()=>{

localStorage.setItem(
"eventType",
eventType.value
);

});

/* Before Leave */

window.onbeforeunload=function(){

return "Unsaved data may be lost";

};