import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    setError('');

    const payload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      _subject: 'Nouveau message depuis le site Makda',
    };

    console.log('Sending data:', payload);

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/makda.restaurant@gmail.com',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openingHours = [
    { day: 'Lundi', hours: 'Fermé' },
    { day: 'Mar - Sam', hours: '11:30 - 14:30 18:30 - 23:00' },
    { day: 'Dimanche', hours: '12:00 - 17:00' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact - Makda Restaurant</title>
        <meta name="description" content="Contactez le restaurant Makda à Bernex, Genève. Téléphone, email, horaires d'ouverture et formulaire de contact." />
      </Helmet>

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/restaurant_at_night_(1) copy.png"
            alt="Contact Makda"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white" style={{ fontWeight: 100 }}>Contact & Réservation</h1>
          <p className="text-xl text-white/90" style={{ fontWeight: 100 }}>Nous avons hâte de vous accueillir chez Makda.</p>
        </motion.div>
      </section>

      <section className="py-24 px-4" style={{ backgroundColor: '#FFDBB5' }}>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif text-brown-dark mb-8" style={{ fontWeight: 300 }}>
                Nos Coordonnées
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-gold-light rounded-full p-3 flex-shrink-0">
                    <MapPin size={24} className="text-brown-dark" />
                  </div>
                  <div>
                    <h3 className="text-brown-dark text-lg mb-2" style={{ fontWeight: 300 }}>Adresse</h3>
                    <p className="text-brown-dark/80" style={{ fontWeight: 100 }}>
                      Rue de Bernex 224<br />
                      1233 Bernex, Suisse
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gold-light rounded-full p-3 flex-shrink-0">
                    <Phone size={24} className="text-brown-dark" />
                  </div>
                  <div>
                    <h3 className="text-brown-dark text-lg mb-2" style={{ fontWeight: 300 }}>Téléphone</h3>
                    <a href="tel:+41766792845" className="text-brown-dark/80 hover:text-brown-deep transition-colors" style={{ fontWeight: 100 }}>
                      +41 76 679 28 45
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gold-light rounded-full p-3 flex-shrink-0">
                    <Mail size={24} className="text-brown-dark" />
                  </div>
                  <div>
                    <h3 className="text-brown-dark text-lg mb-2" style={{ fontWeight: 300 }}>Email</h3>
                    <a href="mailto:contact@makda.ch" className="text-brown-dark/80 hover:text-brown-deep transition-colors" style={{ fontWeight: 100 }}>
                      contact@makda.ch
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-brown-deep rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={28} className="text-gold-light" />
                  <h3 className="text-2xl font-serif text-white" style={{ fontWeight: 300 }}>
                    Horaires d'ouverture
                  </h3>
                </div>
                <div className="space-y-3">
                  {openingHours.map((item, index) => (
                    <div key={index} className="flex justify-between items-center pb-3 border-b border-white/10 last:border-0">
                      <span className="text-white" style={{ fontWeight: 300 }}>{item.day}</span>
                      <span className={`${item.hours === 'Fermé' ? 'text-white/50' : 'text-white/80'}`} style={{ fontWeight: 100 }}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-brown-deep rounded-2xl p-8 shadow-xl h-full">
                <h2 className="text-3xl font-serif text-white mb-4" style={{ fontWeight: 300 }}>
                  Nous contacter
                </h2>
                <p className="text-white/80 mb-8" style={{ fontWeight: 100 }}>
                  Une question ? Une demande particulière ? Écrivez-nous.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/90 mb-2 text-sm" style={{ fontWeight: 300 }}>
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold-muted transition-colors disabled:opacity-50"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/90 mb-2 text-sm" style={{ fontWeight: 300 }}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold-muted transition-colors disabled:opacity-50"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/90 mb-2 text-sm" style={{ fontWeight: 300 }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold-muted transition-colors resize-none disabled:opacity-50"
                      placeholder="Votre message..."
                    />
                  </div>

                  {isSuccess && (
                    <div className="p-4 rounded-lg bg-green-500/20 text-green-100" style={{ fontWeight: 100 }}>
                      Merci ! Nous avons reçu votre message.
                    </div>
                  )}

                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/20 text-red-100" style={{ fontWeight: 100 }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-brown-dark px-8 py-4 rounded-full hover:bg-gold-light transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontWeight: 300 }}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 flex items-center justify-center" style={{ backgroundColor: '#FFDBB5' }}>
        <div className="w-full max-w-4xl h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2763.164627468604!2d6.0696773!3d46.1673900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c7b2e3c000001%3A0x6280628062806280!2sRue%20de%20Bernex%20224%2C%201233%20Bernex%2C%20Switzerland!5e0!3m2!1sfr!2sch!4v1766939229453"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Makda Restaurant Location"
          />
        </div>
      </section>
    </>
  );
};

export default Contact;
