import React from 'react'
import Info from './Info'
import AppBar from '../AppBar'
import CenterBar from './CenterBar'
const Profile = () => {
    return (
        <div className="profile">
            <AppBar/>
            <Info />
            <div className="profile_tab">
                <button >Your Posts</button>
            </div>
            <CenterBar/>
        </div>
    )
}
export default Profile;