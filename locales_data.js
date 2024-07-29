
const BERNAL_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9OPPzWnQ9MY2rEOfagp_z6EtjG9wUMzcmsYrjHxwvkNjqledSICKveN1JcnsV5ZLO48oyXduTMWZ4/pub?gid=0&single=true&output=csv"
const RIVERA_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR9OPPzWnQ9MY2rEOfagp_z6EtjG9wUMzcmsYrjHxwvkNjqledSICKveN1JcnsV5ZLO48oyXduTMWZ4/pub?gid=104921192&single=true&output=csv"




async function colaboradoress() {
    const csvData = await fetch(BERNAL_SHEET)
        .then((res) => res.text())
        .then((csv) =>
            csv.split("\n")
                .slice(1)
                .map((row) => {
                    const [legajo, nombre] = row.split(",");
                    return { legajo, nombre };
                })
        );

    console.log(csvData.length)
    return csvData;
}



const colaboradores =  colaboradoress();
console.log(colaboradores.length)

const colaborado = [
//  |Legajo  [0]   |Nombre [1]
 // [ "131054" ,   "Francisco Raffin"     ],
    [ "131043" ,   "Samuel De Los Santos" ],
    [ "131065" ,   "Milagros Birtos"      ],
    [ "131045" ,   "Rochio Marino 👑"     ],
    [ "131046" ,   "Lautaro Perez"        ],
    [ "131047" ,   "Facundo Barta"        ],
    [ "131053" ,   "Franco Delgado"       ],
    [ "131018" ,   "Rocio Miranda"        ],
    [ "131021" ,   "Alejo Aguirre"        ],
    [ "B9830" ,    "Erica Rosso"          ],
    [ "131057" ,   "Florencia Ayala"      ],
   // [ "95085" ,    "Agustin Cornejo"     ],
    [ "131005" ,   "Lautaro  Lezcano"     ],
    [ "61379" ,    "Agustina Amodeo"      ],
    [ "131062" ,   "Natanael Gomez"       ],
    [ "131067" ,   "Danilo Torres"        ],
    [ "131066" ,   "Fray Alucena"         ],
    //[ "131055" ,   "Luna Zugasti"         ],
    [ "B6654"  ,   "Yamila Bizarap"       ],
    [ "81164"  ,   "Juan Pablo"           ],
    [ "95140"  ,   "Milena"               ]
];





console.log(colaboradores)
console.log(colaboradoress())

    





