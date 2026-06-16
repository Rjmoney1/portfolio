const PORTFOLIO_CONFIG = {
  // Social Profile Links (Top and Bottom of the website)
  socialLinks: {
    linkedin: "https://linkedin.com",
    github: "https://github.com/Rjmoney1",
    selfmadeNinja: "https://labs.selfmade.ninja/M7", // Point to #about or paste your academy profile URL
    instagram: "https://www.instagram.com/rj_mani_fx?igsh=emtpMTRuY2k4NnQ5"
  },
  
  // Contact details (Form targets, email buttons, and phone links)
  contactInfo: {
    email: "rrajamanikandan7@gmail.com",
    phone: "8122850816"
  },
  
  // Contact form submission routing service
  contactFormService: {
    // Supported providers: "simulation" (local test), "web3forms" (direct to email), or "formspree" (direct to email)
    // To receive messages in your inbox, change "simulation" to "web3forms" and paste your Access Key below.
    provider: "web3forms",
    
    // Web3Forms configuration (https://web3forms.com - free, no registration required, just submit your email on their site to get a key)
    // Paste your Web3Forms Access Key here:
    web3FormsAccessKey: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
    
    // Formspree configuration (https://formspree.io - alternative option)
    // Paste your Formspree Form ID or URL here:
    formspreeUrl: ""
  }
};
