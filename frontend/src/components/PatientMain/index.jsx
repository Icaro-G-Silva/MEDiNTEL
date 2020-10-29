import React, {useContext, useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import API from '../../utils/API'

import { Context } from '../../utils/Context'
import Card from '../Subcomponents/Card'
import Header from '../Subcomponents/Header'

import './style.css'

export default props => {

    const context = useContext(Context)
    const history = useHistory()

    const [name, setName] = useState('')
    const [bloodCounts, setBloodCounts] = useState([])
    const [updateInfos, setUpdateInfos] = useState(true)

    const getData = async () => {
        try {
            var realRp
            if(!props.rp) {
                const {rp} = await context.handleDataToken()
                if(rp === undefined) {
                    alert('RP indefinido, por favor, faça o Logon novamente.')
                    history.push('/login')
                }
                realRp = rp
            } else realRp = props.rp
            

            await API.get(`/patient/${realRp}`).then(response => {
                setName(`${response.data.name} ${response.data.surname}`)
            }).catch(err => {
                alert(`Erro -> ${err}`)
            })

            await API.get(`/patient/${realRp}/bloodcounts`).then(response => {
                setBloodCounts(response.data)
            }).catch(err => {
                alert(`Erro -> ${err}`)
            })
        } catch (err) {
            alert(`Algo deu errado -> ${err}`)
        }
        setUpdateInfos(false)
    }

    const getTitle = (eritograma, leucograma, trombograma) => {
        eritograma = (eritograma !== null) ? true : false
        leucograma = (leucograma !== null) ? true : false
        trombograma = (trombograma !== null) ? true : false
        if(eritograma && leucograma && trombograma) return 'Hemograma Completo'
        else if(eritograma) {
            if(leucograma && !trombograma) return 'Eritograma + Leucograma'
            else if(!leucograma && trombograma) return 'Eritograma + Trombograma'
            else return 'Eritograma'
        }
        else if(leucograma) {
            if(!eritograma && trombograma) return 'Leucograma + Trombograma'
            else return 'Leucograma'
        }
        else if(trombograma) {
            if(!eritograma && !leucograma) return 'Trombograma'
        }
        else if(!eritograma && !leucograma && !trombograma) return 'Hemograma Vazio'
    }

    const refresh = () => {
        if(updateInfos) setUpdateInfos(false)
        else setUpdateInfos(true)
    }

    const deleteRegister = async (reqNumber) => {
        await API.delete(`/bloodCount/${reqNumber}/complete`).then(response => {
            alert('Hemograma deletado com sucesso')
            refresh()
        }).catch(err => {
            alert(`Erro ao deletar hemograma -> ${err}`)
        })
    }

    useEffect(()=>{
        async function run() {
            await getData()
        }
        if(updateInfos) run()
    }, [updateInfos])

    return (
        <React.Fragment>
            {(props.rp) ? '' : <Header name={name} description="Abaixo estão seus Hemogramas" redirect="/register/bloodCount" linkName="+ Novo Hemograma"/>}
            <div className="cardsPlace">
                {
                (bloodCounts.length === 0) ? 
                    <div className="centered">
                        <h2>Você não tem nenhum Hemograma cadastrado ainda.</h2> <br/>
                        <h1>¯\_(ツ)_/¯</h1>
                    </div>
                :
                bloodCounts.map(bloodCount => {
                    const title = getTitle(bloodCount.eritograma, bloodCount.leucograma, bloodCount.plaquetario)
                    return (
                        <Link to={`/bloodCount/${bloodCount.requestNumber}`} className="withoutStyleLink">
                            <Card key={bloodCount.requestNumber} reqNumber={bloodCount.requestNumber} title={title} deleteTrigger={deleteRegister}>
                                <h2 className="textLine"><label className="textContrast">Pedido:</label> {bloodCount.requestNumber}</h2>
                                <h2 className="textLine"><label className="textContrast">Prontuário:</label> {bloodCount.medicalRecord}</h2>
                                <h2 className="textLine"><label className="textContrast">Feito em:</label> {bloodCount.releasedAtDate} - {bloodCount.releasedAtHour}</h2>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </React.Fragment>
    )
}
