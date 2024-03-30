import {expect, test, describe, beforeEach, afterEach} from 'bun:test'
import path from 'node:path'

import {getConfig} from '../src/config'

const initialDirectory = __dirname
beforeEach(() => {
  process.chdir(__dirname)
})
afterEach(() => {
  process.chdir(initialDirectory)
})

describe('getConfig', () => {
  test('getConfig from disk', async () => {
    const conf = await getConfig()
    expect(conf.include).toEqual(['*'])
    expect(conf.outDir).toBe('__dist__')
  })

  test('getConfig defaults', async () => {
    process.chdir(path.join(__dirname, 'no-config'))

    const conf = await getConfig()
    expect(conf).toEqual({
      include: ['src'],
      outDir: 'dist',
      rootDir: 'src',
    })
  })

  test('getConfig with overrides', async () => {
    const conf = await getConfig({overrides: {include: ['source']}})
    expect(conf.include).toEqual(['source'])
    expect(conf.outDir).toBe('__dist__')

    const conf2 = await getConfig({overrides: {outDir: 'build'}})
    expect(conf2.include).toEqual(['*'])
    expect(conf2.outDir).toBe('build')
  })

  test('getConfig rootDir default', async () => {
    const conf = await getConfig()
    expect(conf.rootDir).toBe('')

    const conf2 = await getConfig({moduleName: 'rksrc'})
    expect(conf2.include).toEqual(['src'])
    expect(conf2.rootDir).toBe('src')

    const conf3 = await getConfig({overrides: {rootDir: 'foo'}})
    expect(conf3.rootDir).toBe('foo')
  })
})
