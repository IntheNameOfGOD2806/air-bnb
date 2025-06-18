"use client";
import dynamic from 'next/dynamic'

const AboutUS = dynamic(() => import('@/app/about-us/components/AboutUS'), { ssr: false })

export default function Page() {
  return <AboutUS />
}