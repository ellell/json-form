var swig = require('swig')

  , defaultTypes = {
      text: '<input type="text" name="{{name}}">{{value}}</input>'
    , checkbox: '<input type="checkbox" name="{{name}}"{% if checked %} checked{% endif %}>'
  }
  , JsonForm = function () {
    if (!(this instanceof JsonForm))
      return new JsonForm()

    this.types = defaultTypes
  }

JsonForm.prototype.generate = function (json) {
  var self = this
    , form = '<form>'

  json.forEach(function (formItem) {
    if (!self.types[formItem.type])
      throw new Error('Type is not defined ' + formItem.type)

    form = form + swig.render(self.types[formItem.type], { locals: formItem })
  })

  return form + '</form>'
}

JsonForm.prototype.addType = function (type) {
  this.types[type.name] = type.html
}

module.exports = JsonForm
