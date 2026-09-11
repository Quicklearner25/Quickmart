import { Product, Category, DeliveryLocation, Coupon } from '../types';

// Curated image banks by category with high-reliability Unsplash grocery & food assets
const CATEGORY_IMAGES: Record<string, string[]> = {
  'fruits-vegetables': [
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=80', // veggies
    'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80', // tomatoes
    'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80', // apples
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80', // bananas
    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80', // potatoes
    'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=500&auto=format&fit=crop&q=80', // oranges
    'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80', // carrots
    'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&auto=format&fit=crop&q=80', // greens
  ],
  'dairy-breakfast': [
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80', // milk
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80', // cheese
    'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format&fit=crop&q=80', // eggs
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80', // bread
    'https://images.unsplash.com/photo-1588710929895-6548545814f8?w=500&auto=format&fit=crop&q=80', // butter
    'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=500&auto=format&fit=crop&q=80', // yogurt curd
  ],
  'munchies-snacks': [
    'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80', // chips
    'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=500&auto=format&fit=crop&q=80', // snacks
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=80', // cookies
    'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=500&auto=format&fit=crop&q=80', // nachos
    'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=80', // popcorn
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80', // chocolate snacks
  ],
  'cold-drinks': [
    'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80', // cola
    'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=80', // orange juice
    'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=80', // lemonade
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=80', // drinks
    'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=500&auto=format&fit=crop&q=80', // energy can
  ],
  'instant-food': [
    'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80', // noodles
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=80', // pasta
    'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=80', // fries
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80', // ready food
  ],
  'tea-coffee': [
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=80', // hot tea
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80', // coffee cup
    'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=80', // tea leaves
    'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop&q=80', // coffee beans
  ],
  'atta-rice-dals': [
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80', // rice grain
    'https://images.unsplash.com/photo-1574316071802-0d684efa7cd5?w=500&auto=format&fit=crop&q=80', // wheat flour
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80', // lentils dal
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80', // cooking oil
  ],
  'masalas-dryfruits': [
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80', // spices
    'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500&auto=format&fit=crop&q=80', // dry fruits almonds
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=80', // cashews
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80', // turmeric masala
  ],
  'sweets-icecream': [
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=80', // ice cream
    'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&auto=format&fit=crop&q=80', // chocolates
    'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=500&auto=format&fit=crop&q=80', // desserts
    'https://images.unsplash.com/photo-1605197150493-5473d09a27e7?w=500&auto=format&fit=crop&q=80', // sweet treat
  ],
  'cleaning-household': [
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80', // detergent
    'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?w=500&auto=format&fit=crop&q=80', // cleaner spray
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80', // wipes tissue
  ],
  'personal-care': [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80', // soap care
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80', // shampoo
    'https://images.unsplash.com/photo-1556228722-d0b5d034abfe?w=500&auto=format&fit=crop&q=80', // cream lotion
  ],
  'baby-pet': [
    'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80', // baby care
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80', // pet dog food
    'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&auto=format&fit=crop&q=80', // pet cat
  ]
};

