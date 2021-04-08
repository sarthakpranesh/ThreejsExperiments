import * as THREE from 'three';
import { PointLight } from 'three';
import {OrbitControls} from '../../lib/OrbitControls.js';
import SpaceBody from './SpaceBody';

// loading images
const s = require('../../../assets/texture/sun.jpg');
const m = require('../../../assets/texture/mercury.jpeg');
const v = require('../../../assets/texture/venus.jpg');
const e = require('../../../assets/texture/earth.jpeg')
const em = require('../../../assets/texture/moon.jpg');
const ma = require('../../../assets/texture/mars.jpeg');
const j = require('../../../assets/texture/jupiter.jpeg');
const sa = require('../../../assets/texture/saturn.jpeg');
const u = require('../../../assets/texture/uranus.jpg');
const n = require('../../../assets/texture/neptune.jpeg');

const loader = new THREE.TextureLoader();
// loading textures
const sunTexture = loader.load(s);
const mercuryTexture = loader.load(m);
const venusTexture = loader.load(v);
const earthTexture = loader.load(e);
const moonTexture = loader.load(em);
const marsTexture = loader.load(ma);
const jupiterTexture = loader.load(j);
const saturnTexture = loader.load(sa);
const uranusTexture = loader.load(u);
const neptuneTexture = loader.load(n);

// setting information about model
const info = document.getElementById('info')
info.innerText = "Description: Solar System";

// Basic setup for scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const spaceBodies = [];

// sun
const sun = new SpaceBody(20, 32, 0.004, 0, { map: sunTexture });
scene.add(sun.orbit);
spaceBodies.push(sun);
// add sunlight
const sunLight = new PointLight('white', 1, 1000, 0.1);
scene.add(sunLight);

// add sun light :>, no lights :< material texture needed
const light = new THREE.PointLight( 'yellow', 10, 1000 );
light.position.set(100, 0, 0);
scene.add(light);

// mercury
const mercury = new SpaceBody(4, 32, 0.01, 0.01, { map: mercuryTexture }, { x: 30 });
scene.add(mercury.orbit);
spaceBodies.push(mercury);

// venus
const venus = new SpaceBody(6, 32, 0.008, 0.008, { map: venusTexture }, { x: 50 })
scene.add(venus.orbit);
spaceBodies.push(venus);

// earth
const earth = new SpaceBody(8, 32, 0.004, 0.003, { map: earthTexture }, { x: 100 });
scene.add(earth.orbit);
spaceBodies.push(earth);
const moon = new SpaceBody(4, 32, 0.002, 0.004, { map: moonTexture }, { x: 20 });
earth.body.add(moon.orbit);
spaceBodies.push(moon);

// mars
const mars = new SpaceBody(3, 32, 0.006, 0.004, { map: marsTexture }, { x: 160 });
scene.add(mars.orbit);
spaceBodies.push(mars);

// jupiter
const jupiter = new SpaceBody(10, 32, 0.008, -0.0008, { map: jupiterTexture }, { x: 200 });
scene.add(jupiter.orbit);
spaceBodies.push(jupiter);

// saturn
const saturn = new SpaceBody(8, 32, 0.008, 0.002, { map: saturnTexture }, { x: 240 });
scene.add(saturn.orbit);
spaceBodies.push(saturn);

// uranus
const uranus = new SpaceBody(5, 32, 0.02, -0.001, { map: uranusTexture }, { x: 290 });
scene.add(uranus.orbit);
spaceBodies.push(uranus);

// neptune
const neptune = new SpaceBody(5, 32, -0.01, 0.004, { map: neptuneTexture }, { x: 320 });
scene.add(neptune.orbit);
spaceBodies.push(neptune);

// adding a orbit controller
const orbitController = new OrbitControls(camera, renderer.domElement);
orbitController.update();

// shift camera
camera.position.z = 350;

function animate () {
    requestAnimationFrame(animate);
    spaceBodies.forEach((b) => {
        b.animate();
    });
    orbitController.target.copy(earth.orbit.position);
    orbitController.update();
    renderer.render(scene, camera);
}

animate();
