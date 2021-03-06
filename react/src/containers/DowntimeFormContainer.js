import React, { Component } from 'react';
import TextField from '../components/TextField';
import Select from '../components/Select';
import { browserHistory, Link } from 'react-router';

class DowntimeFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      user: {},
      startTime: '',
      endTime: '',
      name: '',
      genres: ["Arts", "Comedy", "Education", "Kids & Family", "Health", "TV & Film", "Music", "News & Politics", "Religion & Spirituality",
              "Science & Medicine", "Sports & Recreation", "Technology", "Business", "Game & Hobbies", "Society & Culture", "Government & Organizations"],
      genreSelected: '',
      categories: [],
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      setAll: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleDayCheckboxChange = this.handleDayCheckboxChange.bind(this)
    this.handleAllCheckboxChange = this.handleAllCheckboxChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClearForm(event) {
  event.preventDefault();
  this.setState({
    errors: {},
    startTime: '',
    endTime: '',
    name: '',
    genreSelected: ''
  })
}

  handleFormSubmit(event) {
    event.preventDefault();
    let days = {
      sunday: this.state.sunday,
      monday: this.state.monday,
      tuesday: this.state.tuesday,
      wednesday: this.state.wednesday,
      thursday: this.state.thursday,
      friday: this.state.friday,
      saturday: this.state.saturday
    }
    let formPayload = {
      name: this.state.name,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      genreSelected: this.state.genreSelected,
      days: days
    }
    fetch(`/api/v1/users/${this.state.user.id}/downtimes`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(formPayload)
    }).then(response => response.json())
    this.handleClearForm(event);
    browserHistory.push('/downtimes')
  }

  handleDayCheckboxChange(event) {
    this.setState({ [event.target.name]: !this.state[event.target.name] })
  }

  handleAllCheckboxChange(event) {
    this.handleDayCheckboxChange(event)
    if(!this.state.setAll){
      this.setState({
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
      })
    } else {
      this.setState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      })
    }
  }

  componentDidMount() {
    fetch(`/api/v1/categories/`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(responseBody => {
      let categories = []
      responseBody.categories.forEach((category) => {
        categories.push(category.name)
      })
      this.setState({
        categories: categories,
        user: responseBody.user
      })
    })
  }

  render() {
    return(
      <div>
        <div className='sub-container'>
        </div>
        <div className='sub-header'>
          NEW DOWNTIME
        </div>
        <div className='container homepage'>
          <form onSubmit={this.handleFormSubmit}>
            <div className='row'>
              <div className='six columns'>
                  <TextField
                    content={this.state.startTime}
                    label='Start Time'
                    name='startTime'
                    handlerFunction={this.handleInputChange}
                  />
              </div>
              <div className='six columns'>
                  <TextField
                    content={this.state.endTime}
                    label='End Time'
                    name='endTime'
                    handlerFunction={this.handleInputChange}
                  />
              </div>
            </div>
            <div className='row'>
              <div className='six columns'>
                <TextField
                  content={this.state.name}
                  label='Name'
                  name='name'
                  handlerFunction={this.handleInputChange}
                />
              </div>
              <div className='six columns'>
                <Select
                  handlerFunction={this.handleInputChange}
                  name='genreSelected'
                  label='Genre'
                  options={this.state.categories}
                  selectedOption={this.state.genreSelected}
                />
              </div>
            </div>
            <div className='row'>
              <div className='six columns'>
                <label>
                  <input
                    name="setAll"
                    type="checkbox"
                    checked={this.state.setAll}
                    onChange={this.handleAllCheckboxChange}
                  /> All
                </label>
                <span className="label-body"><label>
                  <input
                    name="sunday"
                    type="checkbox"
                    checked={this.state.sunday}
                    onChange={this.handleDayCheckboxChange}
                  /> Sunday
                </label></span>
                <span className="label-body"><label>
                  <input
                    name="monday"
                    type="checkbox"
                    checked={this.state.monday}
                    onChange={this.handleDayCheckboxChange}
                  /> Monday
                </label></span>
              <span className="label-body"><label>
                  <input
                    name="tuesday"
                    type="checkbox"
                    checked={this.state.tuesday}
                    onChange={this.handleDayCheckboxChange}
                  /> Tuesday
                </label></span>
                <span className="label-body"><label>
                  <input
                    name="wednesday"
                    type="checkbox"
                    checked={this.state.wednesday}
                    onChange={this.handleDayCheckboxChange}
                  /> Wednesday
                </label></span>
                <span className="label-body"><label>
                  <input
                    name="thursday"
                    type="checkbox"
                    checked={this.state.thursday}
                    onChange={this.handleDayCheckboxChange}
                  /> Thursday
                </label></span>
                <span className="label-body"><label>
                  <input
                    name="friday"
                    type="checkbox"
                    checked={this.state.friday}
                    onChange={this.handleDayCheckboxChange}
                  /> Friday
                </label></span>
                <span className="label-body"><label>
                  <input
                    name="saturday"
                    type="checkbox"
                    checked={this.state.saturday}
                    onChange={this.handleDayCheckboxChange}
                  /> Saturday
                </label></span>
              </div>
            </div>
            <input className="button" type="submit" value="Submit" />
          </form>
          <div className="button" onClick={browserHistory.goBack} >
            Back
          </div>
        </div>
      </div>
    )
  }
}

export default DowntimeFormContainer;
