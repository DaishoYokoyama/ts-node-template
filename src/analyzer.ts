import path from 'path';
import kuromoji from 'kuromoji';

export class Analyzer {
  private _tokenizer: kuromoji.Tokenizer<kuromoji.IpadicFeatures> | undefined;

  constructor(dictPath?: string) {
    kuromoji
      .builder({
        dicPath: dictPath
          ? dictPath
          : path.resolve(__dirname, '../node_modules/kuromoji/dict'),
      })
      .build((err, tokenizer) => {
        if (err) {
          console.error(err);
          throw err;
        }
        this._tokenizer = tokenizer;
      });
  }

  analyze(text: string) {
    if (!this._tokenizer) {
      throw Error('Analyzer not activated.');
    }
    return this._tokenizer.tokenize(text);
  }
}
