/* eslint-disable import/no-extraneous-dependencies */
import nock from 'nock'

export const mockPath = (path, data) =>
  nock('http://localhost:8000')
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get(path)
    .reply(200, data)