// Precise 1-to-1 matching product image resolver to guarantee displayed image matches the product
export function getMatchingItemImage(name: string, category: string): string {
  const n = name.toLowerCase();

  // Fresh Vegetables & Fruits
  if (n.includes('tomato')) return 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80';
  if (n.includes('onion') || n.includes('pyaz')) return 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80';
  if ((n.includes('potato') || n.includes('aloo')) && !n.includes('tikki') && !n.includes('bhujia')) return 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80';
  if (n.includes('apple') && !n.includes('cereal')) return 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80';
  if (n.includes('banana')) return 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80';
  if (n.includes('pomegranate') || n.includes('anar')) return 'https://images.unsplash.com/photo-1541344999736-83eca872f241?w=500&auto=format&fit=crop&q=80';
  if (n.includes('coriander') || n.includes('kothmir') || n.includes('cilantro')) return 'https://images.unsplash.com/photo-1592417817098-8f3d69103831?w=500&auto=format&fit=crop&q=80';
  if (n.includes('palak') || n.includes('spinach')) return 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80';
  if (n.includes('capsicum') || n.includes('shimla mirch') || n.includes('bell pepper')) return 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=80';
  if (n.includes('cucumber')) return 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500&auto=format&fit=crop&q=80';
  if (n.includes('orange') || n.includes('valencia')) return 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&auto=format&fit=crop&q=80';
  if (n.includes('tender coconut with straw') || (n.includes('coconut') && !n.includes('water') && category === 'fruits-vegetables')) return 'https://images.unsplash.com/photo-1544378730-8b5104b18790?w=500&auto=format&fit=crop&q=80';
  if (n.includes('avocado')) return 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80';
  if (n.includes('mushroom')) return 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=500&auto=format&fit=crop&q=80';
  if (n.includes('sprout') || n.includes('salad bowl')) return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80';
  if (n.includes('cauliflower') || n.includes('gobhi')) return 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=500&auto=format&fit=crop&q=80';
  if (n.includes('ginger') && !n.includes('garlic')) return 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&auto=format&fit=crop&q=80';
  if (n.includes('green chillies') || n.includes('chilli') || n.includes('mirchi')) return 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80';
  if (n.includes('corn')) return 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&auto=format&fit=crop&q=80';

  // Dairy, Bread & Eggs
  if (n.includes('toned milk') || n.includes('cow milk') || (n.includes('milk') && !n.includes('chocolate') && !n.includes('cake') && !n.includes('shake') && !n.includes('flavored'))) return 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80';
  if (n.includes('pasteurised butter') || (n.includes('butter') && !n.includes('cookies') && !n.includes('peanut') && !n.includes('popcorn') && !n.includes('masala'))) return 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80';
  if (n.includes('paneer') && !n.includes('ready to eat')) return 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80';
  if (n.includes('dahi') || n.includes('curd') || n.includes('greek yogurt')) return 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=500&auto=format&fit=crop&q=80';
  if (n.includes('brown bread') || (n.includes('bread') && !n.includes('pav'))) return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80';
  if (n.includes('egg') && !n.includes('biscuit')) return 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format&fit=crop&q=80';
  if (n.includes('cheese') && !n.includes('nachos')) return 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&auto=format&fit=crop&q=80';
  if (n.includes('pav') || n.includes('bun')) return 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80';
  if (n.includes('ghee')) return 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=500&auto=format&fit=crop&q=80';
  if (n.includes('peanut butter')) return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80';
  if (n.includes('muesli')) return 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&auto=format&fit=crop&q=80';

  // Munchies & Snacks
  if (n.includes('chips') || n.includes('lay')) return 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80';
  if (n.includes('kurkure') || n.includes('munch')) return 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=500&auto=format&fit=crop&q=80';
  if (n.includes('bhujia') || n.includes('namkeen') || n.includes('mixture')) return 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80';
  if (n.includes('cookie') || n.includes('biscuit') || n.includes('bourbon') || n.includes('good day') || n.includes('hide & seek')) return 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=80';
  if (n.includes('nachos') || n.includes('doritos')) return 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&auto=format&fit=crop&q=80';
  if (n.includes('popcorn') || n.includes('act ii')) return 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=500&auto=format&fit=crop&q=80';
  if (n.includes('makhana') || n.includes('foxnuts')) return 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=500&auto=format&fit=crop&q=80';
  if (n.includes('moong dal') && category === 'munchies-snacks') return 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=80';

  // Cold Drinks & Juices
  if (n.includes('coca-cola') || n.includes('diet coke') || n.includes('cola')) return 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80';
  if (n.includes('thums up')) return 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop&q=80';
  if (n.includes('sprite')) return 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=80';
  if (n.includes('aamras') || n.includes('frooti') || (n.includes('mango') && (category === 'cold-drinks' || n.includes('juice')))) return 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500&auto=format&fit=crop&q=80';
  if (n.includes('juice') || n.includes('real fruit')) return 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=80';
  if (n.includes('red bull') || n.includes('energy drink')) return 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=500&auto=format&fit=crop&q=80';
  if (n.includes('coconut water') || (n.includes('tender coconut') && category === 'cold-drinks')) return 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=500&auto=format&fit=crop&q=80';
  if (n.includes('kool') || n.includes('flavored milk') || n.includes('shake')) return 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&auto=format&fit=crop&q=80';
  if (n.includes('mineral water') || n.includes('sparkling water')) return 'https://images.unsplash.com/photo-1559839914-1b396e6dd86f?w=500&auto=format&fit=crop&q=80';

  // Instant & Frozen
  if (n.includes('noodle') || n.includes('maggi') || n.includes('hakka')) return 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80';
  if (n.includes('fries') || n.includes('french fries')) return 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=80';
  if (n.includes('tikki') || n.includes('patty')) return 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80';
  if (n.includes('pasta') || n.includes('penne')) return 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=80';
  if (n.includes('paneer butter masala') || n.includes('curry') || n.includes('ready to eat')) return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=80';
  if (n.includes('parotta') || n.includes('paratha')) return 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80';
  if (n.includes('momo') || n.includes('momos')) return 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80';
  if (n.includes('idli') || n.includes('dosa')) return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80';

  // Tea, Coffee & Drinks
  if (n.includes('tea') || n.includes('chai')) return 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=80';
  if (n.includes('coffee') || n.includes('nescafe') || n.includes('bru')) return 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80';
  if (n.includes('bournvita') || n.includes('horlicks') || n.includes('malt')) return 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&auto=format&fit=crop&q=80';

  // Atta, Rice & Dals
  if (n.includes('atta') || n.includes('flour') || n.includes('aashirvaad')) return 'https://images.unsplash.com/photo-1574316071802-0d684efa7cd5?w=500&auto=format&fit=crop&q=80';
  if (n.includes('rice') || n.includes('basmati')) return 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80';
  if (n.includes('oil') || n.includes('sunflower') || n.includes('mustard')) return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80';
  if (n.includes('dal') || n.includes('toor') || n.includes('moong')) return 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80';
  if (n.includes('poha')) return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80';

  // Masalas & Dry Fruits
  if (n.includes('salt') || n.includes('namak')) return 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=500&auto=format&fit=crop&q=80';
  if (n.includes('kashmiri mirch') || n.includes('chili powder') || n.includes('powdered spices')) return 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80';
  if (n.includes('haldi') || n.includes('turmeric')) return 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80';
  if (n.includes('almond') || n.includes('badam')) return 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=500&auto=format&fit=crop&q=80';
  if (n.includes('cashew') || n.includes('kaju')) return 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=80';
  if (n.includes('cardamom') || n.includes('elaichi')) return 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=80';
  if (n.includes('raisin') || n.includes('kishmish')) return 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=80';
  if (n.includes('walnut') || n.includes('akhrot')) return 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=80';
  if (n.includes('chia') || n.includes('flax')) return 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=500&auto=format&fit=crop&q=80';
  if (n.includes('paste') || n.includes('masala')) return 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80';

  // Sweet Tooth & Desserts
  if (n.includes('dairy milk') || n.includes('chocolate') || n.includes('kitkat')) return 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&auto=format&fit=crop&q=80';
  if (n.includes('ice cream')) return 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=80';
  if (n.includes('gulab jamun')) return 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=500&auto=format&fit=crop&q=80';
  if (n.includes('rasgulla')) return 'https://images.unsplash.com/photo-1605197150493-5473d09a27e7?w=500&auto=format&fit=crop&q=80';
  if (n.includes('cake') || n.includes('lava')) return 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80';
  if (n.includes('kulfi')) return 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&auto=format&fit=crop&q=80';
  if (n.includes('nutella') || n.includes('spread')) return 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=500&auto=format&fit=crop&q=80';

  // Cleaning & Household
  if (n.includes('detergent') || n.includes('surf excel')) return 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80';
  if (n.includes('dishwash') || n.includes('vim')) return 'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?w=500&auto=format&fit=crop&q=80';
  if (n.includes('cleaner') || n.includes('lizol') || n.includes('harpic') || n.includes('colin')) return 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&auto=format&fit=crop&q=80';
  if (n.includes('garbage bag') || n.includes('bags')) return 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=80';
  if (n.includes('towel') || n.includes('tissue') || n.includes('wipe')) return 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80';
  if (n.includes('freshener') || n.includes('aer')) return 'https://images.unsplash.com/photo-1617897903246-719242758050?w=500&auto=format&fit=crop&q=80';

  // Personal Care & Hygiene
  if (n.includes('soap') || n.includes('dettol')) return 'https://images.unsplash.com/photo-1607006314175-680c80521ce6?w=500&auto=format&fit=crop&q=80';
  if (n.includes('body wash') || n.includes('dove')) return 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80';
  if (n.includes('shampoo')) return 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80';
  if (n.includes('toothpaste') || n.includes('colgate') || n.includes('sensodyne')) return 'https://images.unsplash.com/photo-1559591937-e1022830f30d?w=500&auto=format&fit=crop&q=80';
  if (n.includes('face wash')) return 'https://images.unsplash.com/photo-1556228722-d0b5d034abfe?w=500&auto=format&fit=crop&q=80';
  if (n.includes('sunscreen')) return 'https://images.unsplash.com/photo-1556228724-5425ee965355?w=500&auto=format&fit=crop&q=80';
  if (n.includes('deodorant') || n.includes('axe') || n.includes('perfume')) return 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop&q=80';
  if (n.includes('sanitizer')) return 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&auto=format&fit=crop&q=80';

  // Baby & Pet
  if (n.includes('diaper') || n.includes('pampers')) return 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80';
  if (n.includes('baby wipe')) return 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80';
  if (n.includes('baby cereal') || n.includes('cerelac')) return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80';
  if (n.includes('dog food') || n.includes('pedigree')) return 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=80';
  if (n.includes('cat food') || n.includes('whiskas')) return 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&auto=format&fit=crop&q=80';
  if (n.includes('chew') || n.includes('dog biscuits')) return 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80';
  if (n.includes('baby massage oil') || n.includes('baby oil')) return 'https://images.unsplash.com/photo-1608248597359-58b211a7dc24?w=500&auto=format&fit=crop&q=80';

  // Category fallbacks
  const defaults: Record<string, string> = {
    'fruits-vegetables': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=80',
    'dairy-breakfast': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
    'munchies-snacks': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80',
    'cold-drinks': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80',
    'instant-food': 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80',
    'tea-coffee': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=80',
    'atta-rice-dals': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
    'masalas-dryfruits': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
    'sweets-icecream': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=80',
    'cleaning-household': 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80',
    'personal-care': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80',
    'baby-pet': 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=80'
  };

  return defaults[category] || defaults['fruits-vegetables'];
}

