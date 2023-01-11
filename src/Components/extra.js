<div className='modalMovieImgCtn'>
<img src={`https://image.tmdb.org/t/p/original${movieStaticData[0].backdrop_path}`}className="img-fluid modalMovieImg" alt="..."/>
</div>

{                                
// <div className='modalMovieImgCtn'>
// <img src={`https://image.tmdb.org/t/p/original${movieStaticData[0].backdrop_path}`}className="img-fluid modalMovieImg" alt="..."/>
// </div>
}
<div className="movieDetailBackground"></div>

<div className="ModalMovieData text-left">
<div className='d-flex justify-content-between'>
    <div>
        <div className='d-inline-block'><h3 className="card-title">{movieStaticData[0].original_title}</h3></div>
        <div className='d-inline-block fs-5 mx-3'><p>{this.handleDate(movieStaticData[0].release_date)}</p></div>
    </div>
</div>

<div className='d-inline-flex flex-column justify-content-start text-start'>
    <p>{movieStaticData[0].overview}</p>
    <p>Genre : {
        movieStaticData[0].genre_ids.map((genreId)=>{
            return (
                <span key={genreId} className="badge bg-secondary mx-1">{genreids[genreId]}</span>
            )
        })
    }</p>
    <p>Language: {this.handleLanugauge(movieStaticData[0].original_language)}</p>
    <button className="moviecard-btn" title="Add to Favorite">
    Add to Favorite<i className="bi bi-star-fill mx-1"></i></button>
</div>
</div>

<div className='starRatingCtn'>
<StarRatings
rating={movieStaticData[0].vote_average/2}
starRatedColor="#FFD700"
changeRating={this.changeRating}
numberOfStars={5}
name='movieRating'
starDimension="1.5rem"
/>
</div>