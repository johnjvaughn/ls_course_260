var AppView = Backbone.View.extend({
  el: "body",
  template: Handlebars.templates.app,
  newPersonTemplate: Handlebars.templates.newPerson,

  events: {
    "click #add-person": "renderNewPersonModal",
    "submit": "addNewPerson",
    "click .btn-cancel": "closeNewPersonModal",
  },

  render: function() {
    this.$el.html(this.template());
  },

  renderNewPersonModal: function() {
    this.$el.append(this.newPersonTemplate());
    this.$el.find("#name").trigger("focus");
  },

  closeNewPersonModal: function() {
    this.$("#new-person-modal").remove();
  },

  addNewPerson: function(e) {
    e.preventDefault();
    var $form = $(e.target);
    var newPerson = {
      name: $form.find("#name").val(),
      colors: [$form.find("#color1").val(), $form.find("#color2").val(), $form.find("#color3").val()],
    };
    App.trigger("addPerson", newPerson);
    this.closeNewPersonModal();
  },

});
