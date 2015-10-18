import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    signInViaGithub: function(link){
      this.sendAction('login');
    }
  }
});
