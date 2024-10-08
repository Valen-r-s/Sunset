import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { Sky } from "three/addons/objects/Sky.js";
import { ThreeMFLoader } from "three/examples/jsm/Addons.js";
import { mix } from "three/examples/jsm/nodes/Nodes.js";

/**
 * Base
 */
// Debug
const gui = new GUI({
  title: "Create your own scenario",
  width: 250,
  closeFolders: true,
});
gui.close();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

// Floor
const floorAlphaTexture = textureLoader.load("./floor/alpha.jpg");
const floorColorTexture = textureLoader.load(
  "./floor/coast_sand_01_1k/coast_sand_01_diff_1k.jpg"
);
const floorARMTexture = textureLoader.load(
  "./floor/coast_sand_01_1k/coast_sand_01_arm_1k.jpg"
);
const floorNormalTexture = textureLoader.load(
  "./floor/coast_sand_01_1k/coast_sand_01_nor_gl_1k.jpg"
);
const floorDisplacementTexture = textureLoader.load(
  "./floor/coast_sand_01_1k/coast_sand_01_disp_1k.jpg"
);

floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;

floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

// Booth
const boothColorTexture = textureLoader.load(
  "./booth/reed_roof_04_1k/reed_roof_04_diff_1k.jpg"
);
const boothARMTexture = textureLoader.load(
  "./booth/reed_roof_04_1k/reed_roof_04_arm_1k.jpg"
);
const boothNormalTexture = textureLoader.load(
  "./booth/reed_roof_04_1k/reed_roof_04_nor_gl_1k.jpg"
);
boothColorTexture.colorSpace = THREE.SRGBColorSpace;

boothColorTexture.repeat.set(6, 1);
boothARMTexture.repeat.set(6, 1);
boothNormalTexture.repeat.set(6, 1);

boothColorTexture.wrapS = THREE.RepeatWrapping;
boothARMTexture.wrapS = THREE.RepeatWrapping;
boothNormalTexture.wrapS = THREE.RepeatWrapping;

// Booth table
const tableColorTexture = textureLoader.load(
  "./booth/plywood_1k/plywood_diff_1k.jpg"
);
const tableARMTexture = textureLoader.load(
  "./booth/plywood_1k/plywood_arm_1k.jpg"
);
const tableNormalTexture = textureLoader.load(
  "./booth/plywood_1k/plywood_nor_gl_1k.jpg"
);
tableColorTexture.colorSpace = THREE.SRGBColorSpace;

tableColorTexture.repeat.set(6, 1);
tableARMTexture.repeat.set(6, 1);
tableNormalTexture.repeat.set(6, 1);

tableColorTexture.wrapS = THREE.RepeatWrapping;
tableARMTexture.wrapS = THREE.RepeatWrapping;
tableNormalTexture.wrapS = THREE.RepeatWrapping;

// Umbrella
const umbrellaColorTexture = textureLoader.load(
  "./umbrella/nylon-tent-fabric1-ue/nylon-tent-fabric_albedo.png"
);
const umbrellaAoTexture = textureLoader.load(
  "./umbrella/nylon-tent-fabric1-ue/nylon-tent-ao.png"
);
const umbrellaMetalnessTexture = textureLoader.load(
  "./umbrella/nylon-tent-fabric1-ue/nylon-tent-fabric_metallic.png"
);
const umbrellaRoughnessTexture = textureLoader.load(
  "./umbrella/nylon-tent-fabric1-ue/nylon-tent-fabric_roughness.png"
);
const umbrellaNormalTexture = textureLoader.load(
  "./umbrella/nylon-tent-fabric1-ue/nylon-tent-fabric_normal-dx.png"
);
umbrellaColorTexture.colorSpace = THREE.SRGBColorSpace;

// Umbrella pole
const umbrellaPoleColorTexture = textureLoader.load(
  "./umbrella/speckled-rust-ue/speckled-rust_albedo.png"
);
const umbrellaPoleAoTexture = textureLoader.load(
  "./umbrella/speckled-rust-ue/speckled-rust_ao.png"
);
const umbrellaPoleMetalnessTexture = textureLoader.load(
  "./umbrella/speckled-rust-ue/speckled-rust_metallic.png"
);
const umbrellaPoleRoughnessTexture = textureLoader.load(
  "./umbrella/speckled-rust-ue/speckled-rust_roughness.png"
);
const umbrellaPoleNormalTexture = textureLoader.load(
  "./umbrella/speckled-rust-ue/speckled-rust_normal-dx.png"
);
umbrellaPoleColorTexture.colorSpace = THREE.SRGBColorSpace;

