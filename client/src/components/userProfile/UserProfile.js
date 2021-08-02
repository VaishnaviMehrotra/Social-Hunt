import React from 'react'
import Info from './Info'
import AppBar from '../AppBar'
import CenterBar from './CenterBar'
const UserProfile = () => {
    return (
        <div className="profile">
            <AppBar/>
            <Info />
            <div className="profile_tab">
                <button >All Posts</button>
            </div>
            <CenterBar/>
        </div>
    )
}
export default UserProfile;