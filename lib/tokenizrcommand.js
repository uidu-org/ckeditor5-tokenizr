'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _command = require('@ckeditor/ckeditor5-core/src/command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadingCommand = function (_Command) {
  _inherits(HeadingCommand, _Command);

  function HeadingCommand(editor, modelElements) {
    _classCallCheck(this, HeadingCommand);

    var _this = _possibleConstructorReturn(this, (HeadingCommand.__proto__ || Object.getPrototypeOf(HeadingCommand)).call(this, editor));

    _this.modelElements = modelElements;
    return _this;
  }

  _createClass(HeadingCommand, [{
    key: 'refresh',
    value: function refresh() {
      this.isEnabled = true;
    }
  }, {
    key: 'execute',
    value: function execute(option) {
      var model = this.editor.model;
      var document = model.document;
      var selection = document.selection;


      model.change(function (writer) {
        var position = selection.getLastPosition();

        if (option) {
          var tokenizr = writer.createElement('tokenizr', {
            class: option.class,
            'data-id': option.id,
            'data-name': option.name,
            'data-widget': 'tokenizr'
          });
          writer.insert(tokenizr, position);
          writer.insertText(' ', tokenizr, 'after');
        }
      });
    }
  }]);

  return HeadingCommand;
}(_command2.default);

exports.default = HeadingCommand;