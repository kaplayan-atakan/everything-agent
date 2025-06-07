import React, { useState } from 'react';
import CustomerEmailCard from './components/CustomerEmailCard';
import InquiryForm from './components/InquiryForm';
import SocialLinks from './components/SocialLinks';
import AnimatedGridBackground from './components/AnimatedGridBackground';
import ParticleEffect from './components/ParticleEffect';
import GoogleAnalytics, { trackButtonClick, trackServiceCardView } from './components/GoogleAnalytics';
import './App.css';

interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  department: string;
  currentAutomation: string;
  businessSize: string;
  primaryNeed: string;
  budget: string;
  timeline: string;
  additionalInfo: string;
}

const App = () => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setSubmittedData(data);
    // Here you would typically send the data to your backend
    console.log('Form submitted with data:', data);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "AI ajanları ile hangi süreçleri otomatikleştirebilirim?",
      answer: "Müşteri hizmetleri, satış takibi, veri analizi, e-posta yönetimi, randevu planlama, raporlama, sosyal medya yönetimi ve daha birçok rutini otomatikleştirebilirsiniz. Her sektöre özel çözümler geliştirebiliyoruz."
    },
    {
      question: "Mevcut sistemlerle entegrasyon mümkün mü?",
      answer: "Evet! CRM, ERP, e-ticaret platformları, muhasebe yazılımları ve API'si olan hemen her sistemle entegrasyon sağlayabiliriz. Mevcut altyapınızı değiştirmeden AI ajanlarını devreye alabilirsiniz."
    },
    {
      question: "Uygulama süreci ne kadar sürer?",
      answer: "Basit chatbot çözümleri 1-2 hafta, kapsamlı otomasyon projeleri 4-8 hafta sürebilir. Proje karmaşıklığına göre detaylı timeline sunuyoruz."
    },
    {
      question: "Teknik bilgim yok, yine de kullanabilir miyim?",
      answer: "Kesinlikle! AI ajanlarımız kullanıcı dostu arayüzlerle gelir. Eğitim desteği de sağlıyoruz. Teknik bilgi gerektirmeden kolayca yönetebilirsiniz."
    },
    {
      question: "Fiyatlandırma nasıl çalışıyor?",
      answer: "Proje bazlı ve aylık abonelik modelleri sunuyoruz. İhtiyacınıza göre özelleştirilebilir paketler hazırlıyoruz. Ücretsiz danışmanlık görüşmesinde detayları paylaşabiliriz."
    },
    {
      question: "Veri güvenliği nasıl sağlanıyor?",
      answer: "Verileriniz şifrelenmiş olarak korunur, KVKK uyumlu altyapı kullanırız. Bulut veya kendi sunucularınızda çalışma seçenekleri sunuyoruz."
    }
  ];  return (
    <div className="app">      {/* Google Analytics */}
      <GoogleAnalytics measurementId={process.env.REACT_APP_GA_MEASUREMENT_ID || "GA_MEASUREMENT_ID"} />
      
      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Effects */}
        <AnimatedGridBackground 
          intensity="medium" 
          className="hero-grid-bg"
          colors={{
            primary: '#00FFFF',   // Electric Blue
            secondary: '#FF00FF', // Neon Pink
            accent: '#39FF14'     // Neon Green
          }}
        />
        <ParticleEffect 
          intensity="low" 
          className="hero-particles"
          particleCount={40}
          colors={{
            primary: '#00FFFF',   // Electric Blue
            secondary: '#FF00FF', // Neon Pink
            accent: '#39FF14'     // Neon Green
          }}
        />
          <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Everything Agent</h1>
            <h2 className="hero-subtitle">Yapay Zeka ile İş Süreçlerinizi Otomatikleştirin</h2>
            <p className="hero-tagline">İşinizi büyütmek için tek bir tuşa basın: AI Ajanlarınız hazır.</p>
            <p className="hero-description">
              Her işletmenin ihtiyacı farklıdır. Everything Agent, modüler yapay zekâ ajanlarıyla 
              satıştan müşteri hizmetlerine, pazarlamadan iç operasyonlara kadar her departmanınız 
              için özelleştirilebilir AI çözümleri sunar.
            </p>
            <p className="hero-benefits">Verimliliği artırın, maliyetleri düşürün, rekabet avantajı kazanın.</p>
            <div className="hero-cta">
              <button 
                className="cta-btn primary"
                onClick={() => trackButtonClick('hero_demo_request')}
              >
                Demo Talep Et
              </button>
              <button 
                className="cta-btn secondary"
                onClick={() => trackButtonClick('hero_consultation_request')}
              >
                Ücretsiz Danışmanlık Planla
              </button>
            </div>
          </div>
          <div className="hero-decoration">
            <div className="neon-grid"></div>
            <div className="floating-elements">
              <div className="float-element element-1"></div>
              <div className="float-element element-2"></div>
              <div className="float-element element-3"></div>
            </div>
          </div>
        </div>
      </section>      {/* Service Highlights */}
      <section className="services-section" id="services">
        <div className="section-header">
          <h2 className="section-title">Yapay Zeka Ajanları ile İş Süreçlerinizi Güçlendirin</h2>
          <h3 className="section-subtitle">Sadece Yazılım Değil, İş Ortağınız</h3>
          <p className="section-description">
            Her biri kendi işlevine sahip, akıllı ve özelleştirilebilir AI ajanlarımızla iş yükünüzü azaltın. 
            İşte en çok tercih edilen otomasyon çözümlerimiz:
          </p>
          <div className="title-decoration"></div>
        </div>        <div className="services-grid">
          <div className="service-card" onClick={() => trackServiceCardView('Chatbot ve Müşteri Hizmetleri AI')}>
            <div className="service-icon">🧠</div>
            <h4>Akıllı Chatbot ve Müşteri Hizmetleri AI</h4>
            <p>Müşteri hizmetlerinizi 7/24 otomatikleştirin. Her müşterinize anında, tutarlı ve güler yüzlü yanıtlar verin. Çok dilli destek ve entegrasyon imkanları.</p>
          </div>
          <div className="service-card" onClick={() => trackServiceCardView('Veri Analizi ve İş Zekası')}>
            <div className="service-icon">📊</div>
            <h4>Veri Analizi ve İş Zekası Otomasyonu</h4>
            <p>Dağınık verilerinizi anlamlı içgörülere dönüştürün. Otomatik dashboard'lar ve raporlarla karar alma süreçlerinizi hızlandırın.</p>
          </div>
          <div className="service-card" onClick={() => trackServiceCardView('İş Süreç Otomasyonu RPA')}>
            <div className="service-icon">⚙️</div>
            <h4>İş Süreç Otomasyonu (RPA)</h4>
            <p>Formlar, e-postalar, doküman işleri... Rutinleri sizin yerinize halleden dijital ajanlarla operasyonel verimliliği %40'a kadar artırın.</p>
          </div>
          <div className="service-card" onClick={() => trackServiceCardView('Satış Otomasyonu ve CRM AI')}>
            <div className="service-icon">💼</div>
            <h4>Satış Süreç Otomasyonu ve CRM AI</h4>
            <p>Teklif oluşturma, müşteri adayı sıralama, pipeline takibi... Satış süreçlerinizi hızlandırın ve kapatma oranını artırın.</p>
          </div>
          <div className="service-card" onClick={() => trackServiceCardView('Pazarlama Otomasyonu ve İçerik AI')}>
            <div className="service-icon">✨</div>
            <h4>Pazarlama Otomasyonu ve İçerik AI</h4>
            <p>İçerik önerileri, rakip analizi, planlama takvimleri... Pazarlama ekibinize stratejik destek sunar, kampanya ROI'unu optimize eder.</p>
          </div>
          <div className="service-card" onClick={() => trackServiceCardView('Sistem Entegrasyonu ve API')}>
            <div className="service-icon">🔗</div>
            <h4>Sistem Entegrasyonu ve API Çözümleri</h4>
            <p>Mevcut ERP, CRM ve iş yazılımlarınızla entegre çalışan AI ajanları, manuel veri girişine veda ettirir.</p>
          </div>
        </div>
      </section>      {/* Success Stories */}
      <section className="success-stories" id="success-stories">
        <div className="section-header">
          <h2 className="section-title">Başarı Hikayeleri ve Müşteri Deneyimleri</h2>
          <p className="section-description">Müşterilerimizin Everything Agent AI çözümleri ile elde ettiği gerçek sonuçlar ve ROI metrikleri</p>
          <div className="title-decoration"></div>
        </div>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-stats">
              <span className="stat-number">%37</span>
              <span className="stat-label">Destek Süresi Azalma</span>
            </div>
            <h3>Teknoloji Şirketi 2 Ayda Müşteri Destek Süresini %37 Kısalttı</h3>
            <p>Everything Agent ile entegre bir müşteri hizmetleri AI ajanı geliştiren teknoloji şirketi, çağrı merkezi yükünü %50 azalttı ve müşteri memnuniyetini artırdı.</p>
          </div>
          <div className="story-card">
            <div className="story-stats">
              <span className="stat-number">4x</span>
              <span className="stat-label">Satış Hızı Artışı</span>
            </div>
            <h3>E-ticaret Girişimi Satış Sürecinde 4x Hızlandı</h3>
            <p>Lead sıralama ve teklif süreç otomasyonu için satış AI ajanı kullanan e-ticaret girişimi, demo taleplerine yanıt süresini 1 saatten 5 dakikaya indirdi.</p>
          </div>
        </div>
      </section>      {/* Need Analysis Form Introduction */}
      <section className="form-intro-section" id="contact">
        {/* Subtle Background Effect for Form Section */}
        <AnimatedGridBackground 
          intensity="low" 
          className="form-grid-bg"
          colors={{
            primary: '#39FF14',   // Neon Green
            secondary: '#00FFFF', // Electric Blue
            accent: '#FF00FF'     // Neon Pink
          }}
        />
        
        <div className="section-header">
          <h2 className="section-title">İhtiyaç Analizi: Size Özel AI Çözümünüzü Belirleyelim</h2>
          <p className="section-description">
            Her işletme özeldir. Formu doldurarak sizin için en uygun yapay zeka çözümü senaryosunu hazırlamamıza yardımcı olun. 
            Ücretsiz danışmanlık ve demo oturumu için hemen başvurun.
          </p>
          <div className="title-decoration"></div>
        </div>
      </section>      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="section-header">
          <h2 className="section-title">Sıkça Sorulan Sorular - AI Otomasyon Hakkında</h2>
          <p className="section-description">Everything Agent yapay zeka çözümleri hakkında merak ettikleriniz ve cevapları</p>
          <div className="title-decoration"></div>
        </div>
        <div className="faq-container">
          {faqData.map((faq, index) => (
            <div key={index} className={`faq-item ${openFaq === index ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <h3>{faq.question}</h3>
                <span className="faq-toggle">{openFaq === index ? '−' : '+'}</span>
              </div>
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo">everything Agent</h1>
            <p className="tagline">Akıllı AI Çözümleri ile Geleceği Şekillendirin</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="email-section">
          <CustomerEmailCard 
            customerName={submittedData?.contactPerson || "Değerli Müşterimiz"}
            companyName="everything Agent"
          />
        </section>

        <section className="form-section">
          <InquiryForm onSubmit={handleFormSubmit} />
        </section>

        <section className="social-section">
          <SocialLinks 
            whatsappNumber="+905551234567"
            twitterHandle="everythingagent"
            linkedinProfile="company/everything-agent"
            customMessage="Merhaba, Everything Agent hizmetleri hakkında bilgi almak istiyorum."
          />
        </section>
      </main>      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-info">
            <h3>Everything Agent</h3>
            <p>Yapay zeka destekli iş süreçleri otomasyonu ve AI ajanları çözümleri</p>
            <p>Türkiye'nin önde gelen AI otomasyon şirketi</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>AI Hizmetlerimiz</h4>
              <ul>
                <li><a href="#services">Müşteri Hizmetleri AI</a></li>
                <li><a href="#services">İş Süreç Otomasyonu</a></li>
                <li><a href="#services">Veri Analizi ve BI</a></li>
                <li><a href="#services">Chatbot Çözümleri</a></li>
                <li><a href="#services">Satış Otomasyonu</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>İletişim Bilgileri</h4>
              <ul>
                <li>📧 <a href="mailto:info@everythingagent.com">info@everythingagent.com</a></li>
                <li>📞 <a href="tel:+902121234567">+90 (212) 123 45 67</a></li>
                <li>🏢 İstanbul, Türkiye</li>
                <li><a href="#contact">Ücretsiz Danışmanlık</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Hızlı Erişim</h4>
              <ul>
                <li><a href="#faq">Sık Sorulan Sorular</a></li>
                <li><a href="#success-stories">Başarı Hikayeleri</a></li>
                <li><a href="#contact">Demo Talep Et</a></li>
                <li><a href="sitemap.xml">Site Haritası</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Everything Agent. Tüm hakları saklıdır. | Yapay Zeka Çözümleri | İş Süreç Otomasyonu</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
