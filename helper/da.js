var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var stats = null;

module.exports = {


    /**
     * Se conecta a la base e incrementar la cantidad de mutantes o humanos en funcion de la variable Type
     *
     * @param {string} type
     * @return {bool} true|false
     *
     */
    incType: function (type) {
        var count_mutant_dna_aux = 0;
        var count_human_dna_aux = 0;

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("mutant");
                dbo.collection("mutant").find({}, {}).toArray(function (err, result) {
                    if (err) throw err;
                    if (result[0] != null) {
                        if (type == "mutant") {
                            count_mutant_dna_aux = result[0].count_mutant_dna + 1;
                            count_human_dna_aux = result[0].count_human_dna > 0 ? result[0].count_human_dna : 1;
                        } else {
                            count_human_dna_aux = result[0].count_human_dna + 1;
                            count_mutant_dna_aux = result[0].count_mutant_dna > 0 ? result[0].count_mutant_dna : 1;
                        }
                        let ratio_aux = count_mutant_dna_aux / count_human_dna_aux;

                        var newvalues = {
                            $set: {
                                count_mutant_dna: count_mutant_dna_aux,
                                count_human_dna: count_human_dna_aux,
                                ratio: ratio_aux
                            }
                        };
                        dbo.collection("mutant").updateOne({}, newvalues, function (err, res) {
                            if (err) throw err;
                        });
                    }
                    db.close();
                });

            });

        return true;

    },
    /**
     * Se conecta, recupero los datos de la funcion de arriba y ademas devuelvo el json listo para que devuelva el servicio /stats
     *
     *
     * @return {object}
     *
     */
    getStats: function () {


        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mutant");
            dbo.collection("mutant").find({}, {  }).toArray(function(err, result) {
                if (err) throw err;
                stats = result[0];
                db.close();
            });

        });
        if (stats == null) {
            return {count_mutant_dna: 0, count_human_dna: 0, ratio: 0};
        }
        return {count_mutant_dna: stats.count_mutant_dna, count_human_dna: stats.count_human_dna, ratio: stats.ratio};

    }
}

