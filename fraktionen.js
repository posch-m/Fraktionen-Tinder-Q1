/*
==========================================
FraktionsFinder 1848
fraktionen.js
==========================================
*/

const factions = {

    casino: {
        id: "casino",
        name: "Casino",
        color: "#1E3A8A",
        ideology: "Konstitutionell-liberal",
        shortDescription: "Die größte liberale Fraktion der Nationalversammlung.",

        description:
            "Die Casino-Fraktion bildete das politische Zentrum der Frankfurter Nationalversammlung. Sie setzte sich für einen deutschen Nationalstaat mit einer konstitutionellen Monarchie, einem starken Parlament und garantierten Grundrechten ein. Revolutionäre Umstürze lehnte sie jedoch ab.",

        positions: [
            "Konstitutionelle Monarchie",
            "Starker deutscher Nationalstaat",
            "Grundrechte",
            "Rechtsstaat",
            "Schrittweise Reformen"
        ]
    },

    wuerttembergerhof: {
        id: "wuerttembergerhof",
        name: "Württemberger Hof",
        color: "#2563EB",
        ideology: "Gemäßigt liberal",
        shortDescription: "Liberale Mitte mit Reformbereitschaft.",

        description:
            "Der Württemberger Hof unterstützte eine freiheitliche Verfassung und politische Reformen. Veränderungen sollten jedoch innerhalb der bestehenden Ordnung erfolgen.",

        positions: [
            "Verfassung",
            "Grundrechte",
            "Konstitutionelle Monarchie",
            "Reformen"
        ]
    },

    landsberg: {
        id: "landsberg",
        name: "Landsberg",
        color: "#16A34A",
        ideology: "Linksliberal",
        shortDescription: "Linksliberale Fraktion zwischen Zentrum und Demokratie.",

        description:
            "Die Fraktion Landsberg trat für mehr parlamentarische Mitbestimmung, eine stärkere Volksvertretung und eine Ausweitung der Freiheitsrechte ein.",

        positions: [
            "Parlament stärken",
            "Mehr Mitbestimmung",
            "Grundrechte",
            "Liberale Reformen"
        ]
    },

    augsburgerhof: {
        id: "augsburgerhof",
        name: "Augsburger Hof",
        color: "#65A30D",
        ideology: "Demokratisch",
        shortDescription: "Demokratische Reformfraktion.",

        description:
            "Der Augsburger Hof forderte umfassende demokratische Reformen und eine deutliche Stärkung des Parlaments gegenüber der Regierung.",

        positions: [
            "Demokratie",
            "Parlamentarismus",
            "Allgemeines Wahlrecht",
            "Bürgerrechte"
        ]
    },

    westendhall: {
        id: "westendhall",
        name: "Westendhall",
        color: "#F59E0B",
        ideology: "Radikaldemokratisch",
        shortDescription: "Demokratische Linke mit republikanischen Ideen.",

        description:
            "Die Westendhall setzte sich für eine demokratische Republik, umfassende Mitbestimmung und weitreichende Freiheitsrechte ein.",

        positions: [
            "Republik",
            "Volkssouveränität",
            "Demokratie",
            "Allgemeines Wahlrecht"
        ]
    },

    deutscherhof: {
        id: "deutscherhof",
        name: "Deutscher Hof",
        color: "#EA580C",
        ideology: "Linke Demokratie",
        shortDescription: "Demokratische Linke mit sozialem Schwerpunkt.",

        description:
            "Der Deutsche Hof verband demokratische Forderungen mit sozialpolitischen Reformen und sprach sich für eine republikanische Staatsform aus.",

        positions: [
            "Republik",
            "Soziale Reformen",
            "Parlamentarismus",
            "Volkssouveränität"
        ]
    },

    donnersberg: {
        id: "donnersberg",
        name: "Donnersberg",
        color: "#DC2626",
        ideology: "Radikaldemokratisch",
        shortDescription: "Die linkeste Fraktion der Nationalversammlung.",

        description:
            "Der Donnersberg vertrat die radikalsten demokratischen Positionen der Frankfurter Nationalversammlung. Die Fraktion forderte eine Republik, umfassende Demokratie und tiefgreifende gesellschaftliche Reformen.",

        positions: [
            "Republik",
            "Volkssouveränität",
            "Soziale Reformen",
            "Demokratie",
            "Abbau monarchischer Privilegien"
        ]
    },

    cafemilani: {
        id: "cafemilani",
        name: "Café Milani",
        color: "#6B7280",
        ideology: "Konservativ",
        shortDescription: "Konservative Fraktion zur Bewahrung der bestehenden Ordnung.",

        description:
            "Das Café Milani vereinte konservative Abgeordnete, die an der monarchischen Ordnung festhalten wollten und tiefgreifenden Reformen skeptisch gegenüberstanden.",

        positions: [
            "Monarchie",
            "Föderalismus",
            "Erhalt der bestehenden Ordnung",
            "Vorsichtige Reformen"
        ]
    }

};