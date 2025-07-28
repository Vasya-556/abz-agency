import React from 'react'
import photoCover from '../assets/photo-cover.svg'

function GetRequest() {
  return (
    <div className="GetRequest">
        <h1>Working with GET request</h1>
        <div className="Cards">
            <div className="CardLine">
                <div className="Card">
                    <img src={photoCover} alt=""></img>
                    <p>{"Takamaru Ayako Jurrien"}</p>
                    <p>{`Lead Independent Director
                    Takamuru@gmail.com
                    +38 (098) 278 90 24`}</p>
                </div>
                <div className="Card">
                    <img src={photoCover} alt=""></img>
                    <p>{"Takamaru Ayako Jurrien"}</p>
                    <p>{`Lead Independent Director
                    Takamuru@gmail.com
                    +38 (098) 278 90 24`}</p>
                </div>
                <div className="Card">
                    <img src={photoCover} alt=""></img>
                    <p>{"Takamaru Ayako Jurrien"}</p>
                    <p>{`Lead Independent Director
                    Takamuru@gmail.com
                    +38 (098) 278 90 24`}</p>
                </div>
            </div>
            <div className="CardLine">
                <div className="Card">
                    <img src={photoCover} alt=""></img>
                    <p>{"Takamaru Ayako Jurrien"}</p>
                    <p>{`Lead Independent Director
                    Takamuru@gmail.com
                    +38 (098) 278 90 24`}</p>
                </div>
                <div className="Card">
                    <img src={photoCover} alt=""></img>
                    <p>{"Takamaru Ayako Jurrien"}</p>
                    <p>{`Lead Independent Director
                    Takamuru@gmail.com
                    +38 (098) 278 90 24`}</p>
                </div>
                <div className="Card">
                    <img src={photoCover} alt=""></img>
                    <p>{"Takamaru Ayako Jurrien"}</p>
                    <p>{`Lead Independent Director
                    Takamuru@gmail.com
                    +38 (098) 278 90 24`}</p>
                </div>
            </div>
        </div>
        <button className="button">Show more</button>
    </div>
  )
}

export default GetRequest