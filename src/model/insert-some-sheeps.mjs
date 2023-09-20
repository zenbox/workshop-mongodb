import mongodb from "mongodb";

const url = "mongodb://localhost:27017"; // MongoDB-Verbindungsinformationen
const dbName = "workshop"; // Name der Datenbank

// Lösche alle Daten in Sheeps vor dem Einfügen neuer Datensätze
await mongodb.MongoClient.connect(url).then((client) => {
    console.log("Connected to MongoDB");

    // Liste alle collections auf

    try {
        const db = client.db(dbName);
        const sheepsCollection = db.collection("sheeps"); // Sammlung "sheeps"

        // Datensätze in der Sammlung löschen
        sheepsCollection.deleteMany({}, (deleteErr, result) => {
            if (deleteErr) {
                console.error("Fehler beim Löschen der Datensätze:", deleteErr);
            } else {
                console.log(
                    `${result.deletedCount} Datensätze erfolgreich gelöscht.`
                );
            }

            // Verbindung schließen
            client.close();
        });
    } catch (error) {
        console.error("Fehler beim Zugriff auf die Sammlung:", error);
    }
});

// Daten zum Einfügen
const sheepsData = [];
const breeds = [
    {
        breed: "Wollschaf",
        description:
            "Das Wollschaf zeichnet sich durch seine dichte und langfaserige Wolle aus, die für die Textilproduktion verwendet wird.",
    },
    {
        breed: "Merinoschaf",
        description:
            "Das Merinoschaf ist berühmt für seine feine und hochwertige Wolle, die oft für luxuriöse Kleidung und Textilien verwendet wird.",
    },
    {
        breed: "Haarschaf",
        description:
            "Im Gegensatz zu Wollschafen trägt das Haarschaf keine Wolle, sondern hat eine kurze, haarige Felldecke.",
    },
    {
        breed: "Rauhwolliges Pommersches Landschaf",
        description:
            "Dieses Schaf hat grobe, rauhe Wolle und stammt aus der Pommerschen Region in Deutschland.",
    },
    {
        breed: "Zackelschaf",
        description:
            "Das Zackelschaf hat auffällige, dreieckige Hörner und ist für seine robuste Natur bekannt.",
    },
    {
        breed: "Skudde",
        description:
            "Die Skudde ist eine alte Schafrasse, die für ihre zierliche Größe und kurze Wolle bekannt ist.",
    },
    {
        breed: "Steinschaf",
        description:
            "Das Steinschaf ist eine widerstandsfähige Schafrasse, die in alpinen Regionen beheimatet ist.",
    },
    {
        breed: "Heidschnucke",
        description:
            "Diese Schafrasse ist typisch für die Heidelandschaften Norddeutschlands und hat ein charakteristisches Aussehen.",
    },
    {
        breed: "Rhönschaf",
        description:
            "Das Rhönschaf stammt aus der Rhön-Region in Deutschland und hat eine anpassungsfähige Wolle.",
    },
    {
        breed: "Walliser Schwarznasenschaf",
        description:
            "Das Walliser Schwarznasenschaf ist bekannt für seine auffällige schwarze Nase und ist in den Alpen zu finden.",
    },
    {
        breed: "Rauhwolliges Deutsches Landschaf",
        description:
            "Diese Schafrasse hat grobe Wolle und ist in Deutschland beheimatet.",
    },
    {
        breed: "Zackelschaf",
        description:
            "Das Zackelschaf hat auffällige, dreieckige Hörner und ist für seine robuste Natur bekannt.",
    },
    {
        breed: "Waldschaf",
        description:
            "Das Waldschaf ist an das Leben in bewaldeten Gebieten angepasst und hat eine vielseitige Wolle.",
    },
    {
        breed: "Kamerunschaf",
        description:
            "Ursprünglich aus Westafrika, ist das Kamerunschaf für sein dunkles Fell und seine Anpassungsfähigkeit bekannt.",
    },
    {
        breed: "Ouessantschaf",
        description:
            "Das Ouessantschaf ist eine der kleinsten Schafrassen der Welt und stammt von der französischen Insel Ouessant.",
    },
    {
        breed: "Deutsches Schwarzköpfiges Fleischschaf",
        description:
            "Diese Rasse zeichnet sich durch ihr schwarzes Gesicht aus und wird häufig für die Fleischproduktion gezüchtet.",
    },
    {
        breed: "Suffolk-Schaf",
        description:
            "Das Suffolk-Schaf ist für seine Fleischqualität und sein weißes Gesicht bekannt.",
    },
    {
        breed: "Weißes Alpenschaf",
        description:
            "Diese Rasse ist in den Alpen beheimatet und hat ein weißes, dichtes Fell.",
    },
    {
        breed: "Braunes Bergschaf",
        description:
            "Das braune Bergschaf ist in Bergregionen heimisch und hat ein robustes Aussehen.",
    },
    {
        breed: "Braunviehschaf",
        description:
            "Diese Rasse ist für ihre braune Wolle und Anpassungsfähigkeit bekannt.",
    },
];

for (let i = 0; i < breeds.length; i++) {
    sheepsData.push({
        breed: breeds[i].breed,
        weight: Math.floor(Math.random() * 100),
        description: breeds[i].description,
    });
}

await mongodb.MongoClient.connect("mongodb://localhost:27017").then(
    (client) => {
        console.log("Connected to MongoDB");

        try {
            const db = client.db(dbName);
            const sheepsCollection = db.collection("sheeps"); // Sammlung "sheeps"

            // Datensätze in die Sammlung einfügen
            sheepsCollection.insertMany(sheepsData, (insertErr, result) => {
                if (insertErr) {
                    console.error(
                        "Fehler beim Einfügen der Datensätze:",
                        insertErr
                    );
                } else {
                    console.log(
                        `${result.insertedCount} Datensätze erfolgreich eingefügt.`
                    );
                }

                // Verbindung schließen
                client.close();
            });
        } catch (error) {
            console.error("Fehler beim Zugriff auf die Sammlung:", error);
        }
    }
);

await mongodb.MongoClient.connect(url).then((client) => {
    console.log("Connected to MongoDB");

    try {
        const db = client.db(dbName);
        const sheepsCollection = db.collection("sheeps"); // Sammlung "sheeps"

        // Datensätze in die Sammlung einfügen
        sheepsCollection
            .find()
            .limit(5)
            .toArray((findErr, result) => {
                if (findErr) {
                    console.error(
                        "Fehler beim Suchen der Datensätze:",
                        findErr
                    );
                } else {
                    // console.log("Erste 5 Datensätze:");
                    // console.log(result);
                }

                // Verbindung schließen
                client.close();
            });
    } catch (error) {
        console.error("Fehler beim Zugriff auf die Sammlung:", error);
    }
});

await mongodb.MongoClient.connect(url).then((client) => {
    // - - - - -
    console.log("try to update sizes");

    const db = client.db(dbName);
    db.collection("sheeps").updateMany({}, [
        {
            $set: {
                size: {
                    $multiply: [
                        100,
                        {
                            $rand: {},
                        },
                    ],
                },
            },
        },
    ]);
    // - - - - -
});

await mongodb.MongoClient.connect(url).then((client) => {
    console.log("try to set sizeCategories");

    const db = client.db(dbName);
    db.collection("sheeps").updateMany({}, [
        {
            $set: {
                sizeCategory: {
                    $cond: {
                        if: {
                            $gte: ["$size", 50],
                        },
                        then: "big",
                        else: "small",
                    },
                },
            },
        },
    ]);
});
