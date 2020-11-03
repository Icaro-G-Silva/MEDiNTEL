import React, {useContext, useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import API from '../../utils/API'
import {Context} from '../../utils/Context'
import Header from '../Subcomponents/Header'

export default () => {

    const context = useContext(Context)
    const history = useHistory()

    const {reqNumber, relatedPatient} = useParams()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [accessLevel, setAccessLevel] = useState('')
    const [primaryKey, setPrimaryKey] = useState('')
    const [patients, setPatients] = useState([])
    const [updateInfos, setUpdateInfos] = useState(true)

    const getTokenData = async () => {
        const res = await context.handleDataToken()
        if(res) {
            const {id, accessLevel, crm, rp} = res
            if(id === undefined || accessLevel === undefined) history.push('/login')
            setAccessLevel(accessLevel)
            if(accessLevel === 'Paciente') setPrimaryKey(rp)
            else if(accessLevel === 'Médico') setPrimaryKey(crm)
            refresh()
        } else history.push('/login')
    }

    const getEndpoint = () => {
        if(accessLevel === 'Paciente') return `/patient/${primaryKey}`
        else if(accessLevel === 'Médico') return `/doctor/${primaryKey}`
    }

    const getData = async () => {
        try {
            await API.get(getEndpoint()).then(response => {
                setName(response.data.name)
                setSurname(response.data.surname)
                if(accessLevel === 'Médico') {
                    var patientsArray = []
                    for(let patient in response.data.patients) {
                        patientsArray.push(response.data.patients[patient].rp)
                    }
                    setPatients(patientsArray)
                }
            }).catch(err => {
                alert(`Erro no getUserData -< ${err}`)
            })
        } catch (err) {
            alert(`Algo de errado aconteceu -> ${err}`)
        }
    }

    const refresh = () => {
        if(updateInfos) setUpdateInfos(false)
        else setUpdateInfos(true)
    }

    useEffect(()=> {
        if(updateInfos) {
            getTokenData()
        }
        else getData()
    }, [updateInfos])

    return(
        <React.Fragment>
            <Header name={`${name} ${surname}`} description="Abaixo estão as informações da Pré-Análise do Hemograma" redirect="/main" linkName="Voltar aos Cards" comeBack={true}/>
        </React.Fragment>
    )
}