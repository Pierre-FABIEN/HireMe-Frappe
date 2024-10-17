import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type * as THREE from 'three'; // Import des types de THREE.js

gsap.registerPlugin(ScrollTrigger);

export default function initializeAnimations(
	camera: THREE.PerspectiveCamera,
	rectAreaLight: THREE.RectAreaLight,
	intensityValue: { value: number },
	container: HTMLElement
) {
	// Définir la position initiale de la caméra
	camera.position.set(1, 6, 0);

	// Créer les timelines pour les animations de la caméra et de la lumière
	const cameraTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: container,
			start: 'top top',
			end: 'bottom bottom',
			scrub: true
		}
	});

	const cameraUpTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: container,
			start: 'top top',
			end: 'bottom bottom',
			scrub: true
		}
	});

	const lightTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: container,
			start: 'top top',
			end: 'bottom bottom',
			scrub: true
		}
	});

	// Animation de la position de la caméra
	cameraTimeline.to(camera.position, {
		x: 15,
		y: 7,
		z: 15,
		duration: 1,
		ease: 'linear'
	});

	cameraUpTimeline.to(
		camera.up,
		{
			x: 0,
			y: 1,
			z: 0,
			duration: 1,
			ease: 'linear'
		},
		'<0' // Démarre en même temps que l'animation de position
	);

	cameraTimeline.to(
		camera.position,
		{
			x: 30,
			y: -10,
			z: 0,
			duration: 1,
			ease: 'linear'
		},
		'>' // Démarre après la précédente animation
	);

	cameraUpTimeline.to(camera.up, {
		x: 1,
		y: -1,
		z: 0.8,
		duration: 1,
		ease: 'linear'
	});

	// Animation de l'intensité de la lumière
	lightTimeline.to(intensityValue, {
		value: 5,
		duration: 1,
		ease: 'linear',
		onUpdate: () => {
			rectAreaLight.intensity = intensityValue.value;
		}
	});
}
