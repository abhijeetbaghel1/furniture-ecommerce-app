import HeroBanner from '@/components/marketing/HeroBanner';
import CategoryTiles from '@/components/marketing/CategoryTiles';
import CollectionsCarousel from '@/components/marketing/CollectionsCarousel';
import ShopTheLookGrid from '@/components/marketing/ShopTheLookGrid';
import ProductGrid from '@/components/catalog/ProductGrid';
import SectionHeader from '@/components/common/SectionHeader';
import Container from '@/components/common/Container';
import BespokeForm from '@/components/forms/BespokeForm';
import { getProducts } from '@/lib/db';

export default async function HomePage() {
  const bestsellers = await getProducts();
  const readyToShip = await getProducts({ availability: 'READY_TO_SHIP' });

  return (
    <>
      <HeroBanner />
      <CategoryTiles />
      <CollectionsCarousel />
      <ShopTheLookGrid />

      {/* Bestsellers */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeader title="Bestsellers" subtitle="Our most loved pieces" />
          <ProductGrid products={bestsellers.slice(0, 4)} />
        </Container>
      </section>

      {/* Ready to Ship */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeader
            title="Ready to Ship"
            subtitle="Get it delivered in 5-7 days"
          />
          <ProductGrid products={readyToShip.slice(0, 4)} />
        </Container>
      </section>

      {/* Bespoke CTA */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              title="Custom Made Furniture"
              subtitle="Tell us your vision, we'll bring it to life"
            />
            <BespokeForm />
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-accent-walnut text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="mb-6 text-neutral-200">
              Subscribe to get updates on new collections and exclusive offers.
            </p>
            <form
              action="/api/newsletter"
              method="POST"
              className="flex gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-accent-walnut font-semibold rounded-md hover:bg-neutral-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}

