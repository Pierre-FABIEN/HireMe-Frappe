<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import { setTransitionLoader } from '$lib/stores/transitionLoaderStore';
	import { threeStore, rectAreaLightStore } from '$stores/threeStore';
	import initializeAnimations from '$lib/js/cameraAnimations';

	gsap.registerPlugin(ScrollTrigger);

	let container: HTMLElement;

	let intensityValue = { value: 0 };
	let firstPage: HTMLElement;
	let secondPage: HTMLElement;
	let thirdPage: HTMLElement;
	let fourthPage: HTMLElement;

	function initializeTextAppearAnimations() {
		const sections = [secondPage, thirdPage, fourthPage];

		sections.forEach((section, index) => {
			if (section) {
				const textContent = section.querySelector('.textContent');

				if (textContent) {
					gsap.fromTo(
						textContent,
						{ opacity: 0, x: '-100vw' },
						{
							opacity: 1,
							x: 0,
							scrollTrigger: {
								trigger: section,
								start: 'top bottom', // Commence lorsque le haut de la section atteint le bas de la fenêtre
								end: 'bottom 60%', // Se termine lorsque le bas de la section atteint le haut de la fenêtre
								scrub: true
							},
							ease: 'power2.out'
						}
					);
				} else {
					console.error(`Contenu texte non trouvé dans la section ${index + 1}`);
				}
			} else {
				console.error(`Section ${index + 1} non trouvée`);
			}
		});
	}

	onMount(async () => {
		setTransitionLoader(false);

		setTimeout(() => {
			const { camera } = get(threeStore);
			const rectAreaLight = get(rectAreaLightStore);

			if (camera) {
				initializeAnimations(camera, rectAreaLight, intensityValue, container);
			}

			initializeTextAppearAnimations();
		}, 10);
	});
</script>

<svelte:head>
	<title>Pierre FABIEN Web-Dev</title>
	<meta name="description" content="Ceci est une description de la page d'exemple." />
</svelte:head>

<div class="home" bind:this={container}>
	<section class="firstPage" bind:this={firstPage} aria-labelledby="firstPageTitle">
		<div class="textContent">
			<div class="title">
				<h1>Pierre FABIEN</h1>
				<img src="/img/logoFrappe.png" alt="Logo Frappe" />
				<p>
					Mon parcours dans le développement web est marqué par une quête d'innovation et de
					créativité depuis 2017. Après avoir maîtrisé Photoshop, Illustrator et After Effects, je
					me suis spécialisé en développement fullstack avec WordPress, Symfony, Next.js et
					SvelteKit, en mettant l’accent sur le front-end. Je conçois des designs attrayants et
					développe des backends robustes pour des projets de E-commerce ou SaaS, intégrant ThreeJS
					pour une expérience 3D immersive. Mes boilerplates reflètent une approche holistique,
					facilitant la création de solutions web complètes, fonctionnelles et sécurisées. Mon
					engagement à allier technologie et créativité vise à offrir des expériences utilisateur
					uniques et captivantes.
				</p>
			</div>
		</div>
	</section>

	<section class="secondPage" bind:this={secondPage} aria-labelledby="secondPageTitle">
		<div class="textContent">
			<div class="title">
				<h1>Web Designer</h1>
				<span>&</span>
				<h1>Web Manager</h1>
				<p>
					Je souhaite mettre mon expérience créative en web au service d’une agence valorisant le
					design et l’innovation. Avec un parcours en développement fullstack et une passion pour le
					design, je peux contribuer à des projets esthétiques et fonctionnels. Je suis également
					capable d’encadrer des développeurs et de gérer des projets pour assurer une coordination
					efficace. Ma maîtrise de technologies modernes comme WordPress, SvelteKit et la 3D me
					permet de créer des expériences web immersives et visuellement attrayantes. Intégrer une
					équipe dynamique me permettra de collaborer sur des projets innovants, alliant technologie
					et créativité pour des solutions web uniques et inspirantes.
				</p>
			</div>
		</div>
	</section>

	<section class="thirdPage" bind:this={thirdPage} aria-labelledby="thirdPageTitle">
		<div class="textContent">
			<div class="title">
				<h1>Motivation</h1>
				<p>
					Rejoindre Frappe serait pour moi l’opportunité de m’épanouir au sein d’une équipe
					dynamique et créative, où je pourrais contribuer à des projets variés et challengeants,
					tout en continuant à développer mes compétences techniques et managériales. Je suis
					particulièrement attiré par votre approche collaborative et votre volonté de repousser les
					limites du design et de l’interactivité, des valeurs que je partage pleinement. Je serais
					ravi de pouvoir discuter plus en détail de ma candidature lors d’un entretien et de vous
					présenter mes réalisations. Je vous remercie par avance de l’attention portée à ma demande
					et me tiens à votre disposition pour toute information complémentaire.
				</p>
			</div>
		</div>
	</section>

	<section class="fourthPage" bind:this={fourthPage} aria-labelledby="fourthPageTitle">
		<div class="textContent">
			<div class="title">
				<h1>Contact</h1>
				<p>
					Je tiens également à vous informer que je prévois de déménager prochainement à Montauban.
					Je serais ravi de pouvoir vous rencontrer autour d’un café afin de discuter de ma
					candidature et de la manière dont je pourrais contribuer à votre équipe. Cette rencontre
					serait une excellente occasion d’échanger davantage sur nos visions respectives et de
					mieux nous connaître.
				</p>
			</div>
		</div>
	</section>
