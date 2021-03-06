import { describe, it } from 'mocha'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import nock from 'nock'
import execute, { PATH } from './index'
import { executeSuccess, EXECUTE_SUCCESS_RESPONSE } from '../../../test/api-data-execute-nock'

chai.use(chaiAsPromised)
const { assert } = chai

const URL = 'http://www.rqlite.com:4001'

describe('api data execute', () => {
  before(() => nock.disableNetConnect())
  beforeEach(() => nock.cleanAll())
  after(() => nock.enableNetConnect())
  describe('Function: execute()', () => {
    it(`should call ${URL}${PATH} endpoint with a query using HTTP POST`, async () => {
      const sql = 'INSERT INTO foo(name) VALUES("fiona")'
      const scope = executeSuccess({ url: URL, path: PATH })
      const res = await assert.isFulfilled(execute(URL, sql))
      assert.isTrue(scope.isDone(), 'http request captured by nock')
      // eslint-disable-next-line no-underscore-dangle
      assert.deepEqual([sql], res.request._data)
      assert.deepEqual(EXECUTE_SUCCESS_RESPONSE, res.body)
    })
  })
})
