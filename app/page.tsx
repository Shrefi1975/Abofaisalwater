"use client"

import { useMemo, useRef, useState } from "react"
import { ArrowDown, ArrowLeft, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react"

const brands = [
  { name: "مياه رِفا", key: "rifa" },
  { name: "مياه نوفا", key: "nova" },
  { name: "مياه أكويا", key: "akoya" },
  { name: "مياه صفا", key: "safa" },
  { name: "مياه البيان", key: "al-bayan" },
  { name: "مياه بيرين", key: "berain" },
  { name: "مياه العين", key: "al-ain" },
]

export default function Page() {
  const [neighborhood, setNeighborhood] = useState("")
  const [phone, setPhone] = useState("")
  const neighborhoodInput = useRef<HTMLInputElement>(null)
  const normalizedPhone = useMemo(() => phone.replace(/\D/g, "").replace(/^0/, ""), [phone])
  const phoneIsValid = /^5\d{8}$/.test(normalizedPhone)
  const ready = Boolean(neighborhood.trim()) && phoneIsValid

  function goToOrder() {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "center" })
    window.setTimeout(() => neighborhoodInput.current?.focus(), 450)
  }

  function sendToWhatsApp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ready) return
    const message = `مرحباً، أرغب بمعرفة العروض المتاحة في حي ${neighborhood.trim()}.\nرقم الجوال: +966${normalizedPhone}`
    window.open(`https://wa.me/966560757063?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
  }

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-[#f4f8fa] text-[#143b50]">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="روافد جدة، الرئيسية"><span className="brand-mark"><span /></span><span>رَوافِد <small>جدة</small></span></a>
        <a className="header-order" href="#order">سجّل الآن <ArrowLeft size={15} /></a>
      </header>

      <section id="top" className="hero-banner" aria-label="عروض مياه جدة">
        <img src="/jeddah-water-delivery-hero.jpg" alt="عروض توصيل المياه المجاني في جدة مع تشكيلة من أشهر الماركات" className="hero-image" />
        <button className="hero-hotspot order-hotspot" type="button" onClick={goToOrder} aria-label="اطلب الآن"><span className="sr-only">اطلب الآن</span></button>
        <a className="hero-hotspot browse-hotspot" href="#brands" aria-label="تصفح المنتجات"><span className="sr-only">تصفح المنتجات</span></a>
      </section>

      <section id="brands" className="brands-section" aria-labelledby="brands-heading">
        <div className="brands-heading"><span><Sparkles size={16} /> اختيارات جدة المفضلة</span><h1 id="brands-heading">ماركات مياه نثق بجودتها</h1><p>اختاري من أشهر العلامات، ونوصلها لبابك مجاناً داخل جدة.</p></div>
        <div className="brand-list" aria-label="ماركات المياه المتوفرة">{brands.map((brand) => <article className="brand-card" key={brand.key}><div className={`brand-art brand-art-${brand.key}`} role="img" aria-label={`شعار ${brand.name}`} /><h2>{brand.name}</h2></article>)}</div>
        <a href="#order" className="browse-link">اكتشف العروض المتاحة <ArrowDown size={16} /></a>
      </section>

      <section id="order" className="order-section" aria-labelledby="order-heading">
        <div className="order-copy"><span className="section-kicker">خطوة واحدة تفصلك عن عرضك</span><h2 id="order-heading">خلّنا نوصّل لك<br /><span>العروض المناسبة لحيّك.</span></h2><p>اكتب اسم الحي ورقم جوالك، وفريقنا بيتواصل معك على واتساب.</p><div className="trust-line"><span className="trust-icon"><Phone size={15} /></span> تواصل مباشر وسريع عبر واتساب</div></div>
        <div className="lead-card">
          <div className="form-intro"><span className="step-number">01 <span>/ 02</span></span><h3>لا تفوتك العروض، سجل جوالك وبنتصل عليك:</h3><p>اكتب اسم الحي يدوياً لنرسل لك العروض القريبة منك.</p></div>
          <form onSubmit={sendToWhatsApp} className="lead-form">
            <label htmlFor="neighborhood">الحي</label>
            <div className="input-shell"><MapPin className="field-icon" size={19} aria-hidden="true" /><input ref={neighborhoodInput} id="neighborhood" type="text" value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} placeholder="اكتب اسم الحي" autoComplete="address-level3" required /></div>
            <label htmlFor="phone">رقم الجوال</label>
            <div className="input-shell phone-shell" dir="ltr"><span className="saudi-flag" aria-label="علم المملكة العربية السعودية"><span>لا إله إلا الله</span><i /></span><span className="dial-code">+966</span><span className="phone-divider" /><input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={phone} onChange={(event) => setPhone(event.target.value.replace(/[^\d\s]/g, ""))} placeholder="5XXXXXXXX" aria-describedby="phone-hint" required /><Phone className="field-icon phone-icon" size={17} aria-hidden="true" /></div>
            <span id="phone-hint" className="field-hint">أدخل رقمك بصيغة 5XXXXXXXX</span>
            <button className="whatsapp-button" type="submit" disabled={!ready}><MessageCircle size={20} fill="currentColor" strokeWidth={1.6} /><span>إرسال عبر الواتساب</span><ArrowLeft className="submit-arrow" size={18} /></button>
            <p className="privacy-note"><strong>الحد الأدنى للطلب ٣٠ كرتون</strong><span> • بالإرسال، توافق على التواصل معك بخصوص العروض.</span></p>
          </form>
        </div>
      </section>
      <footer className="site-footer"><span>رَوافِد جدة</span><span>عروض محلية، على مزاجك.</span></footer>
    </main>
  )
}
