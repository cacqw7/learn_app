import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createLink: function(link){
      this.sendAction('create', link);
    }
  }
});
