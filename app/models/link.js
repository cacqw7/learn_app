import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  thumbnail_url: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string')
});
