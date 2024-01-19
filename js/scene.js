// Function to generate a random float within a given range
const randomInRange = (min, max) => Math.random() * (max - min) + min;

// Set up the scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const container = document.getElementById('scene');
const audio = new Audio('./audio/course-of-empire.mp3'); // Adjust the path to your audio file
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Declare the camera
const camera = new THREE.PerspectiveCamera(10, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 175;

// Handle window resize
window.addEventListener('resize', () => {
  const newWidth = container.clientWidth;
  const newHeight = container.clientHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});

// Load the GLTF models
const loader = new THREE.GLTFLoader();
let models = []; // Declare an array to store multiple models
let isRotating = true; // Flag to control rotation
let audioStarted = false;

// Function to create a model and add it to the scene
const createModel = (modelPath, position, uniqueID, uniqueTimestamp, scale, rotationSpeed, audioStartTime) => {
  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;
    model.scale.set(scale.x, scale.y, scale.z); // Adjust the scale as needed
    model.position.copy(position); // Set initial position
    scene.add(model);

    // Extract meshes for raycasting
    const meshes = [];
    model.traverse((child) => {
      if (child.isMesh) {
        meshes.push(child);
      }
    });

    models.push({
      model,
      meshes,
      rotationSpeed: rotationSpeed, // Adjust the rotation speed as needed
      translationDirection: new THREE.Vector3(randomInRange(-1, 1), randomInRange(-1, 1), randomInRange(-1, 1)).normalize(),
      uniqueID: uniqueID,
      uniqueTimestamp: uniqueTimestamp,
      isMoving: true, // Flag to control model movement individually
      audioStartTime: audioStartTime, // Specific starting time for audio
    });

    // Add userData to each mesh for reference to model data
    meshes.forEach((mesh) => {
      mesh.userData.modelData = models[models.length - 1];
    });

    // Create a corresponding "cover" div with a unique ID and data-time-range attribute
    const coverDiv = document.createElement('div');
    coverDiv.id = `cover-${uniqueID}-${uniqueTimestamp}`;
    coverDiv.classList.add('cover', 'hidden'); // Add initial classes
    coverDiv.dataset.timeRange = `${uniqueTimestamp}-${uniqueTimestamp + 5}`; // Set time range for visibility
    document.body.appendChild(coverDiv);
  });
};

// Create models with unique scale, rotation speed, and audio start time
createModel('./model/cluster2.gltf', new THREE.Vector3(0, 0, 0), 'model2', 30, new THREE.Vector3(0.2, 0.2, 0.2), 0.004, 32); //32
createModel('./model/cluster3.gltf', new THREE.Vector3(0, 0, 0), 'model3', 40, new THREE.Vector3(0.25, 0.25, 0.25), 0.003, 124); //2:03
createModel('./model/cluster4.gltf', new THREE.Vector3(0, 0, 0), 'model4', 40, new THREE.Vector3(0.2, 0.2, 0.2), 0.002, 220);  //3:38
createModel('./model/cluster5.gltf', new THREE.Vector3(0, 0, 0), 'model5', 40, new THREE.Vector3(0.15, 0.15, 0.15), 0.004, 257); //4:15
createModel('./model/cluster6.gltf', new THREE.Vector3(0, 0, 0), 'model6', 40, new THREE.Vector3(0.2, 0.2, 0.2), 0.003, 404); //6:40
createModel('./model/cluster7.gltf', new THREE.Vector3(0, 0, 0), 'model7', 40, new THREE.Vector3(0.08, 0.08, 0.08), 0.002, 448); //7:32
createModel('./model/cluster8.gltf', new THREE.Vector3(0, 0, 0), 'model8', 40, new THREE.Vector3(0.4, 0.4, 0.4), 0.004, 497); //8:17
createModel('./model/cluster9.gltf', new THREE.Vector3(0, 0, 0), 'model9', 40, new THREE.Vector3(0.175, 0.175, 0.175), 0.003, 519); //8:40
createModel('./model/cluster10.gltf', new THREE.Vector3(0, 0, 0), 'model10', 40, new THREE.Vector3(0.15, 0.15, 0.15), 0.002, 595); //9:59
createModel('./model/cluster11.gltf', new THREE.Vector3(0, 0, 0), 'model11', 40, new THREE.Vector3(0.1, 0.1, 0.1), 0.004, 698); //11:38
createModel('./model/cluster12.gltf', new THREE.Vector3(0, 0, 0), 'model12', 40, new THREE.Vector3(0.2, 0.2, 0.2), 0.003, 773); //12:53
createModel('./model/cluster13.gltf', new THREE.Vector3(0, 0, 0), 'model13', 40, new THREE.Vector3(0.1, 0.1, 0.1), 0.002, 830); //13:51
createModel('./model/cluster14.gltf', new THREE.Vector3(0, 0, 0), 'model14', 40, new THREE.Vector3(0.1, 0.1, 0.1), 0.004, 879);  //14:36
createModel('./model/cluster15.gltf', new THREE.Vector3(0, 0, 0), 'model15', 40, new THREE.Vector3(0.15, 0.15, 0.15), 0.003, 909); //15:07
createModel('./model/cluster16.gltf', new THREE.Vector3(0, 0, 0), 'model16', 40, new THREE.Vector3(0.2, 0.2, 0.2), 0.004, 989); //16:29
createModel('./model/cluster17.gltf', new THREE.Vector3(0, 0, 0), 'model17', 40, new THREE.Vector3(0.15, 0.15, 0.15), 0.002, 1063); //17:43
createModel('./model/cluster18.gltf', new THREE.Vector3(0, 0, 0), 'model18', 40, new THREE.Vector3(0.07, 0.07, 0.07), 0.004, 1136); //18:52
createModel('./model/cluster19.gltf', new THREE.Vector3(0, 0, 0), 'model19', 40, new THREE.Vector3(0.2, 0.2, 0.2), 0.003, 1208); //20:04
createModel('./model/cluster20.gltf', new THREE.Vector3(0, 0, 0), 'model20', 40, new THREE.Vector3(0.1, 0.1, 0.1), 0.002, 1265); //21:04
createModel('./model/cluster21.gltf', new THREE.Vector3(0, 0, 0), 'model21', 40, new THREE.Vector3(0.2, 0.2, 0.2), 0.004, 1319); //21:59
createModel('./model/cluster22.gltf', new THREE.Vector3(0, 0, 0), 'model22', 40, new THREE.Vector3(0.1, 0.1, 0.1), 0.003, 1362); //22:43
createModel('./model/cluster23.gltf', new THREE.Vector3(0, 0, 0), 'model23', 40, new THREE.Vector3(0.2, 0.2, 0.2), 0.002, 1415); //23:40

