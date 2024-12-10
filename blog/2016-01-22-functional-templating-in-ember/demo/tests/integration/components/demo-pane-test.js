import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('demo-pane', 'Integration | Component | demo pane', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{demo-pane name="file-chooser-only" title="Choose Files"}}`);

  assert.equal(this.$('.demo-pane__title').text().trim(), 'Demo: Choose Files');
  assert.equal(this.$('.demo-pane__content').text().trim(), '⇧ Choose Files');
});
