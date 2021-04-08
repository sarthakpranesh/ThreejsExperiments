import { PerspectiveCamera, HemisphereLight, DirectionalLight, Scene, WebGLRenderer, Mesh, PlaneGeometry, MeshBasicMaterial, DoubleSide } from 'three';
import {FirstPersonControls} from '../../lib/FirstPersonControls.js';
import {OrbitControls} from '../../lib/OrbitControls.js';
import {GLTFLoader} from '../../lib/GLTFLoader.js';

// defining the renderer
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// creating the camera
const camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
// update camera position
camera.position.z = 10;
camera.rotation.x = 90;
// creating a scene
const scene = new Scene();

// defining a Orbit Controller
// const orbit = new OrbitControls(camera, renderer.domElement);
// orbit.update();

// add a default light
{
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 1;
    const light = new HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
}
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
}

// get a plane
{
    const plane = new Mesh(
        new PlaneGeometry(100, 100, 10, 10),
        new MeshBasicMaterial({ color: 'pink', side: DoubleSide }),
    );
    scene.add(plane);
}

let gltfLoader = new GLTFLoader();
const s = require('../../../assets/s.glb');
gltfLoader.load(s, (g) => {
    const sold = g.scene.children.find((c) => c.name === "Armature");
    scene.add(sold);
});

function animate () {
    requestAnimationFrame(animate);
    // orbit.update();
    renderer.render(scene, camera);
}

animate();
