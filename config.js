/**
 * مكتب العاصمة الهندسي — Capital Group Engineering Consultants
 * ============================================================
 * ملف الإعدادات — أضف بياناتك هنا قبل رفع الإعلانات
 * ============================================================
 *
 * ★ خطوات الإعداد:
 * 1. GA4_ID              <- Google Analytics 4
 * 2. GOOGLE_ADS_ID       <- Google Ads Account ID
 * 3. GOOGLE_ADS_CONVERSION_LABEL_* <- من Google Ads -> Conversions
 * 4. META_PIXEL_ID       <- Meta Business -> Events Manager
 * 5. CLARITY_ID          <- Microsoft Clarity (مجاني)
 * 6. GTM_ID              <- Google Tag Manager (اختياري)
 * 7. TIKTOK_PIXEL_ID     <- TikTok Ads (اختياري)
 * 8. SNAPCHAT_PIXEL_ID   <- Snapchat Ads (اختياري)
 */

const COMPANY_CONFIG = {
  COMPANY_NAME_AR:    'مكتب العاصمة الهندسي',
  COMPANY_NAME_EN:    'CAPITAL GROUP',
  COMPANY_SUBTITLE_EN:'ENGINEERING CONSULTANTS',
  TAGLINE_AR:         'شريكك في إعداد الرسومات التنفيذية التفصيلية',

  PHONE_NUMBER:    '+966503031080',
  WHATSAPP_NUMBER: '966503031080',
  EMAIL:           '',
  LOCATION:        'الرياض، المملكة العربية السعودية',

  GA4_ID:                            '',
  GOOGLE_ADS_ID:                     '',
  GOOGLE_ADS_CONVERSION_LABEL_LEAD:  '',
  GOOGLE_ADS_CONVERSION_LABEL_WA:    '',
  GOOGLE_ADS_CONVERSION_LABEL_PHONE: '',

  META_PIXEL_ID:     '',
  GTM_ID:            '',
  CLARITY_ID:        '',
  TIKTOK_PIXEL_ID:   '',
  SNAPCHAT_PIXEL_ID: '',
};

/* UTM Tracker */
var UTM = (function() {
  function capture() {
    var params = new URLSearchParams(window.location.search);
    var utm = {
      source:   params.get('utm_source')   || '',
      medium:   params.get('utm_medium')   || '',
      campaign: params.get('utm_campaign') || '',
      gclid:    params.get('gclid')        || '',
      fbclid:   params.get('fbclid')       || '',
      ttclid:   params.get('ttclid')       || '',
    };
    if (Object.values(utm).some(function(v){return v;}))
      sessionStorage.setItem('utm_data', JSON.stringify(utm));
    return utm;
  }
  function get() {
    var s = sessionStorage.getItem('utm_data');
    return s ? JSON.parse(s) : capture();
  }
  function toText() {
    var u = get(); var p = [];
    if (u.source)   p.push('المصدر: ' + u.source);
    if (u.medium)   p.push('القناة: ' + u.medium);
    if (u.campaign) p.push('الحملة: ' + u.campaign);
    if (u.gclid)    p.push('Google Ad');
    if (u.fbclid)   p.push('Meta Ad');
    if (u.ttclid)   p.push('TikTok Ad');
    return p.length ? '\n📊 *مصدر الإعلان:* ' + p.join(' | ') : '';
  }
  capture();
  return { get: get, toText: toText };
})();

