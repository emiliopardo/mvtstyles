/**
 * @module M/control/MvtstylesControl
 */

import MvtstylesImplControl from 'impl/mvtstylescontrol';
import template from 'templates/mvtstyles';
import { applyStyle } from 'ol-mapbox-style';


export default class MvtstylesControl extends M.Control {
  /**
   * @classdesc
   * Main constructor of the class. Creates a PluginControl
   * control
   *
   * @constructor
   * @extends {M.Control}
   * @api stable
   */
  constructor(config) {
    // 1. checks if the implementation can create PluginControl
    if (M.utils.isUndefined(MvtstylesImplControl)) {
      M.exception('La implementación usada no puede crear controles MvtstylesControl');
    }
    // 2. implementation of this control
    const impl = new MvtstylesImplControl();
    super(impl, 'Mvtstyles');
    this.config_ = config;
    this.style_ = null;
    this.getStyle(this.config_)

  }

  /**
   * This function creates the view
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api stable
   */
  createView(map) {
    if (!M.template.compileSync) { // JGL: retrocompatibilidad Mapea4
      M.template.compileSync = (string, options) => {
        let templateCompiled;
        let templateVars = {};
        let parseToHtml;
        if (!M.utils.isUndefined(options)) {
          templateVars = M.utils.extends(templateVars, options.vars);
          parseToHtml = options.parseToHtml;
        }
        const templateFn = Handlebars.compile(string);
        const htmlText = templateFn(templateVars);
        if (parseToHtml !== false) {
          templateCompiled = M.utils.stringToHtml(htmlText);
        } else {
          templateCompiled = htmlText;
        }
        return templateCompiled;
      };
    }

    return new Promise((success, fail) => {
      const html = M.template.compileSync(template);
      // Añadir código dependiente del DOM
      success(html);
    });
  }

  /**
   * This function is called on the control activation
   *
   * @public
   * @function
   * @api stable
   */
  activate() {
    // calls super to manage de/activation
    super.activate();
  }
  /**
   * This function is called on the control deactivation
   *
   * @public
   * @function
   * @api stable
   */
  deactivate() {
    // calls super to manage de/activation
    super.deactivate();
  }

  /**
   * This function compares controls
   *
   * @public
   * @function
   * @param {M.Control} control to compare
   * @api stable
   */
  equals(control) {
    return control instanceof MvtstylesControl;
  }

  getStyle(urlStyle) {
    M.remote.get(urlStyle).then((res) => {
      this.style_ = JSON.parse(res.text)
      let sourceTitle = this.style_.name
      let layers = this.style_.layers
      let find = false
      do {
        for (let index = 0; index < layers.length; index++) {
          const layer = layers[index];
          if (layer.id == 'background') {
            let mapcontainer = document.getElementsByClassName('container m-mapea-container')
            mapcontainer[0].style.backgroundColor = Object.values(layer.paint)[0]
            find = true
          }
        }
        find = true

      } while (!find);
      let sources = Object.values(this.style_.sources)
      let sourceNames = Object.keys(this.style_.sources)
      for (let index = 0; index < sources.length; index++) {
        const element = sources[index];
        if (element.type == 'vector') {
          let sourceName = sourceNames[index]
          this.addMVT(element.url, sourceTitle, sourceName)
        } else if (element.type == 'raster') {
          this.addTMS(element.tiles[0])
        }
      }
    })
  }

  addMVT(url, sourceTitle, sourceName) {
    M.remote.get(url).then((res) => {
      let tiles = JSON.parse(res.text)
      let mvt = new M.layer.MVT({
        url: tiles.tiles[0],
        name: sourceTitle,
        projection: 'EPSG:3857',
      });

      mvt.on(M.evt.LOAD, () => {
        let olmvt = mvt.getImpl().getOLLayer();
        applyStyle(olmvt, this.style_, sourceName)
      })
      this.map_.addLayers(mvt)
    })
  }

  addTMS(tiles) {
    // console.log(tiles)
  }
}
