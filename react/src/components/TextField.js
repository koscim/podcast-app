import React from 'react';

const TextField = props => {
  return (
    <label className="white-text form-center">
      {props.label}
      <input
        name={props.name}
        onChange={props.handlerFunction}
        type="text"
        value={props.content}
        className="shorter-field"
      />
    </label>
  );
}

export default TextField;
