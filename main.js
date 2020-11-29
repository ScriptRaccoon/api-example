import { API } from "./api.js";

async function searchActors(searchName) {
    const url = `${API.URL}/search/person?query=${searchName}&api_key=${API.KEY}`;
    const response = await fetch(url);
    const object = await response.json();
    console.log(object);
    const results = object.results;
    $("#actorList").html("");
    for (const result of results) {
        const item = $("<li></li>").text(`${result.name} (id: ${result.id})`);
        $("#actorList").append(item);
    }
}

async function searchMovies(actorID) {
    const url = `${API.URL}/person/${actorID}/movie_credits?api_key=${API.KEY}`;
    const response = await fetch(url);
    const object = await response.json();
    console.log(object);
    const credits = object.cast;
    $("#movieList").html("");
    for (const credit of credits) {
        const year = credit["release_date"]?.substring(0, 4);
        const item = $("<li></li>").text(`${credit.title} (${year})`);
        $("#movieList").append(item);
    }
}

$("#searchButton").click(() => {
    const searchName = $("#nameInput").val();
    searchActors(searchName);
});

$("#requestButton").click(() => {
    const actorID = $("#idInput").val();
    searchMovies(actorID);
});
