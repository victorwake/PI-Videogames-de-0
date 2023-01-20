import React from "react";
import "./pagination.css";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentPage } from "../../redux/action";

export const Pagination = ({ games, gamesPerPage }) => {
    const clase= useSelector(store => store.theme);
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage)

    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(games / gamesPerPage); i++) { 
        pageNumber.push(i)
    }

    const handlePage = num => {
        if (currentPage !== num) dispatch(changeCurrentPage(num))
    }

    const handlePreviousPage = () => {
        if(currentPage > 1) {
            dispatch(changeCurrentPage(currentPage - 1))
        }
    }

    const handleNextPage = () => {
        if(currentPage < pageNumber.length) {
            dispatch(changeCurrentPage(currentPage + 1))
        }
    }

    return (
        <div className={"container-pagination-" + clase} >
        <nav className={"nav-container-" + clase}>
        
            <ul className={"pagination-" + clase}>
            <li className={"page-iten-" + clase} onClick={handlePreviousPage}>◄</li>
                {
                pageNumber?.map(num => 
                    <li className={"page-iten-" + clase + (currentPage === num  ? '-active' : '')} key={num} onClick={() =>handlePage(num)}>
                        <span>{num}</span>
                    </li>
                )}
                <li className={"page-iten-" + clase} onClick={handleNextPage}>►</li>
            </ul>
            
        </nav>
        </div>
    );
};

