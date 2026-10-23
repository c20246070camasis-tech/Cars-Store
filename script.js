gsap.registerPlugin(ScrollTrigger);

const darkModeToggle = document.querySelector("#darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    darkModeToggle.textContent = isDark ? "Light mode" : "Dark mode";
});

const intro = gsap.timeline({
    paused: true,
    defaults: {
        duration: 0.65,
        ease: "power3.out"
    }
});

// power4.out gives the headline a quick, confident arrival.
intro.from("#hero h1", { y: 48, autoAlpha: 0, ease: "power4.out" })
    // power2.out keeps the supporting copy smooth and easy to follow.
    .from("#hero p", { y: 24, autoAlpha: 0, ease: "power2.out" }, "-=0.35")
    // back.out adds a restrained lift to the calls to action.
    .from("#hero .button, #replayBtn", {
        y: 16,
        autoAlpha: 0,
        stagger: 0.12,
        ease: "back.out(1.4)"
    }, "-=0.25");

const replayButton = document.querySelector("#replayBtn");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
replayButton.addEventListener("click", () => {
    if (!prefersReducedMotion.matches) {
        intro.restart();
    }
});

const introMotion = gsap.matchMedia();
introMotion.add("(prefers-reduced-motion: no-preference)", () => {
    intro.restart();
});
introMotion.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(["#hero h1", "#hero p", "#hero .button", "#replayBtn"], {
        autoAlpha: 1,
        clearProps: "transform"
    });
    intro.progress(1).pause();
});

const scrollMotion = gsap.matchMedia();
scrollMotion.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(element, {
            autoAlpha: 0,
            y: 36
        }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 86%",
                toggleActions: "play none none reverse"
            }
        });
    });

    gsap.fromTo("#progressBar", {
        scaleX: 0
    }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
});

scrollMotion.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(".reveal", { autoAlpha: 1, clearProps: "transform" });
    gsap.set("#progressBar", { scaleX: 0 });
});
