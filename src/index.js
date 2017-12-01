import React, {Component} from 'react'; 
import _ from 'lodash'; 
import ReactDOM from 'react-dom'; 
import YTSearch from 'youtube-api-search'; 
import SearchBar from './components/search_bar'; 
import VideoList from './components/video_list'; 
import VideoDetail from './components/video_detail.js'; 
const API_KEY = 'AIzaSyBkiWK4KWUWkWHSoiXjh1U1i4ImIrzftgM';



// Create a new component. This component should produce
//some HTML

//turn App into a class to keep track of the list of videos by recording them on its state

//whenever the key and value are the same, condense to the anme of the variable
//this.setState({videos:videos})



class App extends Component{
	constructor(props){
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};
		this.videoSearch('lofi hiphop chillhop nujabes');	
	}

	videoSearch(term){

		YTSearch({key: API_KEY, term: term}, (videos) =>{
			this.setState({ 
				videos: videos, 
				selectedVideo: videos[0]
			})
			
		}); 
	}

 
	render(){

		const videoSearch = _.debounce((term)=> { this.videoSearch(term)}, 300);

		return( 
			<div>
				<SearchBar onSearchTermChange = {term => this.videoSearch(term)} />
				<div className = "row">
					<VideoDetail video = {this.state.selectedVideo}/>
					<VideoList 
						onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
						videos = {this.state.videos} />
				</div>
			</div>
		);
	}
} 



// <App /> //this is the instance of App 
//<App><App/> there's nothing in between so make it a self-closing tag <App/>



//Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container')); 


//downwards data flow: only the most parent component should be resp for fetching data from api or redux or flex framework
//index is the most parent component/top level comp, App, should fetch the data
// pass data from parent to child components via props 
//in a class component, props available everywhere, not true in functional component, passed ab an obj


//onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
//this function updates app's state with a new video. 
// we're passing onVideoSelect has a property to VideoList

////lodash help throttle how often a function is called
//	const videoSearch = _.debounce((term)=> { this.videoSearch(term)}, 300); 
// the search bar will get the videos once every 3 seconds