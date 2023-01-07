import React, { Component } from 'react';
import axios from 'axios';

class Banner extends Component {

    constructor(){
        super();
        this.state={
            movies:[],
        }
    }

    async componentDidMount(){
        const { apiKey } = this.props;
        const apiLink = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${this.state.currentPage}`;
        let response = await axios.get(apiLink);
        let apiData = response.data;

        this.setState({ movies:apiData.results });
    }

    render() {
        const { movies } = this.state;
        let bannerCount = 10;

        const clouserBtn = () => {
            let content = [];
            for (let i = 0; i < bannerCount; i++) {
                content.push(
                    <button key={i} type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={i} className={i===0?'active':''} aria-current={i===0?'true':'false'} aria-label={`Slide+${i+1}`}></button> 
                );
            }
            return content;
        }

        return (
        <div className="container-fluid px-0" >
        {
            movies === '' ? (
            <div className="d-flex justify-content-center align-items-center" style={{height:'90vh'}}>
                <div className="spinner-border text-dark" role="status" style={{width:'10vw', height:'10vw'}}>
                <span className="visually-hidden">Loading...</span></div>
            </div>
            ) : (
            <div id="carouselExampleDark" className="carousel slide">
                <div className="carousel-indicators">
                    {clouserBtn()}
                </div>
                <div className="carousel-inner">
                {   
                    movies.slice(0, bannerCount).map((movieObj,index)=>{
                        return(
                            <div className={`carousel-item ${index === 0 ? 'active':''} moviebanner-ctn`} key={movieObj.id}>
                                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}className="img-fluid" alt={movieObj.title} style={{maxHeight:'91vh'}} />
                                <div className="carousel-caption moviebanner-detail">
                                    <p className="moviebanner-title">{movieObj.original_title}</p>
                                    <p className="moviebanner-desc">{movieObj.overview}</p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            )
        }
        </div>
        );
    }
}

export default Banner;