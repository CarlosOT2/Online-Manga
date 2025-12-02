//# Components //
import Home from './Components/Home/home'
import Header from './Components/Header/header'
import Search from './Components/Search/search'
import Title from './Components/Title/title'
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
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/title/:id/:name" element={<Title />} />
                </Routes>
            </main>
        </>
    )
}
