import type { Metadata } from 'next'
import type { Page } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { ArrowDown, ArrowUpRight, Asterisk } from 'lucide-react'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

import { ContactHeaderTheme } from './ContactHeaderTheme'
import styles from './page.module.css'

export default async function ContactPage() {
  const page = await queryContactPage()
  const title = page?.title || 'Contact us'
  const description =
    page?.meta?.description ||
    'Bring the half-formed thought, the ambitious brief, or the problem that refuses to sit still.'

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
            <ContactTitle title={title} />
          </h1>

          <div className={styles.heroFooter}>
            <p>{description}</p>
            <a className={styles.jumpLink} href="#contact-form">
              Read the page
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
          <p className={styles.sectionNumber}>01 / The details</p>
          <h2>
            Everything
            <span>you want to say.</span>
          </h2>
          <p className={styles.formLead}>{description}</p>
        </div>

        <div className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <span>{page ? page.title : 'Open channel'}</span>
            <span className={styles.formCardMark}>
              PX
              <ArrowUpRight aria-hidden="true" />
            </span>
          </div>

          {page ? (
            <>
              <div className={styles.cmsHero}>
                <RenderHero {...page.hero} />
              </div>
              <div className={styles.cmsContent}>
                <RenderBlocks blocks={page.layout} />
              </div>
            </>
          ) : (
            <div className={styles.cmsContent}>
              <div className={styles.contactFallback}>
                <p>No form. No hoops.</p>
                <h3>Your next move can start with two honest sentences.</h3>
                <a href="mailto:">
                  Compose an email
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
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

function ContactTitle({ title }: { title: string }) {
  const words = title.trim().split(/\s+/)
  const accent = words.pop()

  return (
    <>
      {words.length > 0 && `${words.join(' ')} `}
      <span>{accent}</span>
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryContactPage()
  const metadata = await generateMeta({ doc: page })

  return {
    ...metadata,
    alternates: {
      canonical: '/contact-us',
    },
  }
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