umbrellaPoleColorTexture.repeat.set(1, 8);
umbrellaPoleAoTexture.repeat.set(1, 8);
umbrellaPoleMetalnessTexture.repeat.set(1, 8);
umbrellaPoleRoughnessTexture.repeat.set(1, 8);
umbrellaPoleNormalTexture.repeat.set(1, 8);

umbrellaPoleColorTexture.wrapT = THREE.RepeatWrapping;
umbrellaPoleAoTexture.wrapT = THREE.RepeatWrapping;
umbrellaPoleMetalnessTexture.wrapT = THREE.RepeatWrapping;
umbrellaPoleRoughnessTexture.wrapT = THREE.RepeatWrapping;
umbrellaPoleNormalTexture.wrapT = THREE.RepeatWrapping;

// Fireplace
const woodColorTexture = textureLoader.load(
  "./fireplace/bark_willow_02_1k/bark_willow_02_diff_1k.jpg"
);
const woodARMTexture = textureLoader.load(
  "./fireplace/bark_willow_02_1k/bark_willow_02_arm_1k.jpg"
);
const woodNormalTexture = textureLoader.load(
  "./fireplace/bark_willow_02_1k/bark_willow_02_nor_gl_1k.jpg"
);
woodColorTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 12, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    side: THREE.DoubleSide,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: -1,
    displacementBias: 0.5,
  })
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// Beach booth container
const beachBooth = new THREE.Group();
scene.add(beachBooth);

// Booth
const booth = new THREE.Mesh(
  new THREE.CylinderGeometry(1.6, 0.8, 1.5, 8, 8, true),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: boothColorTexture,
    aoMap: boothARMTexture,
    roughnessMap: boothARMTexture,
    metalnessMap: boothARMTexture,
    normalMap: boothNormalTexture,
  })
);
booth.position.y = 0.75;

// Table
const table = new THREE.Mesh(
  new THREE.RingGeometry(1.2, 2.2, 8),
  new THREE.MeshPhysicalMaterial({
    side: THREE.DoubleSide,
    metalness: 0.5,
    roughness: 0.5,
    iridescence: 1,
    transmission: 0.6,
    ior: 1,
  })
);
table.rotation.x = Math.PI * 0.5;
table.position.y = 1.5;

// Umnrella
const umbrella = new THREE.Mesh(
  new THREE.ConeGeometry(2.5, 1, 8, 1, true),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    map: umbrellaColorTexture,
    aoMap: umbrellaAoTexture,
    roughnessMap: umbrellaRoughnessTexture,
    metalnessMap: umbrellaMetalnessTexture,
    normalMap: umbrellaNormalTexture,
  })
);
umbrella.position.y = 3.5;

// Umnrella pole
const umbrellaPole = new THREE.Mesh(
  new THREE.CylinderGeometry(0.05, 0.05, 4, 20),
  new THREE.MeshStandardMaterial({
    map: umbrellaPoleColorTexture,
    aoMap: umbrellaPoleAoTexture,
    roughnessMap: umbrellaPoleRoughnessTexture,
    metalnessMap: umbrellaPoleMetalnessTexture,
    normalMap: umbrellaPoleNormalTexture,
  })
);
umbrellaPole.position.y = 2;

// Light Bulbs
const lightBulbGeometry = new THREE.SphereGeometry(0.1, 24, 16);
const lightBulbMaterial = new THREE.MeshPhysicalMaterial({
  metalness: 0,
  roughness: 0,
  iridescence: 1,
  transmission: 0.5,
  ior: 1,
});

const lightBulbsGroup = new THREE.Group();
scene.add(lightBulbsGroup);

for (let i = 0; i < 8; i++) {
  const radius = 2.5;
  const angle = (i / 8) * Math.PI * 2;

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = 2.9;

  // Mesh
  const lightBulb = new THREE.Mesh(lightBulbGeometry, lightBulbMaterial);
  lightBulb.position.set(x, y, z);

  // Add to the group
  lightBulbsGroup.add(lightBulb);
}

beachBooth.position.x = -1.5;
beachBooth.position.z = 1;
beachBooth.add(booth, table, umbrella, umbrellaPole, lightBulbsGroup);

/**
 * Fireplace
 */
// Wood
const wood1 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.1, 0.1, 1, 32),
  new THREE.MeshStandardMaterial({
    map: woodColorTexture,
    aoMap: woodARMTexture,
    roughnessMap: woodARMTexture,
    metalnessMap: woodARMTexture,
    normalMap: woodNormalTexture,
  })
);
wood1.position.x = 2;
wood1.position.y = -0.1;
wood1.rotation.x = Math.PI * 0.5;

