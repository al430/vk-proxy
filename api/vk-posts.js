// api/vk-posts.js
export default async function handler(req, res) {
  const VK_GROUP_ID = '-232243550';
  const COUNT = 12;
  const API_VERSION = '5.199';
  
  // Берём токен из переменной окружения
  const ACCESS_TOKEN = process.env.VK_ACCESS_TOKEN;
  
  if (!ACCESS_TOKEN) {
    return res.status(500).json({ error: 'VK token not configured' });
  }

  try {
    const url = `https://api.vk.com/method/wall.get?owner_id=${VK_GROUP_ID}&count=${COUNT}&v=${API_VERSION}&access_token=${ACCESS_TOKEN}`;
    const vkResponse = await fetch(url);
    const data = await vkResponse.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch VK posts' });
  }
}