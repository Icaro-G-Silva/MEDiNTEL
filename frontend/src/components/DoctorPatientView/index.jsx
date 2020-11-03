import React, {useContext, useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { Context } from '../../utils/Context'
import API from '../../utils/API'
import Header from '../Subcomponents/Header'
import PatientMain from '../PatientMain'

import './style.css'

export default () => {

    const context = useContext(Context)
    const history = useHistory()

    const {rp} = useParams()

    const [name, setName] = useState('')

    const getTokenData = async () => {
        const res = await context.handleDataToken()
        if(res){
            const {crm, rp} = res
            if(rp) {
                alert('Não autorizado. Área apenas para Médicos.')
                history.goBack()
            }
            if(!crm){
                alert('Não autorizado. CRM inválido.')
                history.goBack()
            }
            else {
                await API.get(`/doctor/${crm.replace('/', '')}`).then(response => {
                    setName(`${response.data.name} ${response.data.surname}`)
                }).catch(err => {
                    alert(`Algo deu erado -> ${err}`)
                })
            }
        }
        else history.goBack()
    }

    useEffect(()=>{
        getTokenData()
    }, [])

    return (
        <React.Fragment>
            <Header name={name} description="Abaixo estão os hemogramas de seu Paciente" redirect="/bloodCount" linkName="+ Novo Hemograma" comeBack={true}/>
            <PatientMain rp={rp} />
        </React.Fragment>
    )
}