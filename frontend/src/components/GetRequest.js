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
    
    const fetch_users = async (url, append) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (append) {
                setUsers(prev => [...prev, ...data.users]);  
            } else {
                setUsers(data.users);  
            }
            setLinks({
                next: data.links.next_url || null,
                prev: data.links.prev_url || null
            })
        } catch (error) {
            console.error("Error fetching users: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetch_users(`${API_BASE}/users?page=1&count=6`, false);
    }, [refetchTrigger])

    const ShowMoreUsers = () => {
        if (!links.next){
            return;
        }
        setIsLoading(true);
        fetch_users(links.next, true);
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