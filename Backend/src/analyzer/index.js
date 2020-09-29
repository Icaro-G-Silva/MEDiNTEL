const references = require('../configs/BloodCount/references')

const HIGH = 1
const LOW = 0

function analyzeEritograma(variablesObject, sex) {
    const referenceObj = (sex == 'masculino') ? references.MaleReferences.eritograma : references.FemaleReferences.eritograma
    var possibleDeviations = []
    const notes = 'Toda a análise foi feita considerando apenas os valores no eritograma, considerando índice de reticulócitos < 1.5, em hipoproliferativa. ' +
    'Ácido Fólico (Folato) é utilizado no Brasil para fortificar a farinha, porém o folato "Oculta" os problemas com a B12. Sendo assim, dificilmente se vê o VCM Alto, porém pode ser que tenha algo ali. É sempre bom se precaver'
    
    //Poliglobulia/Policitemia
    if(variablesObject.hemoglobina > referenceObj.hemoglobina[HIGH]) {
        var why = 'Hemoglobina Alta'
        if(variablesObject.eritrocitos > referenceObj.eritrocitos[HIGH]) why += ', Eritrocitos Altos'
        if(variablesObject.hematocrito > referenceObj.hematocrito[HIGH]) why += ', Hematócrito Alto'
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
            deviation += ' Microcítica'
            why += ', VCM Baixo'
        }
        else if(variablesObject.VCM > referenceObj.vcm[HIGH]) {
            deviation += ' Macrocítica'
            why += ', VCM Alto'
        }
        else {
            deviation += ' Normocítica'
            why += ', VCM normal'
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
    const referenceObj = (sex == 'masculino') ? references.MaleReferences.leucograma : references.FemaleReferences.leucograma
    var possibleDeviations = []
    
    //Leucocitose
    if(variablesObject.leucocitos > referenceObj.leucocitos[HIGH]) {
        possibleDeviations.push({
            deviation: 'Leucocitose',
            why: 'Leucócitos Altos',
            causes: ['Infecções Virais', 'Infecções Bacterianas', 'Inflamação aguda ou crônica', 'Leucemias'],
            recomendations: []
        })
    }
    //Leucopenia
    else if(variablesObject.leucocitos < referenceObj.leucocitos[LOW]) {
        possibleDeviations.push({
            deviation: 'Leucopenia',
            why: 'Leucócitos Baixos',
            causes: ['Imunosupressão', 'Anemias graves', 'Neutropenia (Mais comum)', 'Intoxicação por agentes mielotóxicos'],
            recomendations: []
        })
    }

    //Neutrofilia
    if(variablesObject.segmentados > referenceObj.segmentado[1][HIGH]) {
        possibleDeviations.push({
            deviation: 'Neutrofilia',
            why: 'Segmentados Altos',
            causes: ['Choro/Pânico na hora da coleta', 'Exercício físico antes da coleta', 'Infecções'],
            recomendations: []
        })
    }
    //Neutropenia
    else if(variablesObject.segmentados < referenceObj.segmentado[1][LOW]) {
        possibleDeviations.push({
            deviation: 'Neutropenia',
            why: 'Segmentados Baixos',
            causes: ['Radiação/Quimioterapia'],
            recomendations: []
        })
    }

    //Linfocitose
    if(variablesObject.linfocitos > referenceObj.linfocitos[1][HIGH]) {
        if(variablesObject.monocitos > referenceObj.monocito[1][HIGH]) {
            possibleDeviations.push({
                deviation: 'Linfocitose',
                why: 'Linfócitos Altos',
                causes: ['Fase de cura das infecções bacterianas'],
                recomendations: []
            })
        } else {
            possibleDeviations.push({
                deviation: 'Linfocitose',
                why: 'Linfócitos Altos',
                causes: ['Infecções Virais'],
                recomendations: []
            })
        }
    }
    //Linfopenia
    else if(variablesObject.linfocitos < referenceObj.linfocitos[1][LOW]) {
        possibleDeviations.push({
            deviation: 'Linfopenia',
            why: 'Linfócitos Baixos',
            causes: ['Estresse', 'Radioterapia/Quimioterapia', 'AIDS', 'Sepse', 'Leucemia'],
            recomendations: []
        })
    }

    //Monocitopenia
    if(variablesObject.monocitos < referenceObj.monocito[1][LOW]) {
        possibleDeviations.push({
            deviation: 'Monocitopenia',
            why: 'Monócitos Baixos',
            causes: ['Estresse', 'Infecções', 'Falta de Proteínas'],
            recomendations: []
        })
    }
    //Monocitose
    else if(variablesObject.monocitos > referenceObj.monocito[1][HIGH]) {
        possibleDeviations.push({
            deviation: 'Monocitose',
            why: 'Monócitos Altos',
            causes: [],
            recomendations: []
        })
    }

    //Eosinofilia
    if(variablesObject.eosinofilos > referenceObj.eosinofilo[1][HIGH]) {
        possibleDeviations.push({
            deviation: 'Eosinofilia',
            why: 'Eosinófilos Altos',
            causes: ['Parasitose', 'Doenças alérgicas', 'Reações a medicamentos'],
            recomendations: []
        })
    }

    //Basofilia
    if(variablesObject.basofilos > referenceObj.basofilo[1][HIGH]) {
        possibleDeviations.push({
            deviation: 'Basofilia',
            why: 'Basófilos Altos',
            causes: ['Alergias imediatas (com IgE)', 'Helmintíases', 'Crise blástica em leucemia mielóide crônica'],
            recomendations: []
        })
    }

    //Grandes chances de Problemas Cardio-vasculares
    if(variablesObject.linfocitos > referenceObj.linfocitos[1][HIGH] ||
        variablesObject.monocitos > referenceObj.monocito[1][HIGH] ||
        variablesObject.segmentados > referenceObj.segmentado[1][HIGH] ||
        variablesObject.bastonetes > referenceObj.bastonete[1][HIGH] ||
        variablesObject.leucocitos > referenceObj.leucocitos[HIGH]) {
            possibleDeviations.push({
                deviation: 'Chances de desenvolver problemas cardio-vasculares',
                why: 'Linfócitos/Monócitos/Neutrófilos/Leucócitos Altos',
                causes: [],
                recomendations: []
            })
        }
    
    //Presença de Celulas Imaturas
    if(variablesObject.metamielocitos > 0 || variablesObject.mielocitos > 0 || variablesObject.promielocitos > 0 || variablesObject.blastos > 0) {
        possibleDeviations.push({
            deviation: 'Presença de Células Imaturas',
            why: 'Presença de Metamielócitos/Mielócitos/Promielócitos/Blastos',
            causes: ['Leucemia (Primeira indicação)', 'Infecções', 'Terapias com fatores de crescimento'],
            recomendations: []
        })
    }

    if(possibleDeviations.length >= 1) {
        return possibleDeviations
    } else return false
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

module.exports = {
    analyzeEritograma,
    analyzeLeucograma,
    analyzePlaquetario
}
