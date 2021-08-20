'use strict';
const { default: axios } = require('axios');


class Movie {
    constructor(movieData) {
        this.title = movieData.title;
        this.overview = movieData.overview;
        this.average_votes = movieData.vote_average;
        this.total_votes = movieData.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
            this.popularity = movieData.popularity;
        this.released_on = movieData.release_date;

    }
}





function MovieHandler(req1, res1) {

    let movieSearch = req1.query.searchQuery

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${movieSearch}&include_adult=false`;


    try {
        axios.get(url).then((movieSearch) => {

            let movieArry = movieSearch.data.results.map((movieName) => {

                return new Movie(movieName)
            })

            res1.send(movieArry)
        });


    }
    catch ( error ) {
        console.log('error from axios', error)
        res.send(error)
    }

}
module.exports = MovieHandler;
