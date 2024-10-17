// src/stores/UX/threeStore.js
import { writable } from 'svelte/store';
import * as THREE from 'three';

import { cameraService } from '$UITools/threeServices/CameraService';

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

function createThreeStore() {
	const { subscribe, set, update } = writable({
		camera: null
	});

	return {
		subscribe,
		initialize: () => {
			// Initialisation de la caméra
			cameraService.initCamera();

			// Mise à jour de l'état du store avec la caméra initialisée
			set({
				camera: cameraService.camera
			});

			return cameraService.camera; // Retourne la caméra initialisée
		},
		dispose: () => {
			// Réinitialisation de la caméra
			update(($state) => {
				let camera;
				if (typeof window !== 'undefined') {
					camera = new THREE.PerspectiveCamera(
						75,
						window.innerWidth / window.innerHeight,
						0.1,
						1000
					);
				} else {
					camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
				}

				// Retourne un nouvel état avec une caméra réinitialisée
				return {
					camera
				};
			});
		}
	};
}

// Initialise RectAreaLightUniformsLib pour la compatibilité
RectAreaLightUniformsLib.init();

// Crée un store writable pour la lumière rectangulaire
export const rectAreaLightStore = writable<THREE.RectAreaLight | null>(null);

// Fonction pour initialiser le RectAreaLight et le retourner via le store
export function initializeRectAreaLight() {
	// Création du RectAreaLight
	const rectLight = new THREE.RectAreaLight(0xffffff, 0, 20, 20);
	rectLight.position.set(0, 15, 0);

	rectLight.lookAt(0, 0, 0);

	// Ajouter un helper pour voir la lumière
	const rectLightHelper = new RectAreaLightHelper(rectLight);

	// Met à jour le store avec le nouvel objet RectAreaLight
	rectAreaLightStore.set(rectLight);

	return { rectLight, rectLightHelper };
}

export const threeStore = createThreeStore();
