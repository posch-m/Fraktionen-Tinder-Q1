const questions = [
    {
        id: "monarchie",
        text: "Deutschland soll eine konstitutionelle Monarchie mit einem erblichen Kaiser als Staatsoberhaupt erhalten.",
        weights: {
            donnersberg: -3,
            deutscherhof: -3,
            westendhall: -2,
            wuerttembergerhof: 3,
            augsburgerhof: 3,
            landsberg: 3,
            casino: 3,
            cafemilani: 3
        }
    },

    {
        id: "republik",
        text: "Deutschland sollte statt einer Monarchie eine Republik werden.",
        weights: {
            donnersberg: 3,
            deutscherhof: 3,
            westendhall: 2,
            wuerttembergerhof: -3,
            augsburgerhof: -3,
            landsberg: -3,
            casino: -3,
            cafemilani: -3
        }
    },

    {
        id: "wahlrecht",
        text: "Die Volksvertretung soll durch eine allgemeine, gleiche und direkte Wahl bestimmt werden.",
        weights: {
            donnersberg: 3,
            deutscherhof: 3,
            westendhall: 2,
            wuerttembergerhof: 1,
            augsburgerhof: 0,
            landsberg: 0,
            casino: -1,
            cafemilani: -2
        }
    },

    {
        id: "einzelstaaten",
        text: "Die deutschen Einzelstaaten sollen auch nach der Reichsgründung weitgehend selbstständig bleiben.",
        weights: {
            donnersberg: -1,
            deutscherhof: -1,
            westendhall: 0,
            wuerttembergerhof: 2,
            augsburgerhof: 1,
            landsberg: 1,
            casino: 2,
            cafemilani: 3
        }
    },

    {
        id: "zentralgewalt",
        text: "Deutschland braucht eine starke Zentralgewalt, auch wenn die Einzelstaaten dadurch Macht verlieren.",
        weights: {
            donnersberg: -1,
            deutscherhof: 0,
            westendhall: 0,
            wuerttembergerhof: 1,
            augsburgerhof: 2,
            landsberg: 2,
            casino: 3,
            cafemilani: -3
        }
    },

    {
        id: "parlament",
        text: "Die Regierung soll vom Vertrauen des Parlaments abhängig sein und von ihm kontrolliert werden.",
        weights: {
            donnersberg: 3,
            deutscherhof: 3,
            westendhall: 2,
            wuerttembergerhof: 3,
            augsburgerhof: 2,
            landsberg: 2,
            casino: -2,
            cafemilani: -3
        }
    },

    {
        id: "nationalversammlung",
        text: "Die Nationalversammlung soll eine eigenständige politische Macht besitzen und die zukünftige Verfassung maßgeblich bestimmen.",
        weights: {
            donnersberg: 3,
            deutscherhof: 3,
            westendhall: 2,
            wuerttembergerhof: 3,
            augsburgerhof: 2,
            landsberg: 2,
            casino: 1,
            cafemilani: -3
        }
    },

    {
        id: "revolution",
        text: "Die politischen Ziele der Revolution von 1848 sollen notfalls auch durch weitere revolutionäre Aktionen durchgesetzt werden.",
        weights: {
            donnersberg: 3,
            deutscherhof: 0,
            westendhall: -1,
            wuerttembergerhof: -2,
            augsburgerhof: -2,
            landsberg: -2,
            casino: -3,
            cafemilani: -3
        }
    },

    {
        id: "volkssouveraenitaet",
        text: "Die politische Ordnung soll grundsätzlich auf der Volkssouveränität beruhen.",
        weights: {
            donnersberg: 3,
            deutscherhof: 3,
            westendhall: 2,
            wuerttembergerhof: 0,
            augsburgerhof: 0,
            landsberg: 0,
            casino: -2,
            cafemilani: -3
        }
    },

    {
        id: "staatsgebiet",
        text: "Bei der deutschen Einigung sollte eine kleindeutsche Lösung unter Ausschluss Österreichs angestrebt werden.",
        weights: {
            donnersberg: 0,
            deutscherhof: 0,
            westendhall: 0,
            wuerttembergerhof: -2,
            augsburgerhof: 3,
            landsberg: 0,
            casino: 0,
            cafemilani: -2
        }
    }
];