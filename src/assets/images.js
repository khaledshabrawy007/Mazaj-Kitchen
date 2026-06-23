const makeSVG = (emoji, label, fromColor, toColor) => {
  const e = encodeURIComponent;
  return `data:image/svg+xml,${e(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${fromColor}"/><stop offset="1" stop-color="${toColor}"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><text x="50%" y="44%" font-size="80" text-anchor="middle" dominant-baseline="middle">${emoji}</text><text x="50%" y="80%" font-size="17" text-anchor="middle" fill="rgba(255,255,255,0.92)" font-family="Arial,sans-serif" font-weight="600">${label}</text></svg>`)}`;
};

export const IMG = {
  burger1:  makeSVG('🍔', 'Classic Smash Burger',  '#FF6B35', '#F7931E'),
  burger2:  makeSVG('🍔', 'BBQ Bacon Burger',       '#C0392B', '#E74C3C'),
  burger3:  makeSVG('🍔', 'Mushroom Swiss Burger',  '#7D6608', '#A04000'),
  pizza1:   makeSVG('🍕', 'Margherita Pizza',        '#E8572A', '#F4C430'),
  pizza2:   makeSVG('🍕', 'Pepperoni Feast',         '#922B21', '#C0392B'),
  pasta1:   makeSVG('🍝', 'Spaghetti Carbonara',     '#F39C12', '#E67E22'),
  pasta2:   makeSVG('🍝', 'Penne Arrabbiata',        '#CB4335', '#E74C3C'),
  salad1:   makeSVG('🥗', 'Caesar Salad',            '#1E8449', '#27AE60'),
  salad2:   makeSVG('🥗', 'Greek Salad',             '#1A5276', '#2E86C1'),
  drink1:   makeSVG('🥭', 'Fresh Mango Juice',       '#D4AC0D', '#F39C12'),
  drink2:   makeSVG('🍋', 'Lemonade Mint',           '#1ABC9C', '#16A085'),
  dessert1: makeSVG('🍰', 'Classic Tiramisu',        '#6C3483', '#9B59B6'),
  dessert2: makeSVG('🍯', 'Warm Kunafa',             '#784212', '#A04000'),
  hero: (() => {
    const e = encodeURIComponent;
    return `data:image/svg+xml,${e('<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8572A"/><stop offset="0.5" stop-color="#1a1a1a"/><stop offset="1" stop-color="#F4C430"/></linearGradient></defs><rect width="1400" height="600" fill="url(#g)"/><text x="50%" y="38%" font-size="110" text-anchor="middle" dominant-baseline="middle">🍽️🍕🍔</text><text x="50%" y="72%" font-size="28" text-anchor="middle" fill="rgba(255,255,255,0.55)" font-family="Arial" font-weight="400">Fresh • Fast • Flavorful</text></svg>')}`;
  })(),
};
