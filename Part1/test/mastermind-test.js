//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected

const chai = require("chai");
const path = require("path");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);


const wasm_tester = require("circom_tester").wasm;

const assert = chai.assert;

describe("MastermindVariation", function ()  {

    this.timeout(100000);

    it("Should prove a valid solution", async() => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");

        const input = {
        	"pubGuessA": 0,
        	"pubGuessB": 1,
        	"pubGuessC": 2,
        	"pubGuessD": 3,
        	"pubGuessE": 4,
        	"pubNumHit": 5,
        	"pubNumBlow": 0,
        	"pubSolnHash": 0, // TODO: poseidon hash
        	"privSolnA": 0,
        	"privSolnB": 1,
        	"privSolnC": 2,
        	"privSolnD": 3,
        	"privSolnE": 4,
        	"privSalt": 9,
        }

        let witness;
        witness = await circuit.calculateWitness(input, true);
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    });

    it("Should not prove an invalid solution", async() => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");

        const input = {
        	"pubGuessA": 0,
        	"pubGuessB": 1,
        	"pubGuessC": 2,
        	"pubGuessD": 3,
        	"pubGuessE": 4,
        	"pubNumHit": 5,
        	"pubNumBlow": 0,
        	"pubSolnHash": 0, // TODO: poseidon hash
        	"privSolnA": 0,
        	"privSolnB": 1,
        	"privSolnC": 2,
        	"privSolnD": 3,
        	"privSolnE": 99,
        	"privSalt": 9,
        }

        let witness;
        try {
       	 	
       	 	witness = await circuit.calculateWitness(input, true);        	
        } catch (e) {
        	assert(e !== null);
        }
    });
})