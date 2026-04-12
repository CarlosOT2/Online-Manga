//# Components //
import Home from './Components/Home/home'
import Header from './Components/Header/header'

import Title from './Components/Title/title'

import TitlesWrapper from './Components/Titles/wrapper'
import Search from './Components/Titles/search'
import LatestUpdates from './Components/Titles/latestupdates'
import RecentlyAdded from './Components/Titles/recentlyadded'

//# Libs //
import { Routes, Route } from 'react-router'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
//# Classes //
import './App.scss'

/**
 * **Section title displayed at the top of each /titles route.**
 */
const TitlesWrapperText: Record<string, string> = {
    search: "Search",
    recentlyadded: "Recently Added",
    latestupdates: "Latest Updates",
}

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
                    <Route path="/title/:id/:name" element={<Title />} />
                    <Route path="/titles/" element={<Title />} />

                    <Route path="/titles" element={<TitlesWrapper titles={TitlesWrapperText} />}>
                        <Route path="search" element={<Search />} />
                        <Route path="recentlyadded" element={<RecentlyAdded />} />
                        <Route path="latestupdates" element={<LatestUpdates />} />
                    </Route>
                </Routes>
            </main>
        </>
    )
}
