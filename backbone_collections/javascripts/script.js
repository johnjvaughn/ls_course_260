$(function () {
  var templates = [];

  function collectTemplates() {
    $('script[type="text/x-handlebars"]').each(function() {
      var $template = $(this);
      var template_name = $template.attr("id");
      templates[template_name] = Handlebars.compile($template.html());
      $template.remove();
    });
  }
  function render() {
    if (templates.length === 0) collectTemplates();
    $("body").html(templates.users({ users: this.toJSON() }));
  }
  
  var User = Backbone.Model.extend({
    url: "http://jsonplaceholder.typicode.com/users",
  });

  var Users = Backbone.Collection.extend({
    model: User,
    url: "http://jsonplaceholder.typicode.com/users",
    parse: function(response) {
      return response.map(function (user) {
        user.company_name = user.company.name;
        user.catchPhrase = user.company.catchPhrase;
        user.company_bs = user.company.bs;
        delete user.company;
        return user;
      });
    },
    initialize: function() {
      this.on("sync sort", render.bind(this));
    },
  });

  var users = new Users();
  users.fetch({
    success: function(collection) {
      console.log(collection.toJSON());
      console.log(collection.pluck("email"));
    },
  });


  var myInfo = new User({
    name: "John Vaughn",
    email: "johnjvaughn@gmail.com",
  });
  users.create(myInfo, {
    success: function(model) {
      console.log(users.length);
    }
  });

  console.log(users.length);

  users.fetch({
    reset: true,
    success: function(model) {
      console.log(model.toJSON());
    }
  });


  users.set({
    id: 1,
    name: "John Vaughn",
    email: "johnjvaughn@gmail.com",
  });
  console.log(users.first().toJSON());

  setTimeout(function() {
    users.comparator = "name";
    users.sort();
  }, 3000);

});