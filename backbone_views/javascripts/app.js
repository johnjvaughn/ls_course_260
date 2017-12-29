var people = [
  { name: "John", colors: ["purple", "green", "orange"] },
  { name: "Susan", colors: ["blue", "green", "red"] },
  { name: "Sarah", colors: ["black", "white", "gray"] },
];

var App = {
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.on("addPerson", function(item) {
      this.list.add(item);
    });
  },
  init: function () {
    this.list = new List(people);
    this.appView = new AppView({ collection: this.list });
    this.appView.render();
    this.listView = new ListView({ collection: this.list });
    this.listView.render();
    this.bindEvents();
  },
};

App.init();