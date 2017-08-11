import { SampleApplicationPage } from './app.po';

describe('sample-application App', () => {
  let page: SampleApplicationPage;

  beforeEach(() => {
    page = new SampleApplicationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
