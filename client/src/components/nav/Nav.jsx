import './nav.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGames, themeChange } from '../../redux/action/';




export function Nav() {
    
    const clase = useSelector(state => state.theme)
    const dispatch = useDispatch();

    const handleTheme = () => {
        if(clase === 'dark') {
            dispatch(themeChange('light'));
        } else {
            dispatch(themeChange('dark'));
        }
    }

    let stringTheme = "It's a light theme!";
    if (clase === "dark") {
        stringTheme = "It's a dark theme!";
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getGames());
    }

    return (

        <div className={'conteiner-general-' + clase}> 
        <div className={'conteiner-ul-' + clase}>
                                <ul className={'ul-' + clase}> 
                                    <li className={'li-' + clase}><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to= '/home' className='link'
                                    
                                    >Home</Link></li>
                                    <li className={'li-' + clase}><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to= '/create' className='link'>Create</Link></li>
                                    <li className={'li-' + clase}><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to= '/about' className='link'>About</Link></li>
                                </ul>
                </div>
                <div className={'conteiner-switch-' + clase}>   
                        <input type='checkbox' 
                        id='switch' 
                        onClick={()=> handleTheme()}>                    
                        </input>
                        <label id={'label-' + clase} htmlFor='switch' className={'checkbox-' + clase}></label>
                        <h4 className={'h4-' + clase}>{stringTheme}</h4>
                </div>
        </div>
    )
}