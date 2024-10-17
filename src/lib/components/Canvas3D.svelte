<script lang="ts">
	import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
	import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';

	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

	import { threeStore, initializeRectAreaLight } from '$stores/threeStore';

	let controls;
	let container;
	let animationFrameId;
	let unsubscribe;

	let scene;
	let renderer;
	let camera;

	let glove;

	onMount(() => {
		if (typeof window !== 'undefined') {
			threeStore.initialize();
			RectAreaLightUniformsLib.init();

			unsubscribe = threeStore.subscribe(($state) => {
				({ camera } = $state);

				if (container && !container.firstChild) {
					scene = new THREE.Scene();
					scene.autoUpdate = false;

					renderer = new THREE.WebGLRenderer({ antialias: true });
					renderer.setSize(window.innerWidth, window.innerHeight);
					renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
					container.appendChild(renderer.domElement);

					// Camera setup (only if camera is not already set up)
					camera.position.set(1, 4, 0);

					// Orbit controls for interaction
					controls = new OrbitControls(camera, renderer.domElement);
					controls.enableDamping = true;
					controls.dampingFactor = 0.1;
					controls.target.set(-20, 0, 0);

					// Add lights to the scene
					addLights(scene);

					// Load GLTF model
					loadModel(scene);

					// Resize handling
					window.addEventListener('resize', onWindowResize);

					console.log(scene);

					// Start animation loop
					animate();
				}
			});
		}
	});

	function addLights(scene) {
		// Création des lumières
		const PointLight = new THREE.PointLight(0xffffff, 1, 100);
		PointLight.position.set(0, 7, 0);
		PointLight.intensity = 1;
		scene.add(PointLight);

		const { rectLight, rectLightHelper } = initializeRectAreaLight();

		// Ajouter la lumière et son helper à la scène
		scene.add(rectLight);
		scene.add(rectLightHelper);
	}

	function loadModel(scene) {
		const loader = new GLTFLoader();
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('/draco/');
		loader.setDRACOLoader(dracoLoader);

		loader.load(
			'modeles/Scene.glb',
			(gltf: any) => {
				// Ajoute d'abord le modèle à la scène
				scene.add(gltf.scene);
				console.log(scene);

				// Puis effectue la traversée pour désactiver frustumCulled et rechercher "Glove"
				gltf.scene.traverse((node: any) => {
					if (node instanceof THREE.Mesh) {
						node.frustumCulled = true;
					}
				});

				// Recherche "Glove" après l'ajout complet du modèle à la scène
				glove = scene.getObjectByName('Glove', true);
			},
			undefined,
			(error: any) => {
				console.error('Erreur lors du chargement du modèle GLTF :', error);
			}
		);
	}

	// Animation loop
	const animate = () => {
		animationFrameId = requestAnimationFrame(animate);

		if (glove) {
			glove.rotation.y += 0.01;
		}

		controls.update();
		renderer.render(scene, camera);
	};

	// Resize event handler
	const onWindowResize = () => {
		if (typeof window !== 'undefined') {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
	};

	// Clean up resources on component destroy
	onDestroy(() => {
		if (animationFrameId) cancelAnimationFrame(animationFrameId);
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', onWindowResize);
		}

		if (renderer) renderer.dispose();
		if (controls) controls.dispose();
		if (unsubscribe) unsubscribe();

		// Dispose threeStore resources
		threeStore.dispose();
	});
</script>

<div bind:this={container}></div>

<style>
	div {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
