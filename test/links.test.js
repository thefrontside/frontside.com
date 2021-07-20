import { Link, Page, test } from 'bigtest';

export default test('visiting the homepage')
  .step(Page.visit('/'))
  .assertion(Link('People').exists());
