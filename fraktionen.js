/*
========================================================
FraktionsFinder 1848
fraktionen.js
Teil 1 von 2
========================================================
*/

const factions = {

casino:{

    name:"Casino",

    color:"#1f4e79",

    ideology:"Nationalliberal",

    shortDescription:
        "Du vertrittst gemäßigt liberale Positionen. Du befürwortest einen deutschen Nationalstaat mit einer konstitutionellen Monarchie.",

    description:
        "Das Casino war die größte und einflussreichste Fraktion der Frankfurter Nationalversammlung. Ihre Mitglieder wollten Deutschland unter einem erblichen Kaiser einigen, gleichzeitig aber eine moderne Verfassung, einen Rechtsstaat und garantierte Grundrechte schaffen. Revolutionäre Veränderungen lehnten sie überwiegend ab und setzten stattdessen auf Reformen.",

    representatives:[
        "Heinrich von Gagern",
        "Eduard Simson",
        "Georg Beseler"
    ],

    positions:[
        "Konstitutionelle Monarchie",
        "Erblicher Kaiser",
        "Kleindeutsche Lösung",
        "Rechtsstaat",
        "Grundrechte",
        "Nationalstaat",
        "Schrittweise Reformen"
    ]

},

wuerttembergerhof:{

    name:"Württemberger Hof",

    color:"#4f81bd",

    ideology:"Liberalkonservativ",

    shortDescription:
        "Du vertrittst liberale Reformen, möchtest aber den deutschen Einzelstaaten viele Rechte erhalten.",

    description:
        "Der Württemberger Hof stand dem Casino nahe, legte jedoch größeren Wert auf den Föderalismus. Die Fraktion unterstützte eine konstitutionelle Monarchie und eine Verfassung, wollte aber die Selbstständigkeit der deutschen Einzelstaaten stärker bewahren.",

    representatives:[
        "Karl Mathy",
        "Johann Gustav Heckscher"
    ],

    positions:[
        "Konstitutionelle Monarchie",
        "Föderalismus",
        "Grundrechte",
        "Verfassung",
        "Zusammenarbeit mit den Fürsten",
        "Parlamentarische Mitwirkung"
    ]

},

landsberg:{

    name:"Landsberg",

    color:"#5b9bd5",

    ideology:"Linksliberal",

    shortDescription:
        "Du bevorzugst einen liberalen Verfassungsstaat mit einem starken Parlament und einer verantwortlichen Regierung.",

    description:
        "Die Fraktion Landsberg bildete den Übergang zwischen den gemäßigten Liberalen und den Demokraten. Sie wollte den Einfluss des Parlaments deutlich stärken, hielt aber grundsätzlich an einer konstitutionellen Monarchie fest.",

    representatives:[
        "Friedrich Daniel Bassermann",
        "Carl Theodor Welcker"
    ],

    positions:[
        "Starkes Parlament",
        "Verantwortliche Regierung",
        "Grundrechte",
        "Konstitutionelle Monarchie",
        "Liberale Reformpolitik",
        "Nationale Einheit"
    ]

},

cafemilani:{

    name:"Café Milani",

    color:"#8064a2",

    ideology:"Liberales Zentrum",

    shortDescription:
        "Du suchst den Ausgleich zwischen gemäßigten Liberalen und Demokraten und bevorzugst politische Kompromisse.",

    description:
        "Das Café Milani war eine kleinere Gruppierung im liberalen Zentrum. Die Abgeordneten unterstützten eine freiheitliche Verfassung, parlamentarische Reformen und eine stärkere politische Beteiligung der Bevölkerung, versuchten aber häufig zwischen den politischen Lagern zu vermitteln.",

    representatives:[
        "Johannes von Miquel"
    ],

    positions:[
        "Kompromisspolitik",
        "Grundrechte",
        "Parlamentarismus",
        "Liberale Reformen",
        "Mehr Bürgerbeteiligung",
        "Nationalstaat"
    ]

},augsburgerhof:{

    name:"Augsburger Hof",

    color:"#70ad47",

    ideology:"Demokratisch-liberal",

    shortDescription:
        "Du setzt dich für einen demokratischen Verfassungsstaat mit einem starken Parlament und einer breiten politischen Beteiligung ein.",

    description:
        "Der Augsburger Hof gehörte zum linken Zentrum der Frankfurter Nationalversammlung. Die Fraktion unterstützte demokratische Reformen, ein erweitertes Wahlrecht und eine stärkere parlamentarische Kontrolle der Regierung. Sie strebte Veränderungen auf gesetzlichem Weg an und grenzte sich von radikalen Revolutionären ab.",

    representatives:[
        "Robert Blum",
        "Franz Jacob Wigard"
    ],

    positions:[
        "Demokratischer Verfassungsstaat",
        "Erweitertes Wahlrecht",
        "Parlamentarische Regierung",
        "Grundrechte",
        "Nationale Einheit",
        "Friedliche Reformen"
    ]

},

westendhall:{

    name:"Westendhall",

    color:"#ffc000",

    ideology:"Linke Demokraten",

    shortDescription:
        "Du vertrittst demokratische Positionen und möchtest die Macht von Monarchen deutlich begrenzen.",

    description:
        "Die Fraktion Westendhall gehörte zum linken Flügel der Nationalversammlung. Sie forderte eine weitgehende Demokratisierung des politischen Systems, ein allgemeines Wahlrecht und eine Regierung, die dem Parlament verantwortlich ist. Im Gegensatz zum Donnersberg setzte sie jedoch stärker auf parlamentarische Mehrheiten als auf revolutionäre Mittel.",

    representatives:[
        "Johann Jacoby"
    ],

    positions:[
        "Demokratie",
        "Allgemeines Wahlrecht",
        "Starkes Parlament",
        "Bürgerrechte",
        "Begrenzung der Monarchie",
        "Politische Reformen"
    ]

},

deutscherhof:{

    name:"Deutscher Hof",

    color:"#ed7d31",

    ideology:"Radikaldemokratisch",

    shortDescription:
        "Du befürwortest weitreichende demokratische Reformen und eine umfassende politische Mitbestimmung der Bevölkerung.",

    description:
        "Der Deutsche Hof gehörte zum linken Lager der Paulskirche. Seine Mitglieder verlangten ein allgemeines Wahlrecht, eine parlamentarisch verantwortliche Regierung und umfangreiche politische Freiheitsrechte. Auch soziale Reformen spielten eine größere Rolle als bei den liberalen Fraktionen.",

    representatives:[
        "Ludwig Simon",
        "Moritz Hartmann"
    ],

    positions:[
        "Volkssouveränität",
        "Allgemeines Wahlrecht",
        "Parlamentarische Demokratie",
        "Soziale Reformen",
        "Bürgerrechte",
        "Nationale Einheit"
    ]

},

donnersberg:{

    name:"Donnersberg",

    color:"#c00000",

    ideology:"Republikanisch-radikaldemokratisch",

    shortDescription:
        "Du stehst für eine Republik, umfassende Demokratie und tiefgreifende politische sowie soziale Veränderungen.",

    description:
        "Der Donnersberg war die linksradikalste Fraktion der Frankfurter Nationalversammlung. Ihre Mitglieder lehnten die Monarchie grundsätzlich ab und forderten eine demokratische Republik, allgemeines Wahlrecht sowie weitreichende Freiheits- und Mitbestimmungsrechte. Viele Abgeordnete hielten revolutionären Widerstand für legitim, wenn die Ziele der Revolution von 1848 nicht auf parlamentarischem Weg erreicht werden konnten.",

    representatives:[
        "Arnold Ruge",
        "Friedrich Hecker",
        "Gustav Struve"
    ],

    positions:[
        "Republik",
        "Volkssouveränität",
        "Allgemeines Wahlrecht",
        "Soziale Gerechtigkeit",
        "Umfassende Grundrechte",
        "Revolution als letztes Mittel"
    ]

}

};