import { useDispatch, useSelector } from "react-redux";
import { cleanAllFilters, changeGenresFilter, changeNameOrder, changePlatformsFilter, changeRatingOrder, changeTypeFilter, changeUseFilter } from "../../redux/action";
import './setFilters.css'

export const SetFilters = () => {  

    const dispatch = useDispatch();
    const genresFilter = useSelector(state => state.genresFilter);
    const platformsFilter = useSelector(state => state.platformsFilter);
    const typeFilter = useSelector(state => state.typeFilter);
    const nameOrder = useSelector(state => state.nameOrder);
    const ratingOrder = useSelector(state => state.ratingOrder);
    const useFilter = useSelector(state => state.useFilter);

    if(!genresFilter.length && !platformsFilter.length && !typeFilter.length && !nameOrder.length && !ratingOrder.length && useFilter)  dispatch(changeUseFilter(false))
    
    const handleResetAll = () => {
        dispatch(cleanAllFilters());
    }

    const handleResetGenres = () => {
        if(genresFilter !== '') dispatch(changeGenresFilter(''));
    };

    const handleResetPlatforms = () => {
        if(platformsFilter !== '') dispatch(changePlatformsFilter(''));
    };

    const handleResetType = () => {
        if(typeFilter !== '') dispatch(changeTypeFilter(''));
    };

    const handleResetName = () => {
        if(nameOrder !== '') dispatch(changeNameOrder(''));
    };

    const handleResetRaiting = () => {
        if(ratingOrder !== '') dispatch(changeRatingOrder(''));
    };

    return (
        <>
            <br />          
            <button className="butR" onClick={handleResetAll}>Reset</button>   
            {
                genresFilter.length !== 0 && <button className="butF" onClick= {handleResetGenres}>Genre: {genresFilter}</button>
                
            }
            {
                platformsFilter.length !== 0 && <button className="butF" onClick= {handleResetPlatforms}>Platforms: {platformsFilter}</button>
                
            }
            {           
                typeFilter.length !== 0  && <button className="butF" onClick={handleResetType}>Type: {typeFilter}</button>
                
            }
            {           
                nameOrder.length !== 0 && <button className="butF" onClick={handleResetName}>Name: {nameOrder}</button>
                
            }
            {           
                ratingOrder.length !== 0 && <button className="butF" onClick={handleResetRaiting}>Rating: {ratingOrder}</button>
            }
        </>
    )

};