export const CATEGORIES: Category[] = [
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    icon: 'Apple',
    itemCount: 95,
    subCategories: ['Fresh Fruits', 'Fresh Vegetables', 'Exotic & Organic', 'Leafy Greens & Herbs', 'Cut & Sprouts'],
    bannerImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80',
    accentColor: '#16a34a',
  },
  {
    id: 'dairy-breakfast',
    name: 'Dairy, Bread & Eggs',
    icon: 'Milk',
    itemCount: 92,
    subCategories: ['Milk & Cream', 'Curd & Paneer', 'Butter & Cheese', 'Eggs', 'Breads & Pav'],
    bannerImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
    accentColor: '#0284c7',
  },
  {
    id: 'munchies-snacks',
    name: 'Snacks & Munchies',
    icon: 'Cookie',
    itemCount: 98,
    subCategories: ['Chips & Crisps', 'Namkeen & Bhujia', 'Biscuits & Cookies', 'Popcorn & Nachos', 'Roasted Snacks'],
    bannerImage: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80',
    accentColor: '#ea580c',
  },
  {
    id: 'cold-drinks',
    name: 'Cold Drinks & Juices',
    icon: 'CupSoda',
    itemCount: 88,
    subCategories: ['Soft Drinks & Soda', 'Fresh & Packaged Juices', 'Energy Drinks', 'Flavored Milk & Shakes', 'Tender Coconut'],
    bannerImage: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80',
    accentColor: '#0d9488',
  },
  {
    id: 'instant-food',
    name: 'Instant & Frozen Food',
    icon: 'Flame',
    itemCount: 90,
    subCategories: ['Instant Noodles', 'Pasta & Vermicelli', 'Ready-to-Eat Meals', 'Frozen Snacks & Fries', 'Parathas & Momos'],
    bannerImage: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80',
    accentColor: '#dc2626',
  },
  {
    id: 'tea-coffee',
    name: 'Tea, Coffee & Drinks',
    icon: 'Coffee',
    itemCount: 86,
    subCategories: ['Chai Leaf & Dust', 'Green & Herbal Tea', 'Instant Coffee', 'Filter Coffee Powders', 'Health & Malt Drinks'],
    bannerImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
    accentColor: '#b45309',
  },
  {
    id: 'atta-rice-dals',
    name: 'Atta, Rice & Dals',
    icon: 'Wheat',
    itemCount: 94,
    subCategories: ['Chakki Atta & Grains', 'Basmati & Sona Masoori Rice', 'Toor, Moong & Chana Dal', 'Cooking Oils & Pure Ghee', 'Poha, Suji & Maida'],
    bannerImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    accentColor: '#ca8a04',
  },
  {
    id: 'masalas-dryfruits',
    name: 'Masalas & Dry Fruits',
    icon: 'Sparkles',
    itemCount: 92,
    subCategories: ['Powdered Spices', 'Whole Garam Masalas', 'Almonds & Cashews', 'Raisins & Walnuts', 'Ginger Garlic Pastes'],
    bannerImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    accentColor: '#c2410c',
  },
  {
    id: 'sweets-icecream',
    name: 'Sweet Tooth & Desserts',
    icon: 'Candy',
    itemCount: 88,
    subCategories: ['Chocolates & Candies', 'Ice Cream Tubs & Sticks', 'Indian Traditional Sweets', 'Cakes & Pastries', 'Dessert Mixes'],
    bannerImage: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80',
    accentColor: '#db2777',
  },
  {
    id: 'cleaning-household',
    name: 'Cleaning & Household',
    icon: 'Sparkle',
    itemCount: 88,
    subCategories: ['Detergent Powders & Liquids', 'Dishwashing Gels & Bars', 'Floor & Toilet Cleaners', 'Tissues & Wet Wipes', 'Room Fresheners'],
    bannerImage: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&auto=format&fit=crop&q=80',
    accentColor: '#2563eb',
  },
  {
    id: 'personal-care',
    name: 'Personal Care & Hygiene',
    icon: 'Heart',
    itemCount: 90,
    subCategories: ['Bath Soaps & Body Wash', 'Shampoos & Conditioners', 'Toothpaste & Brushes', 'Face Wash & Sunscreen', 'Deodorants & Perfumes'],
    bannerImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    accentColor: '#9333ea',
  },
  {
    id: 'baby-pet',
    name: 'Baby & Pet Supplies',
    icon: 'Smile',
    itemCount: 82,
    subCategories: ['Diapers & Rash Creams', 'Baby Wipes & Cleansers', 'Baby Food & Cereal', 'Dog Food & Chew Bones', 'Cat Food & Treats'],
    bannerImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
    accentColor: '#059669',
  }
];

export const SAVED_LOCATIONS: DeliveryLocation[] = [
  {
    id: 'loc-1',
    tag: 'Home',
    label: 'Home - Green Glen Layout',
    address: 'Flat 402, Oakwood Greens, 4th Cross, Green Glen Layout, Bellandur',
    city: 'Bengaluru',
    pincode: '560103',
    eta: '9 mins',
    isDefault: true,
  },
  {
    id: 'loc-2',
    tag: 'Work',
    label: 'Work - Ecospace Tech Park',
    address: 'Block 2B, 3rd Floor, RMZ Ecospace, Outer Ring Road, Bellandur',
    city: 'Bengaluru',
    pincode: '560103',
    eta: '12 mins',
  },
  {
    id: 'loc-3',
    tag: 'Other',
    label: 'Parents - Indiranagar',
    address: 'House 812, 12th Main, 4th Cross, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    eta: '14 mins',
  },
  {
    id: 'loc-4',
    tag: 'Other',
    label: 'Friend - HSR Sector 2',
    address: 'Villa 45, 27th Main Rd, Sector 2, HSR Layout',
    city: 'Bengaluru',
    pincode: '560102',
    eta: '8 mins',
  }
];

export const POPULAR_CITIES = [
  'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Chandigarh', 'Jaipur'
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'INSTA50',
    description: 'Flat ₹50 OFF on orders above ₹299',
    discountType: 'flat',
    discountValue: 50,
    minOrder: 299,
  },
  {
    code: 'FREEDEL',
    description: 'Free Instant Delivery on orders above ₹199',
    discountType: 'flat',
    discountValue: 25,
    minOrder: 199,
  },
  {
    code: 'SUPER20',
    description: '20% OFF up to ₹100 on groceries',
    discountType: 'percentage',
    discountValue: 20,
    minOrder: 499,
    maxDiscount: 100,
  }
];

// Base items across categories with realistic Indian grocery items, brands, and variations
interface BaseItemDef {
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  basePrice: number;
  packSizeOptions: string[];
  isVeg: boolean;
  isOrganic?: boolean;
}

