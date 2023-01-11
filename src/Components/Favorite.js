import React, { Component } from 'react';
// import { moviesData } from './moviesData';

const genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

class Favorite extends Component {
    
    constructor(){
        super();
        this.state={
            genList : [],
            currGen : 'All Genres',
            MyFavMovies: [],
            currText:'',
            limit:5,
            currentPage:1,
            sortBy:"",
        }
        this.sidebarRef = React.createRef()  
    }
    
    async componentDidMount(){
        let tempGenlist = [];
        let favMoviesData = JSON.parse(localStorage.getItem("moviepedia-favlist") || "[]")

        await favMoviesData.forEach((movie) => {
            movie.genre_ids.forEach((genID) => {
                if(!tempGenlist.includes(genreids[genID])){
                    tempGenlist.push(genreids[genID]);
                }
            })
        })
        tempGenlist.unshift('All Genres');

        this.setState({
            genlist:[...tempGenlist],
            MyFavMovies : [...favMoviesData]
        });
    
    }

    handleGenreClick = (genre) => {
        this.sidebarRef.current.click();
        this.setState({
            currGen:genre
        })
    }

    handlePageClick = (pageValue) => {
        this.setState({
            currentPage:pageValue
        })
    }

    handleDelete = (movieID) => {
        let tempFavMovies = this.state.MyFavMovies.filter((movie) => {
            return movie.id !== movieID;
        })

        this.setState({
            MyFavMovies:tempFavMovies
        })

        localStorage.setItem("moviepedia-favlist", JSON.stringify(tempFavMovies));
    }

    handleSort = (sortBy) => {
        let temp = this.state.MyFavMovies;

        if(sortBy === 'title'){
            if(this.state.sortBy === 'titleAsc')
            {
                temp = temp.sort((a, b) => (a.original_title > b.original_title ? -1 : 1))
                this.setState({sortBy:'titleDesc'})
            }
            else
            {
                temp = temp.sort((a, b) => (a.original_title > b.original_title ? 1 : -1))
                this.setState({sortBy:'titleAsc'})
            }
        }
        
        if(sortBy === 'rating'){
            if(this.state.sortBy === 'ratingAsc')
            {
                temp.sort(function(objA,objB){
                    return objA.vote_average-objB.vote_average
                })
                this.setState({sortBy:'ratingDesc'})
            }
            else
            {
                temp.sort(function(objA,objB){
                    return objB.vote_average-objA.vote_average
                })
                this.setState({sortBy:'ratingAsc'})
            }
        }
        
        if(sortBy === 'popularity'){
            if(this.state.sortBy === 'popularityAsc')
            {
                temp.sort(function(objA,objB){
                    return objA.popularity-objB.popularity
                })
                this.setState({sortBy:'popularityDesc'})
            }
            else
            {
                temp.sort(function(objA,objB){
                    return objB.popularity-objA.popularity
                })
                this.setState({sortBy:'popularityAsc'})
            }
        }

        this.setState({
            MyFavMovies:[...temp],
        })
    }

