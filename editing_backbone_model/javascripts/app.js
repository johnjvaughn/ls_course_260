$(function () {

  var templates = {};
  var $elements = {
    article: $("article"),
    form: $("form"),
    fieldset: $("fieldset"),
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

  var ProductModel = Backbone.Model.extend({
    render: function () {
      $elements.article.html(templates.product(this.toJSON()));
      $elements.fieldset.html(templates.form(this.toJSON()));
    },
    setDates: function () {
      var date = new Date();
      this.set({
        datetime: date.toISOString(),
        date_formatted: moment().format("MMM Do YYYY, HH:mm:ss")
      });
    },
    initialize: function() {
      collectHandlebarTemplates();
      this.setDates();
      this.render();
    },
  });

  var product = new ProductModel(product_json);

  $elements.form.on("submit", function(e) {
    e.preventDefault();
    var name = $(e.target).find("input[name='name']").val();
    var description = $(e.target).find("textarea[name='description']").val();
    product.set({
      name: name,
      description: description,
      date: (new Date()).valueOf(),
    });
    product.setDates();
    product.render();
  });
});
