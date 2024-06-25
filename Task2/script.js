// Function to create reusable asset container
function createAssetContainer(asset) {
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

    return assetDiv;
}

// Fetch and render task data
async function renderTask() {
    const response = await fetch('taskData.json'); // Fetching local JSON file
    const data = await response.json();

    // Assuming we are interested in the first task for demonstration
    const task = data.tasks[0];

    const container = document.getElementById('task-container');

    // Display the task name
    const taskTitle = document.createElement('h2');
    taskTitle.textContent = task.TaskName;
    container.appendChild(taskTitle);

    // Render each asset in the task
    task.assets.forEach(asset => {
        const assetElement = createAssetContainer(asset);
        container.appendChild(assetElement);
    });
}

// Call the function to render the task
renderTask();
