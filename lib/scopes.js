/* eslint-disable no-restricted-syntax */

const czConfig = require('./cz-config')();

const defaults = [];

/**
 * Gets the `value` for `scope-enum` rule of commitlint config.
 *
 * @param {Object} _czConfig A cz-customizable config.
 *
 * @returns {Object} The `value`.
 */
function get(_czConfig) {
  const scopes = [];

  if (typeof _czConfig.scopes === 'undefined') {
    return defaults;
  }

  for (const scope of _czConfig.scopes) {
    scopes.push(scope.name);
  }

  if (typeof _czConfig.scopeOverrides === 'undefined') {
    return scopes;
  }

  for (const type of Object.keys(_czConfig.scopeOverrides)) {
    for (const scope of _czConfig.scopeOverrides[type]) {
      scopes.push(scope.name);
    }
  }

  return scopes.filter((value, index, scope) => {
    return scope.indexOf(value) === index;
  });
}

module.exports = () => get(czConfig);
module.exports.defaults = defaults;
module.exports.get = get;
