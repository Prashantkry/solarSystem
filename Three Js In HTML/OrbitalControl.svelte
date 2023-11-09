<!-- Here In this part 3 Js is from channel coding bazz -->
<!-- Topic covered is orbital control it help to control through mouse -->

<script>
    import * as THREE from 'three';
	import { onMount } from 'svelte';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // adding orbit control
	onMount(() => {
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000000);
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 50;

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);

		document.body.appendChild(renderer.domElement);

		// adding light to the scene
		const ambientLights = new THREE.AmbientLight(0xffffff, 2);
		scene.add(ambientLights);

		const pointLight = new THREE.PointLight(0xffffff, 1, 100);
		scene.add(pointLight);

		const geometry = new THREE.BoxGeometry(5, 5, 5);

		const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		const lightGeometry = new THREE.SphereGeometry(1, 32, 16);
		const lightMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
		const lightSphere = new THREE.Mesh(lightGeometry, lightMaterial);
		scene.add(lightSphere);

		const controls = new OrbitControls(camera, renderer.domElement); // creating orbit control

		let theta = 0;
		animate();

		function animate() {
			controls.update(); // updating orbit control or calling orbit control

			theta += 0.01;

			let sinTheta = Math.sin(theta);
			let cosTheta = Math.cos(theta);
			let scaledSin = sinTheta * 30;
			let scaledCos = cosTheta * 30;

			pointLight.position.set(scaledCos, 0,scaledSin);
			lightSphere.position.set(scaledCos, 0,scaledSin);

			cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.rotation.z += 0.01;
            
			renderer.render(scene, camera);
			requestAnimationFrame(animate);

		}
	});
</script>

<h1 class=" text-center shadow-lg p-3">Welcome to Three Js</h1>
