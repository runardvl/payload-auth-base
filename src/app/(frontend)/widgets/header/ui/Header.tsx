import Link from 'next/link'
import { Gutter } from '@/app/(frontend)/shared/ui'
import Image from 'next/image'
import styles from './styles.module.scss'
import { HeaderNav } from './HeaderNav/HeaderNav'

export const Header = () => {
  return (
    <header className={styles.header}>
      <Gutter className={styles.wrap}>
        <Link href="/" className={styles.logo}>
          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg"
            />
            <Image
              alt="Payload Logo"
              height={30}
              src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-dark.svg"
              width={150}
              style={{ width: '150px', height: '30px' }}
            />
          </picture>
        </Link>
        <HeaderNav />
      </Gutter>
    </header>
  )
}
