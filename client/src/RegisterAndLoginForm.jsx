import axios from "axios";
import { useContext, useState } from "react"
import { UserContext } from "./UserContext";

export default function RegisterAndLoginForm() {
  
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const[isLoginOrRegister, setIsLoginOrRegister] = useState('register');

    const {setUsername : setLoggedInUsername, setId} = useContext(UserContext)

    async function handleSubmit(e) {
        e.preventDefault();
        const url = isLoginOrRegister === 'register' ? 'register' : 'login';
        const {data} = await axios.post(url, {username,password});

        setLoggedInUsername(username);
        setId(data.id);
  }


    return <>
       <div className="bg-gray-900 h-screen flex items-center">

           <form className="w-80 mx-auto" onSubmit={handleSubmit}>
              <input value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                type="text" placeholder="Username" 
                className="w-full bg-red-100 block p-3 mb-3 rounded-sm" />

              <input value={password}
                onChange={(e)=>(setPassword(e.target.value))}
                type="password" placeholder="Password"
                className="w-full bg-red-100 block p-3 mb-3 rounded-sm"/>
              <button className="w-full bg-blue-500 p-3 border-none rounded-sm text-white">
                {isLoginOrRegister === 'register' ? 'Register'  : 'Login'}  
              </button>

             <div className="text-blue-100 font-normal text-center mt-2">
                { isLoginOrRegister === 'register' && (
                  <div>
                    Already a member ?
                    <button onClick={()=> setIsLoginOrRegister('login')}>
                        Login here
                    </button>
                  </div>
                )}

                { isLoginOrRegister === 'login' && (
                  <div>
                    Don't have an acount ?
                    <button onClick={()=> setIsLoginOrRegister('register')}>
                        Register here
                    </button>
                  </div>
                )}
             </div>
           </form>

       </div>

    </>
}