// Add multiple directional lights with pastel colors and reduced intensity
const pastelColors = [0xd3a5a5, 0xd3c2a5, 0xd3d3a5, 0xc2d3a5, 0xa5d3a5, 0xa5d3c2, 0xa5d3d3];
pastelColors.forEach((color, index) => {
  const directionalLight = new THREE.DirectionalLight(color, 0.3); // Adjust intensity (0.3 in this case)
  directionalLight.position.set(Math.sin(index / pastelColors.length * Math.PI * 2), Math.cos(index / pastelColors.length * Math.PI * 2), 1).normalize();
  scene.add(directionalLight);
});

// Raycaster setup for mouse interactions
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let allowModelClicks = false; // Variable to control whether clicks on models are allowed

// Function to handle mouse clicks
const onMouseClick = (event) => {

if (!allowModelClicks) {
    return; // Exit the function if model clicks are not allowed
  }

  // Calculate mouse coordinates in normalized device coordinates (NDC)
  mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;

  // Update the raycaster
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections between the ray and the loaded models
  const intersectedMeshes = models.flatMap((modelData) => modelData.meshes);
  const intersects = raycaster.intersectObjects(intersectedMeshes);

  // If there's an intersection, start or adjust the audio playback
  if (intersects.length > 0) {
    const modelData = intersects[0].object.userData.modelData;

    if (audioStarted) {
      // If audio is not started, start it from the model's audioStartTime
      audio.currentTime = modelData.audioStartTime;
      audio.play();
      audioStarted = true;

      // Hide play button, show pause button
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    
    } else {
      // If audio is already started, adjust the current time to the model's audioStartTime
      audio.currentTime = modelData.audioStartTime;
    }
  }
};

// Add event listener for mouse clicks
window.addEventListener('click', onMouseClick, false);

// Function to handle audio time update
const onAudioTimeUpdate = () => {
  // Check the current time of the audio
  const currentTime = audio.currentTime;

  // Check if the audio is playing and update the visibility of corresponding divs
  if (audioStarted) {
    const allCoverDivs = document.querySelectorAll('.cover'); // Get all divs with class 'cover'
    
    allCoverDivs.forEach((coverDiv) => {
      const [startTime, endTime] = coverDiv.dataset.timeRange.split('-').map(parseFloat); // Extract time range from data attribute

      // You can adjust the condition based on your requirements
      if (currentTime >= startTime && currentTime < endTime) {
        coverDiv.classList.remove('hidden');
      } else {
        coverDiv.classList.add('hidden');
      }
    });
  }
};

// Add event listener for audio time update
audio.addEventListener('timeupdate', onAudioTimeUpdate);

