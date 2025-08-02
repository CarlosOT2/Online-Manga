//# Components //
import Link from '../Global/link'
import Text from '../Global/text'
//# Libs //
import { useWindowScroll } from 'react-use'
//# Classes //
import './header.scss'
//# Icons //
import { IoPersonSharp } from 'react-icons/io5'

export default function Header() {
    const { y } = useWindowScroll()

    return (
        <>
            <header className={`header ${y > 0 ? 'header--scroll' : ''}`}>
                <nav className={`header__nav`}>
                    <Link to={'/'} defaultStyle={false}>
                        <img className='header__logo' src='../../../public/manga-logo.png'></img>
                    </Link>
                    <Link className='header__nav__link'>
                        SEARCH
                    </Link>
                    <Link className='header__nav__link'>
                        LATEST UPDATES
                    </Link>
                    <Link className='header__nav__link'>
                        RECENTLY ADDED
                    </Link>
                </nav>
                <Link className='header__login-link' >
                    <IoPersonSharp className='header__login-icon' size={35} />
                    <Text tag='span' className='header__login-txt'>
                        Login In
                    </Text>

                </Link>
            </header>
        </>
    )
}