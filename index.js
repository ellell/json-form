var swig = require('swig')

  , defaultTypes = {
      checkbox: swig.compileFile(__dirname + '/templates/form-partials/checkbox.html')
    , hidden: swig.compileFile(__dirname + '/templates/form-partials/hidden.html')
    , select: swig.compileFile(__dirname + '/templates/form-partials/select.html')
    , text: swig.compileFile(__dirname + '/templates/form-partials/text.html')
    , textarea: swig.compileFile(__dirname + '/templates/form-partials/textarea.html')
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
