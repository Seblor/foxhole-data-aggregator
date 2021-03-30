"use strict"

const fetch = require("node-fetch")

const warsBaseUrls = {
  1: "https://war-service-live.foxholeservices.com/api",
  2: "https://war-service-live-2.foxholeservices.com/api"
}

/**
 * @typedef {1|2} warIdType
 */

const API = {
  /**
   * Returns the base API URL (non slash terminated)
   * @param {warIdType} warId
   */
  getBaseUrl(warId) {
    return warsBaseUrls[warId]
  },
  /**
   * Returns the list of maps
   * @param {warIdType} warId
   * @returns {Promise<string[]>}
   */
  getMapsList(warId) {
    return fetch(`${API.getBaseUrl(warId)}/worldconquest/maps/`).then(res => res.json())
  },
  /**
   * Returns the API data for a specific map
   * @param {warIdType} warId
   * @param {string} mapName
   * @param {"dynamic"|"static"} type
   * @returns {Promise}
   */
  getMapData(warId, mapName, type) {
    switch (type) {
      case "dynamic":
        return fetch(`${API.getBaseUrl(warId)}/worldconquest/maps/${mapName}/dynamic/public`).then(res => res.json())
      case "static":
        return fetch(`${API.getBaseUrl(warId)}/worldconquest/maps/${mapName}/static`).then(res => res.json())

      default:
        break;
    }
  },
  /**
   * Returns the aggregated data of all maps
   * @param {warIdType} warId
   * @returns {Promise<Array>}
   */
  async getAllStatic(warId) {
    return Promise.all(
      (await API.getMapsList(warId)).map(mapName => API.getMapData(warId, mapName, "static"))
    )
  },
  /**
   * Returns the aggregated data of all maps
   * @param {warIdType} warId
   * @returns {Promise<Array>}
   */
  async getAllDynamic(warId) {
    return Promise.all(
      (await API.getMapsList(warId)).map(mapName => API.getMapData(warId, mapName, "dynamic"))
    )
  }
}

module.exports = API
