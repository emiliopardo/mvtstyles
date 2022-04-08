/* eslint-disable no-console */

/**
 * @module M/impl/control/MvtstylesControl
 */
export default class MvtstylesControl extends M.impl.Control {
  /**
   * This function adds the control to the specified map
   *
   * @public
   * @function
   * @param {M.Map} map to add the plugin
   * @param {HTMLElement} html of the plugin
   * @api stable
   */
  addTo(map, html) {
    // super addTo - don't delete
    super.addTo(map, html);
    
  }

  // Add your own functions
  activateClick(map) {

  }

  deactivateClick(map) {

  }
}
