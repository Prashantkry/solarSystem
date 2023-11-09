
// step 1 creating scene
const scene = new THREE.Scene();

// step 2 creating camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // when ++ then obj will come smaller with -- obj will bigger


// step 3 creating renderer what we need here we define and its type like canvas webgl
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);    

// step 4 creating geometry
// * 1.box geometry 
// const geometry = new THREE.BoxGeometry(1,1,1); // width, height, depth of geometry

// * 2.capsule geometry 
// const geometry = new THREE.CapsuleGeometry(1,1,40,80); // width, height, depth of geometry


// * 3.Circle geometry 
// const geometry = new THREE.CircleGeometry(2,30); // radius, depth of geometry


// * 4.Cone geometry 
// const geometry = new THREE.ConeGeometry(2,2,32); // radius, depth of geometry



// * 5.Cylinder geometry 
const geometry = new THREE.CylinderGeometry(3,3,14,10); // radiusTop, radiusBottom, height, radialSegments of geometry



const material = new THREE.MeshBasicMaterial({color: 'red'}); // color of geometry
const cube = new THREE.Line(geometry, material);    // creating mesh by adding geometry and material

scene.add(cube);    // adding mesh to scene


//      <-------------------- Creating Animation -------------------->

// ! basic approach 
// step 6 will be to animate the obj it will written before step 5
// let flag = true;
// animate()
// function animate(){
//     if(cube.position.x > 5) flag=false
//     else if(cube.position.x < -5) flag=true

//     if(flag)  cube.position.x+=0.1
//     else  cube.position.x-=0.1

//     // creating rotation of obj
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     cube.rotation.z += 0.01;
//     // step 5 render the scene and camera so that it will have idea which scene to show
//     renderer.render(scene, camera);
//     requestAnimationFrame(animate);
// }


// ! better approach using math
// step 6 will be to animate the obj it will written before step 5
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