const wood2 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.1, 0.1, 1, 32),
  new THREE.MeshStandardMaterial({
    map: woodColorTexture,
    aoMap: woodARMTexture,
    roughnessMap: woodARMTexture,
    metalnessMap: woodARMTexture,
    normalMap: woodNormalTexture,
  })
);
wood2.position.x = 2;
wood2.position.y = -0.1;
wood2.rotation.z = Math.PI * 0.5;

/**
 * Fire
 */
// Fire Texture
const fireTexture = textureLoader.load("./fireplace/fire/13.png");

const fireParameters = {
  insideColor: "#FF7F3E",
  outsideColor: "#FF4500",
  count: 200,
  radius: 0.12,
};

let firePlace = null;
let points1 = null;

const generateFire = () => {
  /**
   * Destroy old fire
   */
  if (points1 !== null) {
    firePlace.dispose();
    scene.remove(points1); //disposing the mesh
  }

  /**
   * Geometry
   */
  firePlace = new THREE.BufferGeometry();

  const positions = new Float32Array(fireParameters.count * 3);
  const fireColors = new Float32Array(fireParameters.count * 3);

  const insideColor = new THREE.Color(fireParameters.insideColor);
  const outsideColor = new THREE.Color(fireParameters.outsideColor);

  for (let i = 0; i < fireParameters.count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const x = 2 + fireParameters.radius * Math.cos(angle);
    const y = (Math.random() - 0.5) * 0.8;
    const z = fireParameters.radius * Math.sin(angle);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    /**
     * Color
     */
    const i3 = i * 3;
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, Math.random()); // Gradually mix colors based on randomness

    fireColors[i3] = mixedColor.r;
    fireColors[i3 + 1] = mixedColor.g;
    fireColors[i3 + 2] = mixedColor.b;
  }

  firePlace.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  firePlace.setAttribute("color", new THREE.BufferAttribute(fireColors, 3));

  /**
   * Material
   */
  const fireMaterial = new THREE.PointsMaterial({
    side: THREE.DoubleSide,
    size: 0.2,
    map: fireTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
    vertexColors: true,
  });

  /**
   * Point
   */
  points1 = new THREE.Points(firePlace, fireMaterial);

  scene.add(points1);
};

generateFire();

function animateFire() {
  const positions = firePlace.attributes.position.array;

  for (let i = 0; i < fireParameters.count; i++) {
    positions[i * 3 + 1] += 0.01;
    if (positions[i * 3 + 1] > 0.25) {
      positions[i * 3 + 1] = -0.25;
    }
  }
  firePlace.attributes.position.needsUpdate = true;
}

// Firelight animation
const fireLight = new THREE.PointLight(0xff4500, 1.5, 10);
fireLight.position.set(2, 0.5, 0);

function animateFireLight() {
  fireLight.intensity = 1.5 + Math.random() * 0.5;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  animateFire();
  animateFireLight();
}

animate();

scene.add(wood1, wood2, fireLight);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#FABC3F", 0.4);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#FFAD60", 2.5);
directionalLight.position.set(-3, 4, -8);
scene.add(directionalLight);

