import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    signInViaGithub: function(){
      var controller = this;
      // The provider name is passed to `open`
      this.get('session').open('github-oauth2').then(function(){
        controller.transitionToRoute('links');
      }, function(error){
        controller.set('error', 'Could not sign you in: '+error.message);
      });
    }
  }
});
