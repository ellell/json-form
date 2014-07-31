var swig = require('swig')

  , defaultTypes = {
      text: swig.compileFile(__dirname + '/templates/form-partials/text.html')
    , checkbox: swig.compileFile(__dirname + '/templates/form-partials/checkbox.html')
    , select: swig.compileFile(__dirname + '/templates/form-partials/select.html')
  }
  , JsonForm = function (opts) {
    if (!(this instanceof JsonForm))
      return new JsonForm(opts)

    this.types = defaultTypes
  }

swig.setDefaults({
  autoescape: false
})

JsonForm.prototype.generate = function (json) {
  var self = this
    , inputElements = ''

  json.forEach(function (formItem) {
    if (!self.types[formItem.type])
      throw new Error('Type is not defined ' + formItem.type)

    inputElements = inputElements + self.types[formItem.type](formItem)
  })

  return swig.renderFile(__dirname + '/templates/layout.html', { inputElements: inputElements })
}

JsonForm.prototype.addType = function (type) {
  this.types[type.name] = swig.compile(type.html)
}

module.exports = JsonForm
