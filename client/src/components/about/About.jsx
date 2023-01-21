import './about.css';
import { useSelector } from "react-redux";
// import { Footer } from '../footer/Footer';
import { Nav } from '../nav/Nav';


export const About = () => {
    const clase= useSelector(store => store.theme);

    return (
        <div>
        <div className={'conteiner-general-about-' + clase}>
            <Nav />
        <div className={'conteiner-general-center-' + clase} >
        <div className={'conteiner-about-' + clase}>
            <div className={'about-title-' + clase}>
                    <h2>About this App</h2>
            </div>
                    <div>
                            <img className={'about-image-' + clase} src='https://assets.soyhenry.com/logoOG.png' alt=''/>
                    </div>
                    <div className={'conteiner-span-' + clase}>
                    <span className={'span-' + clase}>
                        Esta SPA (Single Page Application) se desarrolló como parte del cursado de la carrera de Full Stack Developer en “Soy Henry”, en la etapa de Proyecto Individual.
                        Su objetivo es el desarrollo de una aplicación web que consume datos de una API externa y consultas a la base de datos propia.
                        <br/>
                        Características:<br/>
                        - Paginado<br/>
                        - Filtros acumulativos <br/>
                        - Ordenamientos ascendentes y descendentes<br/>
                        - Páginas con información detallada<br/>
                        - Búsqueda por nombre<br/>
                        - Formulario controlado para la creación de nuevos videojuegos<br/>
                        <br/>
                        Tecnologías empleadas:<br/>
                        - Lenguaje: JavaScript<br/>
                        - Data Base: PostgreSQL<br/>
                        - Back-End: nodeJS, ExpressJS, Sequelize<br/>
                        - Front-End: React, Redux, CSS puro<br/>
                        - Control de versiones: Git/GitHub<br/>
                        <br/>
                        Realizado por: Victor Pinto
                    </span>
                    </div>
                </div>
                

        </div>  
                <div className="footer-about">

                </div>
        </div>
        </div>

    )
}