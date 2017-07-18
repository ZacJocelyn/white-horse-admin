import { WhiteHorseAdminPage } from './app.po';

describe('white-horse-admin App', () => {
  let page: WhiteHorseAdminPage;

  beforeEach(() => {
    page = new WhiteHorseAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
