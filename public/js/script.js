let contactForm = document.getElementById("contact");

contactForm.addEventListener("submit",(ev)=>{
    ev.preventDefault();
    let contactSection = document.getElementById("contact-section");
    contactSection.innerHTML = "Message sent!";
});

let whatsappButton = document.getElementById("whatsapp");
let whatsappMessage = document.getElementById("message");
whatsappButton.addEventListener("click",(ev)=>{
    ev.preventDefault();
    let whatsappLink = `https://wa.me/2347088161687?text=${whatsappMessage.value}&lang=en`;
    window.open(whatsappLink,"_blank");
})
