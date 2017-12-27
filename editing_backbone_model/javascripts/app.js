$(function () {

  var templates = {};

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

  collectHandlebarTemplates();
  $("article").html(templates.product(product_json));
  $("form > fieldset").html(templates.form(product_json));
  console.log(product_json);

  var ProductModel = Backbone.Model.extend({
    initialize: function() {
      var date = new Date(this.get("date"));
      this.set({
        datetime: date.toISOString(),
        date_formatted: date.toLocaleDateString('en-US'); //"May 1st, 2015 10:30:24" 
      });
    },
  });

});
