import React, {createContext, useState, useEffect} from 'react'

import API from '../API'

const Context = createContext()

const ContextComponent = ({children}) => {

    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token) {
            API.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
        setLoading(false)
    },[])

    if(loading) {
        return <div className="centered"><span>Loading...</span></div>
    }

    const handleDataToken = async () => {
        var responseObject = undefined
        if(localStorage.getItem('token')) {
            const token = localStorage.getItem('token').replace(/"/g, '')
            await API.get(`/token/${token}/verify`).then(response => {
                responseObject = {
                    id: response.data.id,
                    accessLevel: response.data.accessLevel
                }
                if(responseObject.accessLevel === 'Paciente') responseObject["rp"] = response.data.rp
                else if(responseObject.accessLevel === 'Médico') responseObject["crm"] = response.data.crm
            }).catch(err => {
                console.error(`Algo deu errado -> ${err}`)
                return responseObject
            })
        }
        return responseObject
    }

    const handleAuthentication = async (token) => {
        const response = await API.get(`/token/${token}/verify`)
        if(response.status === 401) {
            setAuthenticated(false)
        }
        else {
            localStorage.setItem('token', JSON.stringify(token))
            API.defaults.headers.Authorization = `Bearer ${token}`
            setAuthenticated(true)
        }
    }

    const handleLogoff = () => {
        localStorage.removeItem('token')
        API.defaults.headers.Authorization = undefined
        setAuthenticated(false)
    }

    return (
        <React.Fragment>
            <Context.Provider value={{authenticated, handleAuthentication, handleLogoff, handleDataToken}}>
                {children}
            </Context.Provider>
        </React.Fragment>
    )
}

export {ContextComponent, Context}