/* Apply Config */
(function applyConfig() {
  document.addEventListener('DOMContentLoaded', function() {
    var cfg = COMPANY_CONFIG;

    ['ctaPhone','mobileStickyPhone','footerPhone'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el && cfg.PHONE_NUMBER) { el.href = 'tel:' + cfg.PHONE_NUMBER; el.setAttribute('data-track','phone_click'); }
    });

    ['heroWhatsApp','ctaWhatsApp','whatsappFloat','mobileStickyWa','footerWhatsApp'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el && cfg.WHATSAPP_NUMBER) { el.href = 'https://wa.me/' + cfg.WHATSAPP_NUMBER; el.target = '_blank'; el.rel = 'noopener noreferrer'; }
    });

    var pd = document.getElementById('phoneDisplay');
    if (pd) pd.textContent = cfg.PHONE_NUMBER || '-';
    var wd = document.getElementById('waDisplay');
    if (wd) wd.textContent = cfg.WHATSAPP_NUMBER ? '+' + cfg.WHATSAPP_NUMBER : '-';
    var em = document.getElementById('footerEmail');
    if (em && cfg.EMAIL) { em.href = 'mailto:' + cfg.EMAIL; em.textContent = cfg.EMAIL; }
    var yr = document.getElementById('currentYear');
    if (yr) yr.textContent = new Date().getFullYear();

    if (cfg.GTM_ID) {
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',cfg.GTM_ID);
    }

    var gtagId = cfg.GA4_ID || cfg.GOOGLE_ADS_ID;
    if (gtagId) {
      var s = document.createElement('script'); s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gtagId;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { dataLayer.push(arguments); };
      window.gtag('js', new Date());
      if (cfg.GA4_ID) window.gtag('config', cfg.GA4_ID, { page_location: location.href });
      if (cfg.GOOGLE_ADS_ID) window.gtag('config', cfg.GOOGLE_ADS_ID);
    }

    if (cfg.META_PIXEL_ID) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', cfg.META_PIXEL_ID);
      window.fbq('track', 'PageView');
    }

    if (cfg.CLARITY_ID) {
      (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script',cfg.CLARITY_ID);
    }

    if (cfg.TIKTOK_PIXEL_ID) {
      !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=r+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load(cfg.TIKTOK_PIXEL_ID);ttq.page();}(window,document,'ttq');
    }

    if (cfg.SNAPCHAT_PIXEL_ID) {
      (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src='https://sc-static.net/scevent.min.js';var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document);
      window.snaptr('init', cfg.SNAPCHAT_PIXEL_ID);
      window.snaptr('track', 'PAGE_VIEW');
    }
  });
})();

/* Analytics */
var Analytics = {
  track: function(eventName, params) {
    params = params || {};
    var cfg = COMPANY_CONFIG;
    var isDev = window.location.protocol === 'file:' || window.location.hostname === 'localhost';
    if (isDev) console.log('%c[Analytics] ' + eventName, 'color:#9C7A3C;font-weight:bold', params);

    if (window.gtag && cfg.GA4_ID) window.gtag('event', eventName, params);

    if (window.gtag && cfg.GOOGLE_ADS_ID) {
      var label = eventName === 'lead_form_submit' ? cfg.GOOGLE_ADS_CONVERSION_LABEL_LEAD
                : eventName === 'whatsapp_click'   ? cfg.GOOGLE_ADS_CONVERSION_LABEL_WA
                : eventName === 'phone_click'       ? cfg.GOOGLE_ADS_CONVERSION_LABEL_PHONE : '';
      if (label) {
        window.gtag('event', 'conversion', { send_to: cfg.GOOGLE_ADS_ID + '/' + label, value: 1.0, currency: 'SAR' });
        if (isDev) console.log('[Google Ads Conversion]', label);
      }
    }

    if (window.fbq && cfg.META_PIXEL_ID) {
      if (eventName === 'lead_form_submit') window.fbq('track', 'Lead', { content_name: params.service || '' });
      else if (eventName === 'whatsapp_click' || eventName === 'phone_click') window.fbq('track', 'Contact');
    }

    if (window.ttq && cfg.TIKTOK_PIXEL_ID) {
      if (eventName === 'lead_form_submit') window.ttq.track('SubmitForm');
      else if (eventName === 'whatsapp_click' || eventName === 'phone_click') window.ttq.track('Contact');
    }

    if (window.snaptr && cfg.SNAPCHAT_PIXEL_ID) {
      if (eventName === 'lead_form_submit') window.snaptr('track', 'SIGN_UP');
    }
  },

  trackScroll: function() {
    var fired = {};
    window.addEventListener('scroll', function() {
      var total = document.body.scrollHeight - window.innerHeight;
      if (!total) return;
      var pct = Math.round((window.scrollY / total) * 100);
      [25, 50, 75, 90].forEach(function(t) {
        if (pct >= t && !fired[t]) { fired[t] = true; Analytics.track('scroll_depth', { percent: t }); }
      });
    }, { passive: true });
  }
};

Analytics.trackScroll();
