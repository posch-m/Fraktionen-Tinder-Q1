/*
========================================================
FraktionsFinder 1848
fraktionen.js
Historische Einordnung nach dem Deutschen Historischen Museum
========================================================
*/

const factions = {

    cafemilani: {
        name: "Café Milani",
        color: "#8064a2",
        wing: "Rechte",
        ideology: "Rechtskonservativ",

        shortDescription:
            "Du stehst für eine monarchisch-konservative Ordnung mit starken Rechten der deutschen Einzelstaaten.",

        description:
            "Das Café Milani war die rechts-konservative Fraktion der Frankfurter Nationalversammlung. Die Abgeordneten wollten einen großdeutsch-föderativen Staatenbund unter Wahrung monarchischer Verfassungselemente und der überlieferten Einrichtungen der Einzelstaaten. Die Nationalversammlung sollte keine eigenständige Machtstellung erhalten; auch die parlamentarische Kontrolle der Reichsregierung sollte möglichst gering bleiben.",

        representatives: [
            "Georg Ernst Friedrich Freiherr von Vincke",
            "Joseph von Radowitz",
            "Carl Ludwig Freiherr von Bruck"
        ],

        positions: [
            "Rechtskonservativ",
            "Großdeutsch-föderativer Staatenbund",
            "Wahrung monarchischer Elemente",
            "Wahrung der Einzelstaaten",
            "Geringe Macht der Nationalversammlung",
            "Minimale parlamentarische Kontrolle"
        ]
    },


    casino: {
        name: "Casino",
        color: "#1f4e79",
        wing: "Rechtes Zentrum",
        ideology: "Liberalkonservativ",

        shortDescription:
            "Du befürwortest eine konstitutionelle Monarchie mit einem erblichen Kaiser und einer starken Zentralgewalt.",

        description:
            "Das Casino war die größte Fraktion der Frankfurter Nationalversammlung und gehörte zum rechten Zentrum. Die Liberalen des Casino traten für eine starke Zentralgewalt und einen deutschen Nationalstaat mit einem erblichen Kaiser an der Spitze ein. Die Nationalversammlung sollte vor allem gesetzgeberische Aufgaben übernehmen.",

        representatives: [
            "Heinrich von Gagern",
            "Eduard Simson",
            "Georg Beseler"
        ],

        positions: [
            "Rechtes Zentrum",
            "Konstitutionelle Monarchie",
            "Erblicher Kaiser",
            "Starke Zentralgewalt",
            "Bundesstaatliche Ordnung",
            "Starke Stellung des Nationalstaates"
        ]
    },


    landsberg: {
        name: "Landsberg",
        color: "#5b9bd5",
        wing: "Rechtes Zentrum",
        ideology: "Gemäßigt liberal",

        shortDescription:
            "Du vertrittst eine liberale Verfassungsordnung und möchtest dem Parlament gegenüber dem Casino mehr Einfluss geben.",

        description:
            "Landsberg entstand im September 1848 aus einer Abspaltung von Abgeordneten des Casino und des Württemberger Hofs. Die Gruppe stand damit zwischen dem rechten und linken Zentrum. Entscheidend war insbesondere der Wunsch, dem Parlament gegenüber der Regierung größere Rechte einzuräumen.",

        representatives: [
            "Abgeordnete aus dem Casino",
            "Abgeordnete aus dem Württemberger Hof"
        ],

        positions: [
            "Gemäßigter Liberalismus",
            "Konstitutionelle Monarchie",
            "Stärkere parlamentarische Rechte",
            "Verfassungsstaat",
            "Kompromiss zwischen den liberalen Lagern"
        ]
    },


    augsburgerhof: {
        name: "Augsburger Hof",
        color: "#70ad47",
        wing: "Linkes Zentrum",
        ideology: "Gemäßigt liberal",

        shortDescription:
            "Du vertrittst eine liberale parlamentarische Ordnung, bevorzugst aber eine kleindeutsche Lösung.",

        description:
            "Der Augsburger Hof spaltete sich im September 1848 vom Württemberger Hof ab. Die entscheidende Abweichung betraf die Frage des Staatsgebietes: Während die Mehrheit des Württemberger Hofs eine großdeutsche Lösung bevorzugte, strebte der Augsburger Hof eine kleindeutsche Lösung an.",

        representatives: [
            "Abgeordnete des Württemberger Hofs"
        ],

        positions: [
            "Linkes Zentrum",
            "Liberalismus",
            "Parlamentarische Monarchie",
            "Kleindeutsche Lösung",
            "Starke Volksvertretung"
        ]
    },


    wuerttembergerhof: {
        name: "Württemberger Hof",
        color: "#4f81bd",
        wing: "Linkes Zentrum",
        ideology: "Linksliberal",

        shortDescription:
            "Du möchtest eine parlamentarische Monarchie mit einer starken Volksvertretung und einer vom Parlament abhängigen Regierung.",

        description:
            "Der Württemberger Hof beherbergte die linken Liberalen vor allem aus Mittel- und Kleinstaaten. Sie wollten eine parlamentarische Monarchie mit einer starken Volksvertretung. Die Reichsregierung sollte vom Vertrauen des Parlaments abhängig sein. Gleichzeitig bevorzugten sie eine bundesstaatliche Ordnung.",

        representatives: [
            "Robert von Mohl",
            "Friedrich Theodor Vischer"
        ],

        positions: [
            "Linke Liberale",
            "Parlamentarische Monarchie",
            "Starke Volksvertretung",
            "Parlamentarisch verantwortliche Reichsregierung",
            "Bundesstaatliche Ordnung",
            "Großdeutsche Lösung"
        ]
    },


    westendhall: {
        name: "Westendhall",
        color: "#ffc000",
        wing: "Demokratische Linke",
        ideology: "Gemäßigt demokratisch",

        shortDescription:
            "Du stehst für eine demokratische Linke und eine starke parlamentarische Vertretung des Volkes.",

        description:
            "Westendhall entstand als gemäßigt linke Fraktion aus Teilen des Deutschen Hofs und des Württemberger Hofs. Sie bildete damit ein Bindeglied zwischen den Liberalen und der demokratischen Linken.",

        representatives: [
            "Friedrich Theodor Vischer",
            "Friedrich Siegmund Jucho"
        ],

        positions: [
            "Gemäßigte demokratische Linke",
            "Starke Volksvertretung",
            "Parlamentarismus",
            "Demokratische Reformen",
            "Verbindung von Liberalismus und Demokratie"
        ]
    },


    deutscherhof: {
        name: "Deutscher Hof",
        color: "#ed7d31",
        wing: "Demokratische Linke",
        ideology: "Demokratisch",

        shortDescription:
            "Du befürwortest eine demokratisch-parlamentarische Republik mit allgemeiner, gleicher und direkter Wahl.",

        description:
            "Der Deutsche Hof war die stärkste Gruppe auf der linken Seite der Paulskirche. Er trat für eine demokratisch-parlamentarische Republik mit einem Einkammersystem ein. Die Volksvertretung sollte durch allgemeine, gleiche und direkte Wahl bestimmt werden.",

        representatives: [
            "Robert Blum",
            "Franz Jacob Wigard",
            "Gustav Simon"
        ],

        positions: [
            "Demokratisch-parlamentarische Republik",
            "Einkammersystem",
            "Volkssouveränität",
            "Allgemeine Wahl",
            "Gleiche Wahl",
            "Direkte Wahl"
        ]
    },


    donnersberg: {
        name: "Donnersberg",
        color: "#c00000",
        wing: "Äußerste Linke",
        ideology: "Radikaldemokratisch",

        shortDescription:
            "Du stehst für Volkssouveränität, die konsequente Fortführung der Revolution und eine starke Kontrolle der Exekutive.",

        description:
            "Der Donnersberg spaltete sich vom Deutschen Hof ab und verstand sich als äußerste Linke der Nationalversammlung. Die Abgeordneten wollten die Revolution konsequent fortführen. Sie beriefen sich auf die Souveränität des Volkes sowie auf Freiheit und Selbstbestimmungsrecht aller Völker. Ein Erbkaisertum lehnten sie ab und forderten eine starke Kontrolle der Exekutive.",

        representatives: [
            "Arnold Ruge",
            "Moritz Hartmann",
            "Ernst Wilhelm Eduard Zimmermann"
        ],

        positions: [
            "Äußerste Linke",
            "Radikaldemokratie",
            "Volkssouveränität",
            "Freiheit und Selbstbestimmungsrecht",
            "Ablehnung des Erbkaisertums",
            "Starke Kontrolle der Exekutive",
            "Konsequente Fortführung der Revolution"
        ]
    }

};