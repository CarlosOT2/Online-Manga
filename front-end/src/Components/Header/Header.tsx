//# Components //
import Link from '../Global/link'
//# Classes //
import './Header.scss'

export default function Header() {
    // Melhorar o titulo, mas acredito que cat manga seria um bom nome e fica do lado da logo
    return (
        <>
            <header className='header'>
                <nav className='header__nav'>
                    <img className='header__logo' src='public/manga-logo.jpg'></img>
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
                <div className='header__login'>

                </div>
            </header>
        </>
    )
}