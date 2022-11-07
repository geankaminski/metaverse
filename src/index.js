import Movements from "./movements.js";
import blockchain from "./Web3.js";
import abi from './abi/abi.json' assert {type: "json"};

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

const geometryCube = new THREE.BoxGeometry(1, 1, 1);
const materialCube = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometryCube, materialCube);
scene.add(cube);

const geometryCone = new THREE.ConeGeometry(5, 20, 32);
const materialCone = new THREE.MeshPhongMaterial({ color: 0xed810a });
const cone = new THREE.Mesh(geometryCone, materialCone);
cone.position.set(-10, 5, 0);
scene.add(cone);

const geometryCylinder = new THREE.CylinderGeometry(5, 5, 5, 32);
const materialCylinder = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const cylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
cylinder.position.set(20, 5, 0);
scene.add(cylinder);

camera.position.set(10, 5, 40);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;

    cylinder.rotation.x += 0.01;

    //left
    if (Movements.isPressed(37)) {
        camera.position.x -= 0.5;
    }

    //up
    if (Movements.isPressed(38)) {
        camera.position.x += 0.5;
        camera.position.y += 0.5;
    }

    //right
    if (Movements.isPressed(39)) {
        camera.position.x += 0.5;
    }

    //down
    if (Movements.isPressed(40)) {
        camera.position.x -= 0.5;
        camera.position.y -= 0.5;
    }

    camera.lookAt(space.position);

    renderer.render(scene, camera);
}
animate();

const buttonMint = document.getElementById("mint");
buttonMint.addEventListener("click", mintNFT);

function mintNFT() {
    let nft_name = document.getElementById("nft_name").value;
    let nft_width = document.getElementById("nft_width").value;
    let nft_height = document.getElementById("nft_height").value;
    let nft_depth = document.getElementById("nft_depth").value;
    let nft_x = document.getElementById("nft_x").value;
    let nft_y = document.getElementById("nft_y").value;
    let nft_z = document.getElementById("nft_z").value;

    if (typeof window.ethereum === "undefined") {
        rej("Please install MetaMask")
    }

    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0xD02a5682FBace8D8BBe4F95E5EdD53A996D3c153");

    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z).send({ from: accounts[0] }).then((data) => {
            console.log("NFT available in the Metaverse!");
        })
    })
}

// Web3 connection
blockchain.then((result) => {
    result.buildings.forEach((building, index) => {
        if (index <= result.supply) {
            const boxGeometry = new THREE.BoxGeometry(building.w, building.h, building.d);
            const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x33fffc });
            const nft = new THREE.Mesh(boxGeometry, boxMaterial);
            nft.position.set(building.x, building.y, building.z);
            scene.add(nft);
        }
    })
})