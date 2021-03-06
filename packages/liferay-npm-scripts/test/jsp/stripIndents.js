/**
 * © 2019 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

const stripIndents = require('../../src/jsp/stripIndents');
const substituteTags = require('../../src/jsp/substituteTags');

describe('stripIndents()', () => {
	it('strips indents that are inside JSP placeholders', () => {
		const [source] = substituteTags(`
			<my:tag>
				var x = 1;

				<c:if test="<% Thing() %>">
					if (condition) {
						if (other) {
							foo();
						}
					}
				</c:if>

				var y = 1;
			</my:tag>
		`);

		const stripped = stripIndents(source);

		const expected = `
			//ʃʃʃʃʃʃ
			var x = 1;

			//ʃʃʃʃʃʃʃʃʃʃʃʃʃʃʃʃʃʃʃʃʃʃʃʃʃ
			if (condition) {
				if (other) {
					foo();
				}
			}
			/*ʅʅʅ*/

			var y = 1;
			/*ʅʅʅʅʅ*/
		`;

		expect(stripped).toBe(expected);
	});

	it('does nothing to indents that are not inside JSP tags', () => {
		const source = `
			if (condition) {
				if (other) {
					foo();
				}
			}
		`;

		const stripped = stripIndents(source);

		expect(stripped).toBe(source);
	});
});
