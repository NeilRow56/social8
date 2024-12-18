'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import { Header } from './Header'
import { BackButton } from './auth/BackButton'

type CardWrapperProps = {
  children: React.ReactNode
  headerLabel: string
  headerTitle: string
  backButtonLabel: string
  backButtonHref: string
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerTitle,
  backButtonLabel,
  backButtonHref
}: CardWrapperProps) => {
  return (
    <Card className='shadow-md sm:w-[350px] md:w-[500px]'>
      <CardHeader>
        <Header label={headerLabel} title={headerTitle} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