</div>

<style lang="scss">
	.home {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		position: absolute;
		overflow-y: hidden;
	}

	.textContent {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: 2rem;
		text-align: center;
	}

	.firstPage,
	.secondPage,
	.thirdPage,
	.fourthPage {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.firstPage {
		.textContent {
			width: 100vw;
			height: 100vh;
			.title {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				flex-direction: column;
				position: absolute;
				right: 10%;

				h1 {
					font-family: 'Zilla Slab', serif;
					font-weight: 100;
					color: white;
					font-size: 80px;
					margin: 0;
				}

				img {
					width: 500px;
				}

				p {
					font-family: 'Raleway', sans-serif;
					color: white;
					font-size: 17px;
					line-height: 150%;
					width: 500px;
					text-align: justify;
				}

				@media only screen and (max-width: 550px) {
					h1 {
						font-size: 13vw;
					}
					img {
						width: 80vw;
					}

					p {
						width: 80vw;
					}
				}
			}
		}
	}

	.secondPage {
		.textContent {
			width: 100vw;
			height: 100vh;
			.title {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				flex-direction: column;
				position: absolute;
				left: 10%;

				span {
					font-family: 'Zilla Slab', serif;
					color: white;
					position: absolute;
					top: -10px;
					right: -90px;
					font-size: 200px;
					z-index: -1;
				}

				h1 {
					font-family: 'Zilla Slab', serif;
					font-weight: 100;
					color: white;
					font-size: 85px;
					margin: 0;
					text-shadow: 2px 2px 2px black;
				}

				p {
					font-family: 'Raleway', sans-serif;
					color: white;
					font-size: 17px;
					line-height: 150%;
					width: 500px;
					text-align: justify;
				}

				@media only screen and (max-width: 550px) {
					h1 {
						font-size: 13vw;
					}
					p {
						width: 80vw;
					}
				}
			}
		}
	}

	.thirdPage {
		.textContent {
			width: 100vw;
			height: 100vh;
			.title {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				flex-direction: column;
				position: absolute;
				left: 10%;

				h1 {
					font-family: 'Zilla Slab', serif;
					font-weight: 100;
					color: white;
					font-size: 108px;
					margin: 0;
				}

				p {
					font-family: 'Raleway', sans-serif;
					color: white;
					font-size: 17px;
					line-height: 150%;
					width: 500px;
					text-align: justify;
				}

				@media only screen and (max-width: 550px) {
					h1 {
						font-size: 13vw;
					}
					p {
						width: 80vw;
					}
				}
			}
		}
	}

	.fourthPage {
		.textContent {
			width: 100vw;
			height: 100vh;
			.title {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				flex-direction: column;
				position: absolute;
				right: 10%;
				bottom: 10%;

				h1 {
					font-family: 'Zilla Slab', serif;
					font-weight: 100;
					color: white;
					font-size: 108px;
					margin: 0;
				}

				p {
					font-family: 'Raleway', sans-serif;
					color: white;
					font-size: 17px;
					line-height: 150%;
					width: 500px;
					text-align: justify;
				}


				@media only screen and (max-width: 550px) {
					bottom: 1% !important;
					right: 1%;

					h1 {
						font-size: 13vw;
					}
					p {
						width: 60vw;
					}
				}
			}
		}
	}
</style>
