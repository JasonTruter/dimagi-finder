import React from "react";
import "./Form.css";

export default function Form({ onSubmit, fields, buttonText, extraComponent }) {
  return (
    <div className="update-form">
      <form onSubmit={onSubmit}>
        {fields.map((field) => (
          <div className="form-field">
            <label htmlFor={field}>{field}</label>
            <input className="form-input" type="text" name={field}></input>
          </div>
        ))}
        {extraComponent && (
          <div className="form-field">
            <label htmlFor={extraComponent.field}>{extraComponent.field}</label>
            {extraComponent.component}
          </div>
        )}
        <button className="submit-button" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
