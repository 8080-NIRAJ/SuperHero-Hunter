// Get references to HTML elements
const Name = document.getElementById("Name");
const charImg = document.getElementById("char-img");
const Power = document.getElementById("Power");
const data = document.getElementById("data");

// Create an XMLHttpRequest object for making an API request
var xhttp = new XMLHttpRequest();

// Set up a callback function to handle the API response
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Parse the API response as JSON
        const response = JSON.parse(xhttp.responseText);

        // Check if the response indicates an error
        if(response.response === "error"){
            console.log("error fetching data");
            return;
        }

        // Display the retrieved data on the screen
        Name.innerHTML = response.name;
        charImg.setAttribute("src", response.image.url);
        // Display power stats
        Power.innerHTML = '<h1>POWER</h1><h4>Intelligence: '+response.powerstats.intelligence+'</h4><h4>strength: '+response.powerstats.strength+'</h4><h4>Speed: '+response.powerstats.speed+'</h4><h4>Durability: '+response.powerstats.durability+'</h4><h4>Power: '+response.powerstats.power+'</h4><h4>Combat: '+response.powerstats.combat+'</h4>';
        console.log(response.biography.full-name);
        // Display biography information
        data.innerHTML = '<h1>BIOGRAPHY</h1><h4>Full-Name: '+response.biography.full-name+'</h4><h4>Alter-Egos: '+response.biography.alter-egos+'</h4><h4>Place-of-birth: '+response.biography.place-of-birth+'</h4><h4>First-Appearence: '+response.biography.first-appearence+'</h4><h4>Publisher: '+response.biography.publisher+'</h4><h4>Alignment: '+response.biography.alignment+'</h4>';
    }
};

// Set up and send an API request to retrieve hero details using the stored hero ID
xhttp.open("GET", "https://www.superheroapi.com/api.php/3383566708344630/"+localStorage.getItem("heroSelected"), true);
xhttp.send();
