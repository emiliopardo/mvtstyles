/* eslint-disable no-console */

/**
 * @module M/plugin/Mvtstyles
 */


import 'assets/css/mvtstyles';
import MvtstylesControl from './mvtstylescontrol';
import api from '../../api.json';

export default class Mvtstyles extends M.Plugin {
  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * object which has an implementation Object
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Object} impl implementation object
   * @api stable
   */
  constructor(config) {
    super();
    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.map_ = null;

    this.config_ = config;

    /**
     * Array of controls
     * @private
     * @type {Array<M.Control>}
     */
    this.controls_ = [];

    /**
     * Metadata from api.json
     * @private
     * @type {Object}
     */
    this.metadata_ = api.metadata;

    /**
     * Name
     * @public
     * @type {string}
     */
    this.name = 'Mvtstyles';
  }

  /**
   * This function adds this plugin into the map
   *
   * @public
   * @function
   * @param {M.Map} map the map to add the plugin
   * @api stable
   */
  addTo(map) {
    this.controls_.push(new MvtstylesControl(this.config_));
    this.map_ = map;
    // panel para agregar control - no obligatorio
    // this.panel_ = new M.ui.Panel('panelMvtstyles', {
    //   collapsible: true,
    //   position: M.ui.position.TR,
    //   collapsedButtonClass: 'g-cartografia-flecha-izquierda',
    // });
    // this.panel_.addControls(this.controls_);
    // this.panel_.on(M.evt.ADDED_TO_MAP, () => {
    //   this.fire(M.evt.ADDED_TO_MAP);
    //   console.log("cargo panel")
    // });
    // map.addPanels(this.panel_);
    map.addControls(this.controls_)
  }

  /**
   * This function gets metadata plugin
   *
   * @public
   * @function
   * @api stable
   */
  getMetadata(){
    return this.metadata_;
  }

}
