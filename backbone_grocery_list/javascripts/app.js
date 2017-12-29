$(function () {
  var ItemModel = Backbone.Model.extend({
    idAttribute: "id",
  });

  var ItemsCollection = Backbone.Collection.extend({
    lastId: 0,
    model: ItemModel,
    comparator: "name",
    incrementID: function() {
      this.lastId += 1;
      return this.lastId;
    },
    createItem: function(item_data) {
      item_data["id"] = this.incrementID();
      this.add(new ItemModel(item_data));
    },
    delete: function (id) {
      if (id === "all") {
        this.reset();
      } else if (id) {
        this.remove(this.where({id: id}));
      }
    },
    sortItems: function (prop) {
      this.comparator = prop;
      this.sort();
    },
    initialize: function(init_items_json) {
      init_items_json.forEach(function (item_json) {
        this.createItem(item_json);
      }, this);
    },
  });

  var ItemsView = Backbone.View.extend({
    el: "main",
    $tbody: $("tbody"),

    events: {
      "click p a": "deleteAll",
      "click a[data-id]": "deleteOne",
      "click th[data-prop]": "sortBy",
    },

    sortBy: function(e) {
      e.preventDefault();
      App.trigger("sortItems", $(e.target).data("prop"));
    },
    collectHandlebarTemplates: function () {
      this.template = Handlebars.compile($("#items").html());
      this.templateOne = Handlebars.compile($("#item").html());
      Handlebars.registerPartial("item", this.templateOne);
      $("#items").remove();
      $("#item").remove();
    },
    deleteOne: function (e) {
      e.preventDefault();
      App.trigger("deleteItem", $(e.target).data("id"));
    },
    deleteAll: function (e) {
      e.preventDefault();
      App.trigger("deleteItem", "all");
    },
    render: function() {
      this.$tbody.html(this.template({ items: this.collection.toJSON() }));
    },
    renderNewItem: function(item) {
      this.$tbody.append(this.templateOne(item));
    },
    initialize: function() {
      this.collectHandlebarTemplates();
      this.render();
    },
  });

  var App = {
    bindEvents: function() {
      _.extend(this, Backbone.Events);
      this.on("deleteItem", function(id) {
        this.items.delete(id);
        this.itemsView.render();
      }.bind(this));
      this.on("sortItems", function(prop) {
        this.items.sortItems(prop);
        this.itemsView.render();
      });
      $("form").on("submit", function(e) {
        e.preventDefault();
        var formData = new FormData(e.target);
        var newItem = {
          name: formData.get("name"),
          quantity: +formData.get("quantity"),
        };
        e.target.reset();
        this.items.createItem(newItem);
        this.itemsView.renderNewItem(newItem);
      }.bind(this));
    },
    init: function() {
      this.items = new ItemsCollection(items_json);
      this.itemsView = new ItemsView({ collection: this.items });
      this.bindEvents();
    },
  };

  App.init();

});