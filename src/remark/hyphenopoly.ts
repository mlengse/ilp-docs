import { readFileSync } from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import hyphenopoly from 'hyphenopoly';
import { visit } from 'unist-util-visit';
 
 
const plugin = (options) => {

  // console.log(options)

  function loaderSync(file) {
    const cwd = dirname(fileURLToPath(import.meta.url));
    return readFileSync(`${cwd}/../../src/patterns/${file}`);
  }
   
  const hyphenator = hyphenopoly.config({
    // exceptions: {
    //   'en-us': 'Houston',
    // },
    loaderSync,
    // dontHyphenateClass: 'donthyphenate',
    minWordLength: options.minWordLength,
    require: [options.lang],
    defaultLanguage: options.lang,
    sync: true,
  });

  function transformer(tree) {
    visit(tree, 'text', function (node) {

      // console.log(hyphenator)
      const hyphenated = hyphenator.get(options.lang)(node.value);
 
      node.value = hyphenated;
    });
  }
 
  return transformer;
};

export default plugin;