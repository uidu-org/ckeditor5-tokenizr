'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('@ckeditor/ckeditor5-core/src/plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _clickobserver = require('@ckeditor/ckeditor5-engine/src/view/observer/clickobserver');

var _clickobserver2 = _interopRequireDefault(_clickobserver);

var _model = require('@ckeditor/ckeditor5-ui/src/model');

var _model2 = _interopRequireDefault(_model);

var _utils = require('@ckeditor/ckeditor5-ui/src/dropdown/utils');

var _collection = require('@ckeditor/ckeditor5-utils/src/collection');

var _collection2 = _interopRequireDefault(_collection);

var _utils2 = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadingUI = function (_Plugin) {
  _inherits(HeadingUI, _Plugin);

  function HeadingUI() {
    _classCallCheck(this, HeadingUI);

    return _possibleConstructorReturn(this, (HeadingUI.__proto__ || Object.getPrototypeOf(HeadingUI)).apply(this, arguments));
  }

  _createClass(HeadingUI, [{
    key: 'init',

    /**
     * @inheritDoc
     */
    value: function init() {
      var _this2 = this;

      var editor = this.editor;
      var t = editor.t;

      var options = (0, _utils2.getLocalizedOptions)(editor);
      var defaultTitle = t('Choose tokenizr');
      var dropdownTooltip = t('Tokenizr');

      editor.editing.view.addObserver(_clickobserver2.default);
      editor.editing.view.on('click', function (evt, data) {
        console.log(evt);
        console.log(data.target); // -> engine.view.Element
      });

      // Register UI component.
      editor.ui.componentFactory.add('tokenizr', function (locale) {
        var titles = {};
        var itemDefinitions = new _collection2.default();

        var tokenizrCommand = editor.commands.get('tokenizr');

        var commands = [tokenizrCommand];

        options.map(function (option) {
          var def = {
            type: 'button',
            model: new _model2.default({
              id: option.id,
              label: option.name,
              class: option.class,
              withText: true
            })
          };

          // def.model.bind('isOn').to(tokenizrCommand, 'value', value => {
          //   return value && value.id === option.id;
          // });

          def.model.set({
            commandName: 'tokenizr',
            commandValue: option.id
          });

          itemDefinitions.add(def);

          titles[option.model] = option.title;
          return true;
        });

        var dropdownView = (0, _utils.createDropdown)(locale);
        (0, _utils.addListToDropdown)(dropdownView, itemDefinitions);

        dropdownView.buttonView.set({
          isOn: false,
          withText: true,
          tooltip: dropdownTooltip
        });

        dropdownView.extendTemplate({
          attributes: {
            class: ['ck-tokenizr-dropdown']
          }
        });

        dropdownView.bind('isEnabled').toMany(commands, 'isEnabled', function () {
          for (var _len = arguments.length, areEnabled = Array(_len), _key = 0; _key < _len; _key++) {
            areEnabled[_key] = arguments[_key];
          }

          return areEnabled.some(function (isEnabled) {
            return isEnabled;
          });
        });

        dropdownView.buttonView.bind('label').to(tokenizrCommand, 'value', function (value) {
          return titles[value] ? titles[value] : defaultTitle;
        });

        // Execute command when an item from the dropdown is selected.
        _this2.listenTo(dropdownView, 'execute', function (evt) {
          editor.execute(evt.source.commandName, evt.source.commandValue ? options.filter(function (o) {
            return o.id === evt.source.commandValue;
          })[0] : undefined);
          editor.editing.view.focus();
        });

        return dropdownView;
      });
    }
  }]);

  return HeadingUI;
}(_plugin2.default);

exports.default = HeadingUI;