import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.store.findAll('link');
  },
  beforeModel: function() {
    
    return this.get('session').fetch().then(function() {
      console.log('session fetched');
    }, function() {
      console.log('no session to fetch');
    });
  },

  actions: {
    logout: function() {
      this.get('session').close();
    }
  }
});
