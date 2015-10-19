import ENV from '../config/environment';

export default Ember.Object.extend({
  open: function(authentication){
    var authorizationCode = authentication.authorizationCode;
    localStorage.token = authorizationCode;
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        url: ENV.APP.API_URL + '/session',
        data: { 'access_code': authorizationCode },
        dataType: 'json',
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, reject)
      });
    }).then(function(data){
      // The returned object is merged onto the session (basically). Here
      // you may also want to persist the new session with cookies or via
      // localStorage.
      return {
        currentUser: data.user
      };
    });
  },
  fetch: function() {
    if (!localStorage.token) {
      return rejectPromise();
    }
    return new Ember.RSVP.Promise(function(resolve, reject){
      Ember.$.ajax({
        url: ENV.APP.API_URL + '/session/fetch',
        data: { 'access_code': localStorage.token },
        dataType: 'json',
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, reject)
      });
    }).then(function(data){
      // The returned object is merged onto the session (basically). Here
      // you may also want to persist the new session with cookies or via
      // localStorage.
      return {
        currentUser: data.user
      };
    });
  },
  close: function() {
    var authToken = localStorage.token;

    localStorage.token = null;
    // var adapter = this.container.lookup('adapter:application');
    // adapter.set('headers', { 'Authorization': authToken });

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        url: ENV.APP.API_URL + '/session/logout',
        data: {
          'access_code': authToken
        },
        dataType: 'json',
        type: 'POST',
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, reject)
      });
    });
  }
});
