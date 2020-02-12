const {MarkovMachine} = require("./markov");

describe("test Markov Class", function () {

  let text;

  beforeEach(function () {
    text = 'The Cat In The Hat'
  });

  test("test for the text's length", function () {
    let mm = new MarkovMachine(text);
    expect(mm.makeText(5).split(' ').length).toBeLessThan(6);
  });

  test("the value of the chained words is null", function () {
    let mm = new MarkovMachine(text);
    let lastWord = mm.words[mm.words.length - 1];
    let chain = mm.makeChains();

    expect(chain[lastWord][0]).toEqual(null);
  });

 
});