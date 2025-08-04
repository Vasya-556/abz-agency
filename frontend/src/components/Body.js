import React, {useState} from 'react'
import ImageContainer from './ImageContainer';
import GetRequest from './GetRequest';
import PostRequest from './PostRequest';

function Body() {
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const handlePostSuccess = () => {
    setShouldRefetch(prev => !prev);
  }
  
  return (
    <div className="Body">
      <ImageContainer/>
      <GetRequest refetchTrigger={shouldRefetch} />
      <PostRequest onSuccess={handlePostSuccess} />
        
    </div>
  )
}

export default Body