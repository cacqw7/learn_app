import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createLink: function(link){
      var store = this.store
      var title = link.title === undefined ? "" : link.title
      var description = link.description === undefined ? "" : link.description
      var new_link = store.createRecord('link', {
        url: link.url,
        title: title,
        description: description
      })

      var self = this;
      function transitionToIndex(link) {
        self.transitionToRoute('index');
      }

      function failure(reason) {
        // handle the error

        Ember.Logger.error("Failed to reroute");
      }

      new_link.save().then(transitionToIndex).catch(failure);
    }
  },
});
