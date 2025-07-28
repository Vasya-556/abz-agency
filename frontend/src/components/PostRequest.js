import React from 'react'

function PostRequest() {
  return (
    <div className="PostRequest">
        <h1>Working with post request</h1>
        <div className="PostRequest-container">
          <input className="input" placeHolder="Your name"></input>
          <input className="input" placeHolder="Email"></input>
          <input className="input" placeHolder="Phone"></input>
          <p>+38 (XXX) XXX - XX - XX</p>
          <div className="PostReguest-radioButtons">
            <div className="radio-group">
              <input defaultChecked id="frontend" type="radio" name="role"></input>
              <label for="frontend">frontend</label>
            </div>
            <div className="radio-group">
              <input id="backend" type="radio" name="role"></input>
              <label for="backend">backend</label>
            </div>
            <div className="radio-group">
              <input id="designer" type="radio" name="role"></input>
              <label for="designer">designer</label>
            </div>
            <div className="radio-group">
              <input id="QA" type="radio" name="role"></input>
              <label for="QA">QA</label>
            </div>
          </div>
          <input className="input-file" type="file"></input>
        </div>
        <div className="PostRequest-button">
          <button className="button-gray">Sign up</button>
        </div>
    </div>
  )
}

export default PostRequest