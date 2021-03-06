import _assign from 'lodash/assign'
import _isArray from 'lodash/isArray'
import { get, post } from '../../client'

export const PATH = '/db/query'

/**
 * Get an api request to query SQL on an rqlite server.
 * @param {string} url The full url for the request i.e. http://localhost:4001
 * @param {string} sql The SQL string to excute on the server.
 * @param {object=} options HTTP client options.
 */
export default function (url, sql, options = {}) {
  let { httpOptions = {} } = options
  let opts = options
  if (_isArray(sql)) {
    const body = sql
    // Put the body on the httpOptions
    httpOptions = _assign({}, httpOptions, { body })
    // Put the httpOptions back on the options
    opts = _assign({}, opts, { httpOptions })
    return post(url, PATH, opts)
  }
  let { query = {} } = httpOptions
  // Add the q parameter which is used for SELECT statements.
  query = _assign({}, query, { q: sql })
  // Put the query back on the httpOptions
  httpOptions = _assign({}, httpOptions, { query })
  // Put the httpOptions back on the options
  opts = _assign({}, opts, { httpOptions })
  return get(url, PATH, opts)
}
