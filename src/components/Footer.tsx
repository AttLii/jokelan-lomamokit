import Container from './Container';
import MenuLink from './MenuLink';
import FooterLogoLink from './FooterLogoLink';
import BackToTopButton from './BackToTopButton';
import FooterInfoList from './FooterInfoList';
import globalContent from '../prevals/globalContent.preval';

const Footer = () => {
  return (
    <footer className='relative w-full border-t-2 border-black bg-slate-100 pb-4 pt-10'>
      <Container type='wide' className='relative flex flex-col gap-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {globalContent.footerMenu && (
            <nav
              aria-label={globalContent.footerMenu.title}
              className='md:order-last'
            >
              <ul className='flex flex-col gap-x-4 gap-y-1 md:flex-row'>
                {globalContent.footerMenu.menuItems.map((menuItem, i) => (
                  <li key={i}>
                    <MenuLink menuItem={menuItem} showSubItems={false} />
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <FooterInfoList />
        </div>
        <FooterLogoLink className='mx-auto' />
        <p className='text-center font-sans'>
          © {new Date().getFullYear()} Jokelan Lomamökit
        </p>
        <BackToTopButton className='absolute bottom-1.5 right-4' />
      </Container>
    </footer>
  );
};

export default Footer;
