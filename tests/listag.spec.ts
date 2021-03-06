#!/usr/bin/env ts-node
'use strict'

import test from 'blue-tape'

import { 
  Listag, 
  ListagItem 
}               from '../'

test('Listag smoking test', t => {
  let lt = new Listag()

  t.equal(lt.length, 0, 'should be zero after instanciated')

  const EXPECTED_ITEM_RED       = 'red item'
  const EXPECTED_OWNER_ALICE    = 'alice'
  const EXPECTED_CHANNEL_EARTH  = 'earth'

  const EXPECTED_ITEM_GREEN     = 'green item'
  const EXPECTED_OWNER_BOB      = 'bob'
  const EXPECTED_CHANNEL_MOON   = 'moon'

  let retList

  /**
   *
   * constructors
   *
   */
  // socks = new Listag(3, {user: 'zixia', channel: 'io'})
  lt = new Listag(EXPECTED_ITEM_RED, {
    owner: EXPECTED_OWNER_ALICE
    , channel: EXPECTED_CHANNEL_EARTH
  })
  t.equal(lt.length, 1, 'should has one after instanciate with 1 item')
  retList = lt.get({ owner: EXPECTED_OWNER_ALICE })
  t.equal(retList.length, 1, 'should get one with tag owner1')
  retList = lt.get({ channel: EXPECTED_CHANNEL_EARTH })
  t.equal(retList.length, 1, 'should get one with tag channel1')

  // socks = new Listag([3, 4], {user: 'zixia', channel: 'io'})
  lt = new Listag([EXPECTED_ITEM_RED, EXPECTED_ITEM_GREEN], {
    owner: EXPECTED_OWNER_ALICE
    , channel: EXPECTED_CHANNEL_EARTH
  })
  t.equal(lt.length, 2, 'should has two after instanciate with 2 items')
  retList = lt.get({ owner: EXPECTED_OWNER_ALICE })
  t.equal(retList.length, 2, 'should get two with tag owner1')
  retList = lt.get({ channel: EXPECTED_CHANNEL_EARTH })
  t.equal(retList.length, 2, 'should get two with tag channel1')

  /**
   *
   * add method
   *
   */
  // socks.add(3, {user: 'zixia', channel: 'io'})
  lt = new Listag()
  lt.add(EXPECTED_ITEM_RED, {
    owner: EXPECTED_OWNER_ALICE
    , channel: EXPECTED_CHANNEL_EARTH
  })
  t.equal(lt.length, 1, 'should be one after instanciate with one item')
  retList = lt.get({ owner: EXPECTED_OWNER_ALICE })
  t.equal(retList.length, 1, 'should get one after get owner1')
  retList = lt.get({ channel: EXPECTED_CHANNEL_EARTH })
  t.equal(retList.length, 1, 'should get one after get channel1')

  // socks.add([5,6], {user: 'zixia', channel: 'io'})
  lt = new Listag()
  lt.add([EXPECTED_ITEM_RED, EXPECTED_ITEM_GREEN], {
    owner: EXPECTED_OWNER_ALICE
    , channel: EXPECTED_CHANNEL_EARTH
  })
  t.equal(lt.length, 2, 'should be two after instanciate with 2 items and tagMat')
  retList = lt.get({ owner: EXPECTED_OWNER_ALICE })
  t.equal(retList.length, 2, 'should get two with tag owner1')
  retList = lt.get({ channel: EXPECTED_CHANNEL_EARTH })
  t.equal(retList.length, 2, 'should get two with tag channel1')


  // socks.add(6)
  //      .tag(, {user: 'zixia'})
  lt = new Listag()
  lt.add(EXPECTED_ITEM_RED)
    .tag({ owner: EXPECTED_OWNER_ALICE })
  t.equal(lt.length, 1, 'should be one after add/tag')
  retList = lt.get({ owner: EXPECTED_OWNER_ALICE })
  t.equal(retList.length, 1, 'should get one after get owner1')

  // socks.add(6)
  //      .tag({ user: 'zixia'})
  //      .tag({ channel: 'io' })
  lt = new Listag()
  lt.add(EXPECTED_ITEM_RED)
    .tag({ owner: EXPECTED_OWNER_ALICE })
    .tag({ channel: EXPECTED_CHANNEL_EARTH })
  t.equal(lt.length, 1, 'should be one after add/tag/tag')
  retList = lt.get({ owner: EXPECTED_OWNER_ALICE })
  t.equal(retList.length, 1, 'should get one after get owner1')
  retList = lt.get({ channel: EXPECTED_CHANNEL_EARTH })
  t.equal(retList.length, 1, 'should get one after get channel1')


  // socks.add(6)
  //      .tag({
  //        user: 'zixia'
  //        , channel: 'io'
  //      })
  lt = new Listag()
  lt.add(EXPECTED_ITEM_RED)
    .tag({
      owner: EXPECTED_OWNER_ALICE
      , channel: EXPECTED_CHANNEL_EARTH
    })
  t.equal(lt.length, 1, 'should be one after add/tag(multi tag)')
  retList = lt.get({ owner: EXPECTED_OWNER_ALICE })
  t.equal(retList.length, 1, 'should get one after get owner1')
  retList = lt.get({ channel: EXPECTED_CHANNEL_EARTH })
  t.equal(retList.length, 1, 'should get one after get channel1')

  /**
   *
   * get method
   *
   */
  lt = new Listag()
  lt.add(EXPECTED_ITEM_RED, {
    owner: EXPECTED_OWNER_ALICE
    , channel: EXPECTED_CHANNEL_EARTH
  })
  lt.add(EXPECTED_ITEM_GREEN, {
    owner: EXPECTED_OWNER_BOB
    , channel: EXPECTED_CHANNEL_MOON
  })
  t.equal(lt.length, 2, 'should be two after two adds')
  retList = lt.get({ owner: EXPECTED_OWNER_ALICE })
  t.equal(retList.length, 1, 'should get one after get owner1')
  t.equal(retList[0], EXPECTED_ITEM_RED, 'should get the red item')
  retList = lt.get({ channel: EXPECTED_CHANNEL_MOON })
  t.equal(retList.length, 1, 'should get one after get channel2')
  t.equal(retList[0], EXPECTED_ITEM_GREEN, 'should get the right sock 2')

  /**
   * get with minus value. ie: { tag: '-exception' }
   */
  lt = new Listag()
  lt.add(EXPECTED_ITEM_RED, {
    owner: EXPECTED_OWNER_ALICE
    , channel: EXPECTED_CHANNEL_EARTH
  })
  lt.add(EXPECTED_ITEM_GREEN, {
    owner: EXPECTED_OWNER_BOB
    , channel: EXPECTED_CHANNEL_EARTH
  })
  retList = lt.get({ channel: EXPECTED_CHANNEL_EARTH, owner: '-' + EXPECTED_OWNER_BOB })
  t.equal(retList.length, 1, 'should get one after get with "-" tag search sign')
  t.equal(retList[0], EXPECTED_ITEM_RED, 'should get the red item with "-" tag search sign')

  t.end()
})

