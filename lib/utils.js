'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getLocalizedOptions = getLocalizedOptions;
/**
 * Returns tokenizr options as defined in `config.tokenizr.options` but processed to consider
 * editor localization, i.e. to display {@link module:tokenizr/tokenizr~HeadingOption}
 * in the correct language.
 *
 * Note: The reason behind this method is that there's no way to use {@link module:utils/locale~Locale#t}
 * when the user config is defined because the editor does not exist yet.
 *
 * @param {module:core/editor/editor~Editor} editor
 * @returns {Array.<module:tokenizr/tokenizr~HeadingOption>}.
 */
function getLocalizedOptions(editor) {
	var t = editor.t;
	var localizedTitles = {
		Paragraph: t('Paragraph'),
		'Heading 1': t('Heading 1'),
		'Heading 2': t('Heading 2'),
		'Heading 3': t('Heading 3')
	};

	return editor.config.get('tokenizr.options').map(function (option) {
		var title = localizedTitles[option.title];

		if (title && title != option.title) {
			// Clone the option to avoid altering the original `config.tokenizr.options`.
			option = Object.assign({}, option, { title: title });
		}

		return option;
	});
}