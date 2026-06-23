import { IMG } from '../../assets/images';

function HeroBanner({ lang }) {
  const isAr = lang.code === 'ar';

  return (
    <div className="relative overflow-hidden rounded-3xl mb-8 shadow-xl bg-gray-900 h-[240px] sm:h-[320px] md:h-[400px] flex items-center">
      {/* Background Graphic */}
      <img
        src={IMG.hero}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105 transition-all duration-700 hover:scale-100"
      />

      {/* Decorative Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#E8572A]/10 to-[#F4C430]/10"></div>

      {/* Content */}
      <div className={`relative w-full px-5 sm:px-10 text-center flex flex-col items-center ${isAr ? 'rtl' : 'ltr'}`}>
        <span className="inline-block text-[10px] sm:text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-2 sm:mb-4 text-[#F4C430] border border-[#F4C430]/30 backdrop-blur-md bg-white/5 animate-pulse">
          {isAr ? '👨‍🍳 مطبخنا الشرقي والغربي' : '👨‍🍳 Oriental & Western Flavors'}
        </span>

        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-2 sm:mb-4 tracking-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {isAr ? (
            <span>أشهى المأكولات بمذاقٍ <span className="text-[#E8572A]">فريد</span></span>
          ) : (
            <span>Taste the Magic of <span className="text-[#E8572A]">Mazaj</span></span>
          )}
        </h1>

        <p className="hidden sm:block text-sm sm:text-base text-gray-300 max-w-md font-medium leading-relaxed mb-4 sm:mb-6">
          {isAr
            ? 'جرب أفضل برجر سماش، بيتزا نابوليتان، مكرونة إيطالية وحلويات شرقية دافئة، محضرة بشغف وتصلك ساخنة.'
            : 'Savor our signature smash burgers, Neapolitan pizzas, Italian pastas, and fresh desserts. Prepared with passion and delivered piping hot.'}
        </p>

        {/* Badges Info */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-white/90">
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/5">
            <span>⏱️</span>
            <span className="font-bold">{isAr ? 'توصيل في ٣٠ دقيقة' : '30 Mins Delivery'}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/5">
            <span>🔥</span>
            <span className="font-bold">{isAr ? 'طازج وساخن' : 'Always Fresh & Hot'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
