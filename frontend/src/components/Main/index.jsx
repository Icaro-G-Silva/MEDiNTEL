import React, {useContext, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

import { Context } from '../../utils/Context'
import PatientMain from '../PatientMain'
import DoctorMain from '../DoctorMain'

import './style.css'

export default () => {

    const context = useContext(Context)
    const history = useHistory()

    const [accessLevel, setAcessLevel] = useState('')


    const getTokenData = async () => {
        const res = await context.handleDataToken()
        if(res){
            const {id, accessLevel} = res
            if(id === undefined || accessLevel === undefined) history.push('/login')
            setAcessLevel(accessLevel)
        }
        else history.push('/login')
    }

    useEffect(()=>{
        getTokenData()
    }, [])

    return (
        <React.Fragment>
            {(accessLevel === 'Paciente') ? <PatientMain/> :
            (accessLevel === 'Médico') ? <DoctorMain/> : ''}
        </React.Fragment>
    )
}