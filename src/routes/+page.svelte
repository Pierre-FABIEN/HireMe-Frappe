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
				<img src="/img/logoFrappe.webp" alt="Logo Frappe" width="500" height="110" />
				<p>
					Depuis 2017, mon parcours dans le développement web s'inscrit dans une quête constante
					d'innovation et de créativité. Après avoir acquis une solide maîtrise des outils
					graphiques comme Photoshop, Illustrator et After Effects, j’ai rapidement évolué vers le
					développement fullstack. Mes compétences incluent WordPress, Symfony, Next.js et
					SvelteKit, avec une expertise en front-end. Je suis passionné par la création de designs
					captivants et de backends performants pour des projets de E-commerce et SaaS, tout en
					intégrant des expériences 3D immersives avec ThreeJS. Mes boilerplates sont conçus avec
					une approche holistique, offrant des solutions web complètes, robustes et sécurisées. Mon
					objectif est toujours d'allier technologie et créativité pour offrir des expériences
					utilisateur uniques et engageantes.
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
					Avec une expérience confirmée en tant que lead développeur, je suis prêt à apporter ma
					vision créative et mon savoir-faire technique au service d'une agence qui valorise le
					design et l'innovation. En tant que chef de projet, je maîtrise la coordination de
					développeurs et la gestion de projets pour garantir une mise en œuvre fluide et efficace.
					Ma connaissance des technologies modernes, notamment WordPress, SvelteKit et la 3D, me
					permet de concevoir des solutions à la fois esthétiques et fonctionnelles. Travailler au
					sein d’une équipe dynamique et audacieuse me permettrait de contribuer à des projets
					ambitieux tout en mettant à profit mes compétences en gestion et mon goût pour
					l'innovation.
				</p>
			</div>
		</div>
	</section>

	<section class="thirdPage" bind:this={thirdPage} aria-labelledby="thirdPageTitle">
		<div class="textContent">
			<div class="title">
				<h1>Motivation</h1>
				<p>
					Intégrer Frappe représente pour moi une opportunité exceptionnelle de m’épanouir au sein
					d’une équipe créative et visionnaire. Je suis particulièrement séduit par votre approche
					novatrice du design et de l’interactivité, qui fait écho à mes propres ambitions de
					repousser les limites de l'expérience utilisateur. Rejoindre votre équipe serait pour moi
					l'occasion de relever des défis variés, tout en continuant à enrichir mes compétences
					techniques et managériales. Je serais enchanté de pouvoir échanger plus en détail sur mes
					réalisations lors d’un entretien. Merci pour l’attention que vous porterez à ma
					candidature ; je reste à votre disposition pour toute information complémentaire.
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
