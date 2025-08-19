function checkSwipeUnlocked(expireSeconds = 900) {
    const saved = localStorage.getItem("swipeToEnterUnlocked");

    if (!saved) {
        localStorage.setItem("swipeToEnterUnlocked", "false");
        return false;
    }

    try {
        const data = JSON.parse(saved); // { unlocked: true, timestamp: 123456 }
        const now = Date.now();
        const expireTime = expireSeconds * 1000; // convertir a ms

        if (data.unlocked && now - data.timestamp < expireTime) {
            return true;
        } else {
            localStorage.setItem("swipeToEnterUnlocked", "false");
            return false;
        }
    } catch {
        localStorage.setItem("swipeToEnterUnlocked", "false");
        return false;
    }
}

// Guardar desbloqueo
function unlockSwipe() {
    localStorage.setItem(
        "swipeToEnterUnlocked",
        JSON.stringify({ unlocked: true, timestamp: Date.now() })
    );
}


export { checkSwipeUnlocked, unlockSwipe }
