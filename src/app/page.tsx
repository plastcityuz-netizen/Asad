import Hero from '@/components/Hero';
import Products from '@/components/Products';
import { About, Advantages, Contact, Production, UseCases } from '@/components/Sections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <Production />
      <Advantages />
      <UseCases />
      <About />
      <Contact />
    </>
  );
}