test('Listag cross query test', t => {

  const EXPECTED_SOCK1 = {s: 'dummy sock'}
  const EXPECTED_OWNER12 = 'dummy owner'
  const EXPECTED_CHANNEL1 = 'dummy CHANNEL'

  const EXPECTED_SOCK2 = {s: 'dummy sock 2'}
  const EXPECTED_CHANNEL23 = 'dummy CHANNEL 2'

  const EXPECTED_SOCK3 = {s: 'dummy sock 3'}
  const EXPECTED_OWNER3 = 'dummy owner 3'

  let lt = new Listag()

  lt.add(EXPECTED_SOCK1, {
    owner: EXPECTED_OWNER12
    , channel: EXPECTED_CHANNEL1
  })
  lt.add(EXPECTED_SOCK2, {
    owner: EXPECTED_OWNER12
    , channel: EXPECTED_CHANNEL23
  })
  lt.add(EXPECTED_SOCK3, {
    owner: EXPECTED_OWNER3
    , channel: EXPECTED_CHANNEL23
  })

  let retList

  retList = lt.get({
    owner: EXPECTED_OWNER12
  })
  t.equal(retList.length, 2, 'should get 2 result for owner12')
  t.equal(retList[0], EXPECTED_SOCK1, 'should get sock1 by owner12')
  t.equal(retList[1], EXPECTED_SOCK2, 'should get sock2 by owner12')

  retList = lt.get({
    channel: EXPECTED_CHANNEL23
  })
  t.equal(retList.length, 2, 'should get 2 result for channel23')
  t.equal(retList[0], EXPECTED_SOCK2, 'should get sock2 by channel23')
  t.equal(retList[1], EXPECTED_SOCK3, 'should get sock3 by channel23')

  t.end()
})

test('Listag del & array functional', t => {
  let lt = new Listag([1, 2], {a: 1})

  let addEvent = false
  let delEvent = false

  lt.once('add', () => addEvent = true)
  lt.once('del', () => delEvent = true)

  lt.add(3, {b: 2})

  lt.add(4, {b: 2})
  lt.del(4)
  lt.del(4)

  t.ok(addEvent, 'should received add event')
  t.ok(delEvent, 'should received del event')

  const EXPECTED_MAP = { expected: true }
  lt.add([5, 6], EXPECTED_MAP)
  const item = lt.item(5)
  t.ok(item instanceof ListagItem, 'should be a ListagItem instance')
  const retMap = item!.tag()
  t.deepEqual(retMap, EXPECTED_MAP, 'should get back the getTag')

  const delList = lt.get(EXPECTED_MAP)
  lt.del(delList)

  lt.forEach(v => {
    if (v === 1 || v === 2 || v === 3) {
      t.pass('forEach for value ' + v)
    } else {
      t.fail('forEach got unknown value ' + v)
    }
  })


  t.end()
})

test('Listag.get support tags & raw data', t => {
  let lt = new Listag()
  
  const obj = test

  lt.add([1, 2], {a: 1})
  lt.add([3, obj], {b: 2})
  
  let item = lt.item(obj)
  let tagMap = item!.tag()
  t.equal(tagMap.b, 2, 'should be 2 for tag name "b" on `obj`')

  item = lt.item(1)
  tagMap = item!.tag()
  t.equal(tagMap.a, 1, 'should be 1 for tag name "a" on 1')
  
  item!.tag({ c: 3 })
  item = lt.item(1)
  tagMap = item!.tag()
  t.equal(tagMap.c, 3, 'should be 3 for tag name "c" on 1')
  
  const lt2 = new Listag(lt)
  t.equal(lt.constructor.name, '_Listag', 'should be a _Listag instance')
  item = lt2.item(1)
  tagMap = item!.tag()
  t.equal(tagMap.a, 1, 'should be 1 for new listag from a existing listag with tag name "a" on 1')
  
  let valid = true
  for (let n=0; n<lt2.length; n++) {
    item = lt2.item(lt2[n])
    tagMap = item!.tag()
    valid = valid && item && tagMap
  }
  t.ok(valid, 'should got items and tags from array operator right')
  
  t.end()
})