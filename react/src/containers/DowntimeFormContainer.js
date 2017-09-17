import React, { Component } from 'react';
import TextField from '../components/TextField';

class FormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      startTime: '',
      endTime: '',
      name: '',
      categories: ['Design', 'Fashion & Beauty', 'Food', 'Literature', 'Performing Arts', 'Visual Arts',
                  'Business News', 'Careers', 'Investing', 'Management & Marketing', 'Shopping', ]

    }
  }

  render() {
    return(
      <form onSubmit={}>
        <TextField
          content={this.state.startTime}
          label='Start Time'
          name='startTime'
          handlerFunction={this.handleInputChange}
        />
        <TextField
          content={this.start.endTime}
          label='End Time'
          name='endTime'
          handlerFunction={this.handleInputChange}
        />
        <TextField
          content={this.start.name}
          label='Name'
          name='name'
          handlerFunction={this.handleInputChange}
        />

    )
  }
}
