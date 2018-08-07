'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('@ckeditor/ckeditor5-core/src/plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _clickobserver = require('@ckeditor/ckeditor5-engine/src/view/observer/clickobserver');

var _clickobserver2 = _interopRequireDefault(_clickobserver);

var _upcastConverters = require('@ckeditor/ckeditor5-engine/src/conversion/upcast-converters');

var _tokenizrcommand = require('./tokenizrcommand');

var _tokenizrcommand2 = _interopRequireDefault(_tokenizrcommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tokenizrAttributes = function tokenizrAttributes(element) {
  return {
    class: element.getAttribute('class'),
    'data-id': element.getAttribute('data-id'),
    'data-name': element.getAttribute('data-name'),
    'data-widget': 'tokenizr'
  };
};

var createTokenizrElement = function createTokenizrElement(modelElement, viewWriter) {
  return viewWriter && viewWriter.createContainerElement('span', tokenizrAttributes(modelElement));
};

var TokenizrEditing = function (_Plugin) {
  _inherits(TokenizrEditing, _Plugin);

  function TokenizrEditing(editor) {
    _classCallCheck(this, TokenizrEditing);

    var _this = _possibleConstructorReturn(this, (TokenizrEditing.__proto__ || Object.getPrototypeOf(TokenizrEditing)).call(this, editor));

    editor.config.define('tokenizr', {
      options: [{
        'data-widget': 'tokenizr',
        id: 'h2',
        name: 'Heading 1',
        class: 'ck-tokenizr badge badge-primary badge-pill'
      }, {
        'data-widget': 'tokenizr',
        id: 'h3',
        name: 'Heading 2',
        class: 'ck-tokenizr badge badge-primary badge-pill'
      }, {
        'data-widget': 'tokenizr',
        id: 'h4',
        name: 'Heading 3',
        class: 'ck-tokenizr badge badge-primary badge-pill'
      }]
    });
    return _this;
  }

  _createClass(TokenizrEditing, [{
    key: 'init',
    value: function init() {
      var editor = this.editor;
      var model = editor.model,
          conversion = editor.conversion,
          commands = editor.commands;
      var schema = model.schema;


      schema.register('tokenizr', {
        isObject: true,
        isBlock: true,
        allowWhere: '$block',
        allowIn: '$block',
        inheritAllFrom: '$block'
      });

      conversion.elementToElement({
        model: 'tokenizr',
        view: createTokenizrElement
      });

      conversion.for('upcast').add((0, _upcastConverters.upcastElementToElement)({
        view: {
          name: 'span',
          attributes: {
            'data-widget': 'tokenizr'
          }
        },
        model: function model(viewElement, modelWriter) {
          return modelWriter.createElement('tokenizr', tokenizrAttributes(viewElement));
        }
      }));

      // Register the tokenizr command for this option.
      commands.add('tokenizr', new _tokenizrcommand2.default(editor));
    }
  }], [{
    key: 'requires',
    get: function get() {
      return [];
    }
  }]);

  return TokenizrEditing;
}(_plugin2.default);

exports.default = TokenizrEditing;