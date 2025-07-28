import React from 'react'
import ImageContainer from './ImageContainer';
import GetRequest from './GetRequest';
import PostRequest from './PostRequest';

function Body() {
  return (
    <div className="Body">
      <ImageContainer/>
      <GetRequest/>
      <PostRequest/>
        
    </div>
  )
}

export default Body