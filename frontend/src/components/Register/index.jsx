import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import Input from '../Subcomponents/Input'
import ComboBox from '../Subcomponents/ComboBox'

import './style.css'
import API from '../../utils/API'
import { Context } from '../../utils/Context'

export default () => {

    const history = useHistory()
    const context = useContext(Context)

    const [accessLevel, setAccessLevel] = useState('')
    const [primaryKey, setPrimaryKey] = useState('')

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const [idDocument, setIdDocument] = useState('')
    const [sex, setSex] = useState('')
    const [birth, setBirth] = useState('')

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const inputError = (where) => {
        alert(`Você não preencheu o campo "${where}". Por favor, preencha`)
    }

    const verifyInputs = () => {
        const inputs = [
            [name, "Nome"],
            [surname, "Sobrenome"],
            [idDocument, "CPF"],
            [sex, "Sexo"],
            [birth, "Data de nascimento"],
            [user, "Usuário"],
            [password, "Senha"],
            [accessLevel, "Tipo de uso"]
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

    const register = async () => {
        try {
            if(verifyInputs()) {
                const registerObject = {
                    name,
                    surname,
                    idDocument,
                    birth,
                    sex,
                    login: user,
                    password,
                    accessLevel
                }
                if(accessLevel === 'Paciente') {
                    registerObject["rp"] = primaryKey
                    registerObject["doctorCRM"] = null
                    await API.post('/patient', registerObject).then(async response => {
                        await context.handleAuthentication(response.data.token)
                        alert('Registrado com sucesso!')
                        history.push('/main')
                    }).catch(err => {
                        alert(`Erro no cadastro -> ${err}`)
                    })
                }
                else if(accessLevel === 'Médico') {
                    registerObject["crm"] = primaryKey
                    await API.post('/doctor', registerObject).then(async response => {
                        await context.handleAuthentication(response.data.token)
                        alert('Registrado com sucesso!')
                        history.push('/main')
                    }).catch(err => {
                        alert(`Erro no cadastro -> ${err}`)
                    })
                }
            }
        } catch(err) {
            alert(`Algo de errado ocorreu -> ${err}`)
        }
    }

    return (
        <React.Fragment>
            <form className="centered">
                <div className="centered">
                    <img src="./Assets/LogoTCC.png" alt="Logotipo MEDiNTEL"/>
                    <h1>Cadastro no <span>MEDiNTEL</span></h1>
                </div>
                <div className="centered-row">
                    <Input name="name" title="Nome" setValue={setName} value={name}/>
                    <Input name="surname" title="Sobrenome" setValue={setSurname} value={surname}/>
                </div>
                <div className="centered-row">
                    <Input name="document" title="CPF" setValue={setIdDocument} value={idDocument}/>
                    <ComboBox name="sex" title="Sexo" selectText="Selecione seu sexo" list={["Masculino", "Feminino"]} setValue={setSex} value={sex}/>
                </div>
                <div className="centered-row">
                    <Input classInjection="long" name="birthday" title="Data de nascimento" type="date" setValue={setBirth} value={birth}/>
                </div>
                <div className="centered-row">
                    <Input name="user" title="Usuário" setValue={setUser} value={user}/>
                    <Input type="password" name="password" title="Senha" setValue={setPassword} value={password}/>
                </div>
                <div className="centered-row">
                    <ComboBox name="accessLevel" title="Tipo de uso" selectText="O que você é?" list={["Paciente", "Médico"]} setValue={setAccessLevel} value={accessLevel}/>
                    <div className="input" id="primaryKey">
                        {(accessLevel === 'Paciente') ? <Input type="rp" title="Registro do Paciente" setValue={setPrimaryKey} value={primaryKey}/> :
                        (accessLevel === 'Médico') ?  <Input type="crm" title="CRM" setValue={setPrimaryKey} value={primaryKey}/> : ''}
                    </div>
                </div>
                <div className="centered-row">
                    <div className="button" onClick={register}>Cadastrar</div>
                    <div className="button" onClick={()=>{window.location.reload()}}>Limpar</div>
                </div>
            </form>
        </React.Fragment>
    )
}
