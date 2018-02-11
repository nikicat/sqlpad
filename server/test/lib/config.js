const assert = require('assert')
const config = require('../../lib/config.js')

const configItems = require('../../resources/configItems')
const defaultConfig = require('../../lib/config/default')
const envConfig = require('../../lib/config/env')
const cliConfig = require('../../lib/config/cli')
const nonUiConfig = require('../../lib/config/nonUi')

describe('config', function() {
  it('default', function() {
    const conf = defaultConfig()
    assert.equal(conf.port, 80, 'default port')
    assert(conf.dbPath !== '$HOME/sqlpad/db', 'dbPath should change')
  })

  it('env', function() {
    const conf = envConfig({ SQLPAD_PORT: 8000 })
    assert.equal(conf.port, 8000, 'conf.port')
  })

  it('cli', function() {
    const conf = cliConfig({
      'key-path': 'key/path',
      cert: 'cert/path',
      admin: 'admin@email.com'
    })
    assert.equal(conf.keyPath, 'key/path', 'keyPath')
    assert.equal(conf.certPath, 'cert/path', 'certPath')
    assert.equal(conf.admin, 'admin@email.com', 'admin')
  })

  it('nonUI', function() {
    assert.equal(Object.keys(nonUiConfig()).length, configItems.length)
  })
})

describe('lib/config.js', function() {
  // TODO test when control is inverted/dependencies injected
  // set any process.env variables or args here
  // process.argv.push('--debug')
  // process.env.SQLPAD_DEBUG = 'FALSE'
  // process.env.GOOGLE_CLIENT_ID = 'google-client-id'

  describe('#get()', function() {
    it.skip('should get a value provided by default', function() {
      assert.equal(config.get('port'), 80, 'port=80')
    })
    it.skip('should get a value provided by environment', function() {
      assert.equal(
        config.get('googleClientId', 'google-client-id', 'googleClientId')
      )
    })
    it.skip('cli should override env var', function() {
      assert.equal(config.get('debug'), true, 'debug=true')
    })
    it('should only accept key in config items', function() {
      assert.throws(() => config.get('non-existent-key'), Error)
    })
  })
})