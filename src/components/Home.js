import {Link} from "react-router-dom";

const Home = () => {

    return (
        <section>
            <h1>Home</h1>
            <Link to="/map">Go to the Map</Link>
            <Link to="/chat">Go to the Chat</Link>
        </section>
    )
}

export default Home