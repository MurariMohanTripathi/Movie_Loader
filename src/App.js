import {useState,useEffect} from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

// adaf3639
// const API_URL ='https://www.omdbapi.com/?i=tt3896198&apikey=adaf3639';
const API_URL = 'https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?i=tt3896198&apikey=adaf3639';



const App = ()=>{
    const [movies,setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title) =>{
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
    
            if (data.Response === 'True') {
                setMovies(data.Search);
            } else {
                setMovies([]); // Clear the movies state if no movies are found
            }
        } catch (error) {
            console.error("Error fetching the movies:", error);
            setMovies([]); // Clear the movies state in case of an error
        }
    }
    useEffect(()=>{
        searchMovies('spiderman');
    },[]);

    return (
        <div className = 'app'>
            <h1>MOVIE LOADER</h1>
            <div className = 'search'>
                <input 
                placeholder ="Search for movies"
                value = {searchTerm}
                onChange = {(e)=> setSearchTerm(e.target.value)}
                />
                <img 
                src = {SearchIcon}
                alt="search"
                onClick ={()=>searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0
                ?(
                    <div className ="container ">
                        {movies.map((movie)=>(
                            <MovieCard movie = {movie}/>
                        ))}
                    </div>
                ):(
                    <div className='empty'>
                       <h2>No Movies found</h2>
                        </div>
                )
            }
        </div>
    );
}

export default App;