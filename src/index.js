const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xbda355);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);
scene.add(ambientLight);

const geometrySpace = new THREE.BoxGeometry(100, 0.2, 50);
const materialSpace = new THREE.MeshPhongMaterial({ color: 0xffffff });
const space = new THREE.Mesh(geometrySpace, materialSpace);
scene.add(space);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.set(10, 5, 40);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();