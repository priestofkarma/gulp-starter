$(document).ready(function () {

	// gsap.registerPlugin(ScrollTrigger);

	let lazyLoadInstance = new LazyLoad({});

/* 	MicroModal.init({
		// onShow: modal => console.info(`${modal.id} is shown`), 
		// onClose: modal => console.info(`${modal.id} is hidden`), 
		// openTrigger: 'data-custom-open', 
		// closeTrigger: 'data-custom-close',
		// openClass: 'is-open', 
		disableScroll: true,
		disableFocus: false,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true,
		debugMode: false
	}); */



	$(".hamburger").click(function () {
		if (!$("body").hasClass("menu--opened")) {
			$("body").addClass("menu--opened");
			// $("#modal-menu").attr("aria-hidden", false);
		} else {
			$("body").removeClass("menu--opened");
			// $("#modal-menu").attr("aria-hidden", true);
		}
	});

	/* fix viewport on macos */

	let scrollbarWidth = "";
	const doc = document.documentElement;

	const viewportHeight = () => {
		doc.style.setProperty("--viewportHeight", `${window.innerHeight}px`)
	}

	const viewportWidth = () => {
		doc.style.setProperty("--viewportWidth", `${window.innerWidth}px`)
	}

	viewportHeight();
	viewportWidth();
	handleFullSizing();

	function handleFullSizing() {
		scrollbarWidth = window.innerWidth - document.body.clientWidth;
		doc.style.setProperty("--scrollbarWidth", `${scrollbarWidth}px`)
	}

	let getHeaderHeight = function () {
		let headerHeight = 0;
		if ($(window).width() < 1300) {
			headerHeight = $(".header").height();
		} else {
			headerHeight = 0;
		}
		return headerHeight;
	}

	window.addEventListener("resize", function () {
		viewportHeight();
		viewportWidth();
		handleFullSizing();
		getHeaderHeight();
	});

	getHeaderHeight();


	/* smooth scroll to anchor */

	if ($("body").hasClass("home")) {

		$("[data-smooth-scroll]").on("click", smoothScroll);
		// $(".modal-menu__nav ul").on("click", "a", smoothScroll);

		function smoothScroll() {
			let hash = $(this)[0].hash;
			if (hash) {
				gsap.to(window, {
					duration: 1,
					ease: "Power4.out",
					scrollTo: {
						y: hash,
						offsetY: getHeaderHeight,
						autoKill: true,
					}
				});

				$("body").removeClass("menu--opened");
				return false;
			}
		}
	}


	/* ----------- sliders ------------ */


	/* equipe-slider */

	/* if ($('.equipe-slider').length > 0) {
		const equipeSlider = new Swiper('.equipe-slider', {
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			centeredSlides: true,
			initialSlide: 1,
			speed: 1000,
			preloadImages: false,
			lazy: true,
			lazy: {
				loadPrevNext: true,
			},
			pagination: {
				el: ".equipe-slider-navigation .swiper-pagination",
				type: "fraction",
			},
			navigation: {
				nextEl: '.equipe-slider-navigation .swiper-button-next',
				prevEl: '.equipe-slider-navigation .swiper-button-prev',
			},
			breakpoints: {
				768: {
					spaceBetween: 15
				},
				1600: {
					spaceBetween: 30
				}
			}
		});
	} */



	/* parallax */

	/* $(".c-parallax").each(function () {
		const anim = gsap.to($(this).find(".img-cover"), { yPercent: 20, ease: "none", });
		ScrollTrigger.create({
			trigger: $(this),
			animation: anim,
			start: "top bottom",
			end: "bottom top",
			scrub: true
		});
	}); */


	/* fadeIn */
	const fadeIn = document.querySelectorAll("[fade-in]");

	fadeIn.forEach((box, i) => {
		const anim = gsap.from(box, { duration: 0.5, autoAlpha: 0, y: 50, ease: Power3.out, });
		ScrollTrigger.create({
			trigger: box,
			animation: anim,
			start: "top 90%",
			toggleActions: 'play none none none',
			once: true,
		});
	});

	/* fadeLeft */
	const fadeLeft = document.querySelectorAll("[fade-left]");

	fadeLeft.forEach((box, i) => {
		const anim = gsap.from(box, { duration: 0.5, autoAlpha: 0, x: -50, ease: Power3.out, });
		ScrollTrigger.create({
			trigger: box,
			animation: anim,
			start: "top 90%",
			toggleActions: 'play none none none',
			once: true,
		});
	});

	/* fadeRight */
	const fadeRight = document.querySelectorAll("[fade-right]");

	fadeRight.forEach((box, i) => {
		const anim = gsap.from(box, { duration: 0.5, autoAlpha: 0, x: 50, ease: Power3.out, });
		ScrollTrigger.create({
			trigger: box,
			animation: anim,
			start: "top 90%",
			toggleActions: 'play none none none',
			once: true,
		});
	});

	/* scale-in */

	const scaleIn = document.querySelectorAll("[scale-in]");

	scaleIn.forEach((box, i) => {
		const anim = gsap.from(box, { scale: 0.1, duration: 1, opacity: 0, ease: "power4.inOut" });
		ScrollTrigger.create({
			trigger: box,
			animation: anim,
			start: "top 85%",
		});
	});

	
	/* thanks modal */
	/* $(".wpcf7").on('wpcf7mailsent', function (event) {
		MicroModal.show('modal-thanks');
		setTimeout(() => {
			MicroModal.close('modal-thanks');
		}, 2500);
	}); */

});


