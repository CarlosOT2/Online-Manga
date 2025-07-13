//# Components //
import Link from '../Global/link'
import Text from '../Global/text'
//# Classes //
import './Header.scss'
//# Icons //
import { IoPersonSharp } from 'react-icons/io5';

export default function Header() {
    // Melhorar o titulo, mas acredito que cat manga seria um bom nome e fica do lado da logo
    return (
        <>
            <header className='header'>
                <nav className='header__nav'>
                    <Link to={'/'} defaultStyle={false}>
                        <img className='header__logo' src='public/manga-logo.jpg'></img>
                    </Link>
                    <Link>
                        POPULARES
                    </Link>
                    <Link>
                        CATEGORIAS
                    </Link>
                    <Link>
                        ADICIONADOS
                    </Link>
                    <Link>
                        PESQUISA
                    </Link>
                </nav>
                <Link className='header__login-link' defaultStyle={false}>
                    <IoPersonSharp className='header__login-icon' size={40} />
                    <Text tag='span' className='header__login-txt'>
                        Login In
                    </Text>

                </Link>
            </header>
        </>
    )
}