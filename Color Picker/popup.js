const btn = document.querySelector('.changeColorBtn');
const GridColor = document.querySelector('.GridColor');
const colorValue = document.querySelector('.colorValue');

btn.addEventListener('click', async () => {
    chrome.storage.sync.get('color', ({ color }) => {
        console.log('color: ', color);
    });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: pickColor,
        },
        async (injectionResults) => {
            const [data] = injectionResults;
            if (data.result) {
                const color = data.result.sRGBHex;
                GridColor.style.backgroundColor = color;
                colorValue.innerText = color;
                try {
                    await navigator.clipboard.writeText(color);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    );
});
//outside work
async function pickColor() {
    try {
     
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    } catch (err) {
        console.error(err);
    }
}
