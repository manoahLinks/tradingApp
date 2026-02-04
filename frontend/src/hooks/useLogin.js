import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        
        setIsLoading(true)
        setError(null)

        const response = await fetch(`https://trading-api-orcin.vercel.app/api/v1/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        const json = await response.json()
        
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            // save the user to a databse
            localStorage.setItem('user', JSON.stringify(json))

            // update context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)

            return json 
        }
        
        return null
    }

    return {login, isLoading, error}
}