import { useLocation } from "react-router-dom";
import { Button } from "rsuite"


export const Home = () => {
    const location = useLocation();
    return (<>
        <h1>Teste</h1>
        <h3>path: {location.pathname}</h3>
    </>)
}