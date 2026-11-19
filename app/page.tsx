"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowDown, ArrowLeft, BadgePercent, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react"

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
  const [orderSectionVisible, setOrderSectionVisible] = useState(false)
  const neighborhoodInput = useRef<HTMLInputElement>(null)
  const orderSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const orderSection = orderSectionRef.current
    if (!orderSection) return
    const observer = new IntersectionObserver(([entry]) => setOrderSectionVisible(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(orderSection)
    return () => observer.disconnect()
  }, [])
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

      <section id="top" className="hero-banner hero-poster-banner" aria-label="عروض مياه جدة">
        <h1 className="sr-only">مياه شرب نقية تصل إلى باب منزلك في جدة</h1>
        <a href="#order" className="hero-poster-link" aria-label="تسوق الآن، واطلب مياهك لتوصلك إلى منزلك">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1795097375293-r23QkDtCWR3lnZMlepAABDmCSD7iwP.jpg" alt="ملصق ترويجي لمياه جدة يعرض شعارات العلامات التجارية وعبوات مياه ومركبة توصيل، مع عبارة مياه شرب نقية تصل إلى باب منزلك وزر تسوق الآن" className="hero-poster-image" />
        </a>
      </section>

      <section className="offer-banner" aria-labelledby="offer-heading">
        <span className="offer-icon" aria-hidden="true"><BadgePercent size={34} strokeWidth={1.8} /></span>
        <div className="offer-copy"><span className="offer-kicker">العرض اللي تنتظرونه</span><h2 id="offer-heading">عروض الـ10 ريال <span>رجعت!</span></h2><p>اطلب الآن واستمتع بتوصيل مجاني حتى باب منزلك.</p></div>
        <a className="offer-cta" href="#order">اطلب الآن <ArrowLeft size={17} /></a>
      </section>

      <section id="order" ref={orderSectionRef} className="order-section" aria-labelledby="order-heading">
        <div className="order-copy"><span className="section-kicker">طلبك بخطوات بسيطة</span><h2 id="order-heading">اطلبها الآن،<br /><span>وتوصلك إلى باب بيتك مجانًا</span></h2></div>
        <div className="lead-card">
          <form onSubmit={sendToWhatsApp} className="lead-form">
            <label className="sr-only" htmlFor="neighborhood">الحي</label>
            <div className="input-shell"><MapPin className="field-icon" size={19} aria-hidden="true" /><input ref={neighborhoodInput} id="neighborhood" type="text" value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} placeholder="اكتب اسم الحي" autoComplete="address-level3" required /></div>
            <label htmlFor="preferred-water">نوع المياه المفضل</label>
            <div className="input-shell select-shell"><select id="preferred-water" value={preferredWater} onChange={(event) => setPreferredWater(event.target.value)} required><option value="" disabled>اختر نوع المياه المفضل</option>{brands.map((brand) => <option key={brand.key} value={brand.name}>{brand.name}</option>)}</select></div>
            <label htmlFor="phone">رقم الجوال</label>
            <div className="input-shell phone-shell" dir="ltr"><span className="saudi-flag" aria-label="علم المملكة العربية السعودية"><span>لا إله إلا الله</span><i /></span><span className="dial-code">+966</span><span className="phone-divider" /><input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={phone} onChange={(event) => setPhone(event.target.value.replace(/[^\d\s]/g, ""))} placeholder="5XXXXXXXX" aria-describedby="phone-hint" required /><Phone className="field-icon phone-icon" size={17} aria-hidden="true" /></div>
            <span id="phone-hint" className="field-hint">أدخل رقمك بصيغة 5XXXXXXXX</span>
            <div className="minimum-order" role="note"><span>الحد الأدنى للطلب</span><strong>٣٠ كرتون</strong></div>
            <button className="whatsapp-button" type="submit" disabled={!ready}><MessageCircle size={20} fill="currentColor" strokeWidth={1.6} /><span>إرسال عبر الواتساب</span><ArrowLeft className="submit-arrow" size={18} /></button>
            <p className="privacy-note"><span>بالإرسال، توافق على التواصل معك بخصوص العروض.</span></p>
          </form>
        </div>
      </section>

      <section id="brands" className="brands-section" aria-labelledby="brands-heading">
        <div className="brands-heading"><span><Sparkles size={16} /> اختيارات جدة المفضلة</span><h1 id="brands-heading">ماركات مياه نثق بجودتها</h1><p>اختاري من أشهر العلامات، ونوصلها لبابك مجاناً داخل جدة.</p></div>
        <div className="brand-list" aria-label="ماركات المياه المتوفرة">{brands.map((brand) => <article className="brand-card" key={brand.key}><div className={`brand-art brand-art-${brand.key}`} role="img" aria-label={`شعار ${brand.name}`} /><h2>{brand.name}</h2></article>)}</div>
        <a href="#order" className="browse-link">اكتشف العروض المتاحة <ArrowDown size={16} /></a>
      </section>

      <footer className="site-footer"><span>رَوافِد جدة</span><span>عروض محلية، على مزاجك.</span></footer>
      {!orderSectionVisible && <a className="floating-whatsapp" href="https://wa.me/966560757063" target="_blank" rel="noopener noreferrer" aria-label="تواصل معنا عبر واتساب"><MessageCircle size={26} aria-hidden="true" /><span className="sr-only">تواصل معنا عبر واتساب</span></a>}
    </main>
  )
}
