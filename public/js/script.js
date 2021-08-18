let whatsappButton = document.getElementById("whatsapp");
let whatsappMessage = document.getElementById("message");
whatsappButton.addEventListener("click",(ev)=>{
    ev.preventDefault();
    let whatsappLink = `https://wa.me/2347088161687?text=${whatsappMessage.value}&lang=en`;
    window.open(whatsappLink,"_blank");
});

let contactForm = document.getElementById("contact");
let contactSection = document.getElementById("contact-section");
contactForm.addEventListener("submit",async (ev)=>{
    ev.preventDefault();
    const form = ev.currentTarget;
    const url = form.action;
    const formData = new FormData(form);
    const plainData = Object.fromEntries(formData.entries());
	const jsonForm = JSON.stringify(plainData);
    await fetch(url,{
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: jsonForm
    })
    .then(res => {
        if(!res.ok){
            contactSection.innerHTML = "There was an error sending the mail. Please refresh and try again.";
        }
        else{
            contactSection.innerHTML = "Message sent!";
        }
    })
    .catch(err => {
        console.error(err.message);
        contactSection.innerHTML = "There was an error sending the mail. Please refresh and try again.";
    })
})
