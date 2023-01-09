import React from "react";
import "./paginate.css";
import { useSelector } from "react-redux";

export const Paginate = ({ gamesPerPage, currentPage, allGames, paginate }) => {
    const clase= useSelector(store => store.theme);// accede al estado de redux useSelector 

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {// ceil redondea hacia arriba
        pageNumbers.push(i);
    }

    return (
        <div className={"container-pagination-" + clase} >
        <nav className={"nav-container-" + clase}>
            <ul className={"pagination-" + clase}>
                {pageNumbers.map(number => (
                    <li onClick={() => paginate(number)} key={number} className={"page-iten-" + clase
                    + (currentPage === number ? '-active' : '')}>
                        <span>{number}</span>
                    </li>
                ))}
            </ul>
        </nav>
        </div>
    );
};

