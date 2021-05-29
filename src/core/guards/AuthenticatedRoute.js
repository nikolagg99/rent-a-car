import { Redirect } from "react-router";
import { getLoggedUser } from "../services/AuthService";

export function AuthenticatedRoute(props){
    const user = getLoggedUser();

    if(user){
        return <props.component {...props}/>
    }

    return <Redirect to="/login"/>;
}