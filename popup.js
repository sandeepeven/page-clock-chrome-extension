const fieldIds = ['format', 'background', 'fullscreen', 'position'];

document.addEventListener('DOMContentLoaded', function () {

    const fieldIds = ['format', 'background', 'fullscreen', 'position'];

    // running on start setting local storage defaults
    fieldIds.forEach(item => {
        getLocalStorage(item, (res) => {
            if (res) {
                if (item === 'position') {
                    document.getElementById(item).value = res;
                    return;
                }
                document.getElementById(item).checked = res;
            }
        })
    })

    document.getElementById('format').addEventListener('click', (evt) => {
        console.log('format checked state', evt.target.checked);
        updateLocalStorage('format', evt.target.checked);
    })

    document.getElementById('background').addEventListener('click', (evt) => {
        console.log('show-background', evt.target.checked);
        updateLocalStorage('background', evt.target.checked);
    })

    document.getElementById('fullscreen').addEventListener('click', (evt) => {
        console.log('set-fullscreen-background', evt.target.checked);
        updateLocalStorage('fullscreen', evt.target.checked);
    })

    const select = document.getElementById('position');
    select.addEventListener('change', (evt) => {
        const { value } = evt.target;
        chrome.runtime.sendMessage({ action: value }, function (response) {
            console.log("response", response);
            updateLocalStorage('position', value);
        });
    })

});