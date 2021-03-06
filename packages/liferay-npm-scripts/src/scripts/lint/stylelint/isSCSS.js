/**
 * © 2019 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

const hasExtension = require('../../../utils/hasExtension');

const EXTENSIONS = new Set(['.scss']);

function isSCSS(filePath) {
	return hasExtension(filePath, EXTENSIONS);
}

module.exports = isSCSS;