const BASE_ITEM_TEMPLATES: BaseItemDef[] = [
  // Fruits & Vegetables
  { name: 'Fresh Hybrid Tomato', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Vegetables', basePrice: 38, packSizeOptions: ['500 g', '1 kg', '2 kg'], isVeg: true },
  { name: 'Farm Onion / Pyaz', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Vegetables', basePrice: 42, packSizeOptions: ['1 kg', '2 kg', '5 kg'], isVeg: true },
  { name: 'New Crop Potato / Aloo', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Vegetables', basePrice: 34, packSizeOptions: ['1 kg', '2 kg', '3 kg'], isVeg: true },
  { name: 'Shimla Apple Royal Gala', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Fruits', basePrice: 145, packSizeOptions: ['4 pcs (500g)', '8 pcs (1kg)', 'Pack of 2kg'], isVeg: true },
  { name: 'Robusta Banana Box', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Fruits', basePrice: 48, packSizeOptions: ['500 g (3-4 pcs)', '1 kg (6-7 pcs)'], isVeg: true },
  { name: 'Pomegranate / Anar Peeled & Packed', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Cut & Sprouts', basePrice: 110, packSizeOptions: ['200 g', '400 g'], isVeg: true },
  { name: 'Fresh Coriander / Kothmir', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Leafy Greens & Herbs', basePrice: 16, packSizeOptions: ['100 g bunch', '250 g bunch'], isVeg: true },
  { name: 'Fresh Palak / Spinach Bunch', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Leafy Greens & Herbs', basePrice: 24, packSizeOptions: ['250 g', '500 g'], isVeg: true },
  { name: 'Green Capsicum / Shimla Mirch', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Vegetables', basePrice: 46, packSizeOptions: ['250 g', '500 g'], isVeg: true },
  { name: 'Crisp English Cucumber', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Vegetables', basePrice: 28, packSizeOptions: ['500 g', '1 kg'], isVeg: true },
  { name: 'Imported Sweet Orange / Valencia', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Fruits', basePrice: 95, packSizeOptions: ['3 pcs', '6 pcs'], isVeg: true },
  { name: 'Tender Coconut with Straw', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Fruits', basePrice: 62, packSizeOptions: ['1 pc', '2 pcs Pack'], isVeg: true },
  { name: 'Organic Hass Avocado', brand: 'Organic India', category: 'fruits-vegetables', subCategory: 'Exotic & Organic', basePrice: 175, packSizeOptions: ['1 pc (200g)', '2 pcs Pack'], isVeg: true, isOrganic: true },
  { name: 'Button White Mushroom', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Exotic & Organic', basePrice: 58, packSizeOptions: ['200 g pack', 'Pack of 2'], isVeg: true },
  { name: 'Mixed Sprouts Healthy Salad Bowl', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Cut & Sprouts', basePrice: 45, packSizeOptions: ['200 g pack', '400 g pack'], isVeg: true },
  { name: 'Fresh Cauliflower / Gobhi', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Vegetables', basePrice: 38, packSizeOptions: ['1 pc (400-600g)', 'Pack of 2 pcs'], isVeg: true },
  { name: 'Fresh Ginger / Adrak', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Vegetables', basePrice: 32, packSizeOptions: ['100 g', '250 g', '500 g'], isVeg: true },
  { name: 'Spicy Green Chillies', brand: 'Fresho', category: 'fruits-vegetables', subCategory: 'Fresh Vegetables', basePrice: 18, packSizeOptions: ['100 g', '250 g'], isVeg: true },

  // Dairy, Bread & Eggs
  { name: 'Taaza Homogenised Toned Milk', brand: 'Amul', category: 'dairy-breakfast', subCategory: 'Milk & Cream', basePrice: 28, packSizeOptions: ['500 ml', '1 L Pouch', 'Pack of 2 (1L)'], isVeg: true },
  { name: 'Pasteurised Butter', brand: 'Amul', category: 'dairy-breakfast', subCategory: 'Butter & Cheese', basePrice: 56, packSizeOptions: ['100 g', '500 g Block'], isVeg: true },
  { name: 'Fresh Malai Paneer Block', brand: 'Amul', category: 'dairy-breakfast', subCategory: 'Curd & Paneer', basePrice: 92, packSizeOptions: ['200 g', '400 g Pack'], isVeg: true },
  { name: 'Masti Dahi / Thick Curd Pouch', brand: 'Amul', category: 'dairy-breakfast', subCategory: 'Curd & Paneer', basePrice: 35, packSizeOptions: ['400 g', '1 kg Tub'], isVeg: true },
  { name: '100% Whole Wheat Brown Bread', brand: 'Britannia', category: 'dairy-breakfast', subCategory: 'Breads & Pav', basePrice: 48, packSizeOptions: ['400 g Loaf', 'Pack of 2'], isVeg: true },
  { name: 'Farm Fresh White Eggs', brand: 'Eggoz', category: 'dairy-breakfast', subCategory: 'Eggs', basePrice: 68, packSizeOptions: ['6 pcs Pack', '12 pcs Tray', '30 pcs Crate'], isVeg: false },
  { name: 'Special Cow Milk', brand: 'Nandini', category: 'dairy-breakfast', subCategory: 'Milk & Cream', basePrice: 26, packSizeOptions: ['500 ml', '1 L Pouch'], isVeg: true },
  { name: 'Processed Cheese Slices', brand: 'Amul', category: 'dairy-breakfast', subCategory: 'Butter & Cheese', basePrice: 135, packSizeOptions: ['10 Slices (200g)', '20 Slices (400g)'], isVeg: true },
  { name: 'Fresh Artisanal Bombay Pav', brand: 'The Baker\'s Dozen', category: 'dairy-breakfast', subCategory: 'Breads & Pav', basePrice: 42, packSizeOptions: ['6 pcs Pack', '12 pcs Pack'], isVeg: true },
  { name: 'Organic Brown Eggs with Omega-3', brand: 'Eggoz', category: 'dairy-breakfast', subCategory: 'Eggs', basePrice: 110, packSizeOptions: ['6 pcs Pack', '10 pcs Pack'], isVeg: false, isOrganic: true },
  { name: 'Greek Yogurt Blueberry / Mango', brand: 'Epigamia', category: 'dairy-breakfast', subCategory: 'Curd & Paneer', basePrice: 55, packSizeOptions: ['90 g Cup', 'Pack of 4'], isVeg: true },
  { name: 'Pure Cow Milk Ghee', brand: 'Amul', category: 'dairy-breakfast', subCategory: 'Butter & Cheese', basePrice: 310, packSizeOptions: ['500 ml Jar', '1 L Tin'], isVeg: true },

  // Snacks & Munchies
  { name: 'Magic Masala Potato Chips', brand: 'Lay\'s', category: 'munchies-snacks', subCategory: 'Chips & Crisps', basePrice: 20, packSizeOptions: ['48 g Pouch', '90 g Party Pack', '135 g Mega Pack'], isVeg: true },
  { name: 'Classic Salted Wavy Chips', brand: 'Lay\'s', category: 'munchies-snacks', subCategory: 'Chips & Crisps', basePrice: 20, packSizeOptions: ['50 g', '95 g Party Pack'], isVeg: true },
  { name: 'Masala Munch Crunchy', brand: 'Kurkure', category: 'munchies-snacks', subCategory: 'Chips & Crisps', basePrice: 20, packSizeOptions: ['75 g Pouch', '130 g Big Bag'], isVeg: true },
  { name: 'Aloo Bhujia Spicy Namkeen', brand: 'Haldiram\'s', category: 'munchies-snacks', subCategory: 'Namkeen & Bhujia', basePrice: 48, packSizeOptions: ['150 g', '350 g Pack', '1 kg Family Saver'], isVeg: true },
  { name: 'Good Day Butter Cookies', brand: 'Britannia', category: 'munchies-snacks', subCategory: 'Biscuits & Cookies', basePrice: 35, packSizeOptions: ['120 g', '240 g Value Pack'], isVeg: true },
  { name: 'Bourbon Chocolate Cream Biscuits', brand: 'Britannia', category: 'munchies-snacks', subCategory: 'Biscuits & Cookies', basePrice: 30, packSizeOptions: ['150 g', '300 g Buy 1 Get 1'], isVeg: true },
  { name: 'Cheese & Jalapeno Nachos', brand: 'Doritos', category: 'munchies-snacks', subCategory: 'Popcorn & Nachos', basePrice: 50, packSizeOptions: ['78 g', '140 g Big Bag'], isVeg: true },
  { name: 'Butter Popcorn Microwave Pack', brand: 'Act II', category: 'munchies-snacks', subCategory: 'Popcorn & Nachos', basePrice: 38, packSizeOptions: ['80 g Pack', '3-Pack Bundle'], isVeg: true },
  { name: 'Moong Dal Crispy Salted', brand: 'Haldiram\'s', category: 'munchies-snacks', subCategory: 'Namkeen & Bhujia', basePrice: 45, packSizeOptions: ['200 g', '400 g Pack'], isVeg: true },
  { name: 'Roasted Salted Makhana / Foxnuts', brand: 'Farmley', category: 'munchies-snacks', subCategory: 'Roasted Snacks', basePrice: 99, packSizeOptions: ['100 g Pouch', '200 g Saver'], isVeg: true },
  { name: 'Hide & Seek Chocolate Chip Biscuits', brand: 'Parle', category: 'munchies-snacks', subCategory: 'Biscuits & Cookies', basePrice: 40, packSizeOptions: ['120 g', '300 g Pack'], isVeg: true },
  { name: 'Khatta Meetha Mixture', brand: 'Bikano', category: 'munchies-snacks', subCategory: 'Namkeen & Bhujia', basePrice: 52, packSizeOptions: ['200 g', '400 g Pack'], isVeg: true },

  // Cold Drinks & Juices
  { name: 'Original Coca-Cola Can', brand: 'Coca-Cola', category: 'cold-drinks', subCategory: 'Soft Drinks & Soda', basePrice: 40, packSizeOptions: ['300 ml Can', '750 ml Bottle', 'Pack of 6 Cans'], isVeg: true },
  { name: 'Charged Thums Up Bottle', brand: 'Thums Up', category: 'cold-drinks', subCategory: 'Soft Drinks & Soda', basePrice: 40, packSizeOptions: ['750 ml Bottle', '2 L Party Bottle'], isVeg: true },
  { name: 'Sprite Clear Lime Soft Drink', brand: 'Sprite', category: 'cold-drinks', subCategory: 'Soft Drinks & Soda', basePrice: 40, packSizeOptions: ['750 ml Bottle', 'Pack of 2 (750ml)'], isVeg: true },
  { name: 'Aamras Mango Drink Pouch', brand: 'Paper Boat', category: 'cold-drinks', subCategory: 'Fresh & Packaged Juices', basePrice: 35, packSizeOptions: ['250 ml Pouch', 'Pack of 4 (250ml)'], isVeg: true },
  { name: '100% Pomegranate & Orange Juice', brand: 'Real Fruit Power', category: 'cold-drinks', subCategory: 'Fresh & Packaged Juices', basePrice: 120, packSizeOptions: ['1 L Tetra Pack', 'Pack of 2 (1L)'], isVeg: true },
  { name: 'Red Bull Energy Drink', brand: 'Red Bull', category: 'cold-drinks', subCategory: 'Energy Drinks', basePrice: 125, packSizeOptions: ['250 ml Can', '4-Can Multipack'], isVeg: true },
  { name: 'Tender Coconut Water 100% Pure', brand: 'Raw Pressery', category: 'cold-drinks', subCategory: 'Tender Coconut', basePrice: 65, packSizeOptions: ['200 ml Bottle', 'Pack of 6'], isVeg: true },
  { name: 'Kool Flavored Milk (Kesar Pista / Badam)', brand: 'Amul', category: 'cold-drinks', subCategory: 'Flavored Milk & Shakes', basePrice: 32, packSizeOptions: ['180 ml Can', 'Pack of 4 Cans'], isVeg: true },
  { name: 'Diet Coke Sugar-Free Can', brand: 'Coca-Cola', category: 'cold-drinks', subCategory: 'Soft Drinks & Soda', basePrice: 45, packSizeOptions: ['300 ml Can', 'Pack of 6 Cans'], isVeg: true },
  { name: 'Frooti Fresh ' + 'Mango Juice', brand: 'Parle Agro', category: 'cold-drinks', subCategory: 'Fresh & Packaged Juices', basePrice: 20, packSizeOptions: ['160 ml Tetra', '1.2 L Bottle'], isVeg: true },

  // Instant & Frozen Food
  { name: '2-Minute Masala Instant Noodles', brand: 'Maggi', category: 'instant-food', subCategory: 'Instant Noodles', basePrice: 56, packSizeOptions: ['Pack of 4 (280g)', 'Pack of 8 (560g)', 'Pack of 12 Special'], isVeg: true },
  { name: 'Schezwan Hakka Noodles', brand: 'Ching\'s Secret', category: 'instant-food', subCategory: 'Instant Noodles', basePrice: 42, packSizeOptions: ['150 g', '300 g 2-Pack'], isVeg: true },
  { name: 'Classic Crispy French Fries', brand: 'McCain', category: 'instant-food', subCategory: 'Frozen Snacks & Fries', basePrice: 115, packSizeOptions: ['420 g Pack', '750 g Family Pack'], isVeg: true },
  { name: 'Aloo Tikki Crunchy Patty', brand: 'McCain', category: 'instant-food', subCategory: 'Frozen Snacks & Fries', basePrice: 125, packSizeOptions: ['400 g (12 pcs)', '750 g Saver'], isVeg: true },
  { name: 'Magic Masala Veg Atta Noodles', brand: 'Maggi', category: 'instant-food', subCategory: 'Instant Noodles', basePrice: 95, packSizeOptions: ['Pack of 4 (290g)', 'Pack of 8'], isVeg: true },
  { name: 'Penne Durum Wheat Pasta', brand: 'Borges', category: 'instant-food', subCategory: 'Pasta & Vermicelli', basePrice: 85, packSizeOptions: ['500 g Pack', '1 kg Pack'], isVeg: true },
  { name: 'Paneer Butter Masala Ready to Eat', brand: 'MTR', category: 'instant-food', subCategory: 'Ready-to-Eat Meals', basePrice: 110, packSizeOptions: ['300 g Pack', 'Pack of 2'], isVeg: true },
  { name: 'Malabar Parotta Frozen', brand: 'iD Fresh', category: 'instant-food', subCategory: 'Parathas & Momos', basePrice: 85, packSizeOptions: ['5 pcs (400g)', '10 pcs Mega Pack'], isVeg: true },
  { name: 'Steamed Veg Momos with Dip', brand: 'Prasuma', category: 'instant-food', subCategory: 'Parathas & Momos', basePrice: 175, packSizeOptions: ['10 pcs Pack', '20 pcs Pack'], isVeg: true },
  { name: 'Rava Idli Instant Mix', brand: 'MTR', category: 'instant-food', subCategory: 'Ready-to-Eat Meals', basePrice: 75, packSizeOptions: ['500 g', '1 kg Pack'], isVeg: true },

  // Tea, Coffee & Drinks
  { name: 'Gold Premium Tea Leaf', brand: 'Tata Tea', category: 'tea-coffee', subCategory: 'Chai Leaf & Dust', basePrice: 165, packSizeOptions: ['250 g', '500 g Pack', '1 kg Saver'], isVeg: true },
  { name: 'Classic 100% Pure Instant Coffee', brand: 'Nescafe', category: 'tea-coffee', subCategory: 'Instant Coffee', basePrice: 185, packSizeOptions: ['50 g Jar', '100 g Jar', '200 g Jar'], isVeg: true },
  { name: 'Original Filter Coffee Powder', brand: 'Bru Green Label', category: 'tea-coffee', subCategory: 'Filter Coffee Powders', basePrice: 98, packSizeOptions: ['200 g', '500 g Pack'], isVeg: true },
  { name: 'Pure Green Tea Bags Mint & Honey', brand: 'Tetley', category: 'tea-coffee', subCategory: 'Green & Herbal Tea', basePrice: 145, packSizeOptions: ['25 Tea Bags', '50 Tea Bags Pack'], isVeg: true },
  { name: 'Red Label Natural Care Chai', brand: 'Brooke Bond', category: 'tea-coffee', subCategory: 'Chai Leaf & Dust', basePrice: 175, packSizeOptions: ['250 g', '500 g Box', '1 kg Pack'], isVeg: true },
  { name: 'Nutritious Malt Health Drink', brand: 'Bournvita', category: 'tea-coffee', subCategory: 'Health & Malt Drinks', basePrice: 220, packSizeOptions: ['500 g Jar', '1 kg Refill Pack'], isVeg: true },
  { name: 'Classic Chocolate Horlicks', brand: 'Horlicks', category: 'tea-coffee', subCategory: 'Health & Malt Drinks', basePrice: 240, packSizeOptions: ['500 g', '1 kg Jar'], isVeg: true },
  { name: 'Sunrise Instant Chicory Coffee', brand: 'Nescafe', category: 'tea-coffee', subCategory: 'Instant Coffee', basePrice: 115, packSizeOptions: ['100 g Pouch', '200 g Pouch'], isVeg: true },

  // Atta, Rice & Dals
  { name: 'Shudh Chakki 100% Whole Wheat Atta', brand: 'Aashirvaad', category: 'atta-rice-dals', subCategory: 'Chakki Atta & Grains', basePrice: 245, packSizeOptions: ['5 kg Bag', '10 kg Saver Bag'], isVeg: true },
  { name: 'Rozana Super Basmati Rice', brand: 'India Gate', category: 'atta-rice-dals', subCategory: 'Basmati & Sona Masoori Rice', basePrice: 395, packSizeOptions: ['5 kg Bag', '10 kg Bag'], isVeg: true },
  { name: 'Sunlite Refined Sunflower Oil', brand: 'Fortune', category: 'atta-rice-dals', subCategory: 'Cooking Oils & Pure Ghee', basePrice: 135, packSizeOptions: ['1 L Pouch', '5 L Canister'], isVeg: true },
  { name: 'Unpolished Toor Dal High Protein', brand: 'Tata Sampann', category: 'atta-rice-dals', subCategory: 'Toor, Moong & Chana Dal', basePrice: 165, packSizeOptions: ['500 g', '1 kg Pack', '2 kg Pack'], isVeg: true },
  { name: 'Gold Pure Kachi Ghani Mustard Oil', brand: 'Fortune', category: 'atta-rice-dals', subCategory: 'Cooking Oils & Pure Ghee', basePrice: 145, packSizeOptions: ['1 L Bottle', '5 L Canister'], isVeg: true },
  { name: 'Organic Moong Dal Washed', brand: 'Organic India', category: 'atta-rice-dals', subCategory: 'Toor, Moong & Chana Dal', basePrice: 155, packSizeOptions: ['500 g', '1 kg Pack'], isVeg: true, isOrganic: true },
  { name: 'Thick Poha / Beaten Rice', brand: 'Tata Sampann', category: 'atta-rice-dals', subCategory: 'Poha, Suji & Maida', basePrice: 55, packSizeOptions: ['500 g', '1 kg Pack'], isVeg: true },
  { name: 'Pure Vedic Cow Bilona Ghee', brand: 'Anveshan', category: 'atta-rice-dals', subCategory: 'Cooking Oils & Pure Ghee', basePrice: 650, packSizeOptions: ['500 ml Glass Jar', '1 L Jar'], isVeg: true, isOrganic: true },
  { name: 'Select Premium Basmati Rice', brand: 'Aashirvaad', category: 'atta-rice-dals', subCategory: 'Basmati & Sona Masoori Rice', basePrice: 145, packSizeOptions: ['1 kg Pouch', '5 kg Bag'], isVeg: true },

  // Masalas & Dry Fruits
  { name: 'Iodised Pure Crystal Salt', brand: 'Tata Salt', category: 'masalas-dryfruits', subCategory: 'Powdered Spices', basePrice: 28, packSizeOptions: ['1 kg Pouch', 'Pack of 2 (1kg)'], isVeg: true },
  { name: 'Kashmiri Mirch Powder', brand: 'Everest', category: 'masalas-dryfruits', subCategory: 'Powdered Spices', basePrice: 78, packSizeOptions: ['100 g Box', '200 g Box'], isVeg: true },
  { name: 'Turmeric / Haldi Powder Organic', brand: 'Tata Sampann', category: 'masalas-dryfruits', subCategory: 'Powdered Spices', basePrice: 48, packSizeOptions: ['100 g', '200 g Pack'], isVeg: true },
  { name: 'California Crunchy Almonds Badam', brand: 'Happilo', category: 'masalas-dryfruits', subCategory: 'Almonds & Cashews', basePrice: 235, packSizeOptions: ['200 g Pouch', '500 g Value Pack', '1 kg Mega'], isVeg: true },
  { name: 'Whole Cashews Kaju W320', brand: 'Happilo', category: 'masalas-dryfruits', subCategory: 'Almonds & Cashews', basePrice: 260, packSizeOptions: ['200 g Pouch', '500 g Value Pack'], isVeg: true },
  { name: 'Green Cardamom / Elaichi Whole', brand: 'Catch', category: 'masalas-dryfruits', subCategory: 'Whole Garam Masalas', basePrice: 195, packSizeOptions: ['50 g Pack', '100 g Pack'], isVeg: true },
  { name: 'Golden Raisins / Kishmish Seedless', brand: 'Farmley', category: 'masalas-dryfruits', subCategory: 'Raisins & Walnuts', basePrice: 120, packSizeOptions: ['250 g Pouch', '500 g Pack'], isVeg: true },
  { name: 'Ginger Garlic Homestyle Paste', brand: 'Smith & Jones', category: 'masalas-dryfruits', subCategory: 'Ginger Garlic Pastes', basePrice: 45, packSizeOptions: ['200 g Pouch', '400 g Tub'], isVeg: true },
  { name: 'Chana Masala Spice Blend', brand: 'MDH', category: 'masalas-dryfruits', subCategory: 'Powdered Spices', basePrice: 65, packSizeOptions: ['100 g Box', '200 g Box'], isVeg: true },
  { name: 'Chilean Walnut Kernels Akhrot', brand: 'Nutraj', category: 'masalas-dryfruits', subCategory: 'Raisins & Walnuts', basePrice: 320, packSizeOptions: ['250 g Pouch', '500 g Pack'], isVeg: true },

  // Sweet Tooth & Desserts
  { name: 'Dairy Milk Silk Chocolate Bar', brand: 'Cadbury', category: 'sweets-icecream', subCategory: 'Chocolates & Candies', basePrice: 85, packSizeOptions: ['60 g Bar', '150 g Large Bar'], isVeg: true },
  { name: 'Crispy KitKat 4-Finger', brand: 'Nestle', category: 'sweets-icecream', subCategory: 'Chocolates & Candies', basePrice: 30, packSizeOptions: ['38 g Pack', 'Pack of 3 Bars'], isVeg: true },
  { name: 'Belgian Chocolate Ice Cream Tub', brand: 'Amul Epic', category: 'sweets-icecream', subCategory: 'Ice Cream Tubs & Sticks', basePrice: 240, packSizeOptions: ['500 ml Tub', '1 L Family Tub'], isVeg: true },
  { name: 'Shahi Gulab Jamun Tin', brand: 'Haldiram\'s', category: 'sweets-icecream', subCategory: 'Indian Traditional Sweets', basePrice: 195, packSizeOptions: ['500 g Tin', '1 kg Festive Tin'], isVeg: true },
  { name: 'Soft Rasgulla in Sugar Syrup', brand: 'Haldiram\'s', category: 'sweets-icecream', subCategory: 'Indian Traditional Sweets', basePrice: 185, packSizeOptions: ['500 g Tin', '1 kg Tin'], isVeg: true },
  { name: 'Choco Lava Cake Rich Fondant', brand: 'The Belgian Waffle Co.', category: 'sweets-icecream', subCategory: 'Cakes & Pastries', basePrice: 99, packSizeOptions: ['1 pc (90g)', 'Pack of 2 pcs'], isVeg: true },
  { name: 'Alphonso Mango Kulfi Stick', brand: 'Kwality Wall\'s', category: 'sweets-icecream', subCategory: 'Ice Cream Tubs & Sticks', basePrice: 45, packSizeOptions: ['1 stick (60ml)', '4 sticks Multi-pack'], isVeg: true },
  { name: 'Hazelnut Chocolate Spread', brand: 'Nutella', category: 'sweets-icecream', subCategory: 'Dessert Mixes', basePrice: 350, packSizeOptions: ['350 g Jar', '750 g Family Jar'], isVeg: true },

  // Cleaning & Household
  { name: 'Matic Top Load Laundry Detergent', brand: 'Surf Excel', category: 'cleaning-household', subCategory: 'Detergent Powders & Liquids', basePrice: 225, packSizeOptions: ['1 kg Pouch', '2 kg Pack with Free Liquid', '4 kg Saver Box'], isVeg: true },
  { name: 'Dishwash Gel with Lemon Refresh', brand: 'Vim', category: 'cleaning-household', subCategory: 'Dishwashing Gels & Bars', basePrice: 105, packSizeOptions: ['500 ml Bottle', '750 ml Pouch', '1.5 L Mega Refill'], isVeg: true },
  { name: 'Disinfectant Surface Cleaner Citrus', brand: 'Lizol', category: 'cleaning-household', subCategory: 'Floor & Toilet Cleaners', basePrice: 120, packSizeOptions: ['500 ml Bottle', '1 L Bottle', '2 L Pack'], isVeg: true },
  { name: 'Power Plus Toilet Cleaner', brand: 'Harpic', category: 'cleaning-household', subCategory: 'Floor & Toilet Cleaners', basePrice: 95, packSizeOptions: ['500 ml Bottle', '1 L Bottle'], isVeg: true },
  { name: 'Glass and Multi-Surface Cleaner', brand: 'Colin', category: 'cleaning-household', subCategory: 'Floor & Toilet Cleaners', basePrice: 98, packSizeOptions: ['500 ml Spray', '1 L Refill'], isVeg: true },
  { name: 'Eco-Friendly Oxo Degradable Garbage Bags', brand: 'Shalimar', category: 'cleaning-household', subCategory: 'Tissues & Wet Wipes', basePrice: 75, packSizeOptions: ['Medium 30 Bags', 'Large 30 Bags'], isVeg: true },
  { name: 'Kitchen Paper Towel Roll 2-Ply', brand: 'Origami', category: 'cleaning-household', subCategory: 'Tissues & Wet Wipes', basePrice: 85, packSizeOptions: ['2 Rolls Pack', '4 Rolls Pack'], isVeg: true },
  { name: 'Air Pocket Bathroom Freshener Lavender', brand: 'Godrej aer', category: 'cleaning-household', subCategory: 'Room Fresheners', basePrice: 65, packSizeOptions: ['1 pc (10g)', 'Pack of 3 Assorted'], isVeg: true },

  // Personal Care & Hygiene
  { name: 'Original Antiseptic Bathing Soap', brand: 'Dettol', category: 'personal-care', subCategory: 'Bath Soaps & Body Wash', basePrice: 145, packSizeOptions: ['Pack of 3 (75g each)', 'Pack of 5 (125g each)'], isVeg: true },
  { name: 'Deep Moisture Body Wash Shower Gel', brand: 'Dove', category: 'personal-care', subCategory: 'Bath Soaps & Body Wash', basePrice: 185, packSizeOptions: ['250 ml Bottle', '500 ml Pump Bottle'], isVeg: true },
  { name: 'Anti-Dandruff Cool Menthol Shampoo', brand: 'Head & Shoulders', category: 'personal-care', subCategory: 'Shampoos & Conditioners', basePrice: 199, packSizeOptions: ['180 ml Bottle', '340 ml Bottle', '650 ml Pump'], isVeg: true },
  { name: 'Total Advanced Health Toothpaste', brand: 'Colgate', category: 'personal-care', subCategory: 'Toothpaste & Brushes', basePrice: 115, packSizeOptions: ['150 g Tube', 'Pack of 2 (150g)'], isVeg: true },
  { name: 'Rapid Relief Sensitive Toothpaste', brand: 'Sensodyne', category: 'personal-care', subCategory: 'Toothpaste & Brushes', basePrice: 195, packSizeOptions: ['80 g Tube', '150 g Tube'], isVeg: true },
  { name: 'Oil Control Face Wash with Lemon', brand: 'Garnier Men', category: 'personal-care', subCategory: 'Face & Skin Care', basePrice: 140, packSizeOptions: ['100 g Tube', '150 g Tube'], isVeg: true },
  { name: 'Ultra Sheer Dry-Touch Sunscreen SPF 50+', brand: 'Neutrogena', category: 'personal-care', subCategory: 'Face & Skin Care', basePrice: 260, packSizeOptions: ['30 ml Tube', '88 ml Bottle'], isVeg: true },
  { name: 'Signature Body Spray Deodorant Men', brand: 'Axe', category: 'personal-care', subCategory: 'Deodorants & Perfumes', basePrice: 199, packSizeOptions: ['150 ml Can', 'Pack of 2 (150ml)'], isVeg: true },

  // Baby & Pet Supplies
  { name: 'All Round Protection Pants Diapers', brand: 'Pampers', category: 'baby-pet', subCategory: 'Diapers & Rash Creams', basePrice: 420, packSizeOptions: ['Small (36 pcs)', 'Medium (32 pcs)', 'Large (28 pcs)'], isVeg: true },
  { name: 'Gentle Baby Wet Wipes with Aloe', brand: 'Himalaya Baby', category: 'baby-pet', subCategory: 'Baby Wipes & Cleansers', basePrice: 135, packSizeOptions: ['72 Wipes Pack', 'Buy 2 Get 1 Pack'], isVeg: true },
  { name: 'Wheat Apple Baby Cereal Nutrition', brand: 'Nestle Cerelac', category: 'baby-pet', subCategory: 'Baby Food & Cereal', basePrice: 285, packSizeOptions: ['300 g Refill', '500 g Saver'], isVeg: true },
  { name: 'Adult Meat & Rice Dry Dog Food', brand: 'Pedigree', category: 'baby-pet', subCategory: 'Dog Food & Chew Bones', basePrice: 380, packSizeOptions: ['1.2 kg Bag', '3 kg Saver Bag', '10 kg Mega Bag'], isVeg: false },
  { name: 'Ocean Fish Dry Cat Food', brand: 'Whiskas', category: 'baby-pet', subCategory: 'Cat Food & Treats', basePrice: 240, packSizeOptions: ['450 g Pack', '1.2 kg Pack'], isVeg: false },
  { name: 'Chicken Flavor Dog Chew Biscuits', brand: 'Meat Up', category: 'baby-pet', subCategory: 'Dog Food & Chew Bones', basePrice: 145, packSizeOptions: ['500 g Jar', '1 kg Jar'], isVeg: false },
  { name: 'Gentle Baby Massage Oil with Olive', brand: 'Johnson\'s Baby', category: 'baby-pet', subCategory: 'Baby Wipes & Cleansers', basePrice: 165, packSizeOptions: ['100 ml', '200 ml Bottle'], isVeg: true }
];

// Helper to deterministically generate exactly > 1000 items with rich variants and real pricing
function generateFullGroceryCatalog(): Product[] {
  const products: Product[] = [];
  let currentId = 1;

  // Modifiers and variant descriptors for Indian grocery store products
  const variantDescriptors = [
    { prefix: '', priceMultiplier: 1.0, discount: 15, tag: 'Standard' },
    { prefix: 'Premium Select ', priceMultiplier: 1.25, discount: 18, tag: 'Premium' },
    { prefix: 'Value Saver Pack - ', priceMultiplier: 1.85, discount: 26, tag: 'Super Saver' },
    { prefix: 'Organic Certified ', priceMultiplier: 1.35, discount: 12, tag: 'Organic' },
    { prefix: 'Party Combo Box: ', priceMultiplier: 2.1, discount: 30, tag: 'Combo' },
    { prefix: 'Fresh Morning Batch: ', priceMultiplier: 1.05, discount: 10, tag: 'Fresh Harvest' },
    { prefix: 'Family Mega Pack of ', priceMultiplier: 2.8, discount: 32, tag: 'Family Pack' },
    { prefix: 'Zero Preservatives ', priceMultiplier: 1.2, discount: 14, tag: 'Healthy' },
    { prefix: 'Classic Vintage ', priceMultiplier: 1.15, discount: 20, tag: 'Bestseller' },
    { prefix: 'Dual Savings Bundle: ', priceMultiplier: 1.7, discount: 25, tag: 'Twin Pack' },
    { prefix: 'Mini Grab-and-Go ', priceMultiplier: 0.65, discount: 8, tag: 'Snack Size' },
    { prefix: 'Direct Farm Harvest: ', priceMultiplier: 1.1, discount: 22, tag: 'Farm Fresh' },
    { prefix: 'Homestyle Spiced ', priceMultiplier: 1.18, discount: 15, tag: 'Traditional' },
    { prefix: 'Special Edition ', priceMultiplier: 1.3, discount: 20, tag: 'Special' },
  ];

  // Loop through base items and multiply variants to reach > 1000 items
  for (const baseItem of BASE_ITEM_TEMPLATES) {
    const categoryImages = CATEGORY_IMAGES[baseItem.category] || CATEGORY_IMAGES['fruits-vegetables'];

    for (let vIdx = 0; vIdx < variantDescriptors.length; vIdx++) {
      const variant = variantDescriptors[vIdx];
      const packSizeIndex = (vIdx + currentId) % baseItem.packSizeOptions.length;
      const chosenPackSize = baseItem.packSizeOptions[packSizeIndex];

      const computedPrice = Math.round(baseItem.basePrice * variant.priceMultiplier);
      const discount = variant.discount + ((currentId % 5) * 2); // 10% to 40%
      const originalPrice = Math.round(computedPrice / (1 - discount / 100));

      const rating = Number((4.0 + ((currentId * 7) % 10) * 0.1).toFixed(1));
      const ratingCount = 85 + ((currentId * 47) % 4500);
      const eta = `${8 + (currentId % 6)} mins`;

      const imageUrl = getMatchingItemImage(baseItem.name, baseItem.category);

      const namePrefix = variant.prefix;
      const finalName = `${namePrefix}${baseItem.name}`;

      products.push({
        id: `prod_${currentId}`,
        name: finalName,
        brand: baseItem.brand,
        category: baseItem.category,
        subCategory: baseItem.subCategory,
        packSize: chosenPackSize,
        price: computedPrice,
        originalPrice: originalPrice,
        discountPercent: discount,
        rating: Math.min(4.9, Math.max(4.1, rating)),
        ratingCount: ratingCount,
        deliveryTime: eta,
        inStock: currentId % 37 !== 0, // 97% products in stock
        image: imageUrl,
        isVeg: baseItem.isVeg,
        isBestseller: (currentId % 4 === 0) || variant.tag === 'Bestseller',
        isOrganic: baseItem.isOrganic || variant.tag === 'Organic',
        description: `Fresh, high quality ${baseItem.name} packed hygienically under strict quality control standards. Fast doorstep delivery in ${eta}.`
      });

      currentId++;
    }
  }

  // If under 1020 products, add a supplemental batch to guarantee > 1000 items
  const brandsList = ['Amul', 'Fresho', 'Tata', 'Haldiram\'s', 'Britannia', 'Nestle', 'Dettol', 'Surf Excel', 'Aashirvaad', 'India Gate', 'Fortune', 'Cadbury', 'Epigamia', 'Paper Boat'];
  const genericItems = [
    { title: 'Fresh Seasoned Salad Bowl', cat: 'fruits-vegetables', sub: 'Cut & Sprouts', price: 65, veg: true },
    { title: 'Golden Sweet Corn Cobs', cat: 'fruits-vegetables', sub: 'Fresh Vegetables', price: 45, veg: true },
    { title: 'Alphonso Mango Pulp Canned', cat: 'fruits-vegetables', sub: 'Fresh Fruits', price: 180, veg: true },
    { title: 'Organic Chia Seeds Raw', cat: 'masalas-dryfruits', sub: 'Raisins & Walnuts', price: 135, veg: true },
    { title: 'Pure Flax Seeds Roasted', cat: 'masalas-dryfruits', sub: 'Raisins & Walnuts', price: 85, veg: true },
    { title: 'Creamy Peanut Butter Smooth', cat: 'dairy-breakfast', sub: 'Butter & Cheese', price: 165, veg: true },
    { title: 'Multi-grain Breakfast Muesli', cat: 'dairy-breakfast', sub: 'Breads & Pav', price: 280, veg: true },
    { title: 'Dark Chocolate Coated Almonds', cat: 'sweets-icecream', sub: 'Chocolates & Candies', price: 195, veg: true },
    { title: 'Sparkling Mineral Water', cat: 'cold-drinks', sub: 'Soft Drinks & Soda', price: 50, veg: true },
    { title: 'Herbal Hand Sanitizer Pump', cat: 'personal-care', sub: 'Personal Care & Hygiene', price: 89, veg: true }
  ];

  let extraIndex = 0;
  while (products.length < 1050) {
    const template = genericItems[extraIndex % genericItems.length];
    const brand = brandsList[extraIndex % brandsList.length];
    const catImgs = CATEGORY_IMAGES[template.cat] || CATEGORY_IMAGES['fruits-vegetables'];
    const p = template.price + (extraIndex % 15) * 5;
    const disc = 12 + (extraIndex % 18);
    const orig = Math.round(p / (1 - disc / 100));

    products.push({
      id: `prod_${currentId}`,
      name: `${brand} ${template.title} #${extraIndex + 1}`,
      brand: brand,
      category: template.cat,
      subCategory: template.sub,
      packSize: `${100 * (1 + (extraIndex % 5))} g`,
      price: p,
      originalPrice: orig,
      discountPercent: disc,
      rating: 4.5,
      ratingCount: 220 + extraIndex * 3,
      deliveryTime: '10 mins',
      inStock: true,
      image: getMatchingItemImage(template.title, template.cat),
      isVeg: template.veg,
      isBestseller: extraIndex % 3 === 0,
      description: `Premium quality ${template.title} by ${brand}. Carefully picked and packed.`
    });

    currentId++;
    extraIndex++;
  }

  return products;
}

// Instantiate catalog once to maintain performance & determinism
export const ALL_PRODUCTS: Product[] = generateFullGroceryCatalog();

// Quick statistics
export const TOTAL_PRODUCTS_COUNT = ALL_PRODUCTS.length;
