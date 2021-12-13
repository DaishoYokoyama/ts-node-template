import _ from 'lodash';
import playwright from 'playwright';
import * as utils from './util';

export class Crawler {
  private _url: string;

  constructor(url: string) {
    this._url = url;
  }

  private async open() {
    const browser = await playwright.chromium.launch();
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(this._url);
    return { browser, page };
  }

  async getTextContent(selector: string) {
    const { browser, page } = await this.open();

    const elements = await page.$$(selector);
    const texts = await Promise.all(elements.map((x) => x.textContent()));

    await browser.close();

    return _(texts)
      .compact()
      .map((x) => utils.removeLinefeed(x))
      .value();
  }

  async getParagraphTexts() {
    return this.getTextContent('body p');
  }
}

export default Crawler;
