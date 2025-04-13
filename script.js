// Basic Three.js setup
let scene, camera, renderer, spider, particles = [];
let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

// Set up scene, camera, and renderer
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create spider geometry (can be replaced with more complex model)
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x888888 });
  spider = new THREE.Mesh(geometry, material);
  scene.add(spider);

  // Set camera position
  camera.position.z = 5;

  // Create particles
  createParticles();

  // Animate the scene
  animate();
}

// Create particle system
function createParticles() {
  for (let i = 0; i < 200; i++) {
    const geometry = new THREE.CircleGeometry(0.05, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.7, transparent: true });
    const particle = new THREE.Mesh(geometry, material);

    particle.position.x = Math.random() * 5 - 2.5;
    particle.position.y = Math.random() * 5 - 2.5;
    particle.position.z = Math.random() * 5 - 2.5;

    scene.add(particle);
    particles.push(particle);
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the spider
  spider.rotation.x += 0.01;
  spider.rotation.y += 0.01;

  // Particle movement
  particles.forEach(particle => {
    particle.position.x += (Math.random() - 0.5) * 0.05;
    particle.position.y += (Math.random() - 0.5) * 0.05;
    particle.position.z += (Math.random() - 0.5) * 0.05;
  });

  // Update camera position based on mouse movement
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y -= (mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

// Mouse movement event listener
document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Initialize everything
init();
