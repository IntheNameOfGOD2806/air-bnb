import ClientPage from './ClientPage';

export default function Page({ params }) {
  return <ClientPage listingId={params.listing} />;
}
