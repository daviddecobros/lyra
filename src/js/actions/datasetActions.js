'use strict';

var dl = require('datalib'),
    counter = require('../util/counter'),
    ADD_DATASET = 'ADD_DATASET',
    SORT_DATASET = 'SORT_DATASET',
    ADD_TO_SUMMARIZE = 'ADD_TO_SUMMARIZE';

/**
 * Action creator to add a new Dataset in the store.
 *
 * @param {Object} props - The properties of the dataset.
 * @param {Array} values - A JSON array of parsed values.
 * @param {Object} schema - The schema associated with the dataset
 * @returns {Object} An ADD_DATASET action.
 */
function addDataset(props, values, schema) {
  props = dl.extend({
    _id: props._id || counter.global()
  }, props);

  return {
    type: ADD_DATASET,
    id: props._id,
    props: props,
    values: values,
    schema: schema
  };
}

/**
 * Action creator to add transformations to dataset
 *
 * @param {number} dsId - Id of the dataset.
 * @param {string} field - Field to be sorted.
 * @param {string} order - Either 'asc' or 'desc'
 * indicating order of sort of the field.
 * @returns {Object} SORT_DATASET action with info about
 * field to be sorted
 */
function sortDataset(dsId, field, order) {
  return {
    type: SORT_DATASET,
    id: dsId,
    field: field,
    order: order
  };
}


function addToSummarize(id, summarize) {
  return {
    type: ADD_TO_SUMMARIZE,
    id: id,
    summarize: summarize
  };
}

module.exports = {
  // Action Names
  ADD_DATASET: ADD_DATASET,
  SORT_DATASET: SORT_DATASET,
  ADD_TO_SUMMARIZE: ADD_TO_SUMMARIZE,
  UPDATE_SUMMARIZE: ADD_TO_SUMMARIZE,

  // Action Creators
  addDataset: addDataset,
  sortDataset: sortDataset,
  addToSummarize: addToSummarize
};
