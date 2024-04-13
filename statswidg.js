// JavaScript code
(async () => {
    const owner = 'GodkuHacking';
    const repo = '';
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    const data = await response.json();
    const languages = Object.keys(data);
    const totalSize = Object.values(data).reduce((acc, val) => acc + val, 0);
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GitHub Language Stats</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }

            .language-widget {
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                padding: 20px;
                width: 300px;
                text-align: center;
                animation: fadeIn 1s ease-in-out;
            }

            .color-bar {
                height: 10px;
                border-radius: 5px 5px 0 0;
            }

            .language {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 5px;
            }

            .percentage {
                font-size: 14px;
                color: #888;
            }

            @keyframes fadeIn {
                0% {
                    opacity: 0;
                    transform: translateY(-20px);
                }

                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes colorChange {
                0% {
                    background-color: #f00;
                }

                50% {
                    background-color: #0f0;
                }

                100% {
                    background-color: #00f;
                }
            }
        </style>
    </head>
    <body>
        <div class="language-widget">
            <h2 id="title" style="margin-bottom: 20px;">${owner}/${repo} Language Stats</h2>
            <div class="language-list">`;

    languages.forEach(language => {
        const percent = ((data[language] / totalSize) * 100).toFixed(2);
        let color = '';

        switch (language.toLowerCase()) {
            case 'python':
                color = 'blue';
                break;
            case 'javascript':
                color = 'lime';
                break;
            case 'csharp':
                color = 'purple';
                break;
            case 'c++':
                color = 'pink';
                break;
            case 'c':
                color = 'blurple';
                break;
            case 'java':
                color = 'red';
                break;
            case 'html':
                color = 'grey';
                break;
            case 'css':
                color = 'black';
                break;
            default:
                color = 'lightgrey';
        }

        html += `
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                <div class="color-bar" style="background-color: ${color}; height: 15px; width: 15px; border-radius: 50%; margin-right: 10px;"></div>
                <div class="language">${language.toUpperCase()}</div>
                <div class="percentage" style="margin-left: auto;">${percent}%</div>
            </div>`;
    });

    html += `</div>
            </div>
        </body>
    </html>`;

    console.log(html);
})();
