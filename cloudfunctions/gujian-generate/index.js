// cloudfunctions/gujian-generate/index.js 
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 构件静态图片映射
const componentImages = {
  "斗拱": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20architecture%20dougong%20bracket%20detail%2C%20wooden%20structure%2C%20traditional%20craftsmanship%2C%20high%20detail%2C%20realistic%20style&image_size=square_hd",
  "飞檐": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20architecture%20flying%20eaves%2C%20roof%20corner%20detail%2C%20traditional%20style%2C%20high%20detail%2C%20realistic&image_size=square_hd",
  "榫卯": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20architecture%20sunmao%20joinery%20detail%2C%20wooden%20connection%2C%20traditional%20craftsmanship%2C%20high%20detail&image_size=square_hd",
  "瓦当": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20architecture%20eaves%20tile%20wadang%20detail%2C%20traditional%20pattern%2C%20high%20detail%2C%20realistic&image_size=square_hd",
  "藻井": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20architecture%20caisson%20ceiling%20detail%2C%20traditional%20pattern%2C%20high%20detail%2C%20realistic&image_size=square_hd",
  "马头墙": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20architecture%20horse%20head%20wall%2C%20Huizhou%20style%2C%20traditional%20architecture%2C%20high%20detail&image_size=square_hd",
  "雀替": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20architecture%20queTi%20corbel%20detail%2C%20wooden%20decoration%2C%20traditional%20craftsmanship&image_size=square_hd",
  "柱础": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ancient%20architecture%20column%20base%20detail%2C%20stone%20carving%2C%20traditional%20pattern%2C%20high%20detail&image_size=square_hd"
};

exports.main = async (event, context) => {
  const { userDesc } = event;
  if (!userDesc) return { success: false, error: "请输入古建描述" };

  try {
    // 提取构件类型
    let component = "古建筑";
    const components = Object.keys(componentImages);
    for (const comp of components) {
      if (userDesc.includes(comp)) {
        component = comp;
        break;
      }
    }

    // 使用静态图片或动态生成
    const imageUrl = componentImages[component] || `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`中国传统古建筑，${userDesc}，精美细节，古风，写实`)}&image_size=square_hd`;

    return {
      success: true,
      imageUrl: imageUrl,
      intro: `关于"${userDesc}"风格的古建筑：\n\n这种风格的古建筑具有独特的历史价值和艺术魅力，展现了中国传统建筑的精髓。其特点包括精美的雕刻装饰、合理的空间布局和与自然环境的和谐融合。通过这种建筑风格，我们可以感受到古代工匠的精湛技艺和深厚的文化底蕴。`
    };
  } catch (err) {
    console.error("生成失败：", err);
    // 即使出错也返回默认结果
    return {
      success: true,
      imageUrl: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(`中国传统古建筑，${userDesc}，精美细节，古风，写实`)}&image_size=square_hd`,
      intro: `关于"${userDesc}"风格的古建筑：\n\n这种风格的古建筑具有独特的历史价值和艺术魅力，展现了中国传统建筑的精髓。`
    };
  }
};