import type { Metadata } from 'next'
import type { Page } from '@/payload-types'

import { FormBlock, type FormBlockType } from '@/blocks/Form/Component'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import configPromise from '@payload-config'
import { ArrowDown, ArrowUpRight, Asterisk, CircleDot } from 'lucide-react'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { ContactHeaderTheme } from './ContactHeaderTheme'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Contact | Payload Website Template',
  description: 'Start a conversation about your next idea, build, or collaboration.',
  alternates: {
    canonical: '/contact-us',
  },
}

export default async function ContactPage() {
  const page = await queryContactPage()
  const form = getForm(page)

  if (!page) notFound()

  return (
    <main className={styles.page}>
      <ContactHeaderTheme />

      <div aria-hidden="true" className={styles.noise} />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span className={styles.statusDot} />
            The line is open
          </p>

          <h1 className={styles.title}>
            Let&apos;s make
            <span>something</span>
            worth talking about.
          </h1>

          <div className={styles.heroFooter}>
            <p>
              Bring the half-formed thought, the ambitious brief, or the problem that refuses to sit
              still.
            </p>
            <a className={styles.jumpLink} href="#contact-form">
              Open the line
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </div>

        <div aria-hidden="true" className={styles.signal}>
          <div className={styles.signalOrbit}>
            <span className={styles.orbitDot} />
            <div className={styles.signalCore}>
              <Asterisk />
              <span>Say hello</span>
            </div>
          </div>
          <p>Good things start with a message.</p>
        </div>
      </section>

      <section className={styles.formSection} id="contact-form">
        <div className={styles.formIntro}>
          <p className={styles.sectionNumber}>01 / Your message</p>
          <h2>
            Tell us where
            <span>you want to go.</span>
          </h2>
          <p className={styles.formLead}>
            No polished pitch required. A few honest details are more useful than a perfect deck.
          </p>

          <ol className={styles.process}>
            <li>
              <CircleDot aria-hidden="true" />
              <span>
                <strong>Send the signal</strong>
                Give us the shape of what you&apos;re thinking.
              </span>
            </li>
            <li>
              <CircleDot aria-hidden="true" />
              <span>
                <strong>We connect the dots</strong>
                We&apos;ll read every word and find the right next step.
              </span>
            </li>
            <li>
              <CircleDot aria-hidden="true" />
              <span>
                <strong>Make it real</strong>
                If there&apos;s a spark, we&apos;ll turn it into momentum.
              </span>
            </li>
          </ol>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <span>{form ? 'New message' : 'Contact details'}</span>
            <span className={styles.formCardMark}>
              PX
              <ArrowUpRight aria-hidden="true" />
            </span>
          </div>

          {form ? (
            <>
              <FormBlock
                enableIntro={false}
                form={{ ...form, submitButtonLabel: 'Send the signal' }}
              />
              <p className={styles.formNote}>
                <Asterisk aria-hidden="true" />
                Required fields help your message find the right place.
              </p>
            </>
          ) : (
            <div className={styles.cmsContent}>
              <RenderBlocks blocks={page.layout} />
            </div>
          )}
        </div>
      </section>

      <section className={styles.closing}>
        <p>One clear note can change the whole direction.</p>
        <a href="#contact-form">
          Start yours
          <ArrowUpRight aria-hidden="true" />
        </a>
      </section>
    </main>
  )
}

function getForm(page: Page | null): FormBlockType['form'] | null {
  const formBlock = page?.layout?.find((block) => block.blockType === 'formBlock')

  if (!formBlock || typeof formBlock.form !== 'object') return null

  const form = formBlock.form

  if (!form.confirmationType) return null

  return {
    ...form,
    confirmationType: form.confirmationType,
    id: String(form.id),
  } as FormBlockType['form']
}

const queryContactPage = cache(async (): Promise<Page | null> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    draft,
    limit: 2,
    pagination: false,
    overrideAccess: draft,
    where: {
      or: [{ slug: { equals: 'contact-us' } }, { slug: { equals: 'contact' } }],
    },
  })

  return (
    result.docs.find((document) => document.slug === 'contact-us') ||
    result.docs.find((document) => document.slug === 'contact') ||
    null
  )
})
