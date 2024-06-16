import Container from './Container';
import HeaderLogoLink from './HeaderLogoLink';
import DesktopMenu from './DesktopMenu';
import BurgerButton from './BurgerButton';
import MobileMenu from './MobileMenu';

export default function Header() {
  return (
    <header className='fixed z-10 h-14 w-full border-b-2 border-black bg-slate-100 py-2'>
      <Container
        type='wide'
        className='flex h-full justify-between align-middle'
      >
        <HeaderLogoLink />
        <DesktopMenu />
        <BurgerButton />
        <MobileMenu />
      </Container>
    </header>
  );
}
