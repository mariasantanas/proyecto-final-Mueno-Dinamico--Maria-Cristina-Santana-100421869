var form = document.querySelector('.form');
var barraOption = document.querySelectorAll('.barra-option');
form.addEventListener('click', (e) => {
    let element = e.target;
    let isButtonNext = element.classList.contains('step-button-next');
    let isButtonBack = element.classList.contains('step-button-back');
    if (isButtonNext || isButtonBack) {
        var currentStep = document.getElementById('step-' + element.dataset.step);
        var jumpStep = document.getElementById('step-' + element.dataset.to_step);

        currentStep.addEventListener('animationend', function callback() {
            currentStep.classList.remove('active');
            jumpStep.classList.add('active');
            if (isButtonNext) {
                currentStep.classList.add('to-left');
                barraOption[element.dataset.to_step - 1].classList.add('active');
            } else {
                jumpStep.classList.remove('to-left');
                barraOption[element.dataset.step - 1].classList.remove('active');
            }
            currentStep.removeEventListener('animationend', callback);
        });

        currentStep.classList.add('inactive');
        jumpStep.classList.remove('inactive');
    }
})