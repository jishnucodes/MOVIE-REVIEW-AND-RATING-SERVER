
const axios = require('axios');


//For getting the list of popular movies
const getAllPopularMovies = async (req,res) => {
    try {
        const response = await axios.get(`${process.env.TMDB_URL}/movie/popular`, {
            params: {
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data)
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}

//For getting list of top_rated movies
const getTopRatedMovies = async (req,res) => {
    try {
        const response = await axios.get(`${process.env.TMDB_URL}/movie/top_rated`, {
            params: {
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}

//For getting list of now playing movies
const getTrendingMovies = async (req,res) => {
    try {
        const response = await axios.get(`${process.env.TMDB_URL}/movie/now_playing`, {
            params: {
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}

//For getting a list of action movies....
const getActionMovieList = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.TMDB_URL}/discover/movie`, {
            params: {
                with_genres: 28,
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}

//For getting a list of adventure movies
const getAdventureMoviesList = async (req,res) => {
    try {
        const response = await axios.get(`${process.env.TMDB_URL}/discover/movie`, {
            params: {
                with_genres: 12,
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("Error fetching data:", error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
}

//For getting a list of animation movies
const getAnimationMoviesList = async (req,res) => {
    try {
        const response = await axios.get(`${process.env.TMDB_URL}/discover/movie`, {
            params: {
                with_genres: 16,
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("Error fetching data:", error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
}

//For getting a list of comedy movies
const getComedyMoviesList = async (req,res) => {
    try {
        const response = await axios.get(`${process.env.TMDB_URL}/discover/movie`, {
            params: {
                with_genres: 35,
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("Error fetching data:", error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
}

//To get a list of Crime movies
const getCrimeMoviesList = async (req,res) => {
    try {
        const response = await axios.get(`${process.env.TMDB_URL}/discover/movie`, {
            params: {
                with_genres: 80,
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("Error fetching data:", error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
}

//To get a list of fantasy movies
const getFantasyMoviesList = async (req,res) => {
    try {
        const response = await axios.get(`${process.env.TMDB_URL}/discover/movie`, {
            params: {
                with_genres: 14,
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("Error fetching data:", error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
}

//for getting the images of individual movies
const getAllBackdrops = async (req, res) => {

    const {movieId} = req.params;
    try {
        const response = await axios.get(`${process.env.TMDB_URL}/movie/${movieId}/images`, {
            params: {
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("Error fetching data:", error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
}

//for getting the videos of individual movies
const getVideos = async (req,res) => {
    
    const {movieId} = req.params;
    try {
        const response = await axios.get(`${process.env.TMDB_URL}/movie/${movieId}/videos`, {
            params: {
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("Error fetching data:", error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
}

//for getting the details of each movies
const getSingleMovie = async (req,res) => {
    try {
        const {movieId} = req.params
        const response = await axios.get(`${process.env.TMDB_URL}/movie/${movieId}`, {
            params : {
                api_key: process.env.TMDB_API_KEY
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log("Error fetching data:", error);
        res.status(500).json({error: 'Failed to fetch data'});
    }
}


module.exports = {
    getAllPopularMovies,
    getTopRatedMovies,
    getTrendingMovies,
    getActionMovieList,
    getAdventureMoviesList,
    getAnimationMoviesList,
    getComedyMoviesList,
    getCrimeMoviesList,
    getFantasyMoviesList,
    getAllBackdrops,
    getVideos,
    getSingleMovie
    
};
