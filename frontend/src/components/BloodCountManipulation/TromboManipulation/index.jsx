import React, {useState, useEffect} from 'react'

import API from '../../../utils/API'

import Input from '../../Subcomponents/Input'

export default props => {

    const [plaquetas, setPlaquetas] = useState(0.0)

    const [updateInfos, setUpdateInfos] = useState(true)
    const [isGetData, setIsGetData] = useState(true)

    const getData = async () => {
        try {
            await API.get(`/bloodCount/${props.reqNumber}`).then(response => {
                setPlaquetas(response.data.plaquetario.plaquetas)
            }).catch(err => {
                alert(`Erro no getData do TromboManipulation -< ${err}`)
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
        setTromboStates()
    }, [updateInfos])

    const setPlaquetasStatic = (value) => {
        setPlaquetas(parseFloat(value))
        refresh()
    }

    const setTromboStates = () => {
        const trombogramaStates = {
            plaquetas
        }
        props.setTromboStates(trombogramaStates)
    }

    return(
        <React.Fragment>
            <br/>
            <h3>Trombograma</h3>
            <div className="centered-row">
                <Input classInjection="long" name="plaquetas" title="Plaquetas (mil/mm³)" setValue={setPlaquetasStatic} value={plaquetas} type="number" />
            </div>
        </React.Fragment>
    )
}
