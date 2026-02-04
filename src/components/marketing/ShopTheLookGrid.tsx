import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/common/Container';
import SectionHeader from '@/components/common/SectionHeader';
import { getLooks } from '@/lib/db';

export default async function ShopTheLookGrid() {
  const looks = await getLooks();

  if (looks.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <Container>
        <SectionHeader
          title="Shop the Look"
          subtitle="Complete room setups styled to perfection"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {looks.map((look) => (
            <Link
              key={look.id}
              href={`/look/${look.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200"
            >
              <Image
                src={look.image}
                alt={look.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h3 className="text-white font-serif text-xl font-bold mb-1">
                  {look.title}
                </h3>
                <p className="text-white/90 text-sm">{look.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

