$(function () {

  templates = {};
  $elements = {
    tbody: $("tbody"),
    thead: $("thead"),
    form: $("form"),
    deleteAll: $("a:contains('Delete')"),
  };

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
    renderItems: function() {
      $elements.tbody.html(templates.items({ items: this.models }));
    },
    renderNewItem: function(item) {
      $elements.tbody.append(templates.item(item.attributes));
    },
    initialize: function(init_items_json) {
      init_items_json.forEach(function (item_json) {
        this.createItem(item_json);
      }, this);
      this.renderItems();
      this.on("add", this.renderNewItem);
      this.on("remove reset sort", this.renderItems.bind(this));
    },
  });

  var App = {
    items: null,

    collectHandlebarTemplates: function () {
      $('script[type="text/x-handlebars"]').each(function() {
        var $template = $(this);
        var template_name = $template.attr("id");
        templates[template_name] = Handlebars.compile($template.html());
        if ($template.attr("data-type") === "partial") {
          Handlebars.registerPartial(template_name, templates[template_name]);
        }
        $template.remove();
      });
    },
    bindEvents: function() {
      var self = this;
      $elements.form.on("submit", function(e) {
        e.preventDefault();
        var formData = new FormData(e.target);
        self.items.createItem({
          name: formData.get("name"),
          quantity: +formData.get("quantity"),
        });
        e.target.reset();
      });
      $elements.tbody.on("click", "a[data-id]", function(e) {
        e.preventDefault();
        self.items.remove(self.items.where({id: $(e.target).data("id")}));
      });
      $elements.deleteAll.on("click", function(e) {
        e.preventDefault();
        self.items.reset();
      });
      $elements.thead.on("click", "th[data-prop]", function(e) {
        self.items.comparator = $(e.target).data("prop");
        self.items.sort();
      });
    },
    init: function() {
      this.collectHandlebarTemplates();
      this.items = new ItemsCollection(items_json);
      this.bindEvents();
    },
  };

  App.init();

});
