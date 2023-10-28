// Get references to HTML elements
const favHeroContainer = document.getElementById("favourite-hero");
const body = document.getElementsByTagName("body")[0];

// Retrieve favorite heroes from local storage
var favHeroes = JSON.parse(localStorage.getItem("favHeroes"));

// Check if there are no favorite heroes saved
if (favHeroes.length == 0) {
    // Create a message div indicating that no heroes have been added
    let div = document.createElement('div');
    div.innerHTML = '<h2> Add Super-Heroes</h2>';
    favHeroContainer.appendChild(div);
} else {
    // Iterate through the list of favorite heroes and create a card for each one
    for (let hero of favHeroes) {
        let div = document.createElement('div');
        // Create a card with the hero's image, name, and a "Delete" button
        div.innerHTML = '<img src="' + hero.photoUrl + '" alt="" class="favourite-Img"><h3>' + hero.name + '</h3><div class="fav-remove" data-id="' + hero.id + '">Delete</div>';
        favHeroContainer.appendChild(div);
    }
    
    // Add click event listeners to the "Delete" buttons
    const removeButtons = document.querySelectorAll(".fav-remove");
    removeButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Get the hero ID associated with the clicked button
            const heroId = this.getAttribute("data-id");
            // Filter out the deleted hero and update the local storage
            favHeroes = favHeroes.filter(hero => hero.id !== heroId);
            localStorage.setItem('favHeroes', JSON.stringify(favHeroes));
            // Reload the page to reflect the updated favorite heroes
            location.reload();
        });
    });
}
