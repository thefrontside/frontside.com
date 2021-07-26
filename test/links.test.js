import { test, Page, Link, Heading, not, and, including } from 'bigtest';

export default test('homepage')
  .step(Page.visit('/'))
  .assertion(Link('People').exists())
  .assertion(Link('Consulting').exists())
  .assertion(Link('Tools').exists())
  .assertion(Link('Blog & Podcast').exists())
  .child('clicking People', test =>
    test
      .step(Link('People').click())
      .assertion(Heading('MEET THE TEAM').exists())
  )
  .child('clicking Consulting', test =>
    test
      .step(Link('Consulting', { className: not('footerlink') }).click())
      .assertion(
        Heading('BUILD THE ENGINEERING BACKBONE OF AN INDUSTRY LEADER').exists()
      )
  )
  .child('clicking Tools', test =>
    test
      .step(Link('Tools', { className: not('footerlink') }).click())
      .assertion(Heading('OPEN SOURCE TOOLS TO MAKE TESTING EASIER').exists())
  )
  .child('clicking Blog & Podcast', test =>
    test
      .step(Link(and(including('Blog'), including('Podcast'))).click())
      .assertion(Heading("SHARING FRONTSIDE'S LATEST DISCOVERIES").exists())
  );
