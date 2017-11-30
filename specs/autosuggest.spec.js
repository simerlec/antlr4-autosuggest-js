var antlr4 = require('antlr4');
var autosuggest = require('../autosuggest');
var simpleParser = require('./simpleParser');
var simpleLexer = require('./simpleLexer');

describe('Test Parser', function () {
    it('should be able to parse', function () {
        var input = 'ABCD';
        var chars = new antlr4.InputStream(input);
        var lexer = new simpleLexer.simpleLexer(chars);
        var tokens = new antlr4.CommonTokenStream(lexer);
        var parser = new simpleParser.simpleParser(tokens);
        parser.buildParseTrees = true;
        var tree = parser.the_field();
        expect(tree).toBeTruthy();
    });

});

describe('Autosuggest', function () {
    it('should return empty', function () {
        var input = 'ABCD';
        var chars = new antlr4.InputStream(input);
        var factory = class {
            constructor() {}
            createLexer(input) {
                return new simpleLexer.simpleLexer(input);
            };
            createParser(tokenStream) {
                return new simpleParser.simpleParser(tokenStream);
            };
        };
        var suggester = new autosuggest.AutoSuggester(new factory(), input);
        expect(suggester.suggest().sort()).toEqual([]);
    });

    it('should complete', function () {
        var input = 'AB';
        var chars = new antlr4.InputStream(input);
        var factory = class {
            constructor() {}
            createLexer(input) {
                return new simpleLexer.simpleLexer(input);
            };
            createParser(tokenStream) {
                return new simpleParser.simpleParser(tokenStream);
            };
        };
        var suggester = new autosuggest.AutoSuggester(new factory(), input);
        expect(suggester.suggest().sort()).toEqual(['CD']);
    });

});