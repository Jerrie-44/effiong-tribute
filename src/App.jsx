import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import profileImage from './assets/profile.png';
import backgroundTexture from './assets/images/paper-texture.png';

export default function App() {
  const form = useRef(); 
  
  const [formData, setFormData] = useState({ 
    from_name: '', 
    relationship: '', 
    message: '' 
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.from_name || !formData.message) return;

    setIsSending(true);
    setError(null);

    // Your actual EmailJS keys
    const YOUR_SERVICE_ID = "service_hcrnijm";
    const YOUR_TEMPLATE_ID = "template_raeu39l";
    const YOUR_PUBLIC_KEY = "1DtOx2QwSGzv5tHgp";

    emailjs
      .sendForm(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        form.current,
        { publicKey: YOUR_PUBLIC_KEY }
      )
      .then(
        () => {
          setSubmitted(true);
          setIsSending(false);
          setFormData({ from_name: '', relationship: '', message: '' });
          setTimeout(() => setSubmitted(false), 5000);
        },
        (error) => {
          console.error('FAILED...', error.text);
          setError("Something went wrong. Please try again.");
          setIsSending(false);
        },
      );
  };

  return (
    <div 
      className="min-h-screen font-sans text-tribute-olive relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${backgroundTexture})`,
        backgroundColor: '#fdfdfb' 
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col items-center text-center relative z-10">
        
        {/* Header Section */}
        <p className="italic font-serif text-xl mb-8 text-tribute-olive/80">In loving memory of</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10 w-full">
          {/* UPDATED DATE (Desktop) */}
          <span className="font-serif text-xl tracking-wide hidden md:block">July 20, 1959</span>
          
          <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-xl grayscale">
            <img src={profileImage} alt="Bassey Effiong Asuquo" className="w-full h-full object-cover" />
          </div>

          {/* UPDATED DATE (Desktop) */}
          <span className="font-serif text-xl tracking-wide hidden md:block">October 25, 2025</span>
        </div>

        {/* UPDATED DATE (Mobile) */}
        <div className="md:hidden flex justify-center gap-8 text-sm font-serif mb-8 w-full">
            <span>July 20, 1959</span>
            <span>-</span>
            <span>Oct 25, 2025</span>
        </div>

        {/* UPDATED NAME */}
        <h1 className="text-4xl md:text-6xl font-serif tracking-wide mb-2">BASSEY EFFIONG,</h1>
        <h2 className="text-4xl md:text-6xl font-serif tracking-wide mb-12">ASUQUO</h2>

        <p className="text-lg mb-12 max-w-lg leading-relaxed">Leave a tribute to celebrate his life and legacy</p>

        {/* --- FORM SECTION --- */}
        {submitted ? (
          <div className="bg-tribute-sage text-white p-8 rounded-lg shadow-lg animate-fade-in">
            <h3 className="text-2xl font-serif mb-2">Thank you</h3>
            <p>Your tribute has been sent to the family.</p>
          </div>
        ) : (
          <form ref={form} onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 text-left">
            
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 ml-1">Your Name *</label>
                <input 
                  type="text" 
                  name="from_name"  
                  value={formData.from_name || ''}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-lg bg-white/80 border border-tribute-olive/20 focus:outline-none focus:ring-2 focus:ring-tribute-sage transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 ml-1">Relationship</label>
                <input 
                  type="text" 
                  name="relationship"
                  value={formData.relationship || ''}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg bg-white/80 border border-tribute-olive/20 focus:outline-none focus:ring-2 focus:ring-tribute-sage transition-all"
                  placeholder="e.g. Friend, Family"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 ml-1">Your Message *</label>
              <textarea 
                name="message"
                rows="5"
                value={formData.message || ''}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg bg-white/80 border border-tribute-olive/20 focus:outline-none focus:ring-2 focus:ring-tribute-sage transition-all resize-none"
                placeholder="Share a cherished memory..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSending}
              className={`w-full py-4 text-white font-serif text-lg tracking-wide rounded-lg shadow-md transition-all 
                ${isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-tribute-sage hover:bg-tribute-sage-dark hover:shadow-lg hover:-translate-y-1'}`}
            >
              {isSending ? 'Sending...' : 'Send Tribute'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}