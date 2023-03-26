import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = () => {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        const response = await axios.get('http://45.136.70.211:3000/users/me', {
            withCredentials: true
        })

        setUser(response.data);
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>Welcome, {user} </div>
    )
}

export default Dashboard