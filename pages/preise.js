import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon, XMarkIcon as XMarkIconMini } from "@heroicons/react/20/solid";

const pricing = {
  frequencies: [
    { value: "monthly", label: "Monatlich" },
    { value: "annually", label: "Jährlich" },
  ],
  tiers: [
    {
      name: "Small",
      id: "tier-small",
      featured: false,
      description: "Für One-Pager geeignet.",
      price: { monthly: "€ 50", annually: "€ 400" },
      mainFeatures: ["Redundante Backups", "Laufende Updates"],
    },
    {
      name: "Medium",
      id: "tier-medium",
      featured: true,
      description: "Geeignet für kleine Webseiten, bis zu 5 Seiten.",
      price: { monthly: "€ 70", annually: "€ 540" },
      mainFeatures: ["Alles aus Small", "Laufende Leistungsoptimierungen", "Uptime-Monitoring", "DSGVO-Konformes Tracking"],
    },
    {
      name: "Large",
      id: "tier-large",
      featured: false,
      description: "Große Webseiten, Webshops, Seiten mit Blogs, usw.",
      price: { monthly: "€ 120", annually: "€ 945" },
      mainFeatures: ["Alles aus Medium", "Monatliche Webseitenberichte", "Content-Pflege"],
    },
  ],
  sections: [
    {
      name: "Leistungen im Übersicht",
      features: [
        { name: "Redundante Backups", tiers: { Small: true, Medium: true, Large: true }, description: "Backups auf unserem DSGVO-konformen Server. Absolute Redundanz im Falle eines Hacker-Angriffs." },
        { name: "Laufende Updates", tiers: { Small: true, Medium: true, Large: true }, description: "Laufende Updates (WordPress-Versionen, Plugins, etc.) und Überprüfung auf Funktionalitäten danach." },
        { name: "Laufende Leistungsoptimierungen", tiers: { Small: false, Medium: true, Large: true }, description: "Periodische Überwachung der Leistungskennzahlen der Webseite und Optimierung dieser. " },
        { name: "Uptime Monitoring", tiers: { Small: false, Medium: true, Large: true }, description: "Periodische Überprüfung (5-Minuten Zyklen) ob Webseite/Ser- ver erreichbar ist. Automatisierte Fehlerbenachrichtigung." },
        { name: "DSGVO Konformes Tracking", tiers: { Small: false, Medium: true, Large: true }, description: "DSGVO-Konforme Analytics-Lösung durch Matomo-Analytics!" },
        { name: "Monatlicher Webseitenbericht", tiers: { Small: false, Medium: false, Large: true }, description: "Die wichtigsten Kennzahlen der Webseite in einem Bericht aufbereitet und automatisiert gesendet bekommen." },
        { name: "Content Pflege", tiers: { Small: false, Medium: false, Large: true }, description: "Blog-Beiträge einstellen / Updates zu bestehenden Texten. Kei- ne Texterstellungen / -formulierungen." },
      ],
    },
    {
      name: "Geplante Leistungen, erhalten Sie ein automatisches Upgrade sobald diese Verfügbar sind!",
      features: [
        { name: "Ticket System", tiers: { Small: true, Medium: true, Large: true } },
        { name: "Kunden-Dashboard", tiers: { Small: false, Medium: false, Large: true } },
      ],
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Preise() {
  return (
    <>
      {/* Pricing section */}
      <div className="isolate overflow-hidden">
        <PricingCardSection />
        <div className="relative bg-gray-50 lg:pt-14">
          <div className="mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
            {/* Feature comparison (up to lg) */}
            <section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
              <h2 id="mobile-comparison-heading" className="sr-only">
                Feature comparison
              </h2>

              <div className="mx-auto max-w-2xl space-y-16">
                {pricing.tiers.map((tier) => (
                  <div key={tier.id} className="border-t border-gray-900/10">
                    <div className={classNames(tier.featured ? "border-primary" : "border-transparent", "-mt-px w-72 border-t-2 pt-10 md:w-80")}>
                      <h3 className={classNames(tier.featured ? "text-primary" : "text-gray-900", "text-sm font-semibold leading-6")}>{tier.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{tier.description}</p>
                    </div>

                    <div className="mt-10 space-y-10">
                      {pricing.sections.map((section) => (
                        <div key={section.name}>
                          <h4 className="text-sm font-semibold leading-6 text-gray-900">{section.name}</h4>
                          <div className="relative mt-6">
                            {/* Fake card background */}
                            <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-sm sm:block" />

                            <div className={classNames(tier.featured ? "ring-2 ring-primary" : "ring-1 ring-gray-900/10", "relative rounded-lg bg-white shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0")}>
                              <dl className="divide-y divide-gray-200 text-sm leading-6">
                                {section.features.map((feature) => (
                                  <div key={feature.name} className="flex items-center justify-between py-3 px-4 sm:grid sm:grid-cols-2 sm:px-0">
                                    <dt className="pr-4 text-gray-600">{feature.name}</dt>
                                    <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                      {typeof feature.tiers[tier.name] === "string" ? (
                                        <span className={tier.featured ? "font-semibold text-primary" : "text-gray-900"}>{feature.tiers[tier.name]}</span>
                                      ) : (
                                        <>
                                          {feature.tiers[tier.name] === true ? <CheckIcon className="mx-auto h-5 w-5 text-primary" aria-hidden="true" /> : <XMarkIconMini className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />}

                                          <span className="sr-only">{feature.tiers[tier.name] === true ? "Yes" : "No"}</span>
                                        </>
                                      )}
                                    </dd>
                                  </div>
                                ))}
                              </dl>
                            </div>

                            {/* Fake card border */}
                            <div aria-hidden="true" className={classNames(tier.featured ? "ring-2 ring-primary" : "ring-1 ring-gray-900/10", "pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block")} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Feature comparison (lg+) */}
            <section aria-labelledby="comparison-heading" className="hidden lg:block">
              <h2 id="comparison-heading" className="sr-only">
                Feature comparison
              </h2>

              <div className="grid grid-cols-4 gap-x-8 border-t border-gray-900/10 before:block">
                {pricing.tiers.map((tier) => (
                  <div key={tier.id} aria-hidden="true" className="-mt-px">
                    <div className={classNames(tier.featured ? "border-primary" : "border-transparent", "border-t-2 pt-10")}>
                      <p className={classNames(tier.featured ? "text-primary" : "text-gray-900", "text-sm font-semibold leading-6")}>{tier.name}</p>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{tier.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="-mt-6 space-y-16">
                {pricing.sections.map((section) => (
                  <div key={section.name}>
                    <h3 className="text-sm font-semibold leading-6 text-gray-900">{section.name}</h3>
                    <div className="relative -mx-8 mt-10">
                      {/* Fake card backgrounds */}
                      <div className="absolute inset-y-0 inset-x-8 grid grid-cols-4 gap-x-8 before:block" aria-hidden="true">
                        <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                        <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                        <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                      </div>

                      <table className="relative w-full border-separate border-spacing-x-8">
                        <thead>
                          <tr className="text-left">
                            <th scope="col">
                              <span className="sr-only">Feature</span>
                            </th>
                            {pricing.tiers.map((tier) => (
                              <th key={tier.id} scope="col">
                                <span className="sr-only">{tier.name} tier</span>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.features.map((feature, featureIdx) => (
                            <tr key={feature.name}>
                              <th scope="row" className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900">
                                {feature.name}
                                <div className="text-gray-400 font-medium text-xs">{feature.description}</div>
                                {featureIdx !== section.features.length - 1 ? <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" /> : null}
                              </th>
                              {pricing.tiers.map((tier) => (
                                <td key={tier.id} className="relative w-1/4 px-4 py-0 text-center">
                                  <span className="relative h-full w-full py-3">
                                    {typeof feature.tiers[tier.name] === "string" ? (
                                      <span className={classNames(tier.featured ? "font-semibold text-primary" : "text-gray-900", "text-sm leading-6")}>{feature.tiers[tier.name]}</span>
                                    ) : (
                                      <>
                                        {feature.tiers[tier.name] === true ? <CheckIcon className="mx-auto h-5 w-5 text-primary" aria-hidden="true" /> : <XMarkIconMini className="mx-auto h-5 w-5 text-gray-400" aria-hidden="true" />}

                                        <span className="sr-only">{feature.tiers[tier.name] === true ? "Yes" : "No"}</span>
                                      </>
                                    )}
                                  </span>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Fake card borders */}
                      <div className="pointer-events-none absolute inset-y-0 inset-x-8 grid grid-cols-4 gap-x-8 before:block" aria-hidden="true">
                        {pricing.tiers.map((tier) => (
                          <div key={tier.id} className={classNames(tier.featured ? "ring-2 ring-primary" : "ring-1 ring-gray-900/10", "rounded-lg")} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

function PricingCardSection() {
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);

  return (
    <>
      <div className="flow-root bg-gray-900 py-16 sm:pt-32 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative z-10">
            <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-white">Faire Preise zu Fairen Bedingungen</h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-white/60">Hier erhalten Sie einen Überblick über all unsere Preislisten, sowie unsere Wartungspakete.</p>
            <div className="mt-16 flex flex-col justify-center align-middle items-center">
              <p className="text-white/60 text-center mb-3">Wartungspakete</p>

              <RadioGroup value={frequency} onChange={setFrequency} className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-white">
                <RadioGroup.Label className="sr-only">Häufigkeit</RadioGroup.Label>
                {pricing.frequencies.map((option) => (
                  <RadioGroup.Option key={option.value} value={option} className={({ checked }) => classNames(checked ? "bg-primary" : "", "cursor-pointer rounded-full py-1 px-2.5")}>
                    <span>{option.label}</span>
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* PRICING CARD SECTION */}
          <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3">
            {/* BG RADIAL */}
            <svg viewBox="0 0 1208 1024" aria-hidden="true" className="absolute left-1/2 -bottom-48 h-[64rem] translate-y-1/2 -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:bottom-auto lg:-top-48 lg:translate-y-0">
              <ellipse cx={604} cy={512} fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)" rx={604} ry={512} />
              <defs>
                <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#3f00b5" />
                </radialGradient>
              </defs>
            </svg>

            {/* PRICING CARDS */}
            <div className="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-gray-800/80 lg:ring-1 lg:ring-white/10" aria-hidden="true" />
            {pricing.tiers.map((tier) => (
              <div key={tier.id} className={classNames(tier.featured ? "z-10 bg-white shadow-xl ring-1 ring-gray-900/10" : "bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0", "relative rounded-2xl")}>
                <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                  <h2 id={tier.id} className={classNames(tier.featured ? "text-gray-900" : "text-white", "text-sm font-semibold leading-6")}>
                    {tier.name}
                  </h2>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                    <div className="mt-2 flex items-center gap-x-4">
                      <p className={classNames(tier.featured ? "text-gray-900" : "text-white", "text-4xl font-bold tracking-tight")}>{tier.price[frequency.value]}</p>
                      <div className="text-sm leading-5">
                        <p className={tier.featured ? "text-gray-900" : "text-white"}>EUR</p>
                        <p className={tier.featured ? "text-gray-500" : "text-gray-400"}>{`${frequency.label.toLowerCase()}e Verrechnung`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flow-root sm:mt-10">
                    {/* PRICING CARD FEATURES */}
                    <ul role="list" className={classNames(tier.featured ? "divide-gray-900/5 border-gray-900/5 text-gray-600" : "divide-white/5 border-white/5 text-white", "-my-2 divide-y border-t text-sm leading-6 lg:border-t-0")}>
                      {tier.mainFeatures.map((mainFeature) => (
                        <li key={mainFeature} className="flex gap-x-3 py-2">
                          <CheckIcon className={classNames(tier.featured ? "text-primary" : "text-gray-500", "h-6 w-5 flex-none")} aria-hidden="true" />
                          {mainFeature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            {/* PRICING CARD END */}
          </div>
        </div>
      </div>
    </>
  );
}
