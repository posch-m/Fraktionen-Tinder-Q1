/*
========================================================
FraktionsFinder 1848
questions.js
Historische Gewichtung nach dem Deutschen Historischen Museum
========================================================

Antwort:
+1 = Ja
 0 = Neutral
-1 = Nein

Gewichtung:
+3 = starke Übereinstimmung
+2 = deutliche Übereinstimmung
+1 = leichte Übereinstimmung
 0 = keine klare Position
-1 = leichte Gegenposition
-2 = deutliche Gegenposition
-3 = starke Gegenposition
========================================================
*/

const questions = [

    {
        id: "monarchie",
        text:
            "Deutschland soll eine konstitutionelle Monarchie mit einem erblichen Kaiser als Staatsoberhaupt erhalten.",

        weights: {
            cafemilani: 3,
            casino: 3,
            landsberg: 3,
            augsburgerhof: 3,
            wuerttembergerhof: 3,
            westendhall: -2,
            deutscherhof: -3,
            donnersberg: -3
        }
    },


    {
        id: "republik",
        text:
            "Deutschland sollte statt einer Monarchie eine Republik werden.",

        weights: {
            cafemilani: -3,
            casino: -3,
            landsberg: -3,
            augsburgerhof: -3,
            wuerttembergerhof: -3,
            westendhall: 2,
            deutscherhof: 3,
            donnersberg: 3
        }
    },


    {
        id: "wahlrecht",
        text:
            "Die Volksvertretung soll durch eine allgemeine, gleiche und direkte Wahl bestimmt werden.",

        weights: {
            cafemilani: -2,
            casino: -1,
            landsberg: 0,
            augsburgerhof: 0,
            wuerttembergerhof: 1,
            westendhall: 2,
            deutscherhof: 3,
            donnersberg: 3
        }
    },


    {
        id: "einzelstaaten",
        text:
            "Die deutschen Einzelstaaten sollen auch nach der Reichsgründung weitgehend selbstständig bleiben.",

        weights: {
            cafemilani: 3,
            casino: 2,
            landsberg: 1,
            augsburgerhof: 1,
            wuerttembergerhof: 2,
            westendhall: 1,
            deutscherhof: -2,
            donnersberg: -2
        }
    },


    {
        id: "zentralgewalt",
        text:
            "Deutschland braucht eine starke Zentralgewalt, auch wenn die Einzelstaaten dadurch Macht verlieren.",

        weights: {
            cafemilani: -3,
            casino: 3,
            landsberg: 2,
            augsburgerhof: 2,
            wuerttembergerhof: 1,
            westendhall: 1,
            deutscherhof: 1,
            donnersberg: 1
        }
    },


    {
        id: "parlament",
        text:
            "Die Regierung soll vom Vertrauen des Parlaments abhängig sein und von ihm kontrolliert werden.",

        weights: {
            cafemilani: -3,
            casino: -1,
            landsberg: 2,
            augsburgerhof: 2,
            wuerttembergerhof: 3,
            westendhall: 3,
            deutscherhof: 3,
            donnersberg: 3
        }
    },


    {
        id: "nationalversammlung",
        text:
            "Die Nationalversammlung soll eine eigenständige politische Macht besitzen und die zukünftige Verfassung maßgeblich bestimmen.",

        weights: {
            cafemilani: -3,
            casino: 2,
            landsberg: 3,
            augsburgerhof: 3,
            wuerttembergerhof: 3,
            westendhall: 3,
            deutscherhof: 3,
            donnersberg: 3
        }
    },


    {
        id: "revolution",
        text:
            "Die politischen Ziele der Revolution von 1848 sollen notfalls auch durch weitere revolutionäre Aktionen durchgesetzt werden.",

        weights: {
            cafemilani: -3,
            casino: -3,
            landsberg: -2,
            augsburgerhof: -2,
            wuerttembergerhof: -2,
            westendhall: 0,
            deutscherhof: 1,
            donnersberg: 3
        }
    },


    {
        id: "volkssouveraenitaet",
        text:
            "Die politische Ordnung soll grundsätzlich auf der Volkssouveränität beruhen.",

        weights: {
            cafemilani: -3,
            casino: -1,
            landsberg: 1,
            augsburgerhof: 1,
            wuerttembergerhof: 2,
            westendhall: 3,
            deutscherhof: 3,
            donnersberg: 3
        }
    },


    {
        id: "staatsgebiet",
        text:
            "Bei der deutschen Einigung sollte eine kleindeutsche Lösung unter Ausschluss Österreichs angestrebt werden.",

        weights: {
            cafemilani: -2,
            casino: 2,
            landsberg: 2,
            augsburgerhof: 3,
            wuerttembergerhof: -2,
            westendhall: -1,
            deutscherhof: 0,
            donnersberg: 0
        }
    }

];