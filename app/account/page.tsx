import Header from '@/components/Header';
import AccountContent from './components/AccountContent';

const AccountPage = () => {
  return (
    <div
      className='bg-neutral-900 rounded-lg h-full overflow-hidden overflow-y-auto 
      md:mr-2'
    >
      <Header className='from-bg-neutral-900 '>
        <div className='mb-2 flex flex-col gap-y-6'>
          <h1 className='text-white text-3xl font-semibold'>
            Account Settings
          </h1>
        </div>
      </Header>
      <AccountContent />
    </div>
  );
};

export default AccountPage;
