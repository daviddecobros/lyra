// TODO(jzong): this probably should be moved to store/factory

import {Map, Record, RecordOf} from 'immutable';
import {Signal as VegaSignal} from 'vega-typings/types';

const dl = require('datalib');
const ns = require('../../util/ns');

const SELECTED = ns('selected');
const MODE = ns('mode');
const ANCHOR = ns('anchor');
const DELTA = ns('delta');
const CURSOR = 'cursor';  // Special vega signal, don't namespace.
const CELL = ns('cell');
const MOUSE = ns('mouse');

export const signalNames = {
  SELECTED,
  MODE,
  ANCHOR,
  DELTA,
  CURSOR,
  CELL,
  MOUSE
};

export type LyraSignal = {
  _idx: number
} & VegaSignal;

export const Signal = Record<LyraSignal>({
  _idx: null,
  name: null
});

export type SignalRecord = RecordOf<LyraSignal>;

export type SignalState = Map<string, SignalRecord>;

export const defaultSignalState: SignalState = Map({
  SELECTED: Signal({
    name: SELECTED,
    value: {mark: {}},
    on: [
      {events: 'mousedown[item().mark && item().mark.name &&' +
          'item().mark.name !== ' + dl.str(CELL) + ']',
        update: 'item()'},
      {events: 'mousedown[!item().mark]', update: '{mark: {}}'}
    ],
    _idx: 0
  }),
  MODE: Signal({
    name: MODE,
    value: 'handles',
    _idx: 1
  }),
  DELTA: Signal({
    name: DELTA,
    value: 0,
    on: [
      {events: '[mousedown, window:mouseup] > window:mousemove',
        update: '{x: x() - lyra_anchor.x, y: y() - lyra_anchor.y}'}
    ],
    _idx: 2
  }),
  ANCHOR: Signal({
    name: ANCHOR,
    value: 0,
    on: [
      {events: 'mousedown',
        update: '{x: x(), y: y(), target: item()}'},
      {events: '[mousedown, window:mouseup] > window:mousemove',
        update: '{x: x(), y: y(), target: lyra_anchor.target}'}
    ],
    _idx: 3
  }),
  CELL: Signal({
    name: CELL,
    value: {},
    on: [
      {events: '@' + CELL + ':dragover', update: 'item()'},
      {events: '@' + CELL + ':dragleave', update: '{}'},
      // {events: '@'+CELL+':mouseover', update: 'item()'},
      // {events: '@'+CELL+':mouseout',  update: '{}'}
    ],
    _idx: 4
  }),
  MOUSE: Signal({
    name: MOUSE,
    value: {},
    on: [
      {events: 'mousemove, dragover', update: '{x: x(), y: y()}'}
    ],
    _idx: 5
  }),
  CURSOR: Signal({
    name: CURSOR,
    on: [
      {events: 'mousedown', update: "item() && item().cursor || 'default'"},
      {events: 'mouseup', update: "'default'"}
    ]
  })
});
