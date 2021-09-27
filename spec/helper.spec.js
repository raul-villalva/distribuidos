var helper = require('../helper/helperDna');

describe("check mutant ", function() {


    it("should be true", function() {

        var dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        var result = helper.isMutant(dna);

        expect(result).toEqual(true);
    });

    it("should return false", function() {

        var dna = ["ATGATG","CAGTGC","TTATGT","ASGAGG","CAGCTA","TCACTG"]
        var result = helper.isMutant(dna);

        expect(result).toEqual(false);
    });

    it("should return false", function() {

        var dna = ["ATGEEEE","CAGTGC","TTATGT","ASDAGG","CSDCTA","TCACTG"]
        var result = helper.isValid(dna);

        expect(result).toEqual(false);
    });
    it("should return true", function() {

        var dna = ["ATGATG","CAGTGC","TTATGT","ASGAGG","CAGCTA","TCACTG"]
        var result = helper.isValid(dna);

        expect(result).toEqual(false);
    });
});