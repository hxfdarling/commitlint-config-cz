/* eslint-disable no-restricted-syntax */

const czConfig = require('./cz-config')();

const defaults = [
  // 'feat',
  // 'fix',
  // 'docs',
  // 'style',
  // 'refactor',
  // 'perf',
  // 'test',
  // 'chore',
  // 'revert',
];

/**
 * Gets the `value` for `type-enum` rule of commitlint config.
 *
 * @param {Object} _czConfig A cz-customizable config.
 *
 * @returns {Object} The `value`.
 */
function get(_czConfig) {
  const types = [];

  if (typeof _czConfig.types === 'undefined') {
    return defaults;
  }

  for (const type of _czConfig.types) {
    types.push(type.value);
  }

  return types;
}

module.exports = () => get(czConfig);
module.exports.defaults = defaults;
module.exports.get = get;
