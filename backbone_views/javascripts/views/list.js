var ListView = Backbone.View.extend({
  el: "#favorites",  
  renderOne: function (model) {
    var listItemView = new ListItemView({ model: model });
    this.$el.append(listItemView.render());
  },
  render: function () {
    this.collection.each(this.renderOne.bind(this));
    return this.el;
  },
  initialize: function () {
    this.listenTo(this.collection, "add", this.renderOne);
  },
});

