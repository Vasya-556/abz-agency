import React from 'react'
import backgroundImage from '../assets/pexels-alexandr-podvalny-1227513.jpeg';

function ImageContainer() {
  return (
    <div className="ImageContainer">
        <img className="Image" src={backgroundImage} alt=""></img>
        <div className="ImageText">
            <h1>Test assignment for front-end developer</h1>
            <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
            <button className="button">Sign up</button>
        </div>
    </div>
  )
}

export default ImageContainer