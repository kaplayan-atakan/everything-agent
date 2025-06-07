import React from 'react';
import { trackButtonClick } from './GoogleAnalytics';
import './SocialLinks.css';

interface SocialLinksProps {
  whatsappNumber?: string;
  twitterHandle?: string;
  linkedinProfile?: string;
  customMessage?: string;
}

const SocialLinks = ({
  whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER || "+905551234567",
  twitterHandle = process.env.REACT_APP_TWITTER_HANDLE || "everythingagent",
  linkedinProfile = process.env.REACT_APP_LINKEDIN_COMPANY || "company/everything-agent",
  customMessage = "Merhaba, Everything Agent hizmetleri hakkında bilgi almak istiyorum."
}: SocialLinksProps) => {  const handleWhatsApp = () => {
    trackButtonClick('whatsapp_contact');
    const encodedMessage = encodeURIComponent(customMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTwitter = () => {
    trackButtonClick('twitter_follow');
    const twitterUrl = `https://twitter.com/${twitterHandle}`;
    window.open(twitterUrl, '_blank');
  };

  const handleLinkedIn = () => {
    trackButtonClick('linkedin_connect');
    const linkedinUrl = `https://linkedin.com/${linkedinProfile}`;
    window.open(linkedinUrl, '_blank');
  };

  return (
    <div className="social-links-container">
      <div className="social-header">
        <h3>🌐 Bize Ulaşın</h3>
        <p>Sosyal medya kanallarımızdan da bizimle iletişime geçebilirsiniz</p>
      </div>
      
      <div className="social-buttons">
        <button 
          className="social-btn whatsapp-btn" 
          onClick={handleWhatsApp}
          title="WhatsApp ile iletişime geç"
        >
          <div className="btn-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.594z"/>
            </svg>
          </div>
          <div className="btn-content">
            <span className="btn-title">WhatsApp</span>
            <span className="btn-subtitle">Anında mesajlaşma</span>
          </div>
        </button>

        <button 
          className="social-btn twitter-btn" 
          onClick={handleTwitter}
          title="Twitter'da takip edin"
        >
          <div className="btn-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
          <div className="btn-content">
            <span className="btn-title">Twitter</span>
            <span className="btn-subtitle">Son haberler ve güncellemeler</span>
          </div>
        </button>

        <button 
          className="social-btn linkedin-btn" 
          onClick={handleLinkedIn}
          title="LinkedIn'de bağlantı kurun"
        >
          <div className="btn-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div className="btn-content">
            <span className="btn-title">LinkedIn</span>
            <span className="btn-subtitle">Profesyonel ağımıza katılın</span>
          </div>
        </button>
      </div>

      <div className="contact-info">
        <div className="info-item">
          <span className="info-icon">📧</span>
          <span>info@everythingagent.com</span>
        </div>
        <div className="info-item">
          <span className="info-icon">📞</span>
          <span>+90 (212) 123 45 67</span>
        </div>
        <div className="info-item">
          <span className="info-icon">🏢</span>
          <span>İstanbul, Türkiye</span>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
