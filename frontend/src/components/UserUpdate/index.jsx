import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import API from '../../utils/API'
import {Context} from '../../utils/Context'

import Header from '../Subcomponents/Header'
import Input from '../Subcomponents/Input'
import ComboBox from '../Subcomponents/ComboBox'

import './style.css'

export default () => {

    const context = useContext(Context)
    const history = useHistory()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [accessLevel, setAccessLevel] = useState('')
    const [idDocument, setIdDocument] = useState('')
    const [sex, setSex] = useState('')
    const [birth, setBirth] = useState('')
    const [primaryKey, setPrimaryKey] = useState('')
    const [staticPrimaryKey, setStaticPrimaryKey] = useState('')
    const [doctorCRM, setDoctorCRM] = useState('')
    const [doctors, setDoctors] = useState([])
    const [updateInfos, setUpdateInfos] = useState(true)

    const getTokenData = async () => {
        const res = await context.handleDataToken()
        if(res) {
            const {id, accessLevel, crm, rp} = res
            if(id === undefined || accessLevel === undefined) history.push('/login')
            setAccessLevel(accessLevel)
            if(accessLevel === 'Paciente') {
                setPrimaryKey(rp)
                setStaticPrimaryKey(rp)
            }
            else if(accessLevel === 'Médico') {
                setPrimaryKey(crm)
                setStaticPrimaryKey(crm)
            }
            refresh()
        } else history.push('/login')
        
    }

    const getEndpoint = () => {
        if(accessLevel === 'Paciente') return `/patient/${staticPrimaryKey}`
        else if(accessLevel === 'Médico') return `/doctor/${staticPrimaryKey}`
    }

    const getData = async () => {
        try {
            await API.get(getEndpoint()).then(response => {
                setName(response.data.name)
                setSurname(response.data.surname)
                setIdDocument(response.data.idDocument)
                setSex(response.data.sex)
                if(accessLevel === 'Paciente') {
                    if(response.data.doctor) setDoctorCRM(`${response.data.doctor.name} ${response.data.doctor.surname} - ${response.data.doctor.crm}`)
                }
                var birth = response.data.birth
                const dateRegEx = /^\d{1,2}\/\d{1,2}\/\d{4}$/gm
                if(dateRegEx.test(birth)) {
                    birth = birth.split('/')
                    const newBirth = `${birth[2]}-${birth[1]}-${birth[0]}`
                    setBirth(newBirth)
                }
                else setBirth(birth)
            })
        } catch (err) {
            alert(`Algo de errado aconteceu -> ${err}`)
        }
    }

    const getDoctors = async () => {
        try {
            API.get('/doctors').then(response => {
                var doctorsArray = []
                response.data.map(doctor => {
                    doctorsArray.push(`${doctor.name} ${doctor.surname} - ${doctor.crm}`)
                })
                setDoctors(doctorsArray)
            }).catch(err => {
                alert(`Erro no getDoctors -> ${err}`)
            })
        } catch (err) {
            alert(`Algo de errado aconteceu -> ${err}`)
        }
    }

    const inputError = (where) => {
        alert(`Você não preencheu o campo "${where}". Por favor, preencha`)
    }

    const verifyInputs = () => {
        const inputs = [
            [name, "Nome"],
            [surname, "Sobrenome"],
            [idDocument, "CPF"],
            [sex, "Sexo"],
            [birth, "Data de nascimento"]
        ]
        for(let i=0; i < inputs.length; i++){
            if(inputs[i][0].length === 0) {
                inputError(inputs[i][1])
                return false
            }
        }
        if(primaryKey.length === 0) {
            if(accessLevel === 'Paciente') {
                inputError('Registro do Paciente')
                return false
            }
            else if(accessLevel === 'Médico'){
                inputError('CRM')
                return false
            }
        }
        return true
    }
    
    const update = async () => {
        if(verifyInputs()) {
            try {
                var userObject = {
                    name,
                    surname,
                    idDocument,
                    sex,
                    birth,
                    accessLevel
                }
                if(accessLevel === 'Paciente') {
                    userObject["rp"] = primaryKey
                    if(doctorCRM !== '') {
                        const crm = doctorCRM.split('-')[1].trim()
                        const crmNumbers = crm.substring(0, crm.length - 2)
                        const crmProvince = crm.substring(crm.length - 2)
                        userObject["doctorCRM"] = `${crmNumbers}/${crmProvince}`
                    } else userObject["doctorCRM"] = null
                }
                else if(accessLevel === 'Médico') {
                    const crm = primaryKey
                    const crmNumbers = crm.substring(0, crm.length - 2)
                    const crmProvince = crm.substring(crm.length - 2)
                    userObject["crm"] = `${crmNumbers}/${crmProvince}`
                }
                await API.put(`${getEndpoint()}/update`, userObject).then(async response => {
                    alert('Registro alterado com sucesso!')
                    await context.handleLogoff()
                    await context.handleAuthentication(response.data.token)
                    history.push('/main')
                }).catch(err => {
                    console.log(err)
                    alert(`erro -> ${err}`)
                })
            } catch (err) {
                alert(`Algo de errado aconteceu -> ${err}`)
            }
        }
    }

    const clearFields = () => {
        setName('')
        setSurname('')
        setIdDocument('')
        setSex('')
        setBirth('')
        setPrimaryKey('')
        setDoctorCRM('')
    }

    const refresh = () => {
        if(updateInfos) setUpdateInfos(false)
        else setUpdateInfos(true)
    }

    useEffect(()=> {
        if(updateInfos) {
            getTokenData()
            getDoctors()
        }
        else getData()
    }, [updateInfos])

    return(
        <React.Fragment>
            <Header name={`${name} ${surname}`} description="Abaixo estão sua informações" redirect="/main" linkName="Voltar aos Cards"/>
            <form className="centered">
                <div className="centered-row">
                    <Input name="name" title="Nome" setValue={setName} value={name} rerender={updateInfos}/>
                    <Input name="surname" title="Sobrenome" setValue={setSurname} value={surname}/>
                </div>
                <div className="centered-row">
                    <Input name="document" title="CPF" setValue={setIdDocument} value={idDocument}/>
                    <ComboBox name="sex" title="Sexo" selectText="Selecione seu sexo" list={["Masculino", "Feminino"]} setValue={setSex} value={sex}/>
                </div>
                <div className="centered-row">
                    <Input name="birthday" title="Data de nascimento" type="date" setValue={setBirth} value={birth}/>
                    {(accessLevel === 'Paciente') ? <Input type="rp" title="Registro do Paciente" setValue={setPrimaryKey} value={primaryKey}/>
                    : (accessLevel === 'Médico') ?  <Input type="crm" title="CRM" setValue={setPrimaryKey} value={primaryKey}/> : ''}
                </div>
                <div className="centered-row">
                    {(accessLevel === 'Paciente') ? <ComboBox classInjection="long" name="doctor" title="Médico" selectText="Selecione seu Médico" list={doctors} setValue={setDoctorCRM} value={doctorCRM}/> : ''}
                </div>
                <div className="centered-row">
                    <div className="button" onClick={update}>Alterar</div>
                    <div className="button" onClick={clearFields}>Limpar</div>
                </div>
            </form>
        </React.Fragment>
    )
}
