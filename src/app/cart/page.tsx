import ComponentCart from '../../components/cart/component.cart';
import ComponentFooter from '../../components/footer/component.footer';
import ComponentNavbar from '../../components/navbar/component.navbar';

export default function CartPage() {
  return (
    <div>
      <ComponentNavbar />
      <main>
        <ComponentCart />
      </main>
      <ComponentFooter />
    </div>
  );
}
