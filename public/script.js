document.getElementById('storyForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    await axios.post('/add-story', { title, content });

    // Hiển thị truyện đã đăng
    const storiesList = document.getElementById('storiesList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${title}</strong>: ${content}`;
    storiesList.appendChild(listItem);

    // Xóa nội dung form
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
});

// Load danh sách truyện đã đăng khi trang được tải
window.addEventListener('load', async () => {
    const response = await axios.get('/get-stories');
    const stories = response.data;

    const storiesList = document.getElementById('storiesList');
    stories.forEach(story => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${story.title}</strong>: ${story.content}`;
        storiesList.appendChild(listItem);
    });
});
