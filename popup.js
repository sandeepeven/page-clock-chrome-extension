document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('format').addEventListener('click', (evt) => {
        console.log('format checked state', evt.target.checked);
    })

    document.getElementById('show-background').addEventListener('click', (evt) => {
        console.log('show-background', evt.target.checked);
    })

    document.getElementById('set-fullscreen').addEventListener('click', (evt) => {
        console.log('show-background', evt.target.checked);
    })

    const select = document.getElementById('screen-position');
    select.addEventListener('change', (evt) => {
        const { value } = evt.target;
        chrome.runtime.sendMessage({ action: value }, function (response) {
            console.log("response", response);
        });
    })
});