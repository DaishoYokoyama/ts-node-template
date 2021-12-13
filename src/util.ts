import fs from 'fs';

export const removeLinefeed = (text: string) => text.replace(/\r?\n/g, ' ');

export const writeFile = (fileName: string, data: string) => {
  fs.mkdir('dist', { recursive: true }, (e) => {
    if (e) {
      throw e;
    }
    fs.writeFile(fileName, data, () => {
      console.info(`./dist/${fileName} was successfully created.`);
    });
  });
};