// Function to handle mouse hover
const onMouseHover = (event) => {
  // Calculate mouse coordinates in normalized device coordinates (NDC)
  mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;

  // Update the raycaster
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections between the ray and the loaded models
  const intersectedMeshes = models.flatMap((modelData) => modelData.meshes);
  const intersects = raycaster.intersectObjects(intersectedMeshes);

  // Reset material for all meshes
  models.forEach(({ meshes }) => {
    meshes.forEach((mesh) => {
      mesh.material.emissive.setHex(0x000000); // Set to original color
    });
  });

  // If there's an intersection, change the material for the hovered model
  if (intersects.length > 0) {
    const modelData = intersects[0].object.userData.modelData;

    modelData.meshes.forEach((mesh) => {
      mesh.material.emissive.setHex(0xff0000); // Set to a different color (e.g., red)
      // Pause the model's movement when hovered
      modelData.isMoving = false;
    });
  }
};

// Function to handle mouse hover out
const onMouseHoverOut = () => {
  // Reset material for all meshes
  models.forEach(({ meshes }) => {
    meshes.forEach((mesh) => {
      mesh.material.emissive.setHex(0x000000); // Set to original color
    });
  });

  // Resume movement for all models when not hovered
  models.forEach((modelData) => {
    modelData.isMoving = true;
  });
};


// Add event listeners for mouse hover and hover out
window.addEventListener('mousemove', onMouseHover, false);
window.addEventListener('mouseout', onMouseHoverOut, false);

// Function to handle play button click
const onPlayButtonClick = () => {
  if (!audioStarted) {
    // If audio is not started, start it from the beginning
    audio.currentTime = 0;
    audio.play();
    audioStarted = true;

    // Hide play button, show pause button
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
  } else {
    // If audio is already started, resume playback
    audio.play();

    // Hide play button, show pause button
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
  }
};

// Function to handle pause button click
const onPauseButtonClick = () => {
  // Pause the audio
  audio.pause();

  // Hide pause button, show play button
  pauseButton.style.display = 'none';
  playButton.style.display = 'block';
};

// Select the existing "vert-center" div
const playerWrap = document.querySelector('.player-wrap');

// Add play and pause buttons to the HTML
const playButton = document.createElement('button');
playButton.textContent = 'play_arrow';
playButton.id = 'play-button'; // Add id 'play-button'
playButton.addEventListener('click', onPlayButtonClick);
playerWrap.appendChild(playButton);

const pauseButton = document.createElement('button');
pauseButton.textContent = 'pause';
pauseButton.id = 'pause-button'; // Add id 'play-button'
pauseButton.addEventListener('click', onPauseButtonClick);
playerWrap.appendChild(pauseButton);

// Select the existing "vert-center" div
const vertCenterDiv = document.querySelector('.vertcen');
const loadingScreenDiv = document.querySelector('.loadingscreen');

// Add a button with ID "play-button-load" and text content "play_arrow" to the existing "vert-center" div
const loadButton = document.createElement('button');
loadButton.id = 'play-button-load';
loadButton.innerHTML = 'play_arrow'; // You can use innerHTML to set the content as the 'play_arrow' character
loadButton.addEventListener('click', onPlayButtonClick);
vertCenterDiv.appendChild(loadButton);

// Event listener for the "load" button
loadButton.addEventListener('click', () => {
  // Add a class to the loading screen to trigger the fade-out effect
  loadingScreenDiv.classList.add('fade-out');
  // Use setTimeout to add the "hidden" class after 2 seconds
  setTimeout(() => {
    // Add the "hidden" class to the loading screen
    loadingScreenDiv.classList.add('hidden');
    // Set allowModelClicks to false after 3 seconds
    allowModelClicks = true;
  }, 2000); // 3000 milliseconds = 2 seconds
});

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);

  models.forEach(({ model, rotationSpeed, translationDirection, isMoving }) => {
    if (isRotating) {
      model.rotation.y += rotationSpeed;
      model.rotation.x += rotationSpeed;
    }

    if (isMoving) {
      const translationSpeed = 0.03;
      model.position.x += translationDirection.x * translationSpeed;
      model.position.y += translationDirection.y * translationSpeed;
      model.position.z += translationDirection.z * translationSpeed;

      const maxX = 30;
      const minX = -30;
      const maxY = 20;
      const minY = -20;
      const maxZ = 20;
      const minZ = -200;

      if (model.position.x > maxX || model.position.x < minX) {
        translationDirection.x *= -1;
      }

      if (model.position.y > maxY || model.position.y < minY) {
        translationDirection.y *= -1;
      }

      if (model.position.z > maxZ || model.position.z < minZ) {
        translationDirection.z *= -1;
      }
    }
  });

  renderer.render(scene, camera);
};

// Start the animation loop
animate();