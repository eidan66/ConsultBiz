import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lead, LeadSource } from '@/entities/Lead';
import { Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext'; // Updated import path

export default function Hero() {
  const { t, language } = useLanguage(); // Use the language hook
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await Lead.create({
        ...formData,
        source: LeadSource.HERO_SECTION
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg mx-auto px-6"
        >
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('hero.submitted.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">
            {t('hero.submitted.message')}
          </p>
          <p className="text-sm text-slate-500">
            {t('hero.submitted.emailCta')}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100" dir={language === 'he' ? 'rtl' : 'ltr'}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-90 h-90 bg-emerald-100 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-90 h-90 bg-blue-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 py-12 pt-24 md:pt-12"> {/* Added pt-24 for navbar */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: language === 'he' ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:pr-8"
          >
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('hero.headline.main')}{' '}
              <span className="text-emerald-600 relative">
                {t('hero.headline.highlight')}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-emerald-200"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('hero.subheadline')}
            </motion.p>

            {/* Key benefits */}
            <motion.div
              className="space-y-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {[
                t('hero.benefit1'),
                t('hero.benefit2'),
                t('hero.benefit3')
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-slate-700">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: language === 'he' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
              <div className="text-center mb-6">
                <Calendar className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('hero.form.title')}</h3>
                <p className="text-slate-600">{t('hero.form.subtitle')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="full_name" className="text-slate-700 font-medium">{t('hero.form.nameLabel')}</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    placeholder={t('hero.form.namePlaceholder')}
                    required
                    className="mt-2 h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-700 font-medium">{t('hero.form.emailLabel')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={t('hero.form.emailPlaceholder')}
                    required
                    className="mt-2 h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-slate-700 font-medium">{t('hero.form.phoneLabel')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder={t('hero.form.phonePlaceholder')}
                    className="mt-2 h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.full_name || !formData.email}
                  className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('hero.form.submitting')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>{t('hero.form.button')}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </form>

              <p className="text-xs text-slate-500 text-center mt-4">
                {t('hero.form.privacy')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
