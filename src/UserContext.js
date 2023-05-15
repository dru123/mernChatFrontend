import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextWrapper({ children }) {
    const [name, setName] = useState('');
    const [id, setId] = useState(null);

   useEffect(() => {
    (async () => {
        const {data} = await axios.get('/profile');
        console.log(data);
        setId(data.userId);
        setName(data.username);

    })();
    console.log(name,id,'contex-------t1111111')

}, []);
console.log(name,id,'contex-------t')

    return (
        <UserContext.Provider value={{name, setName, id, setId} }>
            {children}
        </UserContext.Provider>
    )
}