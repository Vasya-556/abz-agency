import React, {useState, useEffect} from 'react'
import photoCover from '../assets/photo-cover.svg'
import API_BASE from '../utils/api'; 
import Preloader from "./Preloader";

function GetRequest({ refetchTrigger }) {
    const [users, setUsers] = useState([]);
    const [links, setLinks] = useState({
        next: null,
        prev: null
    });
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_BASE}/users?page=1&count=6`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUsers(data.users);
                setLinks({
                    next: data.links.next_url || null,
                    prev: data.links.prev_url || null
                })
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [refetchTrigger])

    const ShowMoreUsers = () => {
        if (!links.next){
            return;
        }
        setIsLoading(true);
        fetch(links.next)
            .then((res) =>{
                return res.json();
            })
            .then((data) => {
                if (!data.success){
                    return;
                }
                setUsers(prevUsers => [...prevUsers, ...data.users]);
                setLinks({
                    next: data.links?.next_url || null,
                    prev: data.links?.prev_url || null
                })
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

  const isNextLink = links.next;

  return (
    <div className="GetRequest">
        <h1>Working with GET request</h1>
        {users.length === 0? <>
            <Preloader/>
        </>: <>
            <div className="Cards">
                <div className="Card-container">
                    {users.map((user) => (
                        <div key={user.id} className="Card">
                            <img 
                                src={user.photo} 
                                alt=""
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = photoCover;
                                }}
                            ></img>
                            <p>
                                <span className="tooltip">
                                    <span className="truncate">{user.name}</span>
                                    <span className="tooltiptext">{user.name}</span>
                                </span>
                            </p>
                            <p>{user.position} <br/>
                            <span className="tooltip">
                                <span className="truncate">{user.email}</span>
                                <span className="tooltiptext">{user.email}</span>
                            </span><br/>
                            {user.phone}</p>
                        </div>
                    ))}
                </div>
            </div>
            {isNextLink && <button onClick={ShowMoreUsers} className="button">Show more</button>}
        {isLoading&& <Preloader/>}
        </>}
    </div>
  )
}

export default GetRequest