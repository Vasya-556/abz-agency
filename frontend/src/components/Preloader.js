import React from 'react'
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'

function Preloader() {
  return (
    <div className="Preloader">
        <Ring
            size="40"
            stroke="5"
            bgOpacity="0"
            speed="2"
            color="var(--secondary)"
        />
    </div>
  )
}

export default Preloader