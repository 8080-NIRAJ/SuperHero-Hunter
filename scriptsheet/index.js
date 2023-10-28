// Get references to HTML elements
const Hero = document.getElementById("Hero");
const searchResult = document.getElementById("searchResult");

// Create an array to store favorite buttons
var favourite_buttons = [];

// Add an event listener for when the user types in the search input
Hero.addEventListener("keyup", function(){
    // Create an XMLHttpRequest object for making API requests
    var xhrRequest = new XMLHttpRequest();
    // Get the search value from the input field
    var searchValue = this.value;

    // Check if the search value is too short, clear search results if it is
    if(searchValue.length <= 2){
        searchResult.innerHTML = "";
        return;
    }

    // Set up a callback function to handle the API response
    xhrRequest.onreadystatechange = function() {
        // Check if the request is complete and successful
        if (this.readyState == 4 && this.status == 200) {
            // Parse the API response as JSON
            const response = JSON.parse(xhrRequest.responseText);

            // Check if the response indicates an error, clear results if there is an error
            if(response.response === "error"){
                searchResult.innerHTML = "";
                return;
            }

            // Extract the results from the API response
            const results = response.results;

            // Clear the existing search results
            searchResult.innerHTML = "";

            // Iterate through the results and create HTML elements for each result
            for(let i of results){
                var li = document.createElement("li");
                li.classList.add("search-item");
                // Create HTML for each result with a link and a favorite button
                li.innerHTML = '<a href="" class="searchResult" id="'+i.id+'">'+i.name+'</a></><div class ="add" id="'+i.id+'" data-name="'+i.name+'" data-photo="'+i.image.url+'"><i id="addFav" class="fa fa-heart"></i></div>';
                // Add the result to the search result container
                searchResult.appendChild(li);
            }

            // Add click event listeners to the search result links
            let resultHeros = document.getElementsByClassName("searchResult");
            for(let j of resultHeros){
                j.addEventListener("click", function(event){
                    event.preventDefault();
                    console.log(this.id);
                    // Store the selected hero's ID in local storage and redirect to a details page
                    localStorage.setItem('heroSelected', this.id);
                    location.replace("./char_details.html");
                });
            }

            // Add click event listeners to the favorite buttons
            favourite_buttons = document.getElementsByClassName("add");
            for(let i of favourite_buttons){
                i.addEventListener("click", function(){
                    // Check if the button is currently displaying the "Remove Favorite" icon
                    if(i.innerHTML == '<i id="delFav" class="fa fa-heart"></i>'){
                        // If it is, change it back to "Add Favorite" and remove the hero from local storage
                        i.innerHTML = '<i id="addFav" class="fa fa-heart"></i>'
                        function remove(value){
                            return this.id != value.id;
                        }
                        // Remove the hero from local storage
                        let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
                        newItems = oldItems.filter(remove.bind(i));
                        localStorage.setItem('favHeroes', JSON.stringify(newItems));
                        return;
                    }
                    // If the button is displaying the "Add Favorite" icon, change it to "Remove Favorite" and save the hero in local storage
                    i.innerHTML = '<i id="delFav" class="fa fa-heart"></i>';
                    let favItem = {
                        id: this.id,
                        name: this.dataset.name,
                        photoUrl: this.dataset.photo
                    }
                    // Save the hero in local storage
                    let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
                    oldItems.push(favItem);
                    localStorage.setItem('favHeroes', JSON.stringify(oldItems));
                });
            }
        }
    };

    // Set up and send an API request based on the search value
    xhrRequest.open("GET", "https://www.superheroapi.com/api.php/3383566708344630/search/"+searchValue, true);
    xhrRequest.send();
});

