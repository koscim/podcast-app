import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import ReactPlayer from 'react-player';
import Duration from '../components/Duration';
import { ProgressBar } from 'react-player-controls';

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
      url: null,
      isSeeking: false,
      seekTime: 0,
      seeking: false,
      playProgress: {}
    }
    this.playPause = this.playPause.bind(this)
    this.stop = this.stop.bind(this)
    this.toggleMuted = this.toggleMuted.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.renderLoadButton = this.renderLoadButton.bind(this)
    this.load = this.load.bind(this)
    this.start = this.start.bind(this)
    this.handleSeek = this.handleSeek.bind(this)
    this.handleSeekEnd = this.handleSeekEnd.bind(this)
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this)
    this.onSeekChange = this.onSeekChange.bind(this)
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this)
    this.setVolume = this.setVolume.bind(this)
    this.onEnded = this.onEnded.bind(this)
    this.ref = this.ref.bind(this)
  }

  ref(player){
    this.player = player
  }
  handleSeek(time) {
    this.setState({
      isSeeking: true,
      seekTime: time,
      played: time
    })
  }

  handleSeekEnd(time) {
    this.setState({
      isSeeking: false,
      seekTime: time,
      played: time
    })
  }

  setVolume(event){
    this.setState({ volume: parseFloat(event.target.value) })
  }

  start(){
    console.log("OnStart")
  }

  load(){
    console.log("onReady")
    // let progressPayload = {
    //   episode_id: this.props.id
    // }
    // fetch(`/api/v1/episodes/${this.props.id}/plays`, {
    //   method: 'POST',
    //   credentials: 'same-origin',
    //   body: JSON.stringify(progressPayload)
    // }).then(response => response.json())
    // .then(responseBody => {
    //   console.log(`onloadsetstate played ${responseBody.secondsPlayed} loaded ${responseBody.secondsLoaded}`)
    //   // this.setState({
    //   //   playProgress: responseBody,
    //   //   // played: responseBody.secondsPlayed,
    //   //   // loaded: responseBody.secondsLoaded
    //   // })
    // })
    // this.setState({
    //   played: this.state.playProgress.secondsPlayed,
    //   loaded: this.state.playProgress.secondsLoaded
    // })
  }

  onEnded(){
    console.log("ended")
    let progressPayload = {
      episode_id: this.props.id,
      played: this.state.played,
      duration: this.state.loaded,
      times: true
    }
    fetch(`/api/v1/episodes/${this.props.id}/plays/${this.state.playProgress.id}`, {
      method: 'PATCH',
      credentials: 'same-origin',
      body: JSON.stringify(progressPayload)
    }).then(response => response.json())
    .then(responseBody => {
      this.setState({ playing: false })
      // console.log(`onProgresssetState played ${responseBody.secondsPlayed} loaded ${responseBody.secondsLoaded}`)

      // this.setState(state)
    })
  }

  playPause(){
    this.setState({ url: this.props.feedUrl, playing: !this.state.playing })
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
    // let progressPayload = {
    //   episode_id: this.props.id,
    //   played: this.state.played,
    //   duration: this.state.loaded
    // }
    // fetch(`/api/v1/episodes/${this.props.id}/plays/${this.state.playProgress.id}`, {
    //   method: 'PATCH',
    //   credentials: 'same-origin',
    //   body: JSON.stringify(progressPayload)
    // }).then(response => response.json())
    this.setState({ playing: false })
  }

  onProgress(state){
    // this.setState({
    //   played: this.state.playProgress.secondsPlayed
    // })
    if(this.ref){
      if(!this.state.seeking){
        // console.log(`onProgress`)
        // let progressPayload = {
        //   episode_id: this.props.id,
        //   played: this.state.played,
        //   duration: this.state.loaded
        // }
        // fetch(`/api/v1/episodes/${this.props.id}/plays/${this.state.playProgress.id}`, {
        //   method: 'PATCH',
        //   credentials: 'same-origin',
        //   body: JSON.stringify(progressPayload)
        // }).then(response => response.json())
        // .then(responseBody => {
        //   console.log(`onProgresssetState played ${responseBody.secondsPlayed} loaded ${responseBody.secondsLoaded}`)
        //   // this.setState(state)
        // })
        this.setState(state)
      }
    }
  }

  renderLoadButton(url,label){
    return(
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  onSeekMouseDown(event){
    this.setState({ seeking: true })
  }

  onSeekChange(event){
    this.setState({ played: parseFloat(event.target.value) })
  }

  onSeekMouseUp(event){
    this.setState({ seeking: false})
    this.player.seekTo(parseFloat(event.target.value))
  }

  componentDidMount(){
    let progressPayload = {
      episode_id: this.props.id
    }
    console.log("componentdidmount")
    fetch(`/api/v1/episodes/${this.props.id}/plays`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(progressPayload)
    }).then(response => response.json())
    .then(responseBody => {
      console.log(`componentdidmountsetstate played ${responseBody.secondsPlayed} loaded ${responseBody.secondsLoaded}`)
      this.setState({
        playProgress: responseBody,
        // played: responseBody.secondsPlayed,
        // loaded: responseBody.secondsLoaded
      })
    })
  }

  render() {
    console.log(`played ${this.state.played}`)
    console.log(`loaded ${this.state.loaded}`)
    let name;
    if(this.props.name){
      name = this.props.name.split(",")[0].replace("[", "").replace("]", "").toUpperCase()
    } else {
      name = ""
    }
    let hours = Math.floor(parseInt(this.props.duration) / 3600)
    let minutes = Math.floor(parseInt(this.props.duration) % 3600 / 60)
    let seconds = Math.floor(parseInt(this.props.duration) % 3600 % 60)
    // let currentTime = <Duration seconds={this.state.duration * (this.state.played)} />
    let progressBar = <ProgressBar
      totalTime={this.state.duration}
      currentTime={this.state.isSeeking ? this.state.seekTime : (this.state.duration * this.state.played)}
      isSeekable={false}
      // onSeek={this.handleSeek}
      // onSeekStart={() => console.log('onSeekStart')}
      // onSeekEnd={this.handleSeekEnd}
      // onIntent={() => console.log('onIntent')}
      // style={{color: 'white', height: '20px', width: '200px', display: 'inline-block', visibility: 'visible'}}
    />
    return(
      <div className='container'>
        <h3><span className="bold-outline">{name}</span></h3>
        <h4>DURATION: {hours > 0 ? `${hours} H` : ""} {minutes > 0 ? `${minutes} MIN` : ""} {seconds > 0 ? `${seconds} SEC` : ""}</h4>
        <div className='row'>
          <div className='player-wrapper none'>
            <ReactPlayer
              ref={this.ref}
              url={this.state.url}
              playing={this.state.playing}
              volume={this.state.volume}
              muted={this.state.muted}
              playbackRate={this.state.playbackRate}
              onReady={this.load}
              onStart={this.start}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onEnded={this.onEnded}
              onProgress={this.onProgress}
              onDuration={duration => this.setState({ duration })}
            />
          </div>
          <div className="player-container">
            <div className="row">
              <div className="twelve columns">
                {progressBar}
              </div>
            </div>
            <div className="row">
              <div className="twelve columns progress-bar">
                <input
                  type='range' min={0} max={1} step='any'
                  value={this.state.played}
                  onMouseDown={this.onSeekMouseDown}
                  onChange={this.onSeekChange}
                  onMouseUp={this.onSeekMouseUp}
                />
              </div>
            </div>
            <div className="row">
              <div className="four columns">
                <button className="circle" onClick={this.stop}><i className="fa fa-stop"></i></button>
              </div>
              <div className="four columns">
                <button className="circle" onClick={this.playPause}>{this.state.playing ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}</button>
              </div>
              <div className="four columns">
                <label className="mute" htmlFor="mute">
                  <input type='checkbox' id="mute" className="hide" checked={this.state.muted} onChange={this.toggleMuted} />{this.state.muted ? <i className="material-icons circle">volume_off</i> : <i className="material-icons circle">volume_up</i> }
                </label>
              </div>
            </div>
            <div className="row">
              <div className="four columns">
                <h4>ELAPSED</h4><Duration seconds={this.state.duration * (this.state.played)} />
              </div>
              <div className="four columns">
                <h4>REMAINING</h4><Duration seconds={this.state.duration * (1 - this.state.played)} />
              </div>
              <div className="four columns">
                  <h4>VOLUME</h4>
                  <input type='range' min={0} max={1} step='any' value={this.state.volume} onChange={this.setVolume} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EpisodeShow;

// <ReactPlayer url={this.props.feedUrl}
//   playing
// />

// "http://feeds.soundcloud.com/stream/273116676-nerd-cast-episode-6-comic-con-review-cpt-hydra-und-die-1.mp3"


// <h2>Controls</h2>
//     <h3>Load</h3>
//     {this.renderLoadButton(this.props.feedUrl, "Load Episode")}
//     <button onClick={this.stop}>Stop</button>
//     <button onClick={this.playPause}>{this.state.playing ? 'Pause' : 'Play'}</button>
//     <label>
//       <input type='checkbox' checked={this.state.muted} onChange={this.toggleMuted} /> Muted
//     </label>
//     <h3>playing</h3>{this.state.playing ? 'true' : 'false'}
//     <h3>volume</h3>{this.state.volume.toFixed(3)}
//     <h3>played</h3>{this.state.played.toFixed(3)}
//     <h3>loaded</h3>{this.state.loaded.toFixed(3)}
//     <h3>duration</h3><Duration seconds={this.state.duration} />
//     <h3>remaining</h3><Duration seconds={this.state.duration * (1 - this.state.played)} />
