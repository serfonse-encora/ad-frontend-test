import Image from 'next/image';

const ComponentFooter = () => {
  return (
    <footer className='bg-neutral-700 text-center'>
      <Image
        className='my-auto'
        src='/Apply_Digital_Logo.svg'
        alt='Apply Digital Logo'
        width={170}
        height={44}
      />
    </footer>
  );
};

export default ComponentFooter;
