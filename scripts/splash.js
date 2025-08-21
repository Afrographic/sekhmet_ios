 async function removeSplash(){
    let splash = document.querySelector(".splash");
    await Afro.sleep(3000);
    splash.classList.add("inactive");
 }
 removeSplash();