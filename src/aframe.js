import runtime from './core/runtime.js'
import checkDependencies from './aframe/check-dependencies.js'
// components
import data3dComponent from './aframe/component/data3d.js'
import furnitureComponent from './aframe/component/furniture.js'
import tourComponent from './aframe/component/tour.js'
import gBlockComponent from './aframe/component/gblock.js'
import lightingComponent from './aframe/component/lighting.js'
// dynamic entities
import getElementComponent from './aframe/component/dynamic-entities/element3d.js'
// other
import inspectorPluginsLauncher from './aframe/inspector-plugins-launcher.js'
import Data3dView from './aframe/three/data3d-view.js'

// dependency check (for node.js compatibility)

checkDependencies({
  three: false,
  aframe: true,
  onError: function (){
    // show aframe dependency warning, since it is unexpected to run aframe on server
    if (runtime.isBrowser) console.warn('AFRAME library not found: related features will be disabled.')
  }
}, function registerComponents () {

  // get dynamic entities
  var closetComponent = getElementComponent('closet')
  var doorComponent = getElementComponent('door')
  var floorComponent = getElementComponent('floor')
  var kitchenComponent = getElementComponent('kitchen')
  var polyFloorComponent = getElementComponent('polyfloor')
  var wallComponent = getElementComponent('wall')
  var windowComponent = getElementComponent('window')

  // register components
  AFRAME.registerComponent('io3d-data3d', data3dComponent)
  AFRAME.registerComponent('io3d-furniture', furnitureComponent)
  AFRAME.registerComponent('tour', tourComponent)
  AFRAME.registerComponent('io3d-lighting', lightingComponent)
  // dynamic entities
  AFRAME.registerComponent('io3d-closet', closetComponent)
  AFRAME.registerComponent('io3d-door', doorComponent)
  AFRAME.registerComponent('io3d-floor', floorComponent)
  AFRAME.registerComponent('io3d-kitchen', kitchenComponent)
  AFRAME.registerComponent('io3d-polyfloor', polyFloorComponent)
  AFRAME.registerComponent('io3d-wall', wallComponent)
  AFRAME.registerComponent('io3d-window', windowComponent)
  // check if gblock component has already been registered
  if (AFRAME.components.gblock) {
    // legacy warning in case gblock has been registered using https://github.com/archilogic-com/aframe-gblock/
    console.error('3dio.js error: Please remove any other "<script>" tags registering the "gblock" A-Frame component. This component is included in 3dio.js')
  } else {
    AFRAME.registerComponent('gblock', gBlockComponent)
  }


  // init plugin launcher

  inspectorPluginsLauncher.init()

})

// export

var aframe = {
  three: {
    Data3dView: Data3dView
  }
}

export default aframe