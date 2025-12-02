//# Components //
import Text from '../Global/text'
import Link from '../Global/link'
import Input from '../Global/input'
import Button from '../Global/button'
//# Utils //
import { InitInputsController } from '../../Utils/InputsController'
//# Classes //
import './search.scss'
//# Icons //
import { IoMdArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default function Search() {
    const { InputsController, InputsData } = InitInputsController()

    console.log(InputsData)

    return (
        <main className='search'>
            <div className='search__container-title'>
                <Link to='/' className='search__container-title-link'>
                    <IoMdArrowBack size={25} />
                </Link>
                <Text tag='h2' title={true} className='search__container-title-txt'>
                    Search
                </Text>
            </div>
            <section className='search__inputs'>
                <form>
                    <Input
                        type='text'
                        name='name'
                        className='search__inputs-text'
                        autoComplete='off'
                        InputsController={InputsController}
                    />
                    <Button className='search__inputs-button'>
                        <IoIosArrowDown size={20} color='var(--color1)' />
                        <Text tag='span' className='search__inputs-button-txt'>
                            Show Filters
                        </Text>
                    </Button>
                </form>
            </section>
        </main>
    )
}