'use strict';
function testWebP() {
    return new Promise(res => {
        const webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        webP.onload = webP.onerror = () => {
            res(webP.height === 2);
        };
    }).then(hasWebP => {
        let className = hasWebP === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
};
// Проверка поддержки webP 
testWebP();



//логика работы меню бургер
document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('[data-burger-menu]')) {
        target.closest('[data-burger-menu]').classList.toggle('active');
        document.querySelector('[data-header-menu]').classList.toggle('active');
        document.body.classList.toggle('hidden');
    }

    if (target.closest('[data-next-section]')) {
        const nextSection = document.querySelector('[data-second-section]');
        if (nextSection) {
            $('html, body').animate({
                scrollTop: $(nextSection).offset().top
            }, 1000);
        }
    }
});



AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 20, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 100, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-center', // defines which position of the element regarding to window should trigger the animation

});


$(document).ready(function () {
    $('.arrow-elem.text-arrow')
        .mouseenter(function (e) {
            $('.arrow-elem').not(this).css({
                'opacity': 0.3
            });
        })
        .mouseleave(function (e) {
            $('.arrow-elem').not(this).css({
                'opacity': 1
            });
        })

})

const paralaxEls = document.querySelectorAll('.horizontal-paralax');
window.addEventListener("scroll", horizontalParalax);
function horizontalParalax() {
    paralaxEls.forEach(item => {
        const startPosition = Math.abs(item.getBoundingClientRect().top - window.innerHeight);
        const directionParam = item.dataset.speed;
        let mark = directionParam > 0 ? "+" : '-';
        let currenTransformValue = `${mark}${Math.abs(startPosition / directionParam)}`;
        item.style.transform = `translate3d(${currenTransformValue / 15}vw,0,0)`;
        item.style.willChange = "transform";
    });
}
horizontalParalax();





function trackMouse(hover, pointer) {

    let $hover = document.querySelectorAll(hover);
    let $pointer = document.querySelector(pointer);
    let off = 50;
    let first = !0;

    function mouseX(evt) {
        if (!evt) evt = window.event;
        if (evt.pageX) return evt.pageX;
        else if (evt.clientX) return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        else return 0
    }

    function mouseY(evt) {
        if (!evt) evt = window.event;
        if (evt.pageY) return evt.pageY;
        else if (evt.clientY) return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        else return 0
    }

    function follow(evt) {
        if (first) {
            first = !1;
            $pointer.style.opacity = 1;
        }

        TweenMax.to($pointer, 0.4, {
            left: (parseInt(mouseX(evt)) - off) + 'px',
            top: (parseInt(mouseY(evt)) - off) + 'px',
            ease: Power3.easeOut
        });
    }
    document.addEventListener('mousemove', follow);


    (function linkCursor() {
        $hover.forEach(function (item) {
            item.addEventListener('mouseover', function () {
                $pointer.classList.add('hide');
            });
            item.addEventListener('mouseout', function () {
                $pointer.classList.remove('hide');
            });
        })
    })();

}
$(window).on('load', function () {
    trackMouse('.cursor', '.js-pointer');
});


$('.cursor-descr').mousemove(function (e) {
    var X = e.pageX;
    var Y = e.pageY;
    var top = Y + 10 + 'px';
    var left = X + 25 + 'px';
    var id = $(this).data('tooltip');
    $('#tip-' + id).css({
        opacity: "1",
        visibility: 'visible',
        top: top,
        left: left
    });
});
$('.cursor-descr').mouseout(function () {
    var id = $(this).data('tooltip');
    $('#tip-' + id).css({
        opacity: "0",
        visibility: 'hidden',
    });
});
