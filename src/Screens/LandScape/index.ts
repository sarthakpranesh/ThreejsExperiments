import { PerspectiveCamera, HemisphereLight, DirectionalLight, Scene, WebGLRenderer, Mesh, PlaneGeometry, MeshBasicMaterial, DoubleSide, MathUtils, Color } from 'three';
import {OrbitControls} from '../../lib/OrbitControls.js';
import {GLTFLoader} from '../../lib/GLTFLoader.js';

// defining the renderer
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// creating the camera
const camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
// creating a scene
const scene = new Scene();
scene.background = new Color('#87CEEB');

// defining a Orbit Controller
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// add hemisphere light
const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xB97A20;  // brownish orange
const intensity = 1;
const light = new HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

let gltfLoader = new GLTFLoader();
const s = require('../../../assets/s.glb');
gltfLoader.load(s, (g) => {
    const sold = g.scene.children.find((c) => c.name === "Armature");
    scene.add(sold);
});

// update camera position
camera.position.z = 10;
camera.position.y = 10;

// adding info
document.getElementById('info').innerText = 'Soldier Modal'

function animate () {
    requestAnimationFrame(animate);

    orbit.update();
    renderer.render(scene, camera);
}

animate();
