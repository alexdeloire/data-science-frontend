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
            <div style= {{marginTop: "20px"}}>
                Description des onglets:
            </div>
            <ul>
                <li style={{marginTop: "10px"}}>
                    <b>Dashboard</b> : Graphiques sur l'ensemble des données. Permet de vérifier la cohérence des résultats obtenus.
                </li>
                <li style={{marginTop: "10px"}}>
                    <b>Classification</b> : K-means sur les données pour identifier les clusters.
                </li>
                <li style={{marginTop: "10px"}}>
                    <b>PolyChat</b> : 4 modèles entrainés sur les données textuelles qui répondent à des questions sur les retours sur les enseignements. 
                </li>
                <li style={{marginTop: "10px"}}>
                    <b>Cloud</b> : Nuage de mots des retours textuels des anciens élèves.
                </li>
            </ul>
            <div style= {{marginTop: "20px"}}>
                <b>Lien de la vidéo de présentation</b>: <a href="https://drive.google.com/drive/folders/1ODPh_CTbQfIZ_Yo1DnuBmgFoEzage9CU?usp=sharing">Lien Vidéo</a>
            </div>
        </div>
    )
}

export default Home