/** Command-line tool to generate Markov text. */
const {MarkovMachine} = require("./markov");

const fs = require('fs');
const arg = process.argv;
const axios = require('axios');


function cat(path) {

  fs.readFile(path, 'utf-8', function (err, data) {
    if (err) {
      console.log("sorry can't read file!");
      process.exit(1);
    } else {
      console.log(`generated text from file ${path}`);
    }
  });
}


async function webCat(input) {
  let resp = await axios.get(input);

  fs.readFile(resp.data, 'utf-8', function (err, data) {
    if (err) {
      console.log("sorry can't read url!");
      process.exit(1);
    } else {
      console.log(`generated text from that ${input}`);
    }
  });

}

function choose(type, input) {

  if (type.toLowerCase() === 'url' && input.slice(0, 4) === 'http') {
    console.log(type);
    return editing(webCat('url', input));
  } else if (type.toLowerCase() === 'file' && input.indexOf('txt') >= 0) {
    return editing('file',cat(input));
  }
}

function editing(type, content) {
  fs.writeFile('./output.txt', content, "utf8", function (err) {
    if (err && type === 'url') {
      console.error("sorry can't read url!");
      process.exit(1);
    } else if (err && type === 'file') {
      console.log("sorry can't read url!")
      process.exit(1);
    }
    console.log('Successfully wrote to file!');
  });

  if (type === 'file') {
    console.log('writing file from text');
  } else if (type === 'url') {
    console.log('writing file from url')
  }

}

choose(arg[2], arg[3]);