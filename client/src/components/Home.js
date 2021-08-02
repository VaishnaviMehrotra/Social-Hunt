import React from 'react';
import "../style/Home.css";
import CenterBar from './CenterBar';
import AppBar from './AppBar';

export default function Home() {
    return (
        <div>
            <AppBar/>
            <CenterBar/>
        </div>
    )
}