"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react"
import { JeddahMap } from "@/components/jeddah-map"

const neighborhoods = ["البلد", "الجامعة", "الفيحاء", "الروابي", "القريات", "غليل", "النزلة", "النزلة الشرقية", "الحرازات", "أبرق الرغامة", "الثعالبة"]

export default function Page() {
  const [neighborhood, setNeighborhood] = useState("")
  const [phone, setPhone] = useState("")
  const normalizedPhone = useMemo(() => phone.replace(/\D/g, "").replace(/^0/, ""), [phone])
  const phoneIsValid = /^5\d{8}$/.test(normalizedPhone)
  const ready = Boolean(neighborhood.trim()) && phoneIsValid

  function sendToWhatsApp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ready) return
    const message = `مرحباً، أرغب بمعرفة العروض المتاحة في حي ${neighborhood}.\nرقم الجوال: +966${normalizedPhone}`
    window.open(`https://wa.me/966560757063?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
  }

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-[#f4f8fa] text-[#143b50]">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="روافد جدة، الرئيسية"><span className="brand-mark"><span /></span><span>رَوافِد <small>جدة</small></span></a>
        <span className="header-note"><span className="live-dot" /> عروض خاصة لسكان جدة</span>
      </header>

      <section id="top" className="landing-shell">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15} /> عروض أقرب إليك</div>
          <h1>جدة أقرب…<br /><span>والعروض أقرب لك.</span></h1>
          <p>اختر حيّك وسجّل رقمك، ونوصلك بأفضل العروض المناسبة لك.</p>
          <div className="trust-line"><span className="trust-icon"><Phone size={15} /></span> تواصل مباشر وسريع عبر واتساب</div>
        </div>

        <section className="lead-card" aria-label="نموذج التسجيل">
          <div className="card-heading"><div><span className="section-kicker">خطوة واحدة تفصلك</span><h2>اختر حَيَّك</h2></div><span className="step-number">01 <span>/ 02</span></span></div>
          <JeddahMap selected={neighborhood} onSelect={setNeighborhood} />
          <div className="form-intro"><h3>لا تفوتك العروض، سجل جوالك وبنتصل عليك:</h3><p>نعرف حيّك عشان نرسل لك اللي يهمّك فقط.</p></div>
          <form onSubmit={sendToWhatsApp} className="lead-form">
            <label htmlFor="neighborhood">الحي</label>
            <div className="input-shell">
              <MapPin className="field-icon" size={19} aria-hidden="true" />
              <input id="neighborhood" list="jeddah-neighborhoods" value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} placeholder="ابحث عن حيّك أو اختره من الخريطة" autoComplete="address-level3" required />
              <datalist id="jeddah-neighborhoods">{neighborhoods.map((name) => <option key={name} value={name} />)}</datalist>
            </div>
            <label htmlFor="phone">رقم الجوال</label>
            <div className="input-shell phone-shell" dir="ltr">
              <span className="saudi-flag" aria-label="علم المملكة العربية السعودية"><span>لا إله إلا الله</span><i /></span>
              <span className="dial-code">+966</span>
              <span className="phone-divider" />
              <input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={phone} onChange={(event) => setPhone(event.target.value.replace(/[^\d\s]/g, ""))} placeholder="5XXXXXXXX" aria-describedby="phone-hint" required />
              <Phone className="field-icon phone-icon" size={17} aria-hidden="true" />
            </div>
            <span id="phone-hint" className="field-hint">أدخل رقمك بصيغة 5XXXXXXXX</span>
            <button className="whatsapp-button" type="submit" disabled={!ready}><MessageCircle size={20} fill="currentColor" strokeWidth={1.6} /><span>إرسال عبر الواتساب</span><ArrowLeft className="submit-arrow" size={18} /></button>
            <p className="privacy-note"><strong>الحد الأدنى للطلب ٣٠ كرتون</strong><span> • بالإرسال، توافق على التواصل معك بخصوص العروض.</span></p>
          </form>
        </section>
      </section>
      <footer className="site-footer"><span>رَوافِد جدة</span><span>عروض محلية، على مزاجك.</span></footer>
    </main>
  )
}
