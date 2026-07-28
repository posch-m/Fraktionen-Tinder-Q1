/*
========================================================
FraktionsFinder 1848
fraktionen.js
Teil 1 von 2
========================================================
*/

const factions = {

    casino: {

        name: "Casino",

        wing: "Konservativ-liberaler Flügel",

        color: "#1f4e79",

        ideology: "Konstitutionell-liberal",

        shortDescription:
            "Du bevorzugst Reformen auf gesetzlichem Weg, eine konstitutionelle Monarchie und einen starken Nationalstaat.",

        description:
            "Die Casino-Fraktion bildete die stärkste Gruppierung der Frankfurter Nationalversammlung. Sie setzte sich für einen deutschen Nationalstaat mit konstitutioneller Monarchie, Gewaltenteilung und bürgerlichen Freiheitsrechten ein. Revolutionäre Umbrüche lehnte sie jedoch ab und bevorzugte einen schrittweisen Wandel.",

        representatives: [

            "Heinrich von Gagern",
            "Eduard Simson",
            "Georg Beseler"

        ],

        positions: [

            "Konstitutionelle Monarchie",
            "Grundrechte",
            "Nationalstaat",
            "Gewaltenteilung",
            "Parlament",
            "Starker Rechtsstaat"

        ]

    },

    wuerttembergerhof: {

        name: "Württemberger Hof",

        wing: "Konservativ-liberaler Flügel",

        color: "#3d6da8",

        ideology: "Gemäßigt liberal",

        shortDescription:
            "Du befürwortest Reformen, möchtest aber bestehende staatliche Strukturen weitgehend erhalten.",

        description:
            "Der Württemberger Hof stand politisch zwischen konservativen Kräften und dem liberalen Zentrum. Die Mitglieder unterstützten Freiheitsrechte und einen deutschen Nationalstaat, wollten Veränderungen jedoch möglichst ohne revolutionäre Zuspitzung erreichen.",

        representatives: [

            "Karl Mathy",
            "Friedrich Römer"

        ],

        positions: [

            "Konstitutionelle Monarchie",
            "Bürgerliche Freiheitsrechte",
            "Schrittweise Reformen",
            "Nationalstaat",
            "Rechtsstaat"

        ]

    },

    landsberg: {

        name: "Landsberg",

        wing: "Liberales Zentrum",

        color: "#6aa84f",

        ideology: "Liberales Zentrum",

        shortDescription:
            "Du vertrittst liberale Positionen und setzt auf einen Ausgleich zwischen Reform und Stabilität.",

        description:
            "Die Fraktion Landsberg gehörte zum liberalen Zentrum der Nationalversammlung. Sie strebte einen deutschen Nationalstaat mit Verfassung und Grundrechten an und suchte häufig den Kompromiss zwischen den politischen Lagern.",

        representatives: [

            "Johann Gustav Heckscher",
            "Friedrich Daniel Bassermann"

        ],

        positions: [

            "Verfassung",
            "Grundrechte",
            "Parlament",
            "Kompromisse",
            "Nationalstaat"

        ]

    },

    cafemilani: {

        name: "Café Milani",

        wing: "Liberales Zentrum",

        color: "#8bc34a",

        ideology: "Linksliberal",

        shortDescription:
            "Du befürwortest umfangreiche Freiheitsrechte und weitreichende parlamentarische Mitbestimmung.",

        description:
            "Das Café Milani stand innerhalb des liberalen Spektrums weiter links. Die Abgeordneten unterstützten demokratische Reformen, wollten diese jedoch überwiegend auf parlamentarischem Weg durchsetzen.",

        representatives: [

            "Carl Theodor Welcker",
            "Karl Theodor Welcker"

        ],

        positions: [

            "Parlamentarische Regierung",
            "Grundrechte",
            "Freiheitsrechte",
            "Demokratische Reformen",
            "Nationalstaat"

        ]

    },    augsburgerhof: {

        name: "Augsburger Hof",

        wing: "Demokratischer Flügel",

        color: "#f39c12",

        ideology: "Gemäßigt demokratisch",

        shortDescription:
            "Du setzt dich für eine stärkere Parlamentarisierung und eine Ausweitung demokratischer Mitbestimmung ein.",

        description:
            "Der Augsburger Hof gehörte zum demokratischen Flügel der Frankfurter Nationalversammlung. Seine Mitglieder befürworteten eine stärkere Kontrolle der Regierung durch das Parlament, eine Ausweitung politischer Mitbestimmung und einen deutschen Nationalstaat auf demokratischer Grundlage.",

        representatives: [

            "Franz Raveaux",
            "Christian Kapp"

        ],

        positions: [

            "Parlamentarische Regierung",
            "Demokratische Mitbestimmung",
            "Grundrechte",
            "Nationalstaat",
            "Stärkung des Parlaments"

        ]

    },

    westendhall: {

        name: "Westendhall",

        wing: "Demokratischer Flügel",

        color: "#e67e22",

        ideology: "Demokratisch",

        shortDescription:
            "Du befürwortest eine weitgehende Demokratisierung Deutschlands und eine starke Rolle des Volkes.",

        description:
            "Die Westendhall-Fraktion vertrat konsequent demokratische Positionen. Sie setzte sich für Volkssouveränität, eine parlamentarisch verantwortliche Regierung und umfangreiche politische Freiheitsrechte ein.",

        representatives: [

            "Robert Blum",
            "Franz Jacob Wigard"

        ],

        positions: [

            "Volkssouveränität",
            "Parlamentarische Demokratie",
            "Umfassende Grundrechte",
            "Pressefreiheit",
            "Verantwortliche Regierung"

        ]

    },

    deutscherhof: {

        name: "Deutscher Hof",

        wing: "Radikaldemokratischer Flügel",

        color: "#c0392b",

        ideology: "Radikaldemokratisch",

        shortDescription:
            "Du vertrittst deutlich demokratische Positionen und bist bereit, tiefgreifende Veränderungen des politischen Systems vorzunehmen.",

        description:
            "Der Deutsche Hof gehörte zum linken Flügel der Nationalversammlung. Die Abgeordneten forderten eine demokratische Republik, umfassende Bürgerrechte und weitreichende politische Reformen.",

        representatives: [

            "Ludwig Simon",
            "Julius Fröbel"

        ],

        positions: [

            "Republik",
            "Volkssouveränität",
            "Allgemeines Wahlrecht",
            "Umfassende Grundrechte",
            "Demokratische Reformen"

        ]

    },

    donnersberg: {

        name: "Donnersberg",

        wing: "Radikaldemokratischer Flügel",

        color: "#a93226",

        ideology: "Radikaldemokratisch",

        shortDescription:
            "Du forderst einen grundlegenden politischen Neuanfang mit einer demokratischen Republik und umfassender Volkssouveränität.",

        description:
            "Der Donnersberg war die linkeste Fraktion der Frankfurter Nationalversammlung. Ihre Mitglieder traten für eine demokratische Republik, allgemeines Wahlrecht, soziale Reformen und eine konsequente Umsetzung der Volkssouveränität ein. Viele ihrer Forderungen gingen den liberalen Mehrheiten deutlich zu weit.",

        representatives: [

            "Arnold Ruge",
            "Friedrich Hecker",
            "Lorenz Brentano"

        ],

        positions: [

            "Demokratische Republik",
            "Volkssouveränität",
            "Allgemeines Wahlrecht",
            "Soziale Reformen",
            "Pressefreiheit",
            "Versammlungsfreiheit"

        ]

    }

};