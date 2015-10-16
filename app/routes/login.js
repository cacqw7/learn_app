export default Ember.Route.extend({
  actions: {
    signInViaGithub: function(){
      var route = this,
          controller = this.controllerFor('login');
      // The provider name is passed to `open`
      
      this.get('session').open('github-oauth2').then(function(){
        route.transitionTo('links');
      }, function(error){
        controller.set('error', 'Could not sign you in: '+error.message);
      });
    }
  }
});
