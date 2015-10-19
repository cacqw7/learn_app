import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.findAll('link');
  },
  beforeModel: function() {
    return this.get('session').fetch().then(function() {
      Ember.Logger.debug('session fetched');
    }, function() {
      Ember.Logger.debug('no session to fetch');
    });
  },

  actions: {
    logout: function() {
      this.get('session').close();
      this.transitionTo('index');
    },
    accessDenied: function() {
      this.controllerFor('login').set('error', "You must be logged in to view that page.");
      this.transitionTo('login');
    }
  }
});
