let Carousel;
let Dots;

let isDown = false;
let pointerX = 0;
let translateX = 0;
let chosenImg = 0;

const CHANGE_TRANSLATE = 'CHANGE_TRANSLATE';
const CHANGE_CHOSEN_IMG = 'CHANGE_CHOSEN_IMG';
const MAX_IMAGES = 7;

const dispatch = (event, vars) => {
    switch (event) {
        case CHANGE_TRANSLATE:
            translateX = vars.translateX;
            Carousel.style.transform = `translateX(${translateX}px)`;
            return;
        case CHANGE_CHOSEN_IMG:
            if (vars.chosenImg === chosenImg) return;
            Dots[chosenImg].classList.remove('activeDot');
            chosenImg = vars.chosenImg;
            Dots[chosenImg].classList.add('activeDot');
            Carousel.style.transition = '0.2s';
            dispatch(CHANGE_TRANSLATE, {
                translateX: chosenImg * -252
            });
            setTimeout(() => {
                Carousel.style.transition = '0s';
            }, 200);
            return;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    Carousel = document.getElementById("carousel");
    Dots = document.getElementsByClassName("images__dot");

    Carousel.addEventListener('pointerdown', (e) => {
        isDown = true;
        pointerX = e.clientX;
    });
    Carousel.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        const scroll = e.clientX - pointerX;
        pointerX = e.clientX;
        dispatch(CHANGE_TRANSLATE, {
            translateX: Math.max(Math.min(0, translateX + scroll), -(MAX_IMAGES * 252))
        });
    });
    window.addEventListener('pointerup', () => {
        if (!isDown) return;
        isDown = false;
        if (translateX < chosenImg * -252) {
            dispatch(CHANGE_CHOSEN_IMG, {
                chosenImg: Math.min(chosenImg + 1, MAX_IMAGES)
            });
        }
        if (translateX > chosenImg * -252) {
            dispatch(CHANGE_CHOSEN_IMG, {
                chosenImg: Math.max(chosenImg - 1, 0)
            });
        }
    });

});

const next = () => {
    dispatch(CHANGE_CHOSEN_IMG, {
        chosenImg: Math.min(chosenImg + 1, MAX_IMAGES)
    });
};

const prev = () => {
    dispatch(CHANGE_CHOSEN_IMG, {
        chosenImg: Math.max(chosenImg - 1, 0)
    });
};

const chose = (imgNumber) => {
    dispatch(CHANGE_CHOSEN_IMG, {
        chosenImg: imgNumber
    });
}