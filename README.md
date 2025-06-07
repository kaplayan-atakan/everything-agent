# everything Agent - Dijital Süreçlere Akıl Katın

A comprehensive TypeScript-based React application showcasing everything Agent's AI-powered business process automation services with a stunning cyberpunk/rave aesthetic.

## 🚀 Features

### 🎨 Cyberpunk/Rave Design Theme
- Dark background with neon color palette (electric blue, hot pink, neon green)
- Animated background grids and floating elements
- Glow effects, text shadows, and shimmer animations
- Sharp geometric styling with clip-path decorative elements
- Modern typography using Orbitron, Exo 2, and Rajdhani fonts

### 📋 Complete Website Sections
1. **Hero Section** - Main value proposition with CTA buttons
2. **Services Section** - 6 detailed AI agent services
3. **Success Stories** - Customer case studies with metrics
4. **Need Analysis Form** - Comprehensive multi-section form
5. **FAQ Section** - Interactive expandable questions
6. **Email Interface** - Professional email layout
7. **Social Links** - WhatsApp, Twitter, LinkedIn integration

### 🤖 AI Agent Services
- Akıllı Chatbot (24/7 Customer Service)
- Veri Zekası & Raporlama (Data Intelligence)
- Süreç Otomasyonu (Process Automation)
- Satış Otomasyonu (Sales Automation)
- Pazarlama Asistanı (Marketing Assistant)
- Sistem Entegrasyonu (System Integration)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Google Fonts (Orbitron, Exo 2, Rajdhani)
- **Build Tool**: Create React App
- **Development**: Hot reload with React Scripts

## 📦 Installation & Setup

```bash
# Clone or navigate to project directory
cd c:\EA2025

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🌐 Live Development

The application runs on:
- **Local**: http://localhost:3000
- **Network**: http://192.168.71.179:3000

---

**everything Agent** - Yapay zeka destekli iş süreçleri otomasyonu  
© 2025 Everything Agent. Tüm hakları saklıdır.
```

## Çalıştırma

```bash
npm start
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## Proje Yapısı

```
src/
├── components/
│   ├── CustomerEmailCard.tsx      # E-posta karşılama bileşeni
│   ├── CustomerEmailCard.css
│   ├── InquiryForm.tsx           # İhtiyaç analizi formu
│   ├── InquiryForm.css
│   ├── SocialLinks.tsx           # Sosyal medya bağlantıları
│   └── SocialLinks.css
├── App.tsx                       # Ana uygulama bileşeni
├── App.css                       # Global stiller
└── index.tsx                     # Uygulama giriş noktası
```

## Özellikler

### CustomerEmailCard
- Modern gradient tasarım
- Responsive düzen
- Tarih gösterimi
- Profesyonel e-posta formatı

### InquiryForm
- Çok adımlı form yapısı
- Form validasyonu
- Loading states
- Success feedback
- Responsive tasarım

### SocialLinks
- WhatsApp direkt mesaj özelliği
- Sosyal medya entegrasyonu
- İletişim bilgileri
- Modern buton tasarımları

## Konfigürasyon

Sosyal medya linkleri ve iletişim bilgileri `SocialLinks` bileşeninde props olarak düzenlenebilir:

```tsx
<SocialLinks 
  whatsappNumber="+905551234567"
  twitterHandle="everythingagent"
  linkedinProfile="company/everything-agent"
  customMessage="Özel mesajınız..."
/>
```
