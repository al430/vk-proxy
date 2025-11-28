// api/vk-posts.js
export default async function handler(req, res) {
  const VK_GROUP_ID = '-232243550'; // со знаком минус!
  const COUNT = 12;
  const API_VERSION = '5.199';

  try {
    const url = `https://api.vk.com/method/wall.get?owner_id=${VK_GROUP_ID}&count=${COUNT}&v=${API_VERSION}`;
    const vkResponse = await fetch(url);

    if (!vkResponse.ok) {
      throw new Error(`VK API responded with status ${vkResponse.status}`);
    }

    const data = await vkResponse.json();

    // Добавляем CORS-заголовки — чтобы Tilda могла читать ответ
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json(data);
  } catch (error) {
    console.error('Error in VK proxy:', error);
    res.status(500).json({ error: 'Failed to fetch VK posts' });
  }
}