import Ember from 'ember';
import config from './config/environment';


function getLocation() {
  if (typeof window !== 'undefined' && window.disableEmberRouter) {
    return 'none';
  } else {
    return config.locationType;
  }
}


const Router = Ember.Router.extend({
  location: getLocation()
});

Router.map(function() {
  this.route('blog/2016/01/22/functional-templating-in-ember.html');
});

export default Router;
