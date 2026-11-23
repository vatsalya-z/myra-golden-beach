"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQ } from "@/data/faqs";
import { generateFAQSchema } from "@/lib/schema";

interface FAQProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  const schema = generateFAQSchema(
    faqs.map((f) => ({ question: f.question, answer: f.answer }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
            className="border border-[#D9EEF2] rounded-xl overflow-hidden bg-white shadow-sm hover:border-[#F6C46A]/40 transition-colors"
          >
            <button
              onClick={() => toggle(faq.id)}
              aria-expanded={openId === faq.id}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-[#063B49] hover:text-[#F6C46A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F6C46A]"
            >
              <span className="text-sm md:text-base">{faq.question}</span>
              <HiChevronDown
                size={20}
                className={`shrink-0 text-[#F6C46A] transition-transform duration-300 ${
                  openId === faq.id ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openId === faq.id && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-[#607780] text-sm md:text-base leading-relaxed border-t border-[#D9EEF2] pt-4">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </>
  );
}
