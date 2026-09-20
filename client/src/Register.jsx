import axios from "axios";
import { useContext, useState } from "react"
import { UserContext } from "./UserContext";

export default function Register () {
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const {setUsername : setLoggedInUsername, setId} = useContext(UserContext)
    async function register (e) {
        e.preventDefault();
        const {data} = await axios.post('/register', {username,password} );

        setLoggedInUsername(username);
        setId(data.id)
    }


    return <>
       <div className="bg-gray-900 h-screen flex items-center">

           <form className="w-80 mx-auto" onSubmit={register}>
              <input value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                type="text" placeholder="Username" 
                className="w-full bg-red-100 block p-3 mb-3 rounded-sm" />

              <input value={password}
                onChange={(e)=>(setPassword(e.target.value))}
                type="password" placeholder="Password"
                className="w-full bg-red-100 block p-3 mb-3 rounded-sm"/>
              <button className="w-full bg-blue-500 p-3 border-none rounded-sm text-white ">Register</button>

             <div className="text-blue-100 text-center mt-2">
                Already a member? <a href="">Login here</a>
             </div>
           </form>

       </div>

    </>
}