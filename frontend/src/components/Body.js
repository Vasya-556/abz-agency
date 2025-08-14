import React, {useState} from 'react'
import ImageContainer from './ImageContainer';
import GetRequest from './GetRequest';
import PostRequest from './PostRequest';
import Header from './Header';
import './Body.css';

function Body() {
  const [shouldRefetch, setShouldRefetch] = useState(false);
  
  return (
    <>
      <Header/>
      <div className="body-container">
        <ImageContainer/>
        <GetRequest refetchTrigger={shouldRefetch} />
        <PostRequest onSuccess={() => setShouldRefetch(v => !v)} />
      </div>
        
    </>
  )
}

export default Body