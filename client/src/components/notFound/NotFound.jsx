import './notFound.css'
import { useSelector } from 'react-redux';


export const NotFound = () => {
    const clase = useSelector(state => state.theme)

    return (
        <div className='notfound'>
            <h3 className={"no-found-" + clase}>Not Found</h3>
        </div>
    );

};