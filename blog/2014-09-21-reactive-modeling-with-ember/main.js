(function() {

  var App = Ember.Application.create({Router: null});
  App.Router.reopen({ location: 'none' });

  var RGBSelector = Ember.Mixin.create({
    color: Color.fromRGB(255,0,0),
    impliedColor: function() {
      return Color.fromRGB(this.getProperties('r','g','b'))
    }.property('r', 'g','b'),
    setupRgbBindings: function() {
      Ember.oneWay(this, 'r', 'color.r')
      Ember.oneWay(this, 'g', 'color.g')
      Ember.oneWay(this, 'b', 'color.b')
      Ember.oneWay(this, 'color', 'impliedColor')
    }.on('didInsertElement')
  })

  App.ColorMatcherDemoComponent = Ember.Component.extend({
    layoutName: 'components/color-matcher-demo',
    matcher: function() {
      return Matcher.create({
        input: "#FF0000"
      })
    }.property()
  })

  App.ColorFormatDemoComponent = Ember.Component.extend(RGBSelector, {
    layoutName: 'components/formatter-demo',
    formatter: function() {
      return Formatter.create()
    }.property(),
    setupColorBindings: function() {
      Ember.oneWay(this, 'formatter.color', 'color')
    }.on('didInsertElement')
  })

  App.SyntaxLiteDemoComponent = Ember.Component.extend(RGBSelector, {
    layoutName: 'components/syntax-lite-demo',
    syntax: function() {
      return ColorSyntaxLite.create()
    }.property(),
    bindColorProperties: function() {
      Ember.bind(this, 'syntax.color', 'color')
    }.on('init'),
    logColor: function() {
      console.log('Global Color', this.get('color.rgb'))
    }.observes('color')
  })

  App.ColorSyntaxDemoComponent = Ember.Component.extend(RGBSelector, {
    layoutName: 'components/color-syntax-demo',

    syntax1: function() {
      return ColorSyntax.create({
        input: "#FF0000"
      })
    }.property(),
    syntax2: function() {
      return ColorSyntax.create({
        input: "rgb(255,0,0)"
      })
    }.property(),
    syntaxBindings: function() {
      Ember.bind(this, 'syntax1.output', 'color')
      Ember.bind(this, 'syntax2.output', 'color')
    }.on('didInsertElement')
  })

  App.ColorSwatchComponent = Ember.Component.extend({
    classNameBindings: [':color-swatch', 'color:defined:undefined'],
    attributeBindings: ['style'],
    color: Color.fromRGB(),
    style: function() {
      var rgb = this.get('color.rgb')
      if (rgb) {
        return "background-color: " + "rgb(" + [rgb.r,rgb.g,rgb.b].join(',') + ")"
      } else {
        return "background-color: " + "transparent;"
      }
    }.property('color'),
  })

  App.XSliderComponent = Ember.Component.extend({
    classNames: ['x-slider'],
    tagName: ['input'],
    attributeBindings: ['min', 'max', 'step', 'type', 'name'],
    type: "range",
    setup: function() {
      Ember.oneWay(this, 'element.value', 'value');
    }.on('didInsertElement'),
    input: function() {
      this.set('value', Number(this.get('element.value')).valueOf());
    }
  });

  App.RgbSelectorComponent = Ember.Component.extend({
    color: Color.fromRGB(),
    setupBindings: function() {
      Ember.oneWay(this, 'h', 'color.r')
      Ember.oneWay(this, 's', 'color.g')
      Ember.oneWay(this, 'b', 'color.b')
    }.on('init'),

    changeColor: function() {
      this.set('color', Color.fromRGB(this.getProperties('r','g','b')));
    }.observes("r", "g", "b")
  });

  $(function() {
    $('[data-component]').each(function() {
      var name = $(this).data('component');
      var key = "component:" + name.camelize();
      var component = App.__container__.lookup(key);
      if (!component) {
        var Component = Ember.Component.extend();
        component = Component.create({
          rgb: RGBColor.create({r: 255, g: 0, b: 0}),
          classNames: [name],
          container: App.__container__,
          layoutName: 'components/' + name
        });
      }
      component.replaceIn(this);
      var initializerName = ('initialize_' + name).camelize();
      if (!Em.isEmpty(initializerName)) {
        initializerName = initializerName.camelize();
        var initializer = window[initializerName];
        if (initializer) {
          initializer.call(this, component);
        }
      }
    });
  })
})()
