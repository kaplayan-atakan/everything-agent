import React from 'react';
import './CustomerEmailCard.css';

interface CustomerEmailCardProps {
  customerName?: string;
  companyName?: string;
}

const CustomerEmailCard = ({ 
  customerName = "Değerli Müşterimiz", 
  companyName = "Everything Agent" 
}: CustomerEmailCardProps) => {
  return (
    <div className="email-card">
      <div className="email-header">
        <h2 className="company-name">{companyName}</h2>
        <div className="email-date">
          {new Date().toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
      
      <div className="email-content">
        <div className="greeting">
          <h3>Merhaba {customerName},</h3>
        </div>
        
        <div className="email-body">
          <p>
            <strong>Everything Agent</strong> olarak, işletmenizin dijital dönüşüm 
            yolculuğunda yanınızda olmaktan mutluluk duyuyoruz.
          </p>
          
          <p>
            Yapay zeka destekli çözümlerimizle, iş süreçlerinizi otomatikleştirerek 
            verimliliğinizi artırmayı hedefliyoruz. Müşteri hizmetlerinden operasyonel 
            süreçlere kadar geniş bir yelpazede hizmet sunuyoruz.
          </p>
          
          <div className="highlight-box">
            <h4>🚀 Neler Sunuyoruz?</h4>
            <ul>
              <li>Akıllı müşteri hizmetleri otomasyonu</li>
              <li>Veri analizi ve raporlama çözümleri</li>
              <li>İş süreçleri optimizasyonu</li>
              <li>7/24 teknik destek</li>
            </ul>
          </div>
          
          <p>
            İhtiyaçlarınızı daha iyi anlayabilmek ve size özel çözümler 
            sunabilmek için aşağıdaki formu doldurmanızı rica ediyoruz.
          </p>
        </div>
        
        <div className="email-signature">
          <div className="signature-line">
            <p><strong>Saygılarımızla,</strong></p>
            <p><strong>Everything Agent Ekibi</strong></p>
            <p className="contact-info">
              📧 info@everythingagent.com | 📞 +90 (212) 123 45 67
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerEmailCard;
