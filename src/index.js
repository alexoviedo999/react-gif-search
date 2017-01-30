import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar.js';
import GifList from './components/GifList.js';
import GifModal from './components/GifModal.js'
import request from 'superagent';
import './styles/app.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      selectedGif: null,
      modalIsOpen: false
    }
  }

  openModal = (gif) => {
    this.setState({
      selectedGif: gif,
      modalIsOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      selectedGif: null,
      modalIsOpen: false
    })
  }

  handleTermChange = (term) => {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

    request.get(url, (err, res) => {
      this.setState({ gifs: res.body.data })
    });
  }

  render() {
    return (
      <div>
        <SearchBar onTermChange={this.handleTermChange} />
        <GifList gifs={this.state.gifs}
          onGifSelect={selectedGif => this.openModal(selectedGif) } />
          <GifModal modalIsOpen={this.state.modalIsOpen}
            selectedGif={this.state.selectedGif}
            onRequestClose={ () => this.closeModal() } />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
