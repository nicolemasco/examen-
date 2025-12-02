
function ejecutar(divID, videoID) {
    const lightbox = document.getElementById(divID);
    const youtube = document.getElementById(videoID);

    const videoURL = "https://www.youtube.com/embed/tDM25H_RHCk?si=I4g_Iej9R0wmQpZ_";


    youtube.src = videoURL;
    lightbox.style.display = "flex";
}

function ocultar(divID, videoID) {
    const lightbox = document.getElementById(divID);
    const youtube = document.getElementById(videoID);
    youtube.src = "";
    lightbox.style.display = "none"
}