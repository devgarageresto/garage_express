async function initMenu(lang) {
    try {
        const response = await fetch(`data_${lang}.json`);
        if (!response.ok) throw new Error('Error data loading');
        const data = await response.json();
        render(data);
    } catch (error) {
        console.error("Error loading menu:", error);
    }
}

const placeholderLogo =
"data:image/svg+xml;charset=UTF-8,%3Csvg width='300' height='200' viewBox='0 0 300 200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='200' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-weight='900' font-size='24' fill='%23f1c40f'%3EGARAGE BURGER%3C/text%3E%3C/svg%3E";

function render(data) {
    const app = document.getElementById('app');
    app.innerHTML = '';

    for (const sectionName in data) {
        let html = `<h2 class="section-title">${sectionName}</h2>`;
        html += `<div class="section-grid">`;

        data[sectionName].forEach(item => {
            const imageSrc = (item.image && item.image.trim() !== "") 
                ? item.image 
                : placeholderLogo;

            html += `
            <div class="card">
                <div class="img-container">
                    <img src="${imageSrc}"
                         alt="${item.title}"
                         class="card-img"
                         loading="lazy"
                         data-fallback="1">
                </div>
                <div class="card-body">
                    <div class="card-header">
                        <span class="item-name">${item.title}</span>
                        ${item.price ? `<span class="item-price">${item.price}</span>` : ''}
                    </div>
                    ${item.desc ? `<p class="item-desc">${item.desc}</p>` : ''}
                    
                    ${item.prices ? `
                    <div class="multi-price">
                        ${item.prices.map(p => `
                            <div class="price-line">
                                <span>${p.l}</span>
                                <span class="item-price">${p.v}</span>
                            </div>
                        `).join('')}
                    </div>` : ''}
                    
                    ${item.combo ? `<div class="combo-badge">${item.combo}</div>` : ''}
                </div>
            </div>`;
        });

        html += `</div>`;
        app.innerHTML += html;
    }

    attachImageFallbacks();
}

function attachImageFallbacks() {
    document.querySelectorAll('img[data-fallback]').forEach(img => {
        img.onerror = () => {
            img.onerror = null;
            img.src = placeholderLogo;
        };
    });
}
