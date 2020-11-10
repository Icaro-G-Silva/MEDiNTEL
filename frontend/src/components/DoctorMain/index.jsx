import React, {useContext, useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'

import API from '../../utils/API'
import { Context } from '../../utils/Context'
import Header from '../Subcomponents/Header'
import Card from '../Subcomponents/Card'

import './style.css'

export default () => {

    const context = useContext(Context)
    const history = useHistory()

    const [name, setName] = useState('')
    const [patients, setPatients] = useState([])
    //const [bloodCountsAmount, setBloodCountsAmount] = useState([])
    const [updateInfos, setUpdateInfos] = useState(true)

    const getData = async () => {
        try {
            const {crm} = await context.handleDataToken()
            if(crm === undefined) {
                alert('CRM indefinido, por favor, faça o Logon novamente.')
                history.push('/login')
            }

            await API.get(`/doctor/${crm.replace('/', '')}`).then(response => {
                setName(`${response.data.name} ${response.data.surname}`)
                setPatients(response.data.patients)
            }).catch(err => {
                alert(`Erro getData -> ${err}`)
            })
        } catch (err) {
            alert(`Algo deu errado -> ${err}`)
        }
        refresh()
    }
/*
    const getBloodCountAmount = async () => {
        const array = []
        try {
            patients.map(async patient => {
                await API.get(`/patient/${patient.rp}/bloodcounts`).then(response => {
                    array.push(patient.rp)
                    array.push(response.data.length)
                }).catch(err => {
                    alert(`Erro getBloodCountAmount -> ${err}`)
                })
            })
            setBloodCountsAmount(array)
        } catch (err) {
            alert(`Algo deu errado -> ${err}`)
        }
        refresh()
    }
*/
    const refresh = () => {
        if(updateInfos) setUpdateInfos(false)
        else setUpdateInfos(true)
    }

    const deleteRegister = async (rp) => {
        await API.get(`patient/${rp}`).then(async response => {
            const patientObject = {
                name: response.data.name,
                surname: response.data.surname,
                idDocument: response.data.idDocument,
                sex: response.data.sex,
                birth: response.data.birth,
                accessLevel: response.data.accessLevel,
                doctorCRM: null
            }
            await API.put(`patient/${rp}/update`, patientObject).then(response => {
                refresh()
            }).catch(err => {
                alert(`Algo deu errado ao atualizar -> ${err}`)
            })
        }).catch(err => {
            alert(`Algo deu errado ao resgatar -> ${err}`)
        })
    }

    useEffect(()=>{
        if(updateInfos) {
            getData()
        }
    }, [updateInfos])

    return (
        <React.Fragment>
            <Header name={name} description="Abaixo estão seus Pacientes" disableLink={true}/>
            <div className="cardsPlace">
                {
                    (patients.length === 0) ? 
                        <div className="centered">
                            <h2>Você não tem nenhum Paciente.</h2> <br/>
                            <h1>¯\_(ツ)_/¯</h1>
                        </div>
                    :
                    patients.map(patient => {
                        const bloodCountAmount = 0
                        return (
                            <Link to={`/patient/${patient.rp}`} className="withoutStyleLink">
                                <Card key={patient.rp} reqNumber={patient.rp} title={`${patient.name} ${patient.surname}`} deleteTrigger={deleteRegister}>
                                    <h2 className="textLine"><label className="textContrast">Reg. Paciente:</label> {patient.rp}</h2>
                                    <h2 className="textLine"><label className="textContrast">Nascimento:</label> {patient.birth}</h2>
                                </Card>
                            </Link>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}