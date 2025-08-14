import React from 'react'
import backgroundImage from '../assets/images/pexels-alexandr-podvalny-1227513.jpeg';
import './ImageContainer.css';

function ImageContainer() {
  return (
    <div className="image-container">
        <img className="image-container-image" src={backgroundImage} alt="pexels-alexandr-podvalny-1227513.jpeg"></img>
        <div className="image-container-text-block">
          <div className="image-container-text">
            <h1 className="text-large">Test assignment for front-end developer</h1>
            <p className="text-base">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
          </div>
            <button className="button"
            onClick={() => {
              const element = document.querySelector('.PostRequest');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            >Sign up</button>
        </div>
    </div>
  )
}

export default ImageContainer