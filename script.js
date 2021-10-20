/* if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration=>{
        console.log("SW Registered");
        console.log(registration);
    }).catch(err => {
        console.log("SW Registration Failed!");
        console.log(err);
    });
}else{
    console.log("serviceWorker not in navigatior")
 } */
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
const authTokens = location.href.split(/#|=|&/);
console.log(authTokens);
fetch('https://f11dub94fg.execute-api.us-east-1.amazonaws.com/Production/transactions')

// arrange slides next to one another
function arangeSlides(curr) {
    for (const i in slides) {
        slides[i].style.left = 
            `${trackRect.width * (i - curr)}px`;
    }
};
arangeSlides(0)

//right button
carBtns[1].addEventListener('click',e => {
    const currentSlide = track.querySelector('.curr');
    const nextSlide = currentSlide.nextElementSibling;
    console.log(nextSlide);
    const moveBy = -trackRect.width;
    //move to next
    arangeSlides(1)
});
