import React, { useState } from 'react';
import { trackFormSubmission } from './GoogleAnalytics';
import './InquiryForm.css';

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

interface InquiryFormProps {
  onSubmit?: (data: FormData) => void;
}

const InquiryForm = ({ onSubmit }: InquiryFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    department: '',
    currentAutomation: '',
    businessSize: '',
    primaryNeed: '',
    budget: '',
    timeline: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Track form submission
      trackFormSubmission('inquiry_form');
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      setSubmitSuccess(true);
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="inquiry-form-container">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h3>Teşekkür Ederiz!</h3>
          <p>Talebiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.</p>
          <button 
            className="new-form-btn"
            onClick={() => {
              setSubmitSuccess(false);
              setFormData({
                companyName: '',
                contactPerson: '',
                email: '',
                phone: '',
                department: '',
                currentAutomation: '',
                businessSize: '',
                primaryNeed: '',
                budget: '',
                timeline: '',
                additionalInfo: ''
              });
            }}
          >
            Yeni Form Doldur
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="inquiry-form-container">
      <div className="form-header">
        <h3>İhtiyaç Analizi Formu</h3>
        <p>Size en uygun çözümü sunabilmek için lütfen aşağıdaki bilgileri doldurun.</p>
      </div>

      <form onSubmit={handleSubmit} className="inquiry-form">
        <div className="form-section">
          <h4>📋 Şirket Bilgileri</h4>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="companyName">Şirket Adı *</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                placeholder="ABC Teknoloji Ltd."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactPerson">İletişim Kişisi *</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                required
                placeholder="Ahmet Yılmaz"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">E-posta *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="ahmet@sirket.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Telefon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+90 (212) 123 45 67"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4>🎯 İş Gereksinimleri</h4>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Hangi departman için çözüm arıyorsunuz? *</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              >
                <option value="">Seçiniz</option>
                <option value="customer-service">Müşteri Hizmetleri</option>
                <option value="sales">Satış</option>
                <option value="marketing">Pazarlama</option>
                <option value="hr">İnsan Kaynakları</option>
                <option value="finance">Finans</option>
                <option value="operations">Operasyon</option>
                <option value="it">Bilgi İşlem</option>
                <option value="all">Tüm Departmanlar</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="businessSize">Şirket Büyüklüğü</label>
              <select
                id="businessSize"
                name="businessSize"
                value={formData.businessSize}
                onChange={handleInputChange}
              >
                <option value="">Seçiniz</option>
                <option value="startup">Startup (1-10 kişi)</option>
                <option value="small">Küçük İşletme (11-50 kişi)</option>
                <option value="medium">Orta Ölçekli (51-250 kişi)</option>
                <option value="large">Büyük İşletme (250+ kişi)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="currentAutomation">Mevcut süreçlerinizde otomasyon var mı? *</label>
            <select
              id="currentAutomation"
              name="currentAutomation"
              value={formData.currentAutomation}
              onChange={handleInputChange}
              required
            >
              <option value="">Seçiniz</option>
              <option value="none">Hiç yok</option>
              <option value="basic">Temel düzeyde</option>
              <option value="moderate">Orta düzeyde</option>
              <option value="advanced">İleri düzeyde</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="primaryNeed">Öncelikli ihtiyacınız nedir? *</label>
            <select
              id="primaryNeed"
              name="primaryNeed"
              value={formData.primaryNeed}
              onChange={handleInputChange}
              required
            >
              <option value="">Seçiniz</option>
              <option value="customer-support">Müşteri destek otomasyonu</option>
              <option value="data-analysis">Veri analizi ve raporlama</option>
              <option value="process-optimization">Süreç optimizasyonu</option>
              <option value="sales-automation">Satış otomasyonu</option>
              <option value="document-management">Doküman yönetimi</option>
              <option value="integration">Sistem entegrasyonu</option>
              <option value="ai-chatbot">AI Chatbot</option>
              <option value="other">Diğer</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h4>💰 Proje Detayları</h4>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="budget">Bütçe Aralığı</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
              >
                <option value="">Seçiniz</option>
                <option value="under-10k">10.000 TL altı</option>
                <option value="10k-25k">10.000 - 25.000 TL</option>
                <option value="25k-50k">25.000 - 50.000 TL</option>
                <option value="50k-100k">50.000 - 100.000 TL</option>
                <option value="over-100k">100.000 TL üstü</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="timeline">Proje Zaman Çizelgesi</label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
              >
                <option value="">Seçiniz</option>
                <option value="asap">En kısa sürede</option>
                <option value="1-month">1 ay içinde</option>
                <option value="3-months">3 ay içinde</option>
                <option value="6-months">6 ay içinde</option>
                <option value="flexible">Esnek</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="additionalInfo">Ek Bilgiler</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows={4}
              placeholder="Özel gereksinimleriniz, mevcut sistemleriniz hakkında bilgi veya başka eklemek istediğiniz detaylar..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Gönderiliyor...
              </>            ) : (
              'TALEP ET'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;
