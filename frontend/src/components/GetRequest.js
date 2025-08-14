import React, {useState, useEffect} from 'react'
import photoCover from '../assets/svgs/photo-cover.svg'
import API_BASE from '../utils/api'; 
import Preloader from "./Preloader";
import './GetRequest.css';

function GetRequest({ refetchTrigger }) {
    const [users, setUsers] = useState([]);
    const [links, setLinks] = useState({
        next: null,
        prev: null
    });
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchUsers = async (url, append) => {
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
        fetchUsers(`${API_BASE}/users?page=1&count=6`, false);
    }, [refetchTrigger])

    const showMoreUsers = () => {
        if (!links.next){
            return;
        }
        setIsLoading(true);
        fetchUsers(links.next, true);
    }

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = photoCover;
    };

    const isNextLink = links.next;

  return (
    <div className="get-request">
        <h1 className="text-large">Working with GET request</h1>
        {users.length === 0? <>
            <Preloader/>
        </>: <>
            <div className="cards">
                <div className="card-container">
                    {users.map((user) => (
                        <div key={user.id} className="card">
                            <img 
                                src={user.photo} 
                                alt={`${user.name}'s profile`}
                                onError={handleImageError}
                            ></img>
                            <p className="username text-base">
                                <span className="tooltip">
                                    <span className="truncate">{user.name}</span>
                                    <span className="tooltiptext">{user.name}</span>
                                </span>
                            </p>
                            <p className="user-info text-base">{user.position} <br/>
                            <span className="tooltip">
                                <span className="truncate">{user.email}</span>
                                <span className="tooltiptext">{user.email}</span>
                            </span>
                            {user.phone}</p>
                        </div>
                    ))}
                </div>
            </div>
            {isNextLink && <button onClick={showMoreUsers} className="button">Show more</button>}
        {isLoading&& <Preloader/>}
        </>}
    </div>
  )
}

export default GetRequest