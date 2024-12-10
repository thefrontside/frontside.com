import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':file-chooser-only'],
  files: [],
  filesArray: Ember.computed('files', function() {
    return Array.from(this.get('files'));
  })
});
