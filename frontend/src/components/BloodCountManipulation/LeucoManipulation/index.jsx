import React, {useState, useEffect} from 'react'

import API from '../../../utils/API'

import Input from '../../Subcomponents/Input'

export default props => {

    const [leucocitos, setLeucocitos] = useState(0.0)
    const [celulasBlasticas, setCelulasBlasticas] = useState(0.0)
    const [promielocitoPercent, setPromielocitoPercent] = useState(0.0)
    const [promielocitoMilmm, setPromielocitoMilmm] = useState(0.0)
    const [mielocitoPercent, setMielocitoPercent] = useState(0.0)
    const [mielocitoMilmm, setMielocitoMilmm] = useState(0.0)
    const [metamielocitoPercent, setMetamielocitoPercent] = useState(0.0)
    const [metamielocitoMilmm, setMetamielocitoMilmm] = useState(0.0)
    const [bastonetePercent, setBastonetePercent] = useState(0.0)
    const [bastoneteMilmm, setBastoneteMilmm] = useState(0.0)
    const [segmentadoPercent, setSegmentadoPercent] = useState(0.0)
    const [segmentadoMilmm, setSegmentadoMilmm] = useState(0.0)
    const [eosinofiloPercent, setEosinofiloPercent] = useState(0.0)
    const [eosinofiloMilmm, setEosinofiloMilmm] = useState(0.0)
    const [basofiloPercent, setBasofiloPercent] = useState(0.0)
    const [basofiloMilmm, setBasofiloMilmm] = useState(0.0)
    const [linfocitosPercent, setLinfocitosPercent] = useState(0.0)
    const [linfocitosMilmm, setLinfocitosMilmm] = useState(0.0)
    const [linfocitosAtipicosPercent, setLinfocitosAtipicosPercent] = useState(0.0)
    const [linfocitosAtipicosMilmm, setLinfocitosAtipicosMilmm] = useState(0.0)
    const [monocitoPercent, setMonocitoPercent] = useState(0.0)
    const [monocitoMilmm, setMonocitoMilmm] = useState(0.0)
    const [plasmocitoPercent, setPlasmocitoPercent] = useState(0.0)
    const [plasmocitoMilmm, setPlasmocitoMilmm] = useState(0.0)

    const [updateInfos, setUpdateInfos] = useState(true)
    const [isGetData, setIsGetData] = useState(true)

    const getData = async () => {
        try {
            await API.get(`/bloodCount/${props.reqNumber}`).then(response => {
                setLeucocitos(response.data.leucograma.leucocitos)
                setCelulasBlasticas(response.data.leucograma.celulasBlasticas)

                let pivot
                pivot = getFloatValue(response.data.leucograma.promielocito)
                setPromielocitoPercent(pivot[0])
                setPromielocitoMilmm(pivot[1])
                pivot = getFloatValue(response.data.leucograma.mielocito)
                setMielocitoPercent(pivot[0])
                setMielocitoMilmm(pivot[1])
                pivot = getFloatValue(response.data.leucograma.metamielocito)
                setMetamielocitoPercent(pivot[0])
                setMetamielocitoMilmm(pivot[1])
                pivot = getFloatValue(response.data.leucograma.bastonete)
                setBastonetePercent(pivot[0])
                setBastoneteMilmm(pivot[1])
                pivot = getFloatValue(response.data.leucograma.segmentado)
                setSegmentadoPercent(pivot[0])
                setSegmentadoMilmm(pivot[1])
                pivot = getFloatValue(response.data.leucograma.eosinofilo)
                setEosinofiloPercent(pivot[0])
                setEosinofiloMilmm(pivot[1])
                pivot = getFloatValue(response.data.leucograma.basofilo)
                setBasofiloPercent(pivot[0])
                setBasofiloMilmm(pivot[1])
                pivot = getFloatValue(response.data.leucograma.linfocitos)
                setLinfocitosPercent(pivot[0])
                setLinfocitosMilmm(pivot[1])
                pivot = getFloatValue(response.data.leucograma.linfocitosAtipicos)
                setLinfocitosAtipicosPercent(pivot[0])
                setLinfocitosAtipicosMilmm(pivot[1])
                pivot = getFloatValue(response.data.leucograma.monocito)
                setMonocitoPercent(pivot[0])
                setMonocitoMilmm(pivot[1])
                pivot = getFloatValue(response.data.leucograma.plasmocito)
                setPlasmocitoPercent(pivot[0])
                setPlasmocitoMilmm(pivot[1])
            }).catch(err => {
                alert(`Erro no getData do LeucoManipulation -< ${err}`)
            })
            setIsGetData(false)
            refresh()
        } catch (err) {
            alert(`Algo de errado aconteceu -> ${err}`)
        }
    }

    const getFloatValue = (rawString) => {
        let numbers = rawString.split(';')
        numbers[0] = parseFloat(numbers[0])
        numbers[1] = parseFloat(numbers[1])
        return numbers
    }

    const refresh = () => {
        if(updateInfos) setUpdateInfos(false)
        else setUpdateInfos(true)
    }

    useEffect(()=> {
        if(updateInfos) {
            if(isGetData) getData()
        }
        setLeucoStates()
    }, [updateInfos])

    const setLeucocitosStatic = (value) => {
        setLeucocitos(parseFloat(value))
        refresh()
    }
    const setCelulasBlasticasStatic = (value) => {
        setCelulasBlasticas(parseFloat(value))
        refresh()
    }
    const setPromielocitoPercentStatic = (value) => {
        setPromielocitoPercent(parseFloat(value))
        refresh()
    }
    const setPromielocitoMilmmStatic = (value) => {
        setPromielocitoMilmm(parseFloat(value))
        refresh()
    }
    const setMielocitoPercentStatic = (value) => {
        setMielocitoPercent(parseFloat(value))
        refresh()
    }
    const setMielocitoMilmmStatic = (value) => {
        setMielocitoMilmm(parseFloat(value))
        refresh()
    }
    const setMetamielocitoPercentStatic = (value) => {
        setMetamielocitoPercent(parseFloat(value))
        refresh()
    }
    const setMetamielocitoMilmmStatic = (value) => {
        setMetamielocitoMilmm(parseFloat(value))
        refresh()
    }
    const setBastoneteMilmmStatic = (value) => {
        setBastoneteMilmm(parseFloat(value))
        refresh()
    }
    const setBastonetePercentStatic = (value) => {
        setBastonetePercent(parseFloat(value))
        refresh()
    }
    const setSegmentadoPercentStatic = (value) => {
        setSegmentadoPercent(parseFloat(value))
        refresh()
    }
    const setSegmentadoMilmmStatic = (value) => {
        setSegmentadoMilmm(parseFloat(value))
        refresh()
    }
    const setEosinofiloPercentStatic = (value) => {
        setEosinofiloPercent(parseFloat(value))
        refresh()
    }
    const setEosinofiloMilmmStatic = (value) => {
        setEosinofiloMilmm(parseFloat(value))
        refresh()
    }
    const setBasofiloPercentStatic = (value) => {
        setBasofiloPercent(parseFloat(value))
        refresh()
    }
    const setBasofiloMilmmStatic = (value) => {
        setBasofiloMilmm(parseFloat(value))
        refresh()
    }
    const setLinfocitosPercentStatic = (value) => {
        setLinfocitosPercent(parseFloat(value))
        refresh()
    }
    const setLinfocitosMilmmStatic = (value) => {
        setLinfocitosMilmm(parseFloat(value))
        refresh()
    }
    const setLinfocitosAtipicosPercentStatic = (value) => {
        setLinfocitosAtipicosPercent(parseFloat(value))
        refresh()
    }
    const setLinfocitosAtipicosMilmmStatic = (value) => {
        setLinfocitosAtipicosMilmm(parseFloat(value))
        refresh()
    }
    const setMonocitoPercentStatic = (value) => {
        setMonocitoPercent(parseFloat(value))
        refresh()
    }
    const setMonocitoMilmmStatic = (value) => {
        setMonocitoMilmm(parseFloat(value))
        refresh()
    }
    const setPlasmocitoPercentStatic = (value) => {
        setPlasmocitoPercent(parseFloat(value))
        refresh()
    }
    const setPlasmocitoMilmmStatic = (value) => {
        setPlasmocitoMilmm(parseFloat(value))
        refresh()
    }

    const setLeucoStates = () => {
        const leucogramaStates = {
            leucocitos,
            celulasBlasticas,
            promielocito: `${promielocitoPercent};${promielocitoMilmm}`,
            mielocito: `${mielocitoPercent};${mielocitoMilmm}`,
            metamielocito: `${metamielocitoPercent};${metamielocitoMilmm}`,
            bastonete: `${bastonetePercent};${bastoneteMilmm}`,
            segmentado: `${segmentadoPercent};${segmentadoMilmm}`,
            eosinofilo: `${eosinofiloPercent};${eosinofiloMilmm}`,
            basofilo: `${basofiloPercent};${basofiloMilmm}`,
            linfocitos: `${linfocitosPercent};${linfocitosMilmm}`,
            linfocitosAtipicos: `${linfocitosAtipicosPercent};${linfocitosAtipicosMilmm}`,
            monocito: `${monocitoPercent};${monocitoMilmm}`,
            plasmocito: `${plasmocitoPercent};${plasmocitoMilmm}`
        }
        props.setLeucoStates(leucogramaStates)
    }

    return(
        <React.Fragment>
            <br/>
            <h3>Leucograma</h3>
            <div className="centered-row">
                <Input name="leucocitos" title="Leucócitos (mil/mm³)" setValue={setLeucocitosStatic} value={leucocitos} type="number"/> 
                <Input name="celulasBlasticas" title="Células Blásticas (mil/mm³)" setValue={setCelulasBlasticasStatic} value={celulasBlasticas}type="number" />
            </div>
            <div className="centered-row">
                <Input name="promielocitoPercent" title="Promielócitos (%)" setValue={setPromielocitoPercentStatic} value={promielocitoPercent} type="number" />
                <Input name="promielocitoMilmm" title="Promielócitos (mil/mm³)" setValue={setPromielocitoMilmmStatic} value={promielocitoMilmm} type="number" />
            </div>
            <div className="centered-row">
                <Input name="mielocitoPercent" title="Mielócitos (%)" setValue={setMielocitoPercentStatic} value={mielocitoPercent} type="number" />
                <Input name="mielocitoMilmm" title="Mielócitos (mil/mm³)" setValue={setMielocitoMilmmStatic} value={mielocitoMilmm} type="number" />
            </div>
            <div className="centered-row">
                <Input name="metamielocitoPercent" title="Metamielócitos (%)" setValue={setMetamielocitoPercentStatic} value={metamielocitoPercent} type="number" />
                <Input name="metamielocitoMilmm" title="Metamielócitos (mil/mm³)" setValue={setMetamielocitoMilmmStatic} value={metamielocitoMilmm} type="number" />
            </div>
            <div className="centered-row">
                <Input name="bastonetePercent" title="Bastonetes (%)" setValue={setBastonetePercentStatic} value={bastonetePercent} type="number" />
                <Input name="bastoneteMilmm" title="Bastonetes (mil/mm³)" setValue={setBastoneteMilmmStatic} value={bastoneteMilmm} type="number" />
            </div>
            <div className="centered-row">
                <Input name="segmentadoPercent" title="Segmentado (%)" setValue={setSegmentadoPercentStatic} value={segmentadoPercent} type="number" />
                <Input name="segmentadoMilmm" title="Segmentado (mil/mm³)" setValue={setSegmentadoMilmmStatic} value={segmentadoMilmm} type="number" />
            </div>
            <div className="centered-row">
                <Input name="eosinofiloPercent" title="Eosinófilos (%)" setValue={setEosinofiloPercentStatic} value={eosinofiloPercent} type="number" />
                <Input name="eosinofiloMilmm" title="Eosinófilos (mil/mm³)" setValue={setEosinofiloMilmmStatic} value={eosinofiloMilmm} type="number" />
            </div>
            <div className="centered-row">
                <Input name="basofiloPercent" title="Basófilos (%)" setValue={setBasofiloPercentStatic} value={basofiloPercent} type="number" />
                <Input name="basofiloMilmm" title="Basófilos (mil/mm³)" setValue={setBasofiloMilmmStatic} value={basofiloMilmm} type="number" />
            </div>
            <div className="centered-row">
                <Input name="linfocitosPercent" title="Linfócitos (%)" setValue={setLinfocitosPercentStatic} value={linfocitosPercent} type="number" />
                <Input name="linfocitosMilmm" title="Linfócitos (mil/mm³)" setValue={setLinfocitosMilmmStatic} value={linfocitosMilmm} type="number" />
            </div>
            <div className="centered-row">
                <Input name="linfocitosAtipicosPercent" title="Linfócitos Atípicos (%)" setValue={setLinfocitosAtipicosPercentStatic} value={linfocitosAtipicosPercent} type="number" />
                <Input name="linfocitosAtipicosMilmm" title="Linfócitos Atípicos (mil/mm³)" setValue={setLinfocitosAtipicosMilmmStatic} value={linfocitosAtipicosMilmm} type="number" />
            </div>
            <div className="centered-row">
                <Input name="monocitoPercent" title="Monócitos (%)" setValue={setMonocitoPercentStatic} value={monocitoPercent} type="number" />
                <Input name="monocitoMilmm" title="Monócitos (mil/mm³)" setValue={setMonocitoMilmmStatic} value={monocitoMilmm} type="number" />
            </div>
            <div className="centered-row">
                <Input name="plasmocitoPercent" title="Plasmócitos (%)" setValue={setPlasmocitoPercentStatic} value={plasmocitoPercent} type="number" />
                <Input name="plasmocitoMilmm" title="Plasmócitos (mil/mm³)" setValue={setPlasmocitoMilmmStatic} value={plasmocitoMilmm} type="number" />
            </div>
        </React.Fragment>
    )
}
