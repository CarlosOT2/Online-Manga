//# Components //
import Home from './Components/Home/home'
import Header from './Components/Header/header'
import Title from './Components/Manga/title'
//# Libs //
import { Routes, Route } from 'react-router'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
//# Classes //
import './App.scss'

/**
 * **Takes user to top of the page whenever URL is changed**
 *
 * @returns {null} 
 */
function ScrollToTop() {
    const location = useLocation();
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [location.pathname])
    return null
}

export default function App() {
    return (
        <>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/title/:id/:name" element={<Title />} />
            </Routes>
        </>
    )
}
