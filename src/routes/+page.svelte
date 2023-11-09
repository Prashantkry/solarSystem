<script>
	import '../app.css';
	// TODO understand how values are given
	import * as THREE from 'three';
	// OrbitControls is a helper class for controlling the camera's position and orientation in a 3D scene using the mouse.
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	import starsTexture from '$lib/image/stars.jpg';
	import sunTexture from '$lib/image/sun.jpg';
	import mercuryTexture from '$lib/image/mercury.jpg';
	import venusTexture from '$lib/image/venus.jpg';
	import earthTexture from '$lib/image/earth.jpg';
	import marsTexture from '$lib/image/mars.jpg';
	import jupiterTexture from '$lib/image/jupiter.jpg';
	import saturnTexture from '$lib/image/saturn.jpg';
	import saturnRingTexture from '$lib/image/saturnrings.png';
	import uranusTexture from '$lib/image/uranus.jpg';
	import uranusRingTexture from '$lib/image/uranusring.jpg';
	import neptuneTexture from '$lib/image/neptune.jpg';
	import plutoTexture from '$lib/image/pluto.jpg';
	import { onMount } from 'svelte';

	onMount(() => {
		// new instance of the WebGLRenderer class is created, and its size is set to match the dimensions of the browser window.
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);

		// This line appends the renderer's DOM element (canvas) to the body of the HTML document, making it visible in the web page.
		document.body.appendChild(renderer.domElement);

		// A new instance of THREE.Scene is created,representing the 3D scene where objects and lights will be placed.
		const scene = new THREE.Scene();

		// This line creates a new perspective camera with a field of view of 45 degrees, an aspect ratio matching the window's aspect ratio, a near clipping plane at 0.1 units, and a far clipping plane at 1000 units.
		const camera = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		// An instance of OrbitControls is created, linking it to the camera and renderer's DOM element, enabling interactive control of the camera using the mouse.
		const orbit = new OrbitControls(camera, renderer.domElement);

		// The initial position of the camera is set to coordinates (-90, 140, 140) in the 3D space.
		camera.position.set(-90, 140, 140);

		// updating orbit
		orbit.update();

		// An ambient light is created with a color of dark gray (hex value 0x333333) and added to the scene.
		const ambientLight = new THREE.AmbientLight(0x333333);
		scene.add(ambientLight);

		// scene 1
		// A cube texture loader is created, and a cube texture is loaded with the starsTexture applied to all six faces. This creates a starry background for the scene.
		const cubeTextureLoader = new THREE.CubeTextureLoader();
		scene.background = cubeTextureLoader.load([
			starsTexture,
			starsTexture,
			starsTexture,
			starsTexture,
			starsTexture,
			starsTexture
		]);

		const textureLoader = new THREE.TextureLoader();

		// scene 2
		const sunGeo = new THREE.SphereGeometry(16, 30, 30);
		const sunMat = new THREE.MeshBasicMaterial({
			map: textureLoader.load(sunTexture)
		});
		const sun = new THREE.Mesh(sunGeo, sunMat);
		scene.add(sun);

		// creating fn of planet to create a new planet
		function createPlanet(size, texture, position, ring) {
			const geo = new THREE.SphereGeometry(size, 30, 30);
			const mat = new THREE.MeshBasicMaterial({
				map: textureLoader.load(texture)
			});
			const mesh = new THREE.Mesh(geo, mat);
			const obj = new THREE.Object3D();
			obj.add(mesh);
			// if ring
			if (ring) {
				// adding saturnRing ring in solar system
				const ringGeo = new THREE.RingGeometry(ring.InnerRadius, ring.OuterRadius, 30);
				const ringMat = new THREE.MeshBasicMaterial({
					map: textureLoader.load(ring.texture),
					side: THREE.DoubleSide
				});
				const ringMesh = new THREE.Mesh(ringGeo, ringMat);
				obj.add(ringMesh);
				ringMesh.position.x = position;
				ringMesh.rotation.x = -0.5 * Math.PI;
			}
			scene.add(obj);
			mesh.position.x = position;
			return { mesh, obj };
		}
		// adding mercury in solar system
		const mercury = createPlanet(3.2, mercuryTexture, 28);
		// adding venus in solar system
		const venus = createPlanet(5.8, venusTexture, 44);
		// adding mars in solar system
		const mars = createPlanet(6, marsTexture, 78);
		// adding earth in solar system
		const earth = createPlanet(6, earthTexture, 62);
		// adding jupiter in solar system
		const jupiter = createPlanet(4, jupiterTexture, 100);
		// adding saturn in solar system
		const saturn = createPlanet(10, saturnTexture, 138, {
			InnerRadius: 10,
			OuterRadius: 20,
			texture: saturnRingTexture
		});
		// adding uranus in solar system
		const uranus = createPlanet(10, uranusTexture, 176, {
			InnerRadius: 7,
			OuterRadius: 12,
			texture: uranusRingTexture
		});

		// adding jupiter in solar system
		const neptune = createPlanet(7, neptuneTexture, 200);
		const pluto = createPlanet(2.8, plutoTexture, 216);

		// adding mercury in solar system  when adding 1 planet is required
		// const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
		// const mercuryMat = new THREE.MeshStandardMaterial({
		// 	map: textureLoader.load(mercuryTexture)
		// });
		// const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
		// const mercuryObj = new THREE.Object3D();
		// mercuryObj.add(mercury);
		// scene.add(mercuryObj);
		// mercury.position.x = 28;

		// adding light to planet
		const pointLight = new THREE.PointLight(0xffffff, 2, 300); // color,instance,distance
		scene.add(pointLight);

		// A function animate is defined. It renders the scene with the current camera settings using the renderer.render method.
		function animate() {
			sun.rotateY(0.004); // to make obj rotate around itself call obj.rotate
			//Self-rotation
			sun.rotateY(0.004);
			mercury.mesh.rotateY(0.004);
			venus.mesh.rotateY(0.002);
			earth.mesh.rotateY(0.02);
			mars.mesh.rotateY(0.018);
			jupiter.mesh.rotateY(0.04);
			saturn.mesh.rotateY(0.038);
			uranus.mesh.rotateY(0.03);
			neptune.mesh.rotateY(0.032);
			pluto.mesh.rotateY(0.008);

			//Around-sun-rotation
			mercury.obj.rotateY(0.04);
			venus.obj.rotateY(0.015);
			earth.obj.rotateY(0.01);
			mars.obj.rotateY(0.008);
			jupiter.obj.rotateY(0.002);
			saturn.obj.rotateY(0.0009);
			uranus.obj.rotateY(0.0004);
			neptune.obj.rotateY(0.0001);
			pluto.obj.rotateY(0.00007);

			renderer.render(scene, camera);
		}

		// The setAnimationLoop method is used to continuously call the animate function, creating a smooth animation loop.
		renderer.setAnimationLoop(animate);

		// An event listener is added to the window resize event. When the window is resized, it adjusts the camera's aspect ratio, updates the camera's projection matrix, and resizes the renderer to match the new window dimensions.
		window.addEventListener('resize', function () {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		});
	});
</script>

<main>
	<h2 class=" bg-black text-red-900 font-bold text-2xl font-serif text-center p-2 shadow-2xl">Solar System in Three Js</h2>
</main>
