import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import ReactPlayer from 'react-player';
import Duration from '../components/Duration';
import ProgressBar from 'react-player-controls';

class EpisodeShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      url: null
    }
    this.playPause = this.playPause.bind(this)
    this.stop = this.stop.bind(this)
    this.toggleMuted = this.toggleMuted.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.renderLoadButton = this.renderLoadButton.bind(this)
    this.load = this.load.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  load(url){
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
  }

  playPause(){
    this.setState({ playing: !this.state.playing })
  }

  stop(){
    this.setState({ url: null, playing: false })
  }

  toggleMuted(){
    this.setState({ muted: !this.state.muted })
  }

  onPlay(){
    this.setState({ playing: true })
  }

  onPause(){
    this.setState({ playing: false })
  }

  onProgress(state){
    this.setState(state)
  }

  renderLoadButton(url,label){
    return(
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  handleOnChange(value){
    this.setState({ played: value })
  }

  render() {
    let currentTime = <Duration seconds={this.state.duration * (this.state.played)} />
    return(

      <div className='container'>
        <h2>{this.props.name}</h2>
        <h3>Duration: {this.props.duration}</h3>
        <div className='player-container'>
          <ReactPlayer url={this.props.feedUrl}
            playing
          />
          <div className='player-wrapper'>
            <ReactPlayer
              className='react-player'
              url={this.state.url}
              playing={this.state.playing}
              volume={this.state.volume}
              muted={this.state.muted}
              playbackRate={this.state.playbackRate}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onEnded={() => this.setState({ playing: false})}
              onProgress={this.onProgress}
              onDuration={duration => this.setState({ duration })}
            />
          </div>
          <table>
            <tr>
              <th>Controls</th>
              <td>
                <button className="circle" onClick={this.stop}><i className="fa fa-stop"></i></button>
              </td>
              <td>
                <button className="circle" onClick={this.playPause}>{this.state.playing ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}</button>
              </td>
              <td>
                <label>
                  <input type='checkbox' className="hide" checked={this.state.muted} onChange={this.toggleMuted} />{this.state.muted ? <i className="material-icons circle">volume_off</i> : <i className="material-icons circle">volume_up</i> }
                </label>
              </td>
              <td>
                <h3>elapsed</h3><Duration seconds={this.state.duration * (this.state.played)} />
              </td>
              <td>
                <h3>remaining</h3><Duration seconds={this.state.duration * (1 - this.state.played)} />
              </td>
            </tr>
          </table>
          <h2>Controls</h2>
              <h3>Load</h3>
              {this.renderLoadButton("http://feeds.soundcloud.com/stream/273116676-nerd-cast-episode-6-comic-con-review-cpt-hydra-und-die-1.mp3", "Load Episode")}
              <button onClick={this.stop}>Stop</button>
              <button onClick={this.playPause}>{this.state.playing ? 'Pause' : 'Play'}</button>
              <label>
                <input type='checkbox' checked={this.state.muted} onChange={this.toggleMuted} /> Muted
              </label>
              <h3>playing</h3>{this.state.playing ? 'true' : 'false'}
              <h3>volume</h3>{this.state.volume.toFixed(3)}
              <h3>played</h3>{this.state.played.toFixed(3)}
              <h3>loaded</h3>{this.state.loaded.toFixed(3)}
              <h3>duration</h3><Duration seconds={this.state.duration} />
              <h3>remaining</h3><Duration seconds={this.state.duration * (1 - this.state.played)} />
        </div>

        <div className="button" onClick={browserHistory.goBack} >
          Back
        </div>
      </div>
    )
  }
}

export default EpisodeShow;
