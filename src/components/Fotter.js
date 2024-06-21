import React from "react";
import Github from '../Images/Github.png';
import linkedin from '../Images/linkedin.png';
import instagram from '../Images/instagram.jpeg';
import "../css/Fotter.css";
export default function Fotter(){
    return(
        <footer className="main">
        <div className="social-links">
          <a href="https://github.com/vishvawagh"><img src={Github}  alt=" Links"></img> </a>
          <a href="https://www.instagram.com/vishvawagh453/"> <img src={instagram} alt=" Links"/></a>
          <a href="https://www.linkedin.com/in/vishvachaitanya-wagh-892573246/" > <img src={linkedin} alt=" Links"/></a> 
          <b> <h4 className="label"> <i>&copy; 2024 Vishva Wagh </i></h4></b>
           </div>        
         </footer>
    )
}