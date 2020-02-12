/** Textual markov chain generator */
const fs = require('fs');
const arg = process.argv;


function cat(path) {

  fs.readFile(path, 'utf-8', function (err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      let mm = new MarkovMachine(data);
      console.log(mm.makeText());
    }
  });

}

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chain = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let next = this.words[i + 1];

      if (i === this.words.length - 1) {
        chain[word] = [null];
        break;
      }

      if (chain[word] === undefined) {
        chain[word] = [next];
      } else {
        chain[word].push(next);
      }
    }

    console.log(chain);
    return chain
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO

    let chainObj = this.makeChains();
    let randomStarIdx = Math.floor(Math.random() * this.words.length);
    let randomStartWord = this.words[randomStarIdx];
    let text = [randomStartWord];

    for (let i = 0; i < numWords - 1; i++) {
      let value = chainObj[text[i]]

      if (value[0] === null) {
        return text.join(' ');
      }
      if (value.length === 1) {
        text.push(value);
      } else {
        let randomIdx = Math.floor(Math.random() * value.length);
        let randomWord = value[randomIdx];
        text.push(randomWord);
      }
    }

    return text.join(' ');
  }
}

// cat(arg[2]);
module.exports = {MarkovMachine};


