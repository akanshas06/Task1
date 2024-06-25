
const assets = [
    {
        "name": "Asset 1",
        "description": "This is the description for asset 1",
        "type": "Article",
        "media": null
    },
    {
        "name": "Asset 2",
        "description": "This is the description for asset 2",
        "type": "Video",
        "media": "https://drive.google.com/file/d/xxxx/view"
    },
    {
        "name": "Asset 3",
        "description": "This is the description for asset 3",
        "type": "Audio",
        "media": "https://drive.google.com/file/d/xxxx/view"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('asset-container');
    
    assets.forEach(asset => {
        const assetDiv = document.createElement('div');
        assetDiv.classList.add('asset');

        const header = document.createElement('div');
        header.classList.add('asset-header');
        
        const title = document.createElement('span');
        title.textContent = asset.name;

        const arrow = document.createElement('span');
        arrow.classList.add('arrow');
        arrow.innerHTML = '&#9654;'; // Unicode arrow

        header.appendChild(title);
        header.appendChild(arrow);
        assetDiv.appendChild(header);

        const description = document.createElement('div');
        description.classList.add('asset-description');
        description.textContent = asset.description;

        if (asset.media) {
            const media = document.createElement(asset.type === 'Video' ? 'video' : 'audio');
            media.src = asset.media;
            media.controls = true;
            description.appendChild(media);
        }

        assetDiv.appendChild(description);

        header.addEventListener('click', function() {
            description.classList.toggle('expanded');
            arrow.classList.toggle('expanded');
        });

        container.appendChild(assetDiv);
    });
});
