'use client';

import { useState, useEffect } from 'react';

// Bu fonksiyon, tarihe göre rastgele bir fotoğraf seçer.
// Aynı gün için hep aynı fotoğrafı gösterir (date'e göre seed kullanır)
function getRandomPhotoName(date: Date) {
  // Tarihi seed olarak kullan (aynı gün = aynı fotoğraf)
  const dateString = date.toDateString();
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit integer'a çevir
  }
  
  // Fotoğraf sayısı - 9 tane fotoğraf var
  const photoCount = 9; // love_1.png'den love_9.png'ye kadar
  
  const photoIndex = Math.abs(hash % photoCount) + 1;
  return `/love-photos/love_${photoIndex}.jpeg`;
}

type DailyPhotoProps = {
  date: Date;
};

function DailyPhoto({ date }: DailyPhotoProps) {
  const [open, setOpen] = useState(false);
  const photoSrc = getRandomPhotoName(date);

  return (
    <>
      <button
        className="
          bg-gradient-to-r from-rose-600 via-pink-700 to-rose-800 hover:from-pink-700 hover:via-rose-800 hover:to-pink-900
          text-white font-semibold px-8 py-4 rounded-full 
          shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110
          focus:outline-none focus:ring-4 focus:ring-rose-400/50
          border border-rose-400/30 backdrop-blur-sm
        "
        onClick={() => setOpen(true)}
      >
        <span className="flex items-center gap-3">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Bugünün Fotoğrafı
        </span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-gradient-to-br from-black/80 via-purple-900/50 to-pink-900/50 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          ></div>
          
          {/* Modern Modal Container */}
          <div className="relative bg-gradient-to-br from-white/20 via-pink-100/20 to-rose-100/20 
                          rounded-3xl p-8 shadow-2xl max-w-4xl max-h-[90vh] flex flex-col items-center 
                          border border-white/30 backdrop-blur-2xl
                          transform transition-all duration-500 ease-out
                          animate-modal-appear">
            
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 bg-gradient-to-br from-pink-500/30 to-rose-500/30 
                         rounded-full p-3 hover:from-pink-600/40 hover:to-rose-600/40 
                         transition-all duration-300 transform hover:rotate-90 hover:scale-110
                         focus:outline-none border border-white/20 backdrop-blur-sm
                         shadow-lg hover:shadow-xl"
              onClick={() => setOpen(false)}
            >
              <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} className="text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {/* Photo Container */}
            <div className="relative overflow-hidden rounded-2xl border-4 border-gradient-to-br from-pink-300/50 to-rose-300/50 shadow-2xl">
              <img
                src={photoSrc}
                alt="Bugünün Fotoğrafı"
                className="rounded-xl object-contain max-w-[85vw] max-h-[65vh] 
                          transition-all duration-700 hover:scale-105"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "https://placehold.co/600x600/ec4899/FFFFFF?text=Fotoğraf+Yok";
                  img.alt = "Fotoğraf Bulunamadı";
                }}
              />
              
              {/* Photo Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 via-transparent to-transparent pointer-events-none rounded-xl"></div>
            </div>

            {/* Date Display */}
            <div className="mt-6 bg-gradient-to-r from-pink-500/30 to-rose-500/30 
                            backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <div className="text-white text-lg font-medium flex items-center gap-3">
                <span className="text-pink-300 animate-pulse">♥</span>
                {date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                <span className="text-pink-300 animate-pulse">♥</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Üstteki "Bugünün Sevgi Kutusu" yazısını içeren bileşen.
function DailyLoveBox() {
  return (
    <div className="bg-gradient-to-r from-rose-700/25 via-pink-800/25 to-rose-700/25 
                    backdrop-blur-lg rounded-full px-8 py-4 
                    border border-rose-400/40 shadow-2xl relative
                    hover:shadow-rose-500/25 transition-all duration-500">
      <span className="text-white font-medium text-xl flex items-center gap-4">
        <span className="text-2xl text-rose-300 animate-gentle-pulse">♥</span>
        Bugünün Sevgi Kutusu
        <span className="text-2xl text-rose-300 animate-gentle-pulse delay-500">♥</span>
      </span>
    </div>
  );
}

// Düzgün yıldız simgesi için SVG bileşeni
function PerfectStar({ size, className, style }: { size: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

// Dönerek zamanı sembolize eden yıldız bileşeni - düzeltilmiş
function RotatingTimeStar({ size }: { size: number }) {
  return (
    <div 
      className="relative flex items-center justify-center text-yellow-300 filter drop-shadow-lg" 
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div style={{
        animation: 'spin-clockwise 8s linear infinite',
        transformOrigin: 'center center'
      }}>
        <PerfectStar size={size} className="text-yellow-400" />
      </div>
    </div>
  );
}

// Ana geri sayım sayfasını oluşturan bileşen.
export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  
  type Star = {
    key: string;
    left: string;
    top: string;
    fontSize: string;
    color: string;
    animationDelay: string;
    animationDuration: string;
    symbol: string;
    moveDistance: string;
  };
  const [stars, setStars] = useState<Star[]>([]);

  // Component mount edildiğinde ve her saniye geri sayımı günceller.
  useEffect(() => {
    // Daha fazla ve hareketli yıldız oluştur - koyu pembe tonlarda
    const newStars = Array.from({ length: 200 }).map((_, i) => ({
      key: `star-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 12 + 6}px`,
      color: [
        '#db2777', '#be185d', '#a21caf', '#c2185b', 
        '#ad1457', '#880e4f', '#e91e63', '#c2185b',
        '#ad1457', '#880e4f', '#db2777', '#be185d'
      ][Math.floor(Math.random() * 12)],
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${Math.random() * 8 + 4}s`,
      symbol: ['✦', '✧', '★', '♥', '♡', '✨', '⭐', '💖'][Math.floor(Math.random() * 8)],
      moveDistance: `${Math.random() * 30 + 10}px`
    }));
    setStars(newStars);

    // Hedef tarihi burada ayarla: 16 Eylül 2025
    const targetDate = new Date('2025-09-16T00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
        setCurrentDate(new Date());
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative font-sans antialiased overflow-hidden">
      
      {/* Geliştirilmiş CSS Animasyonları */}
      <style>{`
        @keyframes floatStar {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg) scale(1); 
            opacity: 0.4; 
          }
          25% { 
            transform: translate(20px, -25px) rotate(90deg) scale(1.3); 
            opacity: 0.9; 
          }
          50% { 
            transform: translate(-15px, -35px) rotate(180deg) scale(1.5); 
            opacity: 1; 
          }
          75% { 
            transform: translate(25px, -15px) rotate(270deg) scale(1.2); 
            opacity: 0.8; 
          }
        }
        
        @keyframes twinkleHeart {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(0.8) rotate(-10deg); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.4) rotate(10deg); 
          }
        }

        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @keyframes pulse-pop {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes modal-appear {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }

        @keyframes spin-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Koyu pembe tonları arka plan */
        .enhanced-background {
          background: 
            radial-gradient(circle at 20% 80%, #be185d 0%, #db2777 40%, transparent 70%),
            radial-gradient(circle at 80% 20%, #db2777 0%, #be185d 40%, transparent 70%),
            radial-gradient(circle at 40% 40%, #a21caf 0%, #db2777 40%, transparent 70%),
            linear-gradient(135deg, #be185d, #db2777, #a21caf, #be185d, #db2777, #a21caf);
          background-size: 300% 300%, 400% 400%, 500% 500%, 400% 400%;
          animation: 
            background-shift 25s ease-in-out infinite,
            background-pulse 10s ease-in-out infinite alternate;
        }

        @keyframes background-shift {
          0%, 100% { 
            background-position: 0% 50%, 100% 50%, 50% 50%, 0% 100%; 
          }
          25% { 
            background-position: 50% 0%, 50% 100%, 100% 0%, 100% 0%; 
          }
          50% { 
            background-position: 100% 50%, 0% 50%, 0% 100%, 50% 50%; 
          }
          75% { 
            background-position: 50% 100%, 50% 0%, 50% 50%, 0% 0%; 
          }
        }

        @keyframes background-pulse {
          0% { filter: brightness(1) saturate(1.1); }
          100% { filter: brightness(1.05) saturate(1.2); }
        }
      `}</style>
      
      {/* Geliştirilmiş Arka Plan */}
      <div className="absolute inset-0 enhanced-background">
        {/* Daha fazla ve hareketli yıldız */}
        {stars.map((star) => (
          <div
            key={star.key}
            className="absolute animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              fontSize: star.fontSize,
              color: star.color,
              animation: star.symbol === '♥' || star.symbol === '♡' || star.symbol === '💖' 
                ? `twinkleHeart ${star.animationDuration} infinite ease-in-out`
                : `floatStar ${star.animationDuration} infinite ease-in-out`,
              animationDelay: star.animationDelay,
            }}
          >
            {star.symbol}
          </div>
        ))}
      </div>
      
      {/* Ana İçerik */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        
        {/* Üst Sıra: Dönen Yıldız + Fotoğraf Butonu */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
          <div className="flex items-center gap-6">
            <RotatingTimeStar size={70} />
            <DailyLoveBox />
          </div>
          <DailyPhoto date={currentDate} />
        </div>

        {/* Başlık ve Alt Başlık */}
        <div className="text-center mb-8 relative">
          <div className="flex items-center justify-center mb-6 relative">
            <span className="text-3xl text-pink-300 mr-4 animate-gentle-pulse">♥</span>
            
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-200 via-rose-300 to-pink-400 bg-clip-text text-transparent">
                BİZİM ÖZEL GÜNÜMÜZ
              </h1>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <PerfectStar size={16} className="text-yellow-300" style={{
                  animation: 'spin-clockwise 3s linear infinite'
                }} />
                <span className="text-pink-300 text-lg animate-gentle-pulse delay-500">✨</span>
                <PerfectStar size={16} className="text-yellow-300" style={{
                  animation: 'spin-clockwise 3s linear infinite',
                  animationDelay: '1s'
                }} />
              </div>
            </div>
            
            <span className="text-3xl text-pink-300 ml-4 animate-gentle-pulse delay-1500">♥</span>
          </div>
          
          <h2 className="text-xl md:text-2xl font-medium text-white/95 mb-4">
            Seninle geçireceğimiz güzel anlar için geri sayım
          </h2>
        </div>

        {/* Geri Sayım Kutucukları */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 relative w-full max-w-4xl">
          {[
            { value: timeLeft.days, label: 'GÜN', symbol: '♥' },
            { value: timeLeft.hours, label: 'SAAT', symbol: '♡' },
            { value: timeLeft.minutes, label: 'DAKİKA', symbol: '♥' },
            { value: timeLeft.seconds, label: 'SANİYE', symbol: '♡' }
          ].map((item, index) => (
            <div
              key={item.label}
              className="relative group p-2"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Geliştirilmiş ışıltı efekti */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/40 via-rose-500/40 to-pink-600/40 rounded-3xl blur-xl scale-110 opacity-70 group-hover:opacity-90 transition-all duration-700" />
              
              {/* Ana kart */}
              <div className="relative bg-gradient-to-br from-white/20 via-pink-100/15 to-rose-100/20 
                              backdrop-blur-xl rounded-3xl p-6 md:p-8 
                              border border-pink-300/40 shadow-2xl 
                              transform hover:scale-105 transition-all duration-700
                              hover:border-pink-200/60">
                <div 
                  className="absolute -top-3 -right-3 text-2xl text-pink-400 animate-gentle-pulse"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {item.symbol}
                </div>
                
                {/* Sayı */}
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-pink-200 via-rose-300 to-pink-400 bg-clip-text text-transparent mb-2 relative animate-pulse-pop">
                  {String(item.value).padStart(2, '0')}
                </div>
                
                {/* Etiket */}
                <div className="text-white/95 font-semibold text-sm md:text-base tracking-wide uppercase">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Etkinlik Tarihi ve Mesaj */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-6">
          {/* Etkinlik Tarihi Kartı */}
          <div className="bg-gradient-to-r from-pink-500/25 via-rose-500/25 to-pink-500/25 
                          backdrop-blur-lg rounded-2xl px-8 py-5 
                          border border-pink-300/40 shadow-2xl relative
                          hover:shadow-pink-500/30 transition-all duration-500">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="animate-gentle-pulse text-pink-300">♥</span>
              16 Eylül 2025
              <span className="animate-gentle-pulse delay-1000 text-pink-300">♥</span>
            </h3>
            <p className="text-white/90 text-base text-center">
              Kalplerimiz tek attığında...
            </p>
          </div>

          {/* Seni Seviyorum Mesajı */}
          <div className="bg-gradient-to-r from-rose-500/30 to-pink-500/30 
                          backdrop-blur-lg rounded-full px-8 py-5 
                          border border-pink-300/40 shadow-2xl relative
                          hover:shadow-pink-500/40 transition-all duration-500">
            <span className="text-white font-semibold text-xl flex items-center gap-4">
              <span className="animate-gentle-pulse text-pink-300 text-2xl">♥</span>
              Seni Seviyorum
              <span className="animate-gentle-pulse delay-1000 text-pink-300 text-2xl">♥</span>
            </span>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-6">
          <p className="text-white/70 text-base flex items-center justify-center gap-3">
            <PerfectStar size={14} className="text-pink-300" style={{
              animation: 'spin-clockwise 3s linear infinite'
            }} />
            <span>Her saniye seninle daha güzel...</span>
            <PerfectStar size={14} className="text-pink-300" style={{
              animation: 'spin-clockwise 3s linear infinite',
              animationDelay: '1s'
            }} />
          </p>
        </div>
      </div>
    </div>
  );
}