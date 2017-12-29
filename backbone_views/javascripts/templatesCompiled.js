(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['app'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Favorite Colors</h1>\r\n<ul id='favorites'></ul>\r\n<button id='add-person'>Add Person</button>";
},"useData":true});
templates['listItem'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<h2>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\r\n<ul>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});
templates['newPerson'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"new-person-modal\">\r\n  <form id=\"new-person\" action=\"#\" method=\"post\">\r\n    <fieldset>\r\n      <dl>\r\n        <dt>\r\n          <label for=\"name\">Name</label>\r\n        </dt>\r\n        <dd>\r\n          <input type=\"text\" name=\"name\" id=\"name\" required>\r\n        </dd>\r\n        <dt>\r\n          <label>Favorite Colors</label>\r\n        </dt>\r\n        <dd>\r\n          <input type=\"text\" name=\"color1\" id=\"color1\" required>\r\n          <input type=\"text\" name=\"color2\" id=\"color2\" required>\r\n          <input type=\"text\" name=\"color3\" id=\"color3\" required>\r\n        </dd>\r\n      </dl>\r\n    </fieldset>\r\n    <fieldset>\r\n      <button class=\"btn-add\" type=\"submit\">Add</button>\r\n      <button class=\"btn-cancel\" type=\"cancel\">Cancel</button>\r\n    </fieldset>\r\n  </form>\r\n</div>";
},"useData":true});
})();