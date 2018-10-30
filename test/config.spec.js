const assert = require('power-assert');
const path = require('path');
const Config = require('../lib/config');

describe('config', () => {
  describe('.get()', () => {
    it('should return an empty commitlint config object when non-existent config path is given', () => {
      assert.deepStrictEqual(Config.get(''), { rules: {} });
    });
    // eslint-disable-next-line
    it('should return the commitlint config object that is converted from the specific cz-customizable config file', () => {
      const configPath = path.join(__dirname, 'fixtures/.cz-config.js');

      const expected = {
        rules: {
          'type-enum': [2, 'always', ['type-1', 'type-2']],
          'scope-enum': [2, 'always', ['scope-1', 'scope-2', 'scope-3']],
        },
      };

      assert.deepStrictEqual(Config.get(configPath), expected);
    });

    it('should remove empty `type-enum` rule', () => {
      const defaultConfig = {
        rules: {
          'type-enum': [2, 'always', []],
          'scope-enum': [2, 'always', ['scope-1', 'scope-2', 'scope-3']],
        },
      };

      const expected = {
        rules: {
          'scope-enum': [2, 'always', ['scope-1', 'scope-2', 'scope-3']],
        },
      };

      assert.deepStrictEqual(Config.get({}, defaultConfig), expected);
    });

    it('should remove empty `scope-enum` rule', () => {
      const defaultConfig = {
        rules: {
          'type-enum': [2, 'always', ['type-1', 'type-2']],
          'scope-enum': [2, 'always', []],
        },
      };

      const expected = {
        rules: {
          'type-enum': [2, 'always', ['type-1', 'type-2']],
        },
      };

      assert.deepStrictEqual(Config.get({}, defaultConfig), expected);
    });

    it('should merge cz-customizable config with default commitlint rule', () => {
      const configPath = path.join(__dirname, 'fixtures/.cz-config.js');

      const defaultConfig = {
        rules: {
          'body-leading-blank': [2, 'always'],
          'type-enum': [1, 'never', ['type-3', 'type-4']],
          'scope-enum': [1, 'never', ['scope-4', 'scope-5', 'scope-6']],
        },
      };

      const expected = {
        rules: {
          'body-leading-blank': [2, 'always'],
          'type-enum': [1, 'never', ['type-1', 'type-2']],
          'scope-enum': [1, 'never', ['scope-1', 'scope-2', 'scope-3']],
        },
      };

      assert.deepStrictEqual(Config.get(configPath, defaultConfig), expected);
    });

    it('should ignore `scopes` and `scopeOverrides` when commitlint config has no `scope-enum` rule', () => {
      const configPath = path.join(__dirname, 'fixtures/.cz-config.js');

      const defaultConfig = {
        rules: {
          'body-leading-blank': [2, 'always'],
          'type-enum': [1, 'never', ['type-3', 'type-4']],
        },
      };

      const expected = {
        rules: {
          'body-leading-blank': [2, 'always'],
          'type-enum': [1, 'never', ['type-1', 'type-2']],
        },
      };

      assert.deepStrictEqual(Config.get(configPath, defaultConfig), expected);
    });

    it('should ignore `types` when commitlint config has no `type-enum` rule', () => {
      const configPath = path.join(__dirname, 'fixtures/.cz-config.js');

      const defaultConfig = {
        rules: {
          'body-leading-blank': [2, 'always'],
          'scope-enum': [1, 'never', ['scope-4', 'scope-5', 'scope-6']],
        },
      };

      const expected = {
        rules: {
          'body-leading-blank': [2, 'always'],
          'scope-enum': [1, 'never', ['scope-1', 'scope-2', 'scope-3']],
        },
      };

      assert.deepStrictEqual(Config.get(configPath, defaultConfig), expected);
    });
  });
});
