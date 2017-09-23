import React, { Component } from 'react';
import TextField from '../components/TextField';
import Select from '../components/Select';

class EditDowntimeFormContainer extends Component {
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
    fetch(`/api/v1/users/${this.state.user.id}/downtimes/${this.props.params.id}`, {
      method: 'PATCH',
      credentials: 'same-origin',
      body: JSON.stringify(formPayload)
    }).then(response => response.json())
    this.handleClearForm(event);
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
    debugger;
    fetch(`/api/v1/users/`, {
      credentials: 'same-origin'
    }).then(response => response.json())
    .then(responseBody => {
      this.setState({
        user: responseBody.current_user
      })
    })
    .catch((thing) => console.log("so sad"))
  }

  render() {
    return(
      <div className='form-tile container'>
        <h1>Edit Downtime</h1>
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
                options={this.state.genres}
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
      </div>


    )
  }
}

export default EditDowntimeFormContainer;

// genres: ['Design', 'Fashion & Beauty', 'Food', 'Literature', 'Performing Arts', 'Visual Arts',
//             'Business News', 'Careers', 'Investing', 'Management & Marketing', 'Shopping', ],