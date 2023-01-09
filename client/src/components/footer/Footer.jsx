import './footer.css';
import { useSelector } from "react-redux";

export const Footer = () => {
    const clase= useSelector(store => store.theme);

    return (
        
            <div className={'conteiner-general-footer-' + clase}>
                <div className={'conteiner-footer-' + clase}>
                    <div className={'footer-title-' + clase}>
                    </div>
                        <div className={'conteiner-span-' + clase}>
                            <br/>
                            Copyright &copy; 2023 All Rights Reserved by Victor Pinto
                        </div>
                    </div>

            </div>
    )
}
