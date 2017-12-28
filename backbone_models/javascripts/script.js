function renderPost(model) {
  var post_html = $("#post").html();
  var $post = $(post_html);

  $post.find("h1").text(model.get("title"));
  if (model.get("user")) {
    $post.find("header p").text("By " + model.get("user").get("name"));
  }
  $post.find("header + p").text(model.get("body"));
  $("body").append($post);
}

var PostModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts",
  setUser: function() {
    var self = this;
    var user = new UserModel({ id: self.get("userId") });
    user.fetch({
      success: function(model) {
        self.set("user", model);
        console.log(self.toJSON());
      },
    });
  },
  initialize: function() {
    if (this.has("userId")) this.setUser();
    this.on("change:userId", this.setUser);
    this.on("change", renderPost);
  }
});

var UserModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/users",
});

var post = new PostModel({ id: 1 });
post.fetch();
post.set({"title": "Changed title"}).save();

var post2 = new PostModel({
  id: 2,
  title: "Post 2 Title",
  body: "Post 2 Body",
  userId: "2",
});



