// Set up the scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ alpha: true });
const container = document.getElementById('scene-22');
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Declare the camera
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 13;

// Handle window resize
window.addEventListener('resize', () => {
  const newWidth = container.clientWidth;
  const newHeight = container.clientHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

// Load the GLTF model
const loader = new THREE.GLTFLoader();
loader.load('model/cluster22.gltf', (gltf) => {
  const model = gltf.scene;

  // Calculate the aspect ratio of the loaded model
  const boundingBox = new THREE.Box3().setFromObject(model);
  const modelAspectRatio = boundingBox.getSize(new THREE.Vector3()).x / boundingBox.getSize(new THREE.Vector3()).y;

  // Calculate the aspect ratio of the container
  const containerAspectRatio = container.clientWidth / container.clientHeight;

  // Determine whether the model is wider or taller than the container
  if (modelAspectRatio > containerAspectRatio) {
    // Model is wider, adjust camera's vertical FOV
    const fov = 2 * Math.atan(Math.tan((Math.PI * camera.fov) / 360) / modelAspectRatio) * (180 / Math.PI);
    camera.fov = fov;
  } else {
    // Model is taller, adjust camera's horizontal FOV
    const fov = 2 * Math.atan(Math.tan((Math.PI * camera.fov) / 360) * modelAspectRatio) * (180 / Math.PI);
    camera.fov = fov;
  }

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  model.scale.set(0.1, 0.1, 0.1); // Adjust the scale as needed
  scene.add(model);

  // Set up rotation animation
  const animateModel = () => {
    model.rotation.y += 0.005; // Adjust the rotation speed as needed
    model.rotation.x += 0.005; // Adjust the rotation speed as needed
  };

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    animateModel(); // Call the rotation animation function
    renderer.render(scene, camera);
  };

// Add multiple directional lights with pastel colors and reduced intensity
  const pastelColors = [0xd3a5a5, 0xd3c2a5, 0xd3d3a5, 0xc2d3a5, 0xa5d3a5, 0xa5d3c2, 0xa5d3d3];
  pastelColors.forEach((color, index) => {
    const directionalLight = new THREE.DirectionalLight(color, 0.3); // Adjust intensity (0.3 in this case)
    directionalLight.position.set(Math.sin(index / pastelColors.length * Math.PI * 2), Math.cos(index / pastelColors.length * Math.PI * 2), 1).normalize();
    scene.add(directionalLight);
  });
  
  // Start the animation loop
  animate();
});