// BulbsLight
const bulbs = [];
for (let i = 0; i < 8; i++) {
  const radius = 2.5;
  const angle = (i / 8) * Math.PI * 2;

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = 2.6;

  // Mesh
  const bulbsLight = new THREE.PointLight("#FFEAC5", 2);
  bulbsLight.position.set(x, y, z);

  bulbs.push(bulbsLight);

  // Add to the group
  lightBulbsGroup.add(bulbsLight);
}
const pointLightparameters = { intensity: 2 };

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(4.5, 3.2, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2.2;
controls.maxDistance = 8;
controls.minDistance = 3;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Shadows
 */
// Renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Cast and receive
directionalLight.castShadow = true;

booth.castShadow = true;
booth.receiveShadow = true;
table.castShadow = true;
table.receiveShadow = true;
umbrella.castShadow = true;
umbrellaPole.castShadow = true;
wood1.castShadow = true;
wood2.castShadow = true;
floor.receiveShadow = true;

/**
 * Sky
 */
const sky = new Sky();
scene.add(sky);
sky.scale.set(100, 100, 100);

sky.material.uniforms.turbidity.value = 5;
sky.material.uniforms.rayleigh.value = 3;
sky.material.uniforms.mieCoefficient.value = 0.005;
sky.material.uniforms.mieDirectionalG.value = 0.7;
sky.material.uniforms.sunPosition.value.set(0.3, -0.038, -0.95);

renderer.toneMappingExposure = 0.5;

function updateSun(azimuth, elevation) {
  const theta = Math.PI * (elevation / 180); // Convert elevation from degrees to radians
  const phi = 2 * Math.PI * (azimuth / 360); // Convert azimuth from degrees to radians

  const sunPosition = new THREE.Vector3();
  sunPosition.x = Math.cos(phi);
  sunPosition.y = Math.sin(theta);
  sunPosition.z = Math.sin(phi);

  sky.material.uniforms["sunPosition"].value.copy(sunPosition);
}

let azimuth = 245;
let elevation = 0;

updateSun(azimuth, elevation);

/**
 * Audio
 */
const lisitener = new THREE.AudioListener();
camera.add(lisitener);
const audioLoader = new THREE.AudioLoader();

const backgroudMusic = new THREE.Audio(lisitener);
audioLoader.load("./sounds/lofi-piano-loop.mp3", function (buffer) {
  backgroudMusic.setBuffer(buffer);
  backgroudMusic.setLoop(true);
  backgroudMusic.setVolume(0.5);
  backgroudMusic.play();
});

const fireplaceAudio = new THREE.Audio(lisitener);
audioLoader.load("./sounds/fireplace.mp3", function (buffer) {
  fireplaceAudio.setBuffer(buffer);
  fireplaceAudio.setLoop(true);
  fireplaceAudio.setVolume(0.3);
  fireplaceAudio.play();
});

/**
 * Tweaks
 */

// Sky
const skyPropertiesFolder = gui.addFolder("Sky properties");

skyPropertiesFolder
  .add(sky.material.uniforms.turbidity, "value", 0.0, 20.0, 0.1)
  .name("Turbidity");
skyPropertiesFolder
  .add(sky.material.uniforms.rayleigh, "value", 0.0, 20.0, 0.1)
  .name("Rayleigh");
skyPropertiesFolder
  .add(sky.material.uniforms.mieCoefficient, "value", 0.0, 0.1, 0.1)
  .name("Mie Coefficient");
skyPropertiesFolder
  .add(sky.material.uniforms.mieDirectionalG, "value", 0.0, 1.0, 0.1)
  .name("Mie Directional G");

skyPropertiesFolder
  .add({ azimuth }, "azimuth", 0, 360, 0.1)
  .onChange((value) => {
    azimuth = value;
    updateSun(azimuth, elevation);
  });
skyPropertiesFolder
  .add({ elevation }, "elevation", -50, 90, 0.1)
  .onChange((value) => {
    elevation = value;
    updateSun(azimuth, elevation);
  });

// Light
const lightPropertiesFolder = gui.addFolder("Ambient light properties");
lightPropertiesFolder
  .add(directionalLight, "intensity")
  .min(0.1)
  .max(5)
  .step(0.1)
  .name("Light intensity");
lightPropertiesFolder
  .add(directionalLight.position, "y")
  .min(-10)
  .max(10)
  .step(0.1)
  .name("Light y position");
lightPropertiesFolder
  .add(directionalLight.position, "x")
  .min(-10)
  .max(10)
  .step(0.1)
  .name("Light x position");
lightPropertiesFolder
  .add(directionalLight.position, "z")
  .min(-10)
  .max(10)
  .step(0.1)
  .name("Light z position");

// Fireplace
const fireplacePropertiesFolder = gui.addFolder("Fireplace properties");
fireplacePropertiesFolder
  .addColor(fireParameters, "insideColor")
  .name("Inside Fire Color")
  .onChange(generateFire);
fireplacePropertiesFolder
  .addColor(fireParameters, "outsideColor")
  .name("Outside Fire Color")
  .onChange(generateFire);

// Light bulbs
const lightBulbsPropertiesFolder = gui.addFolder("Light bulbs properties");
lightBulbsPropertiesFolder
  .add(pointLightparameters, "intensity", 0, 10, 0.1)
  .onChange((value) => {
    bulbs.forEach((bulb) => {
      bulb.intensity = value;
    });
  });

// Table
const tablePropertiesFolder = gui.addFolder("Table properties");
tablePropertiesFolder.add(table.material, "metalness").min(-1).max(2).step(0.1);
tablePropertiesFolder.add(table.material, "roughness").min(-1).max(2).step(0.1);
tablePropertiesFolder
  .add(table.material, "iridescence")
  .min(-1)
  .max(1)
  .step(0.1);
tablePropertiesFolder
  .add(table.material, "transmission")
  .min(-1)
  .max(2)
  .step(0.1);
tablePropertiesFolder.add(table.material, "ior").min(-1).max(2).step(0.1);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
