import "./footer.css";
import { useSelector } from "react-redux";
import LinkedIn from "../../img/linkedin.png";
import Instagram from "../../img/instagram.png";
import gmail from "../../img/gmail.png";
import GitHub from "../../img/github.png";

export const Footer = () => {
  const clase = useSelector((store) => store.theme);

  return (
    <div className={"conteiner-general-footer-" + clase}>
      <div className={"conteiner-footer-" + clase}>
        <div className={"footer-title-" + clase}></div>
        <div className={"conteiner-span-" + clase}>
            <div className="footer-redes">
          <br />
          <a
            href="https://github.com/victorwake"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="logos-redes" src={GitHub} alt="GitHub"></img>
          </a>
          <a
            href="https://www.linkedin.com/in/victor-pinto-fullstack/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="logos-redes" src={LinkedIn} alt="LinkedIn"></img>
          </a>
          <a
            href="https://www.instagram.com/victorwake/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="logos-redes" src={Instagram} alt="Instagram"></img>
          </a>
          <a href="mailto:victorpintowake@gmail.com">
            <img className="logos-redes" src={gmail} alt="gmail"></img>
          </a>
            </div>
          <br />
          Copyright &copy; 2023 All Rights Reserved by Victor Pinto
        </div>
      </div>
    </div>
  );
};
