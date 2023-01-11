import React, { Component } from 'react';
import { moviesData } from './moviesData';
import StarRatings from 'react-star-ratings';
import genreids from './Genreids';
import languages from './Languages';


class MovieDetail extends Component {

    // get movie image list
    // https://api.themoviedb.org/3/movie/315162/images?api_key=37f9c91e26769b7e61294eb52160d631

    handleDate = (date) => { 
        let dateObj = new Date(date);
        return dateObj.getFullYear();
    }
    
    handleLanugauge = (code) => {
        let language = languages.filter((lang)=>(lang.code === code));
        return language[0].name;
    }

    render() {
        let movieData = moviesData.results;
        let movieStaticData = this.props.currentMovie;

        if(this.props.currentMovie !== ''){
            movieStaticData = this.props.currentMovie;
        }
        else
        {
            movieStaticData = movieData[0];
        }

        return (
            <div className="card border-0 container-flex">
                <div className='row modalDetailCtn'>
                    <div className='col-12 modalMovieImageCtn'>
                        <img src={`https://image.tmdb.org/t/p/original${movieStaticData.backdrop_path}`}className="img-fluid" alt={movieStaticData.original_title}/>
                    </div>
                    <div className='ratingCtn '>
                        <StarRatings
                        rating={movieStaticData.vote_average/2}
                        starRatedColor="#FFD700"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name='movieRating'
                        starDimension="1.5rem"
                        />
                    </div>
                    <div className='col-12 mt-3 ModalMovieDataCtn'>
                        <div className="row">
                            <div className='col-12 modalMovieTDctn'>
                                <div className='d-flex align-items-baseline'>
                                    <h5 className="card-title text-start">{movieStaticData.original_title}</h5>
                                    <p className='ps-3'></p>
                                </div>
                                <div className='text-start'>
                                    <p>{movieStaticData.overview}</p>
                                </div>
                            </div>
                            <div className='col-12 modalMovieExtraDatactn'>
                                <p>Genre : {
                                    movieStaticData.genre_ids.map((genreId)=>{
                                        return (
                                            <span key={genreId} className="badge bg-secondary mx-1">{genreids[genreId]}</span>
                                        )
                                    })
                                }
                                </p>
                                <p>Language: {this.handleLanugauge(movieStaticData.original_language)}</p>
                                <div>
                                    <button className="moviecard-btn p-2 px-4" title="Add to Favorite" onClick={()=>this.props.handleFavClick(movieStaticData)}>
                                    {
                                        this.props.MyFavMoviesID.includes(movieStaticData.id) ? (<span>Remove from Favorite<i className="bi bi-star-fill mx-1"/></span>) : ( 
                                        <span>Add to Favorite<i className='bi bi-star mx-1'/></span>)
                                    }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='releseYear'>
                    <p>{this.handleDate(movieStaticData.release_date)}</p>
                </div>
            </div>
        );
    }
}

export default MovieDetail;