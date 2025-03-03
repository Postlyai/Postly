

/*FAQ */
document.addEventListener("DOMContentLoaded", function () {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", function () {
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector(".faq-answer");

            // Alternar la clase "active"
            faqItem.classList.toggle("active");

            // Asegurar que la respuesta se despliegue correctamente
            if (faqItem.classList.contains("active")) {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px"; 
                faqAnswer.style.opacity = "1";
                faqAnswer.style.padding = "15px";  // Asegurar que tenga padding cuando se expande
            } else {
                faqAnswer.style.maxHeight = "0";
                faqAnswer.style.opacity = "0";
                faqAnswer.style.padding = "0"; // Evita espacios en blanco
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const benefitItems = document.querySelectorAll(".benefit-item");

    function showBenefitsOnScroll() {
        let scrollPosition = window.innerHeight * 0.9;
        
        benefitItems.forEach(item => {
            let itemTop = item.getBoundingClientRect().top;
            if (itemTop < scrollPosition) {
                item.classList.add("visible");
            }
        });
    }

    // Si los elementos nunca se ven, forzamos su visibilidad
    setTimeout(() => {
        benefitItems.forEach(item => item.classList.add("visible"));
    }, 1000);

    window.addEventListener("scroll", showBenefitsOnScroll);
    showBenefitsOnScroll();
});


document.addEventListener("DOMContentLoaded", function () {
    const ctaButton = document.querySelector(".cta-button");

    if (ctaButton) {
        ctaButton.style.opacity = "0";
        ctaButton.style.transform = "translateY(20px)";
        setTimeout(() => {
            ctaButton.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
            ctaButton.style.opacity = "1";
            ctaButton.style.transform = "translateY(0)";
        }, 500);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove("active");
            if (i === index) {
                testimonial.classList.add("active");
            }
        });
    }

    // Mostrar el primer testimonio al cargar la página
    showTestimonial(currentIndex);

    // ⚠️ Verificar si los botones existen antes de agregar los event listeners
    if (prevButton && nextButton) {
        prevButton.addEventListener("click", function () {
            currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
            showTestimonial(currentIndex);
        });

        nextButton.addEventListener("click", function () {
            currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
            showTestimonial(currentIndex);
        });

        // Cambio automático cada 5 segundos
        setInterval(() => {
            currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
            showTestimonial(currentIndex);
        }, 5000);
    } else {
        console.warn("⚠️ No se encontraron los botones de navegación de testimonios.");
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const modal = document.getElementById("confirmation-modal");

    // Asegurar que el modal esté oculto cuando se carga la página
    if (modal) {
        modal.classList.add("hidden");
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que la página se recargue

        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value.trim();
        const codigoPais = document.getElementById("codigo-pais").value;
        const telefono = document.getElementById("telefono").value;

        // URL del Webhook de Make
        const webhookURL = "https://hook.us2.make.com/pfwo3tvco14rg7hbr9vmi42uj2ux6y83";

        // Datos a enviar
        const data = { nombre, correo, telefono: `${codigoPais} ${telefono}` };


        // Enviar datos a Make
        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                showModal(); // Mostrar el modal
                form.reset(); // Limpiar formulario después de enviar
            } else {
                alert("Error al enviar el formulario. Intenta de nuevo.");
            }
        })
        .catch(error => {
            alert("Hubo un problema con la conexión.");
            console.error("Error:", error);
        });
    });

    // Función para mostrar el modal solo al enviar el formulario
    function showModal() {
        modal.classList.remove("hidden");
        modal.style.display = "flex";
    }

    // Función para cerrar el modal
    window.closeModal = function () {
        modal.classList.add("hidden");
        modal.style.display = "none";
    };
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script cargado correctamente");

    // Obtener elementos
    const modal = document.getElementById("social-modal");
    const modalTitle = document.getElementById("modal-title");
    const form = document.getElementById("social-form");
    const closeModal = document.getElementById("close-modal");

    if (!modal || !modalTitle || !form || !closeModal) {
        console.error("⚠️ No se encontraron los elementos del modal.");
        return;
    }

    // 1️⃣ EVENTO: Abrir el modal cuando se haga clic en una red social
    document.querySelectorAll(".social-card").forEach(card => {
        card.addEventListener("click", function () {
            const network = this.getAttribute("data-network");
            console.log(`🌐 Clic en: ${network}`);

            modalTitle.textContent = `Conectar ${network.charAt(0).toUpperCase() + network.slice(1)}`;
            form.setAttribute("data-network", network);
            modal.classList.remove("hidden");
            modal.style.display = "flex";

            console.log("📌 Modal abierto");
        });
    });

    // 2️⃣ EVENTO: Cerrar el modal con la "X"
    closeModal.addEventListener("click", function () {
        console.log("🛑 Cerrar modal");
        modal.classList.add("hidden");
        modal.style.display = "none";
    });

    // 3️⃣ EVENTO: Enviar datos al webhook de Make
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const network = this.getAttribute("data-network");
        const formData = new FormData(this);

        console.log(`🚀 Enviando datos de: ${network}`);

        let makeURL = "";
        switch (network) {
            case "instagram":
                makeURL = "https://hook.make.com/tu-webhook-instagram";
                break;
            case "linkedin":
                makeURL = "https://hook.make.com/tu-webhook-linkedin";
                break;
            case "tiktok":
                makeURL = "https://hook.make.com/tu-webhook-tiktok";
                break;
            case "facebook":
                makeURL = "https://hook.make.com/tu-webhook-facebook";
                break;
            default:
                console.error("⚠️ Red social no reconocida");
                return;
        }

        fetch(makeURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
        .then(response => response.json())
        .then(data => {
            console.log(`✅ Conectado a ${network} con éxito`);
            alert(`Conectado a ${network} con éxito`);
            modal.classList.add("hidden");
            modal.style.display = "none";
            form.reset();
        })
        .catch(error => {
            console.error("❌ Error:", error);
            alert("Error al conectar, intenta de nuevo.");
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const btnContact = document.getElementById("btn-contact");
    const btnDiy = document.getElementById("btn-diy");
    const diySteps = document.getElementById("diy-steps");
    const btnGenerate = document.getElementById("btn-generate");
    const apiCodeInput = document.getElementById("api-code");
    const apiKeyResult = document.getElementById("api-key-result");

    // Redirigir a la página de contacto
    btnContact.addEventListener("click", function () {
        window.location.href = "https://tu-sitio.com/contacto";
    });

    // Mostrar los pasos si eligen hacerlo solos
    btnDiy.addEventListener("click", function () {
        diySteps.classList.toggle("hidden");
    });

    // Generar API Key
    btnGenerate.addEventListener("click", function () {
        const apiCode = apiCodeInput.value.trim();

        if (apiCode === "") {
            alert("Por favor, ingresa el código de verificación.");
            return;
        }

        // Simulación de generación de API Key
        const generatedKey = `API-${btoa(apiCode).substring(0, 10)}`;
        apiKeyResult.textContent = `Tu API Key es: ${generatedKey}`;
        apiKeyResult.classList.remove("hidden");
    });
});