    render() {
        let filteredList = [];

        if(this.state.currText !== ''){
            filteredList = this.state.MyFavMovies.filter(
                (movieObj) => {
                    return movieObj.title.toLowerCase().includes(this.state.currText.toLowerCase());
                }
            )
        }
        else
        {
            filteredList = this.state.MyFavMovies;
        }

        if(this.state.currGen !== 'All Genres'){
            filteredList = this.state.MyFavMovies.filter(
                (movieObj) => {
                    let flag = false;
                    movieObj.genre_ids.forEach((genID) => {
                        if(genreids[genID] === this.state.currGen){
                            flag = true;
                        }
                    })
                    return flag;
                }
            )
        }

        // Pagination
        let totalPages = Math.ceil(filteredList.length / this.state.limit);
        let pages = [];
        for(let i=1;i<=totalPages;i++){
            pages.push(i);
        }
        console.log(pages);
        console.log(this.state.currentPage);
        var si = 0;
        var ei = 0;

        if(this.state.currentPage!== 1)
        {
            si = (this.state.currentPage-1)*this.state.limit;
        }
        ei = si+Number(this.state.limit);
        filteredList = filteredList.slice(si,ei);
    
        return (
            <div className='container-fluid'>
            <div className='row'>
                <div className='col-12 col-md-4 d-flex d-md-none ' style={{marginTop:"1rem"}}>
                    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#genreSidebar" aria-controls="genreSidebar">Select Movie By Genre</button>

                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="genreSidebar" aria-labelledby="genreSidebarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="genreSidebarLabel">Movie Genre</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ref={this.sidebarRef}></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="list-group">
                        {   this.state.genlist &&
                            this.state.genlist.map((gen)=>{
                            return (
                                <li key={gen} 
                                className={`list-group-item ${this.state.currGen === gen? 'active' : ''}`} 
                                onClick={()=>this.handleGenreClick(gen)}
                                role="button">{gen}</li>
                            )
                            })
                        }
                        </ul>
                    </div>
                    </div>
                </div>
                <div className='col-12 col-md-3 d-none d-md-block' style={{marginTop:"1rem"}} >
                    <ul className="list-group">
                    {
                        this.state.genlist &&
                        this.state.genlist.map((gen)=>{
                            return (
                                <li key={gen} 
                                className={`list-group-item ${this.state.currGen === gen? 'active' : ''}`} 
                                onClick={()=>this.handleGenreClick(gen)}
                                role="button">{gen}</li>
                            )
                        }) 
                    }
                    </ul>
                </div>

                <div className='col-12 col-md-8' style={{marginTop:"1rem"}}>
                    <div className="input-group">
                        <input type="text" aria-label="Search By Name" placeholder="Search By Name" className="form-control" value={this.state.currText} onChange={(e)=>this.setState({currText : e.target.value})}/>
                        <input type="number" aria-label="Limit Number Of list Item" placeholder="Limit Number Of list Item" className="form-control" min="3" value={this.state.limit} onChange={(e)=>this.setState({limit : e.target.value})}/>
                    </div>
                    <div className="m-3 table-responsive-sm">
                        <table className="table align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">
                                    <p role="button" className='d-inline-flex justify-content-center align-items-end p-0 m-0' onClick={()=>this.handleSort("title")}><span>Title</span>
                                    <span>
                                    {
                                        this.state.sortBy === 'titleAsc' ? <i className="bi bi-sort-alpha-down-alt ms-1" title="Sort By Z to A"></i> : <i className="bi bi-sort-alpha-down ms-1" title=" Sort By A to Z"></i>
                                    }
                                    </span>
                                    </p>    
                                </th>
                                <th scope="col">
                                    <p className='d-inline-flex justify-content-center align-items-end p-0 m-0'>Genre</p>
                                </th>
                                <th scope="col">
                                    <p role="button" className='d-inline-flex justify-content-center align-items-end p-0 m-0' onClick={()=>this.handleSort("popularity")}><span>Popularity</span>
                                    <span>
                                    {
                                        this.state.sortBy === 'popularityAsc' ? <i className="bi bi-sort-down-alt ms-1" title="Sort By Low to High"></i> : <i className="bi bi-sort-down ms-1" title="Sort By High to Low"></i>
                                    }
                                    </span>
                                    </p>
                                </th>
                                <th scope="col">
                                    <p role="button" className='d-inline-flex justify-content-center align-items-end p-0 m-0' onClick={()=>this.handleSort("rating")}><span>Rating</span>
                                    <span>
                                    {
                                        this.state.sortBy === 'ratingAsc' ? <i className="bi bi-sort-down-alt ms-1" title="Sort By Low to High"></i> : <i className="bi bi-sort-down ms-1" title="Sort By High to Low"></i>
                                    }
                                    </span>
                                    </p>
                                </th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                            <tbody>
                            {filteredList.length === 0 ?
                            (<tr>
                                <td colSpan="5" className='text-center'>
                                    <h3>No Favorite Movie Found</h3>
                                </td>
                            </tr>) :
                            (filteredList.map((movieObj)=>{
                                return(
                                    <tr key={movieObj.id}>
                                    <th>
                                        <div className='row'>
                                        <div className='col-12 col-md-4'>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}  className="img-fluid mx-0 mx-md-3" alt={movieObj.title}/>
                                        </div>
                                        <div className='col-12 col-md-8' style={{fontSize:"1em"}}>
                                            <p>{movieObj.original_title}</p>
                                        </div>
                                        </div>
                                    </th>
                                    <td>
                                        <div>
                                        {movieObj.genre_ids.map((gid)=>{
                                            return(
                                                <span key={gid} className="badge bg-primary mx-1" >{genreids[gid]}</span>
                                            )})
                                        }
                                        </div>
                                    </td>
                                    <td>{movieObj.popularity}</td>
                                    <td>{movieObj.vote_average}</td>
                                    <td>
                                        <button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button>
                                    </td>
                                    </tr>
                                )})
                            )
                            }
                        </tbody>    
                        </table>
                        <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {
                                pages.map((page)=>{return(
                                    <li key={page} className="page-item" 
                                        onClick={()=>this.handlePageClick(page)}>
                                        <a className="page-link" href="#0">{page}</a>
                                    </li>
                                )})
                            }
                        </ul>
                        </nav>
                    </div>                    
                </div>
            </div>
            </div>
        );  
    }
}

export default Favorite;