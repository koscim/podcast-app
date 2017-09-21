import React from 'react';

const TextField = props => {
  return (
    <label className="white-text">
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
