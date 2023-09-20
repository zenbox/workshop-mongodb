import mongodb from "mongodb";

export default class Sheeps {
    // Schreibe hier eine Klasse, die Daten aus dem Dokument 'sheeps' ausliest, schreibt, updated und löscht.
    // Die Datenbank heisst 'workshop', die DB läuft über localhost:27017.
    // Die Daten werden an den Browser übergeben.
    // Die Kommandos kommen via ReSt vom Browser
    // Dokumentiere die Methoden mit JSDoc

    constructor() {
        this.init();
    }

    /**
     * @ A method to initialize the sheeps array
     * @returns {void}
     * @memberof Sheeps
     * @inner
     * @method init
     * @instance
     * @description This method is called in the constructor of the class
     * @example const sheeps = new Sheeps();
     *          sheeps.init();
     *          console.log(sheeps.sheeps);
     *          -> [
     *               { _id: 5f9e1e1e1e1e1e1e1e1e1e1e,
     *                 name: 'Dolly', weight: 100
     *               },
     *               ...
     *             ]  */
    async init() {
        await mongodb.MongoClient.connect("mongodb://localhost:27017")
            .then((client) => {
                console.log("\n\nSheeps: \nConnected to MongoDB");
                const db = client.db("workshop");
                const collection = db.collection("sheeps");
                collection
                    .find()
                    .toArray()
                    .then((items) => {
                        this.sheeps = items;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        client.close();
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // dokumentiere die folgende Methode mit JSDoc
    /**
     * @ A method to write a new sheep to the database
     * @param {object} newSheep - the new sheep to be written
     * @returns {void}
     * @memberof sheeps
     * @inner
     * @method write
     * @instance
     * @description This method is called in the constructor of the class
     * @example const sheeps = new Sheeps();
     *          sheeps.write({name: 'Dolly', weight: 100});
     *          console.log(sheeps.sheeps);
     *          -> [
     *               { _id: 5f9e1e1e1e1e1e1e1e1e1e1e,
     *                 name: 'Dolly', weight: 100
     *               },
     *               ...
     *             ]
     */
    write(newSheep) {
        mongodb.MongoClient.connect("mongodb://localhost:27017")
            .then((client) => {
                console.log("Connected to MongoDB");
                const db = client.db("workshop");
                const collection = db.collection("sheeps");
                collection
                    .insertOne(newSheep)
                    .then((result) => {
                        console.log(result);
                        this.sheeps.push(newSheep);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        client.close();
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    update(sheep) {
        mongodb.MongoClient.connect("mongodb://localhost:27017").then(
            (client) => {
                console.log("Connected to MongoDB");
                const db = client.db("workshop");
                const collection = db.collection("sheeps");
                collection
                    .updateOne(
                        {
                            _id: mongodb.ObjectId(sheep._id),
                        },
                        {
                            $set: {
                                name: sheep.name,
                                weight: sheep.weight,
                            },
                        }
                    )
                    .then((result) => {
                        console.log(result);
                        const index = this.sheeps.findIndex(
                            (s) => s._id === sheep._id
                        );
                        this.sheeps[index] = sheep;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        );
    }

    delete(sheep) {
        mongodb.MongoClient.connect("mongodb://localhost:27017").then(
            (client) => {
                console.log("Connected to MongoDB");
                const db = client.db("workshop");
                const collection = db.collection("sheeps");
                collection
                    .deleteOne({
                        _id: mongodb.ObjectId(sheep._id),
                    })
                    .then((result) => {
                        console.log(result);
                        const index = this.sheeps.findIndex(
                            (s) => s._id === sheep._id
                        );
                        this.sheeps.splice(index, 1);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        );
    }
}
