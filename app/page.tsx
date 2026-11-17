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
  const [preferredWater, setPreferredWater] = useState("")
  const neighborhoodInput = useRef<HTMLInputElement>(null)
  const normalizedPhone = useMemo(() => phone.replace(/\D/g, "").replace(/^0/, ""), [phone])
  const phoneIsValid = /^5\d{8}$/.test(normalizedPhone)
  const ready = Boolean(neighborhood.trim() && preferredWater) && phoneIsValid

  function goToOrder() {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "center" })
    window.setTimeout(() => neighborhoodInput.current?.focus(), 450)
  }

  function sendToWhatsApp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ready) return
    const message = `مرحباً، أرغب بمعرفة العروض المتاحة في حي ${neighborhood.trim()}.\nنوع المياه المفضل: ${preferredWater}\nرقم الجوال: +966${normalizedPhone}`
    window.open(`https://wa.me/966560757063?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
  }

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-[#f4f8fa] text-[#143b50]">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="روافد جدة، الرئيسية"><span className="brand-mark"><span /></span><span>رَوافِد <small>جدة</small></span></a>
        <a className="header-order" href="#order">سجّل الآن <ArrowLeft size={15} /></a>
      </header>

      <section id="top" className="hero-banner" aria-label="عروض مياه جدة">
        <picture className="hero-picture">
          <source media="(max-width: 760px)" srcSet="/jeddah-water-delivery-mobile.png" />
          <img src="/jeddah-water-hero-professional.png" alt="تشكيلة من عبوات مياه رِفا ونوفا وأكويا وصفا والبيان وبيرين والعين أمام أفق مدينة جدة" className="hero-image" />
        </picture>
        <div className="desktop-hero-actions">
          <button type="button" onClick={goToOrder} className="desktop-hero-action desktop-order-action">اطلب الآن</button>
          <a href="#brands" className="desktop-hero-action desktop-browse-action">تصفح المنتجات</a>
        </div>
        <div className="mobile-hero-copy">
          <div className="mobile-hero-heading"><h1>مياهك المفضلة… واصلة لحد بابك!</h1><p>تشكيلة من أشهر ماركات المياه في جدة</p></div>
          <div className="mobile-brand-strip" role="group" aria-label="ماركات المياه المتوفرة في جدة">{brands.map((brand) => <span key={brand.key} className={`mobile-brand-art brand-art-${brand.key}`} role="img" aria-label={`شعار ${brand.name}`} />)}</div>
          <a href="#brands" className="mobile-hero-action mobile-browse-action">تصفح المنتجات</a>
          <button type="button" onClick={goToOrder} className="mobile-hero-action mobile-order-action">اطلب الآن</button>
        </div>
      </section>

      <section id="brands" className="brands-section" aria-labelledby="brands-heading">
        <div className="brands-heading"><span><Sparkles size={16} /> اختيارات جدة المفضلة</span><h1 id="brands-heading">ماركات مياه نثق بجودتها</h1><p>اختاري من أشهر العلامات، ونوصلها لبابك مجاناً داخل جدة.</p></div>
        <div className="brand-list" aria-label="ماركات المياه المتوفرة">{brands.map((brand) => <article className="brand-card" key={brand.key}><div className={`brand-art brand-art-${brand.key}`} role="img" aria-label={`شعار ${brand.name}`} /><h2>{brand.name}</h2></article>)}</div>
        <a href="#order" className="browse-link">اكتشف العروض المتاحة <ArrowDown size={16} /></a>
      </section>

      <section id="order" className="order-section" aria-labelledby="order-heading">
        <div className="order-copy"><span className="section-kicker">خطوة واحدة تفصلك عن عرضك</span><h2 id="order-heading">خلّنا نوصّل لك<br /><span>العروض المناسبة لحيّك.</span></h2><p><strong>اكتب اسم الحي ورقم جوالك</strong>، وفريقنا بيتواصل معك على <span>واتساب.</span></p><div className="trust-line"><span className="trust-icon"><Phone size={16} /></span><span>تواصل مباشر وسريع عبر واتساب</span></div></div>
        <div className="lead-card">
          <form onSubmit={sendToWhatsApp} className="lead-form">
            <label className="sr-only" htmlFor="neighborhood">الحي</label>
            <div className="input-shell"><MapPin className="field-icon" size={19} aria-hidden="true" /><input ref={neighborhoodInput} id="neighborhood" type="text" value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} placeholder="اكتب اسم الحي" autoComplete="address-level3" required /></div>
            <label htmlFor="preferred-water">نوع المياه المفضل</label>
            <div className="input-shell select-shell"><select id="preferred-water" value={preferredWater} onChange={(event) => setPreferredWater(event.target.value)} required><option value="" disabled>اختر نوع المياه المفضل</option>{brands.map((brand) => <option key={brand.key} value={brand.name}>{brand.name}</option>)}</select></div>
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
