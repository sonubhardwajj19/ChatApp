import { useContext } from "react";
import Register from "./register";
import { UserContext } from "./UserContext";

export default function Routes() {

    const {id,username} = useContext(UserContext);

    if(username) {
        return 'logged in'+ username;
    }

    return (
        <Register/>
    )
}