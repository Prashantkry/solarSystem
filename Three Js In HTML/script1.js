//!  Light camera action
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.z = 30
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const geometry = new THREE.BoxGeometry(5,5,5)
const material = new THREE.MeshStandardMaterial({color: 'red'})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Adding light 
// * 1. Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3) // * 1st param is color & 2nd is intensity
scene.add(ambientLight)

// * 2. Point light
const pointLight = new THREE.PointLight(0xffffff, 1,100) // * 1st param is color & 2nd is intensity
pointLight.position.set(6,0,3) // * setting position of light
scene.add(pointLight)


// * adding sphere 
const lightSphereGeometry = new THREE.SphereGeometry(1, 32,16)
const lightMaterial = new THREE.MeshBasicMaterial({color: 'yellow'})
const LigthSphere = new THREE.Mesh(lightSphereGeometry, lightMaterial)
LigthSphere.position = pointLight.position
scene.add(LigthSphere)


let theta = 0;
animation()
function animation(){
    cube.position.x = 5 * Math.sin(theta+=0.01); // * by 5 to ↑ range of space & sin(theta+=0.01) is used to ↑ ∠ & speed of rotation & movement
    // creating rotation of obj
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    // step 5 render the scene and camera so that it will have idea which scene to show
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}


// TODO see for scaling in video 06 channel COdingBaaz three js playlist 