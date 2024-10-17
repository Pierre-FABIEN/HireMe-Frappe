<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let scene, camera, renderer;
	let container;

	// Initialisation de la scène Three.js
	const initThree = () => {
		// Créer la scène
		scene = new THREE.Scene();

		// Créer la caméra
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = 5;

		// Créer le renderer
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		// Créer un cube
		const geometry = new THREE.BoxGeometry();
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		// Fonction d'animation
		const animate = () => {
			requestAnimationFrame(animate);

			// Rotation de la caméra sur l'axe Z
			camera.rotateZ(0.01); // Ajustez la vitesse de rotation ici

			// Rendre la scène
			renderer.render(scene, camera);
		};

		// Démarrer l'animation
		animate();
	};

	// Nettoyage lors du démontage du composant
	const cleanupThree = () => {
		if (renderer) {
			renderer.dispose();
		}
		document.body.removeChild(renderer.domElement);
	};

	// Initialisation de Three.js lors du montage du composant
	onMount(() => {
		initThree();
		return cleanupThree;
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
