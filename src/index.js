import _ from "lodash";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/SearchBar";
import YTSearch from "youtube-api-search";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";

const APY_KEY = 'AIzaSyDIg_q0ndV-BMDNqENJwUcRzivkaG5ffDE';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: APY_KEY, term: term}, (videos)=> {
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term)=> {
            this.videoSearch(term)
        }, 300);

        return (
            <div>
                <SearchBar onSerachTermChange={term=>videoSearch(term)}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo=> this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
