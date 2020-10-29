import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'

import Input from '../Subcomponents/Input'
import {Context} from '../../utils/Context'
import API from '../../utils/API'

import './style.css'

export default () => {

    const context = useContext(Context)
    const history = useHistory()

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const inputError = (where) => {
        alert(`Você não preencheu o campo "${where}". Por favor, preencha`)
    }

    const verifyInputs = () => {
        const inputs = [
            [user, "Usuário"],
            [password, "Senha"]
        ]
        for(let i=0; i < inputs.length; i++){
            if(inputs[i][0].length === 0) {
                inputError(inputs[i][1])
                return false
            }
        }
        return true
    }

    const login = async () => {
        try {
            if(verifyInputs()) {
                await API.post('/login', {login: user, password: password}).then(async response => {
                    await context.handleAuthentication(response.data)
                    history.push('/main')
                }).catch(err => {
                    if(err.message.substring(err.message.length - 3, err.message.length) === '401') {
                        alert(`Usuário ou Senha incorretos!`)
                    }
                    else alert(`Erro no login -> ${err}`)
                })
            }
        } catch (err) {
            alert(`Algo de errado ocorreu -> ${err}`)
        }
    }

    return (
        <React.Fragment>
            <form className="centered">
                <div className="centered">
                    <img src="./Assets/LogoTCC.png" alt="Logotipo MEDiNTEL"/>
                    <h1>Bem-vindos ao <span>MEDiNTEL</span></h1>
                </div>
                <Input name="user" title="Usuário" setValue={setUser} value={user}/>
                <Input name="password" title="Senha" type="password" setValue={setPassword} value={password}/>
                <Link to="/register">Ainda não é cadastrado?</Link>
                <div className="button" onClick={login}>Entrar</div>
            </form>
        </React.Fragment>
    )
}