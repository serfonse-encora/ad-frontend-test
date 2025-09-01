import ComponentCatalog from '@/components/catalog/component.catalog';
import ComponentFooter from '@/components/footer/component.footer';
import ComponentHero from '@/components/hero/component.hero';
import ComponentNavbar from '@/components/navbar/component.navbar';

export default async function Home() {
  return (
    <>
      <ComponentNavbar />
      <ComponentHero />

      <ComponentCatalog />
      <ComponentFooter />
    </>
  );
}
