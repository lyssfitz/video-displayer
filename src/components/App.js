import React, { Component } from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends Component {
	state = { videos: [], selectedVideo: null };

	componentDidMount() {
		this.onTermSubmit('focus music');
	}
	onTermSubmit = async (term) => {
		const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
		const response = await youtube.get('./search', {
			params: {
				q: term,
				part: 'snippet',
				maxResults: 5,
				key: KEY,
			},
		});
		this.setState({
			videos: response.data.items,
			selectedVideo: response.data.items[0],
		});
	};

	onVideoSelect = (video) => {
		this.setState({ selectedVideo: video });
	};
	render() {
		return (
			<div className="ui container">
				<SearchBar onFormSubmit={this.onTermSubmit} />

				<div className="ui grid">
					<div className="ui row">
						<div className="eleven wide column">
							<VideoDetail video={this.state.selectedVideo} />
						</div>
						<div className="five wide column">
							<VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
