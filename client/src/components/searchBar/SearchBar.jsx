import './searchBar.css';
import { useSelector } from "react-redux";
import {  getGameName } from "../../redux/action";
import { useDispatch } from "react-redux";
import { useState } from "react";


export function SearchBar() {
    const clase= useSelector(store => store.theme);
    const dispatch = useDispatch();
    // const [order, setOrder] = useState('');
    
    /* Buscar por nombre
    ------------------------------------------------------*/
    const [name, setName] = useState('');

    function handleSearch(e) {
        e.preventDefault();
        dispatch(getGameName(name));
    }

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }
    /*Fin Buscar por nombre
    ------------------------------------------------------*/


    return (
        <div className={'conteiner-search-' + clase}>
            <div className={'conteiner-select-' + clase}>
                {/* <h5 className={'h5-' + clase}>Filter by:</h5> */}
                {/* <select className={'select-' + clase} >
                    <option value= '' disabled>Genre</option>
                    <option value='all'>All Genres</option>
                </select> */}
                {/* <select className={'select-' + clase}>
                    <option value= '' disabled>Platforms</option>
                    <option value='all'>All Platforms</option>
                </select> */}
                {/* <select className={'select-' + clase} >
                    <option value= '' disabled>Type</option>
                    <option value= 'all'>All Types</option>
                    <option value= 'created'>Created</option>
                    <option value= 'existing'>Existing</option>
                </select> */}
            </div>
            <div className={'conteiner-select-' + clase}>
                {/* <h5 className={'h5-' + clase}>Order by:</h5> */}
                {/* <select className={'select-' + clase} >
                    <option value= '' disabled>Name</option>
                    <option value= 'asc'>A - Z</option>
                    <option value= 'desc'>Z - A</option>
                </select> */}
                {/* <select className={'select-' + clase}>
                    <option value= '' disabled>Rating</option>
                    <option value= 'best rating'>Best Rating</option>
                    <option value= 'worst rating'>Worst Rating</option>
                </select> */}
                {/* <select className={'select-' + clase}>
                    <option value= '' disabled>Released</option>
                    <option value= 'best released'>Best Released</option>
                    <option value= 'worst released'>Worst Released</option>
                </select> */}
            </div>
            
                <div>
	                <form className={'form-search-' + clase} action="" method="">		    
		                <input className={'imput-search-' + clase} 
                        type="text" 
                        placeholder="Search Game"
                        onChange={(e) => handleInputChange(e)}
                        >
                        </input>	
                        
		                <button className={'button-search-' + clase} 
                        type="submit"
                        onClick={(e) => handleSearch(e)}
                        >
                        Search
                        </button>
	                </form>
                </div>
        </div>
    )
}