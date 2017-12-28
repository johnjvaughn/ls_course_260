$(function () {

  var templates = {};
  var $elements = {
    tbody: $("tbody"),
    thead: $("thead"),
    form: $("form"),
    deleteAll: $("a:contains('Delete')"),
  };

  collectHandlebarTemplates = function () {
    $('script[type="text/x-handlebars"]').each(function() {
      var $template = $(this);
      var template_name = $template.attr("id");
      templates[template_name] = Handlebars.compile($template.html());
      if ($template.attr("data-type") === "partial") {
        Handlebars.registerPartial(template_name, templates[template_name]);
      }
      $template.remove();
    });
  };

  var ItemModel = Backbone.Model.extend({
    idAttribute: "id"
  });

  var ItemsCollection = Backbone.Collection.extend({
    lastId: 0,
    comparator: "name",
    createItem: function(item_data) {
      item_data.id = this.lastId + 1;
      var item = new ItemModel(item_data);
      this.add(item);
      this.lastId += 1;
    },
    renderItems: function() {
      $elements.tbody.html(templates.items({ items: this.models }));
    },
    renderNewItem: function(item) {
      $elements.tbody.append(templates.item(item.attributes));
    },
    initialize: function(init_items_json) {
      collectHandlebarTemplates();
      init_items_json.forEach(function (item_json) {
        this.createItem(item_json);
      }, this);
      this.renderItems();
      this.on("add", function(item) {
        this.renderNewItem(item);
      });
      this.on("remove", function(item) {
        this.renderItems();
      });
    },
  });

  var items = new ItemsCollection(items_json);

  $elements.form.on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    items.createItem({
      name: formData.get("name"),
      quantity: +formData.get("quantity"),
    });
    e.target.reset();
  });
  $elements.tbody.on("click", "a[data-id]", function(e) {
    e.preventDefault();
    items.remove(items.where({id: $(e.target).data("id")}));
  });
  $elements.deleteAll.on("click", function(e) {
    e.preventDefault();
    items.reset();
    items.renderItems();
  });
  $elements.thead.on("click", "th[data-prop]", function(e) {
    items.comparator = $(e.target).data("prop");
    items.sort();
    items.renderItems();
  });
});
