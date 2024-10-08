const nextButtons = document.querySelectorAll(".next-button");

let currentValue = 0;

nextButtons.forEach((btn) => btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (btn.dataset.require) {
        const requireds = btn.dataset.require.split(" ");
        
        for (let id of requireds) {
            const input = document.querySelector("#" + id);
            if (!input.checkValidity()) {
                input.reportValidity();
                return;
            }
        }
    }

    if (btn.dataset.questions) {
        const questionsReq = btn.dataset.questions.split(" ");
        for (let id of questionsReq) {
            const inputs = document.querySelectorAll(`input[name="q${id}"]`);
            if (!Array.from(inputs).some((inp => inp.checked))) {
                alert("Responda todas");
                return;
            }
        }
    }

    currentValue++;

    const formSteps = document.querySelectorAll(".form-step");
    formSteps.forEach((form, i) => {
        form.classList.toggle("active", i === currentValue);
    });

    const steps = document.querySelectorAll(".step");
    steps.forEach((step) => {
        if (step.dataset.id <= currentValue + 1) {
            step.classList.add("active")
        }
    })
}));

const checkTerms = document.querySelector("#terms");
checkTerms.addEventListener("change", (e) => {
    e.preventDefault();
    const button = e.target.parentNode.parentNode.querySelector(".submit-button");
    button.disabled = !button.disabled;
})

const checkboxes = [...document.querySelectorAll(".checkboxes input")];
checkboxes.forEach((inp) => inp.addEventListener("change", (e) => {
    e.preventDefault();
    
    const button = e.target.parentElement.parentElement.parentElement.querySelector(".submit-button");
    button.hidden = !checkboxes.some((inp) => inp.checked);
}));

const legalPersonCheck = document.querySelector("#legal-person");
legalPersonCheck.addEventListener("change", (e) => {
    if (e.target.checked) {
        document.querySelector(".input-container:has(#cnpj)").style.display = "block";
        return;
    }
    document.querySelector(".input-container:has(#cnpj)").style.display = "none";
})

const answers1 = [...document.querySelectorAll("input[name='q1']")];
const answers2 = [...document.querySelectorAll("input[name='q2']")];
const answers3 = [...document.querySelectorAll("input[name='q3']")];
const answers = [answers1, answers2, answers3];

function checkAllAnswered() {
    for (let arr of answers) {
        if (!arr.some(inp => inp.checked)) {
            return false;
        }
    }
    return true;
}

answers.forEach((arr) => {
    arr.forEach((inp) => inp.addEventListener("change", (e) => {
        e.preventDefault();
        if (checkAllAnswered()) {
            document.querySelector("#question-button").hidden = false;
        }
    }))
});

const dialog = document.querySelector(".dialog-question");
const qs2 = document.querySelector("#q2s");
qs2.addEventListener("click", () => {
    dialog.showModal();
});

const cancel = document.querySelector(".cancel");
cancel.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

const formDialog = document.querySelector(".dialog-form");
formDialog.addEventListener("submit", (e) => {
    e.preventDefault();
    const span = document.querySelector(".insurance-type");
    const checks = [...formDialog.q5];
    span.textContent = "(Classe " + checks.find(inp => inp.checked).id[2] + ")";
    dialog.close();
})

const sign = document.querySelector("#sign");
const sign2 = document.querySelector("#sign-2");
sign.addEventListener("input", (e) => {
    e.target.value = e.target.value.toUpperCase();
});
sign2.addEventListener("input", (e) => {
    e.target.value = e.target.value.toUpperCase();
});

const cellphone = document.querySelector("#cellphone");
const cpf = document.querySelector("#cpf");
const cnpj = document.querySelector("#cnpj");
const cep = document.querySelector("#cep");
cellphone.addEventListener("input", (e) => {
    if (isNaN(e.target.value)) {
        e.target.value = e.target.value.slice(0, e.target.value.length - 1);
        return;
    }
});
cpf.addEventListener("input", (e) => {
    if (isNaN(e.target.value)) {
        e.target.value = e.target.value.slice(0, e.target.value.length - 1);
        return;
    }
});
cnpj.addEventListener("input", (e) => {
    if (isNaN(e.target.value)) {
        e.target.value = e.target.value.slice(0, e.target.value.length - 1);
        return;
    }
});
cep.addEventListener("input", (e) => {
    if (isNaN(e.target.value)) {
        e.target.value = e.target.value.slice(0, e.target.value.length - 1);
        return;
    }
});