//# Components //
import Img from '../Global/img'
//# Classes //
import './popular.scss'

export default function Popular() {
    return (
        <>
            <div className='home-popular'>
                <div className='home-popular__container'>
                    <Img className={'home-popular__container__template-img'} src={`public/manga-teste.jpg`} />
                </div>
                
            </div>
        </>
    )
}