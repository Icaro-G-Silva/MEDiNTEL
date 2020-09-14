const references = require('../configs/BloodCount/references')

const HIGH = 1
const LOW = 0

function analyzeEritograma(variablesObject, sex) {
    const referenceObj = (sex == 'masculino') ? references.MaleReferences.eritograma : references.FemaleReferences.eritograma
    var possibleDeviations = []
    const notes = 'Toda a análise foi feita considerando apenas os valores no eritograma, considerando índice de reticulócitos < 1,5, em hipoproliferativa\n\n' +
    'Ácido Fólico (Folato) é utilizado no Brasil para fortificar a farinha, porém o folato "Oculta" os problemas com a B12. Sendo assim, dificilmente se vê o VCM Alto, porém pode ser que tenha algo ali. É sempre bom se precaver'
    
    //Poliglobulia/Policitemia
    if(variablesObject.hemoglobina > referenceObj.hemoglobina[HIGH]) {
        var why = 'Hemoglobina Alta'
        if(variablesObject.eritrocitos > referenceObj.eritrocitos[HIGH]) why.concat(', Eritrocitos Altos')
        if(variablesObject.hematocrito > referenceObj.hematocrito[HIGH]) why.concat(', Hematócrito Alto')
        possibleDeviations.push({
            deviation: 'Poliglobulia',
            why,
            causes: ['Hipóxia (Tabagismo, altitude etc..)', 'Neoplasias', 'Uso de eritropoetina'],
            recomendations: []
        })
    }
    //Anemias
    else if(variablesObject.hemoglobina < referenceObj.hemoglobina[LOW]) {
        var deviation = 'Anemia'
        var why = 'Hemoglobina Baixa'
        if(variablesObject.VCM < referenceObj.vcm[LOW]) {
            deviation.concat(' Microcítica')
            why.concat(', VCM Baixo')
        }
        else if(variablesObject.VCM > referenceObj.vcm[HIGH]) {
            deviation.concat(' Macrocítica')
            why.concat(', VCM Alto')
        }
        else {
            deviation.concat(' Normocítica')
            why.concat(', VCM normal')
        }

        if(deviation == 'Anemia Microcítica') {
            possibleDeviations.push({
                deviation,
                why,
                causes: ['Deficiência de Ferro (Anemia ferropênica ou Hemoglobinopatias)'],
                recomendations: ['Colher amostra de ferritina para resultados mais precisos', 'Se o resultado não for relacionado a Anemia Ferropriva, verificar se a pessoa tem Talassemia pelo histórico']
            })
        } else if(deviation == 'Anemia Macrocítica') {
            possibleDeviations.push({
                deviation,
                why,
                causes: ['Deficiência da B9 e B12'],
                recomendations: ['Colher amostra de ferritina para resultados mais precisos', 'Pode ser Anemia Megaloblástica, neste caso é aconselhável a medir o Ácido Metilmalônico. Se Ácido Metilmalônico estiver alto, B12 está baixa, então pode ser que seja Anemia Perniciosa, se caso B12 estiver muito alta, pode ser indicativo de câncer. Exceto derivação de suplementação. Se caso houve diminuição dos glóbulos brancos e plaquetas devido à deficiência de B12, pode ser Anemia de Fanconi']
            })
        } else {
            possibleDeviations.push({
                deviation,
                why,
                causes: ['Doença Crônica (Anemia da inflamação)', 'Anticorpos destruindo células sanguíneas (Em caso de Anemia Hemolítica)', 'Anemia genética (Em caso de Anemia Falciforme)', 'Medula óssea diminuindo produção das células vermelhas (Em caso de Anemia Aplástica)'],
                recomendations: ['Colher amostra de ferritina para resultados mais precisos']
            })
        }
    }
    //Índices Hematimétricos
    //Hipercromia
    if(variablesObject.CHCM > referenceObj.chcm[HIGH]) {
        possibleDeviations.push({
            deviation: 'Hipercromia',
            why: 'CHCM Alto',
            causes: ['Problemas na Tireóide', 'Consumo excessivo de álcool'],
            recomendations: []
        })
    }
    //Hipocromia
    else if(variablesObject.CHCM < referenceObj.chcm[LOW]) {
        possibleDeviations.push({
            deviation: 'Hipocromia',
            why: 'CHCM Baixo',
            causes: ['"Efeito colateral" da Anemia Ferropriva e/ou Talassemia'],
            recomendations: []
        })
    }
    //Anisocitose
    if(variablesObject.RDW > referenceObj.rdw[HIGH]) {
        possibleDeviations.push({
            deviation: 'Anisocitose',
            why: 'RDW Alto',
            causes: ['Geralmente associada com inflamação'],
            recomendations: ['Anisocitose é preditor de doenças cardio-vasculares, então é melhor se previnir']
        })
    }

    if(possibleDeviations.length >= 1) {
        possibleDeviations.push(notes)
        return possibleDeviations
    } else return false
}

function analyzeLeucograma(variablesObject, sex) {
    var possibleDeviations = []
    
    //Do the Conditional magics and append the Deviations to the array above.
}

function analyzePlaquetario(plaquetas, sex) {
    const referenceObj = (sex == 'masculino') ? references.MaleReferences.plaquetario : references.FemaleReferences.plaquetario
    var possibleDeviations = []
    
    //Trombocitose
    if(plaquetas > referenceObj.plaquetas[HIGH]) {
        possibleDeviations.push({
            deviation: 'Trombocitose',
            why: 'Plaquetas Altas',
            causes: ['Inflamação', 'Artrite reumatóide', 'Hemorragias (Elevação reativa)', 'pós-esplenectomia'],
            recomendations: []
        })
    }
    //Trombocitopenia
    else if(plaquetas < referenceObj.plaquetas[LOW]) {
        possibleDeviations.push({
            deviation: 'Trombocitopenia',
            why: 'Plaquetas Baixas',
            causes: ['Hemorragias', 'Trombose', 'Destruição periférica', 'Produção reduzida pela medula óssea', 'Púrpura trombocitopênica imune ou não imune'],
            recomendations: []
        })
    }
    //OK
    else return false
    return possibleDeviations
}

function analyzeHistory(patientId) {
    //Pass
}

//TEST Area

erito = {
    eritrocitos: 0.0,
    hemoglobina: 0.0,
    hematocrito: 0.0,
    VCM: 0.0,
    HCM: 0.0,
    CHCM: 0.0,
    RDW: 0.0
}

const res = analyzeEritograma(erito, 'masculino')
console.log(res)
