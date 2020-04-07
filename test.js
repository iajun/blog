const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

class FindPattern extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    this.files.forEach(file => {
      fs.readFile(file, 'utf-8', (err, content) => {
        if (err) {
          return this.emit('error', err);
        }

        this.emit('fileread', file);

        let match = null;

        if ((match = content.match(this.regex))) {
          match.forEach(elem => this.emit('found', file, elem));
        }
      });
    });

    return this;
  }
}

const findPatternObj = new FindPattern(/\{/);
findPatternObj
  .addFile('db.json')
  .find()
  .on('found', (file, match) =>
    console.log(`Matched: \n file: ${file}\n match: ${match}`)
  );
