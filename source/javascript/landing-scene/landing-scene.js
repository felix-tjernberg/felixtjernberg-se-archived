import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { ambientLight, pointLightOne } from './lights'
import { box } from './box'
import handleKeyUp from '../developer-control'
import handleResize from 'Javascript/handle-resize'
import loadGrass from './grass-model'
import rotationAnimation from './rotation-animation'

/* eslint-disable sort-vars */
// Declare canvas constants
const renderCanvas = document.querySelector('#threejs-lading-scene'),
  parentElement = renderCanvas.parentElement,
  canvas = {
    height: parentElement.clientHeight,
    width: parentElement.clientWidth
  }
/* eslint-disable sort-vars */

// Rendering configuration
const camera = new PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    0.1,
    1000
  ),
  scene = new Scene(),
  renderer = new WebGLRenderer({ canvas: renderCanvas })
camera.position.z = 20
camera.position.y = 10
camera.lookAt(0, 0, 0)
renderer.setSize(canvas.width, canvas.height)

// Setup window resize event
window.addEventListener('resize', () => {
  handleResize(camera, canvas, parentElement, renderer)
})

// Add assets
scene.add(ambientLight, box, pointLightOne)
loadGrass(scene)

// TODO remove runningRenderer and orbit controls
// eslint-disable-next-line sort-imports
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const controls = new OrbitControls(camera, renderer.domElement)
let runningRenderer

function renderFrame() {
  rotationAnimation(box)

  controls.update()

  runningRenderer = requestAnimationFrame(renderFrame)
  renderer.render(scene, camera)
}

renderFrame()

// User input
document.querySelector('#turn-red').addEventListener('click', () => {
  box.material.color.setHex(0xff0000)
})
document.querySelector('#turn-green').addEventListener('click', () => {
  box.material.color.setHex(0x00ff00)
})
document.querySelector('#turn-blue').addEventListener('click', () => {
  box.material.color.setHex(0x0000ff)
})

// TODO Developer tools (Comment/Remove everything below before production)
/* eslint-disable-next-line sort-imports */ /* eslint-disable-next-line no-unused-vars*/
import { developerPanel } from './developer-panel'

import { pointLightOneHelper } from './lights'
scene.add(pointLightOneHelper)

// Developer control, remove runningRenderer variable later
window.addEventListener('keyup', (event) => {
  handleKeyUp(event, runningRenderer, renderFrame)
})