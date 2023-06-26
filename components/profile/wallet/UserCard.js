import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Toy from "@/components/auth/TOOL";
import {PopupVerif} from "@/components/profile/wallet/PopupVerif";
import {PopupGoogle2FA} from "@/components/profile/wallet/PopupGoogle2FA";


const navigation = [
  {
    id: 1,
    title: 'Overview',
    path: '/profile/wallet',
    className: 'menuProfile__menu-item mdi mdi-bullseye active',
  },
  {
    id: 2,
    title: 'Deposit',
    path: '/profile/deposit',
    className: 'menuProfile__menu-item mdi mdi-database',
  },
  {
    id: 3,
    title: 'Withdraw',
    path: '/profile/withdraw',
    className: 'menuProfile__menu-item mdi mdi-transfer-right',
  },
];
const nav = [
  {
    id: 4,
    title: 'Transactions',
    path: '/profile/transactions',
    className: 'menuProfile__menu-item menuProfile__item-mobile mdi mdi-history',
  },
  {
    id: 5,
    title: 'Transfer',
    path: '/profile/transfer',
    className: 'menuProfile__menu-item menuProfile__item-mobile mdi mdi-reply',
  },
  {
    id: 6,
    title: 'Staking',
    path: '/profile/invest',
    className: 'menuProfile__menu-item menuProfile__item-mobile mdi mdi-cash',
  },
  {
    id: 7,
    title: 'Affiliate',
    path: '/profile/affiliate',
    className: 'menuProfile__menu-item menuProfile__item-mobile mdi mdi-diamond',
  },
  {
    id: 8,
    title: 'Settings',
    path: '/profile/settings',
    className: 'menuProfile__menu-item menuProfile__item-mobile mdi mdi-cog',
  },
];


const UserCard = () => {
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [toyMessage, setToyMessage] = useState('')
  const [show, setShowToast] = useState(false);
  const [positiveToast, setPositiveToast] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPositive, setIsPositive] = useState(false);

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    try {
      const cookies = parseCookies();
      const accessToken = cookies.accessToken;

      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + '/promocodes/',
        {
          code: promoCode,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log('Promo code activation successful:', response.data);
      setToyMessage('Promo code activation successful')
      setShowToast(true)
      setPositiveToast(true);

    } catch (error) {
      console.error('Error activating promo code:', error);
      setShowToast(true)
      setToyMessage("Error in activating the promo code: the promo code does not exist, or it has already been activated")
      setPositiveToast(false);

    }
  };

  useEffect(() => {
    let timeout;

    if (show) {
      timeout = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [show]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = parseCookies();
        const accessToken = cookies.accessToken;

        if (accessToken) {
          const response = await axios.get('https://leaque.com/api/user/profile/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const { user, balance} = response.data;
          setProfile(user);
          setBalance(balance);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const [errorMessage, setErrorMessage] = useState('');

  const openWallet = () => {
    if (!profile.is_verified) {
      setErrorMessage('You have to pass verification')
      setIsPositive(true)
    } else {
      setErrorMessage('You have to pass second level of KYC verification to get all access for functionality of Leaque.com\n' +
        '\n' +
        'KYC level - 2:\n' +
        '- Passed KYC level - 1\n' +
        '- Minimum deposit of 1,000.00 dollars in any coin')
      setIsPositive(true)
    }
  }

  const handleCloseClick = () => {
    setIsPositive(false);
  };

  const handleCloseClickPopup = () => {
    setPopupVisible(false);
  };

  const handleEnableClick = () => {
    setPopupVisible(true);
    setIsPositive(false)
  };


  return (
    <>
      <section className="userCard">
        <Toy visible={show} message={toyMessage} positive={positiveToast} />

        <div className="userCard__container">
          <section className="menuProfile">
            <div className="menuProfile__more-bg"></div>
            <div className="menuProfile__container">
              <div className="menuProfile__box">
                <div className="menuProfile__menu-box">
                  {navigation.map(({ id, title, path, className }) => (
                    <a key={id} href={path} className={className}>
                      {title}
                    </a>
                  ))}

                  <span className="menuProfile__menu-item menuProfile__menu-more mdi mdi-more">
                    Menu
                  </span>

                  <div className="menuProfile__more">
                    {nav.map(({ id, title, path, className }) => (
                      <a key={id} href={path} className={className}>
                        {title}
                      </a>
                    ))}

                    <div className="userNavigation__tabBtn_wc" onClick={openWallet}>
                      <img src="/img/wc_logo.png" style={{ height: '18px', width: 'auto' }} />
                      &nbsp;&nbsp;Wallet Connect
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="userCard__box">
            <div className="userCard__item-left">
              <div className="userCard__user-data">
                <div className="userCard__img-box">
                  <img src="/img/avatar.svg" alt="" />
                </div>

                <div className="userCard__user-data-box">
                  <div className="userCard__user-name">{profile?.username}</div>
                  <div className="userCard__user-email">{profile?.email}</div>
                  <div className="userCard__user-id">ID: 135214936</div>
                </div>
              </div>
              <div className="userCard__balance">
                <div className="userCard__balance-title">Total balance</div>
                <div className="userCard__balance-count">
                  {
                    `${balance ? balance.coins.usd : 0} USD`
                  }
                </div>
              </div>
            </div>

            <div className="userCard__item-right">
              <div className="userCard__promo-title">Use bonus promo code</div>
              <form onSubmit={handleSubmit}>
                <label>
                  <input
                    id="promocode"
                    className="userCard__promo-input"
                    type="text"
                    placeholder="Enter promo-code"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                  />
                </label>
                <button type="submit" className="userCard__promo-btn">
                  Activate
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {isPositive && (<PopupVerif handleCloseClick={handleCloseClick} errorMessage={errorMessage} onClick={handleEnableClick}/>)}
      {isPopupVisible && (
          <PopupGoogle2FA onclick={handleCloseClickPopup}/>
      )}
    </>
  );
};

export default UserCard;
