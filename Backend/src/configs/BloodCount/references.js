/**
 * CHANGE
 * ALL
 * VALUES
 * 
 * with something more 'usable'
 */

module.exports = {
    MaleReferences: {
        eritograma: {
            eritrocitos: [4.20, 6.10], // millions/mm³
            hemoglobina: [12.0, 18.0], // g/dL
            hematocrito: [37.0, 52.0], // %
            vcm: [80.0, 99.0],         // um³
            hcm: [27.0, 31.0],         // pg
            chcm: [32.0, 36.0],        // g/dL
            rdw: [11.5, 15.5]          // %
        },
        leucograma: {
            leucocitos: [4.40, 10.5],                        // thousand/mm³
            celulasBlasticas: [null, null],                  // thousand/mm³
            promielocito: [[null, null],[null, null]],       // % || thousand/mm³
            mielocito: [[null, null],[null, null]],          // % || thousand/mm³
            metamielocito: [[null, null],[null, null]],      // % || thousand/mm³
            bastonete: [[48.0, 71.5],[0.0, 1.0]],            // % || thousand/mm³
            segmentado: [[48.0, 71.5],[0.0, 1.0]],           // % || thousand/mm³
            eosinofilo: [[0.0, 5.0],[0.0, 1.0]],             // % || thousand/mm³
            basofilo: [[0.0, 3.0],[0.0, 1.0]],               // % || thousand/mm³
            linfocitos: [[19.0, 50.0],[0.0, 1.0]],           // % || thousand/mm³
            linfocitosAtipico: [[null, null],[null, null]],  // % || thousand/mm³
            monocito: [[2.0, 12.0],[0.0, 1.0]],              // % || thousand/mm³
            plasmocito: [[null, null],[null, null]],         // % || thousand/mm³
        },
        plaquetario: {
            plaquetas: [130.0, 400.0]   // thousand/mm³
        }
    },

    FemaleReferences: {
        eritograma: {
            eritrocitos: [4.20, 6.10], // millions/mm³
            hemoglobina: [12.0, 18.0], // g/dL
            hematocrito: [37.0, 52.0], // %
            vcm: [80.0, 99.0],         // um³
            hcm: [27.0, 31.0],         // pg
            chcm: [32.0, 36.0],        // g/dL
            rdw: [11.5, 15.5]          // %
        },
        leucograma: {
            leucocitos: [4.40, 10.5],                        // thousand/mm³
            celulasBlasticas: [null, null],                  // thousand/mm³
            promielocito: [[null, null],[null, null]],       // % || thousand/mm³
            mielocito: [[null, null],[null, null]],          // % || thousand/mm³
            metamielocito: [[null, null],[null, null]],      // % || thousand/mm³
            bastonete: [[48.0, 71.5],[0.0, 1.0]],            // % || thousand/mm³
            segmentado: [[48.0, 71.5],[0.0, 1.0]],           // % || thousand/mm³
            eosinofilo: [[0.0, 5.0],[0.0, 1.0]],           // % || thousand/mm³
            basofilo: [[0.0, 3.0],[0.0, 1.0]],             // % || thousand/mm³
            linfocitos: [[19.0, 50.0],[0.0, 1.0]],           // % || thousand/mm³
            linfocitosAtipico: [[null, null],[null, null]],  // % || thousand/mm³
            monocito: [[2.0, 12.0],[0.0, 1.0]],             // % || thousand/mm³
            plasmocito: [[null, null],[null, null]],         // % || thousand/mm³
        },
        plaquetario: {
            plaquetas: [130.0, 400.0]   // thousand/mm³
        }
    }
}
