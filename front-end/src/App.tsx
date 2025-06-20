//# Components //
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'
//# Libs //
import { Routes, Route } from 'react-router'
//# Classes //
import './App.scss'

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    )
}
