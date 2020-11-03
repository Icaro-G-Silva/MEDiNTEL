import React, {useState, useEffect} from 'react'

import API from '../../../utils/API'

import Input from '../../Subcomponents/Input'

export default props => {

    const [eritrocitos, setEritrocitos] = useState(0.0)
    const [hemoglobina, setHemoglobina] = useState(0.0)
    const [hematocrito, setHematocrito] = useState(0.0)
    const [vcm, setVCM] = useState(0.0)
    const [hcm, setHCM] = useState(0.0)
    const [chcm, setCHCM] = useState(0.0)
    const [rdw, setRDW] = useState(0.0)

    const [updateInfos, setUpdateInfos] = useState(true)
    const [isGetData, setIsGetData] = useState(true)

    const getData = async () => {
        try {
            await API.get(`/bloodCount/${props.reqNumber}`).then(response => {
                setEritrocitos(response.data.eritograma.eritrocitos)
                setHemoglobina(response.data.eritograma.hemoglobina)
                setHematocrito(response.data.eritograma.hematocrito)
                setVCM(response.data.eritograma.VCM)
                setHCM(response.data.eritograma.HCM)
                setCHCM(response.data.eritograma.CHCM)
                setRDW(response.data.eritograma.RDW)
            }).catch(err => {
                alert(`Erro no getData do EritoManipulation -< ${err}`)
            })
            setIsGetData(false)
            refresh()
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
            if(isGetData) getData()
        }
        setEritoStates()
    }, [updateInfos])

    const setEritrocitosStatic = (value) => {
        setEritrocitos(parseFloat(value))
        refresh()
    }

    const setHemoglobinaStatic = (value) => {
        setHemoglobina(parseFloat(value))
        refresh()
    }

    const setHematocritoStatic = (value) => {
        setHematocrito(parseFloat(value))
        refresh()
    }

    const setVCMStatic = (value) => {
        setVCM(parseFloat(value))
        refresh()
    }

    const setHCMStatic = (value) => {
        setHCM(parseFloat(value))
        refresh()
    }

    const setCHCMStatic = (value) => {
        setEritrocitos(parseFloat(value))
        refresh()
    }

    const setRDWStatic = (value) => {
        setRDW(parseFloat(value))
        refresh()
    }

    const setEritoStates = () => {
        const eritogramaStates = {
            eritrocitos,
            hemoglobina,
            hematocrito,
            VCM: vcm,
            HCM: hcm,
            CHCM: chcm,
            RDW: rdw
        }
        props.setEritoStates(eritogramaStates)
    }

    return(
        <React.Fragment>
            <br/>
            <h3>Eritograma</h3>
            <div className="centered-row">
                <Input name="eritrocitos" title="Eritrócitos (milhão/mm³)" setValue={setEritrocitosStatic} value={eritrocitos} type="number"/> 
                <Input name="hemoglobina" title="Hemoglobina (g/dL)" setValue={setHemoglobinaStatic} value={hemoglobina}type="number" />
            </div>
            <div className="centered-row">
                <Input name="hematocrito" title="Hematócrito (%)" setValue={setHematocritoStatic} value={hematocrito} type="number" />
                <Input name="vcm" title="VCM (um³)" setValue={setVCMStatic} value={vcm} type="number" />
            </div>
            <div className="centered-row">
                <Input name="hcm" title="HCM (pg)" setValue={setHCMStatic} value={hcm} type="number" />
                <Input name="chcm" title="CHCM (g/dL)" setValue={setCHCMStatic} value={chcm} type="number" />
            </div>
            <div className="centered-row">
                <Input classInjection="long" name="rdw (%)" title="RDW" setValue={setRDWStatic} value={rdw} type="number" />
            </div>
        </React.Fragment>
    )
}
