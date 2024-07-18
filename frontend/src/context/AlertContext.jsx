import { useState, useContext, createContext, Children } from "react";


const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);
    return (
        <AlertContext.Provider value={{ alert, setAlert }} >
            {children}
        </AlertContext.Provider>
    )
}

export const alertState = () => {
    return useContext(AlertContext);
}

export default AlertContextProvider