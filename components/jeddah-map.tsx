"use client"

const areas = [
  { name: "البلد", d: "M102 70 L190 42 L264 62 L298 105 L258 133 L205 122 L163 145 L112 126 Z", x: 190, y: 105 },
  { name: "الجامعة", d: "M72 150 L112 126 L163 145 L205 122 L258 133 L279 173 L244 204 L194 192 L149 218 L100 199 Z", x: 169, y: 174 },
  { name: "الفيحاء", d: "M205 122 L258 133 L298 105 L344 132 L340 184 L300 215 L244 204 L279 173 L258 133", x: 300, y: 164 },
  { name: "الروابي", d: "M244 204 L279 173 L340 184 L374 220 L357 273 L310 286 L270 263 L235 279 L194 245 L194 192", x: 307, y: 236 },
  { name: "القريات", d: "M100 199 L149 218 L194 192 L194 245 L235 279 L208 322 L152 319 L125 284 L88 268 L72 228", x: 151, y: 264 },
  { name: "غليل", d: "M72 228 L88 268 L125 284 L152 319 L139 365 L97 352 L67 316 L46 270 Z", x: 98, y: 315 },
  { name: "النزلة", d: "M235 279 L270 263 L310 286 L299 336 L257 358 L208 322", x: 258, y: 317 },
  { name: "النزلة الشرقية", d: "M310 286 L357 273 L382 313 L363 367 L299 336", x: 341, y: 326 },
  { name: "الحرازات", d: "M139 365 L152 319 L208 322 L257 358 L250 410 L207 436 L162 416 L145 390", x: 202, y: 383 },
  { name: "أبرق الرغامة", d: "M257 358 L299 336 L363 367 L346 420 L294 443 L250 410", x: 304, y: 395 },
  { name: "الثعالبة", d: "M67 316 L97 352 L139 365 L145 390 L126 425 L89 414 L58 378 L46 342", x: 99, y: 382 },
]

export function JeddahMap({ selected, onSelect }: { selected: string; onSelect: (name: string) => void }) {
  return (
    <div className="map-wrap" aria-label="خريطة أحياء جدة التفاعلية">
      <svg viewBox="0 0 430 475" role="img" aria-labelledby="map-title map-desc" className="h-full w-full">
        <title id="map-title">خريطة أحياء جدة</title>
        <desc id="map-desc">اختر حياً من الأحياء بالنقر عليه</desc>
        <path d="M94 52 L194 27 L277 53 L321 101 L361 126 L394 177 L409 240 L397 312 L369 382 L319 443 L258 462 L197 449 L143 438 L91 421 L51 385 L27 328 L20 267 L40 198 L49 143 L70 90 Z" fill="#e9f3f6" stroke="#c8dfe7" strokeWidth="2" />
        {areas.map((area) => (
          <g key={area.name} onClick={() => onSelect(area.name)} onKeyDown={(event) => event.key === "Enter" && onSelect(area.name)} role="button" tabIndex={0} aria-label={`اختيار حي ${area.name}`} className="map-area">
            <path d={area.d} fill={selected === area.name ? "#168a67" : "#177398"} stroke="white" strokeWidth="3" strokeLinejoin="round" />
            <text x={area.x} y={area.y} textAnchor="middle" direction="rtl" className="map-label" pointerEvents="none">{area.name}</text>
          </g>
        ))}
      </svg>
      <span className="map-hint">اضغط على الحي لاختياره</span>
    </div>
  )
}
