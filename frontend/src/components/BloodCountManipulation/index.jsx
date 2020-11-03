import React, {useContext, useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import API from '../../utils/API'
import {Context} from '../../utils/Context'

import Header from '../Subcomponents/Header'
import Input from '../Subcomponents/Input'
import ComboBox from '../Subcomponents/ComboBox'
import EritoManipulation from './EritoManipulation'
import LeucoManipulation from './LeucoManipulation'
import TromboManipulation from './TromboManipulation'

export default () => {

    const context = useContext(Context)
    const history = useHistory()
    const {reqNumber, relatedPatient} = useParams()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [accessLevel, setAccessLevel] = useState('')
    const [primaryKey, setPrimaryKey] = useState('')
    const [patients, setPatients] = useState([])

    const [medicalRecord, setMedicalRecord] = useState('')
    const [requester, setRequester] = useState('')
    const [origin, setOrigin] = useState('')
    const [destiny, setDestiny] = useState('')
    const [collectionDate, setCollectionDate] = useState('')
    const [collectionHour, setCollectionHour] = useState('')
    const [releasedAtDate, setReleasedAtDate] = useState('')
    const [releasedAtHour, setReleasedAtHour] = useState('')
    const [material, setMaterial] = useState('')
    const [method, setMethod] = useState('')
    const [automation, setAutomation] = useState('')
    const [hasErito, setHasErito] = useState(0)
    const [eritoObj, setEritoObj] = useState({})
    const [hasLeuco, setHasLeuco] = useState(0)
    const [leucoObj, setLeucoObj] = useState({})
    const [hasTrombo, setHasTrombo] = useState(0)
    const [tromboObj, setTromboObj] = useState({})

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
            await API.get(`/bloodCount/${reqNumber}`).then(response => {
                /*var bloodCountPatient = response.data.patient.rp
                if(relatedPatient !== bloodCountPatient) {
                    alert('Não autorizado!')
                    history.goBack()
                }
                if(accessLevel === 'Paciente') {
                    if(primaryKey !== bloodCountPatient) {
                        alert('Não autorizado! O Hemograma não pertence a você')
                        history.goBack()
                    }
                }
                else if(accessLevel === 'Médico') {
                    if(patients.find(bloodCountPatient) === undefined) {
                        alert('Não autorizado! O Hemograma não pertence a nenhum de seus pacientes')
                        history.goBack()
                    }
                }*/

                setMedicalRecord(response.data.medicalRecord)
                setRequester(response.data.requester)
                setOrigin(response.data.origin)
                setDestiny(response.data.destiny)
                setCollectionDate(response.data.collectionDate)
                setCollectionHour(response.data.collectionHour)
                setReleasedAtDate(response.data.releasedAtDate)
                setReleasedAtHour(response.data.releasedAtHour)
                setMaterial(response.data.material)
                setMethod(response.data.method)
                setAutomation(response.data.automation)

                if(response.data.eritograma !== null) setHasErito(1)
                if(response.data.leucograma !== null) setHasLeuco(1)
                if(response.data.plaquetario !== null) setHasTrombo(1)
            }).catch(err => {
                alert(`Erro no getBCData -< ${err}`)
            })
        } catch (err) {
            alert(`Algo de errado aconteceu -> ${err}`)
        }
    }

    const setEritoStates = (eritoObj) => {
        setEritoObj(eritoObj)
    }

    const setLeucoStates = (leucoObj) => {
        setLeucoObj(leucoObj)
    }

    const setTromboStates = (tromboObj) => {
        setTromboObj(tromboObj)
    }

    const inputError = (where) => {
        alert(`Você não preencheu o campo "${where}". Por favor, preencha`)
    }

    const verifyInputs = () => {
        /*const inputs = [
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
        }*/
        return true
    }
    
    const update = async () => {
        /*if(verifyInputs()) {
            try {
                const bloodCountObj = {
                    requestNumber: reqNumber,
                    medicalRecord,
                    requester,
                    origin,
                    destiny,
                    collectionDate,
                    collectionHour,
                    releasedAtDate,
                    releasedAtHour,
                    material,
                    method,
                    automation,
                    rp: relatedPatient
                }

                var eritoList = ['eritrocitos', 'hemoglobina', 'hematocrito', 'VCM', 'HCM', 'CHCM', 'RDW']
                if(hasErito !== 0) {
                    for(let i in eritoList) {
                        bloodCountObj[`${eritoList[i]}`] = eritoObj[`${eritoList[i]}`]
                    }
                }

                var leucoList = ['leucocitos', 'celulasBlasticas', 'promielocito', 'mielocito', 'metamielocito', 'bastonete', 'segmentado', 'eosinofilo', 'basofilo', 'linfocitos', 'linfocitosAtipicos', 'monocito', 'palsmocito']
                if(hasLeuco !== 0) {
                    for(let i in leucoList) {
                        bloodCountObj[`${leucoList[i]}`] = leucoObj[`${leucoList[i]}`]
                    }
                }

                if(hasTrombo !== 0) bloodCountObj["plaquetas"] = tromboObj["plaquetas"]

                await API.put(`/bloodCount/${reqNumber}/complete`, bloodCountObj).then(response => {

                })
            } catch (err) {
                alert(`Algo de errado aconteceu -> ${err}`)
            }
        }*/
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
            {(accessLevel === 'Médico') ? <Header name={`${name} ${surname}`} description="Abaixo estão as informações do Hemograma" redirect={`/analyze/${relatedPatient}/${reqNumber}`} linkName="Pré-Análise" comeBack={true}/>
            : <Header name={`${name} ${surname}`} description="Abaixo estão as informações do Hemograma" disableLink={true} comeBack={true}/>}
            
            <form className="centered">
                <div className="centered-row">
                    <Input name="medicalRecord" title="Prontuário" setValue={setMedicalRecord} value={medicalRecord}/>
                    <Input name="requester" title="Pedido por" setValue={setRequester} value={requester}/>
                </div>
                <div className="centered-row">
                    <Input name="origin" title="Origem" setValue={setOrigin} value={origin}/>
                    <Input name="destiny" title="Destino" setValue={setDestiny} value={destiny}/>
                </div>
                <div className="centered-row">
                    <Input name="material" title="Material" setValue={setMaterial} value={material}/>
                    <Input name="method" title="Método" setValue={setMethod} value={method}/>
                </div>
                <div className="centered-row">
                    <Input name="collectionDate" title="Data da Coleta" type="date" setValue={setCollectionDate} value={collectionDate}/>
                    <Input name="collectionHour" title="Hora da Coleta" type="date" setValue={setCollectionHour} value={collectionHour}/>
                </div>
                <div className="centered-row">
                    <Input name="releasedAtDate" title="Data do resultado" type="date" setValue={setReleasedAtDate} value={releasedAtDate}/>
                    <Input name="releasedAtHour" title="Hora do resultado" type="date" setValue={setReleasedAtHour} value={releasedAtHour}/>
                </div>
                <div className="centered-row">
                    <Input classInjection="long" name="automation" title="Automação" setValue={setAutomation} value={automation}/>
                </div>
                {(hasErito !== 0) ? <EritoManipulation reqNumber={reqNumber} setEritoStates={setEritoStates} /> : ''}
                {(hasLeuco !== 0) ? <LeucoManipulation reqNumber={reqNumber} setLeucoStates={setLeucoStates} /> : ''}
                {(hasTrombo !== 0) ? <TromboManipulation reqNumber={reqNumber} setTromboStates={setTromboStates} /> : ''}
                <div className="centered-row">
                    {(accessLevel === 'Médico') ? <div className="button" onClick={update}>Alterar</div> : ''}
                    <div className="button" onClick={()=>{window.location.reload()}}>Recarregar Dados</div>
                </div>
            </form>
        </React.Fragment>
    )
}
