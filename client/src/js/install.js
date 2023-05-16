const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// An event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    event.preventDefault();
    // Stash the event so it can be triggered later
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    butInstall.classList.toggle('hidden', false);
});


// A click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        // The deferred prompt isn't available
        return;
    }
    // Show the install prompt
    promptEvent.prompt();

    // The deferred prompt isn't available anymore, hide the button
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// A handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
    // Clear the deferredPrompt so it can be garbage collected
    window.deferredPrompt = null;
});