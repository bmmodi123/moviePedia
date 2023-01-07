import React, { Component } from 'react';
import Banner from './Banner';
import Movielist from './Movielist';
import env from "react-dotenv";
const apiKey = env.MOVIEDB_APIKEY;

class Home extends Component {
    render() {
        return (
            <div>
                <Banner apiKey={apiKey}/>
                <Movielist apiKey={apiKey}/>
            </div>
        );
    }
}

export default Home;