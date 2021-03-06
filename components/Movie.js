'use strict';
const { default: axios } = require('axios');
module.exports = MovieHandler;





let inMemory = {};


function MovieHandler(req, res) {

    let movieSearch = req.query.searchQuery

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${movieSearch}&include_adult=false`

    if (inMemory[movieSearch] !== undefined) {
        console.log('cache hit');
        res.send(inMemory[movieSearch]);
    } else {
        console.log('cache miss')



        try {
            axios.get(url).then((movieTitle) => {



                let movieArry = movieTitle.data.results.map((movieName) => {

                    return new Movie(movieName)
                })
                inMemory[movieSearch] = movieArry
                // console.log(inMemory)



                res.send(movieArry)
            });


        }
        catch (error) {
            console.log('error from axios', error)
            res.send(error)
        }
    }
}


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

