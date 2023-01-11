import React, { Component } from 'react';
import axios from 'axios';
import MovieDetail from './MovieDetail';


class Movielist extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            movies:[],
            currentMovie:'',
            pagginationArray:[1],
            currentPage:1,
            MyFavMoviesID: []
        }
        this.myRef = React.createRef()  
    }
    
    async componentDidMount(){
        const { apiKey } = this.props;
        const apiLink = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${this.state.currentPage}`;
        let response = await axios.get(apiLink);
        let apiData = response.data;

        this.setState({
            movies:apiData.results
        });

        this.handleFavouritesState();
    }

    changeMovies = async () => {
        const { apiKey } = this.props;
        const apiLink = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${this.state.currentPage}`;
        let response = await axios.get(apiLink);
        let apiData = response.data;
        this.setState({movies:apiData.results}, 
            this.myRef.current.scrollIntoView({behavior:"smooth"}));
        
    }

    handlePageClick = (pageValue) => {
        this.setState({
            currentPage:pageValue,
        }, this.changeMovies)
    }

    handleNext = (e) => {
        e.preventDefault();
        this.setState({
            currentPage:this.state.currentPage+1,
            pagginationArray:[...this.state.pagginationArray, this.state.pagginationArray.length+1]
        }, this.changeMovies)
    }

    handlePrevious = (e) => {
        e.preventDefault();
        if(this.state.currentPage > 1){
            this.setState({
                currentPage:this.state.currentPage-1,
            }, this.changeMovies)
        }
    }

    handleFavClick = (movieobj) => {
        
        // getting favriout movie object data from local storage
        let favMovies_Local = JSON.parse(localStorage.getItem('moviepedia-favlist') || "[]") ;

        // checking if movie is already in favlist or not using state which stores id of fav movies
        if(this.state.MyFavMoviesID.includes(movieobj.id))
        {
            //if movie is in fav list then remove it from favlist
            favMovies_Local = favMovies_Local.filter((movieObj)=>(movieObj.id !== movieobj.id))
        }
        else{
            //if movie is Not in favlist then add it into favlist.
            favMovies_Local.push(movieobj)
        }

        // storing movie object in local storage
        localStorage.setItem('moviepedia-favlist', JSON.stringify(favMovies_Local));
        this.handleFavouritesState();
    }

    handleFavouritesState = () =>{
        //setting state of MyFavMoviesID
        let oldData = JSON.parse(localStorage.getItem("moviepedia-favlist") || "[]");
        let tempFavMovieIdList = oldData.map((movie)=>movie.id);
        this.setState({
            MyFavMoviesID : [...tempFavMovieIdList],
        })
    }

    handleModalDetail = (movieobj) => {
        this.setState({
            currentMovie:movieobj
        })
    }
    
    render() {
        return (
        <div className='container-fluid px-sm-1 px-md-5' ref={this.myRef}>

        <div className="modal fade" id="movieDetailModal" tabIndex="-1" aria-labelledby="movieDetailModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Movie Detail</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <MovieDetail currentMovie={this.state.currentMovie} handleFavClick={this.handleFavClick} MyFavMoviesID={this.state.MyFavMoviesID}/>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>

            <div className='row'>
            {
                this.state.movies === '' ? (
                <div className="d-flex justify-content-center align-items-center" style={{height:'90vh'}}>
                    <div className="spinner-border text-dark" role="status" style={{width:'10vw', height:'10vw'}}>
                    <span className="visually-hidden">Loading...</span></div>
                </div>
                ) : (
                this.state.movies.map((movieObj)=>{
                    return(
                    <div key={movieObj.id} className="card col-6 col-md-3 col-lg-2 moviecard-ctn zoom" >
                        <div className="moviecard-imgctn">
                            <img src={`https://image.tmdb.org/t/p/w200/${movieObj.poster_path}`}  className="card-img-top" alt={`${movieObj.title} and id:${movieObj.id}`}/>
                        </div>
                        <div className="moviecard-title" data-bs-toggle="modal"             data-bs-target="#movieDetailModal" onClick={()=>this.handleModalDetail(movieObj)}><span>{movieObj.original_title}</span></div>
                        <div className="moviecard-btnctn">
                            <button className="moviecard-btn" title="Add to Favorite" 
                            onClick={()=>this.handleFavClick(movieObj)}>
                            {
                                this.state.MyFavMoviesID.includes(movieObj.id) ? (<i className="bi bi-star-fill"></i>) : (<i className="bi bi-star"></i>)
                            }
                            </button>
                        </div>  
                    </div>
                    )
                })
                )
            }
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{height:'10vh'}}>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className="page-item">
                    <a className={`page-link ${this.state.currentPage === 1 ? 'linkDisabled' : ''}`} 
                    onClick={this.handlePrevious} href="#0">Previous</a></li>
                    {
                        this.state.pagginationArray.map((page)=>{
                            return(
                                <li key={page} className="page-item">
                                    <a className="page-link" href="#0" onClick={()=>this.handlePageClick(page)}>{page}</a>
                                </li>
                            )
                        })
                    }
                    <li className="page-item"><a className="page-link" onClick={this.handleNext} href="#0" >Next</a></li>
                </ul>
            </nav>
            </div>
        </div>
        );
    }
}

export default Movielist;