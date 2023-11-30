import {Link} from "react-router-dom";

const Home = () => {

    return (
        <section>
            <h1>Home</h1>
            <Link to="/map">Go to the Map</Link>
        </section>
    )
}

export default Home