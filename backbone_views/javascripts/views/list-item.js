var ListItemView = Backbone.View.extend({
  tagName: "li",
  template: Handlebars.templates.listItem,
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this.el;
  },
});