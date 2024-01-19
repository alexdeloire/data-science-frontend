import {Link} from "react-router-dom";
import NuageDeMot from "./NuageDeMot";

const Home = () => {

    return (
        <div className="home-container">
        <h1>
           Bienvenue sur le site du projet Data Science de l'année 2023-2024.
        
        </h1>
        <h3>
            Ce site a pour but de présenter les résultats de l'analyse des retours textuels des anciens élèves de Polytech.
        </h3>
        

            <div>
                WARNING: Le reseau Polytech étant HS, le site est déployé sur un service <b>gratuit</b>.
            </div>
            <div>
             Ainsi, il est possible que le site soit lent pour le premier chargement (Cold start). Merci d'etre <b>patient</b> !
            </div>
        </div>
    )
}

export default Home