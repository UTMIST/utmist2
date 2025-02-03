import dynamic from 'next/dynamic'

const CMSClientComponent = dynamic(
  () => import('./CMSClientComponent'),
  { 
    ssr: false,
    loading: () => <div>Loading CMS...</div>
  }
)

export default function CMSWrapper() {
  return <CMSClientComponent />
}