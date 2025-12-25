import React from 'react';

const ContactView = () => {
  return (
    <div className="min-h-screen bg-[#f8f4f0] py-6 sm:py-10 px-3 sm:px-4 flex items-center justify-center">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl max-w-2xl w-full p-6 sm:p-8 md:p-10">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-[#3a3a3a] text-center">Contact Us</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">Have a question or custom request? Send us a message and we’ll reply as soon as possible.</p>
        <form className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Name" className="w-full p-3 border rounded-xl focus:outline-none" />
            <input name="email" type="email" placeholder="Email" className="w-full p-3 border rounded-xl focus:outline-none" />
          </div>
          <textarea name="message" rows="5" placeholder="Message" className="w-full p-3 border rounded-xl focus:outline-none" />
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-3 rounded-xl bg-[#3a3a3a] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#d4b896] transition-colors">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactView;
