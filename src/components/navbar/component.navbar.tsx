import Image from 'next/image';
import Link from 'next/link';

const ComponentNavbar = () => {
  return (
    <nav className='d-flex justify-content-space-between bg-surface-secondary p-1'>
      <div className='text-subtitle font-weight-700 text-grey'>GamerShop</div>
      <Link className='my-auto text-body text-grey' href='/'>
        <Image
          className='my-auto'
          src='/cart.svg'
          alt='Cart'
          width={20}
          height={20}
        />
      </Link>
    </nav>
  );
};

export default ComponentNavbar;
