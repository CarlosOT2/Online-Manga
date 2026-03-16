//# Components //
import Link from '../Global/link'
import Text from '../Global/text'
import Button from '../Global/Inputs/button'
import Img from '../Global/img'
//# Libs //
import { useWindowScroll } from 'react-use'
//# Classes //
import './header.scss'
//# Icons //
import { FaMagnifyingGlass } from "react-icons/fa6";



export default function Header() {
    //.. Variables //
    const { y } = useWindowScroll()

    //.. Components //
    function Logo() {
        return (
            <Link to={'/'} defaultStyle={false} ariaLabel={'Go to home'}>
                <Img className={'header__logo'} src={'/manga-logo.png'} alt='logo' />
            </Link>
        )
    }

    return (
        <>
            <header className={`header ${y > 0 ? 'header--scroll' : ''}`}>
                <div className={`header__container`}>
                    <nav className={`header__nav`}>
                        <ul>
                            <li>
                                <Logo />
                            </li>
                            <li>
                                <Link to={'/search'} className='header__nav__link'>
                                    SEARCH
                                </Link>
                            </li>
                            <li>
                                <Link to={'/latestupdates'} className='header__nav__link'>
                                    LATEST UPDATES
                                </Link>
                            </li>
                            <li>
                                <Link to={'/recentlyadded'} className='header__nav__link'>
                                    RECENTLY ADDED
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <section className='header__actions'>
                        <Link className='header__actions__login' >
                            <Text tag='span' no_select={true}>
                                Login In
                            </Text>
                        </Link>
                        <Button defaultStyle={false} ariaLabel={'search titles'}>
                            <FaMagnifyingGlass />
                        </Button>
                    </section>
                </div>
            </header>
        </>
    )
}