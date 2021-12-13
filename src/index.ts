import _ from 'lodash';
import { stringify } from 'csv-stringify/sync';
import { Crawler } from './crawler';
import { Analyzer } from './analyzer';
import * as utils from './util';

const TARGET_URL = 'https://ncode.syosetu.com/n7308he/13/';
// const TARGET_URL = 'https://www.wsj.com/';

const main = async () => {
  const crawler = new Crawler(TARGET_URL);
  const analyzer = new Analyzer();

  const texts = await crawler.getParagraphTexts();
  const results = stringify(_.flatMap(texts.map((x) => analyzer.analyze(x))), {
    header: true,
  });
  utils.writeFile('./dist/analyzed.csv', results);
};

main();
