import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gateway = () => {
  const [coins, setCoins] = useState([]);
  const [mainCoins, setMainCoins] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/price-updater/crypto/');
        setCoins(response.data)
        const selectedCoins = response.data.filter(coin => {
          const targetCoins = ['Bitcoin', 'Ethereum', 'Tether', 'BNB', 'Litecoin', 'USD Coin', 'Solana'];
          return targetCoins.includes(coin.name);
        });
        setMainCoins(selectedCoins)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();


  }, []);

  console.log(mainCoins)



  return (
    <section className="gateway">
      <div className="gateway__container">
        <div className="gateway__title">World class trading platform</div>
        <div className="gateway__description">
          We rank top among first tier exchanges with the highest number of listed crypto
        </div>

        <div className="gateway__table">
          <div className="gateway__table-items">
            {mainCoins.map(({ id, name, index, price, increase, image, url = '/profile/swap' }) => (
              <div className="gateway__table-item" key={id}>
                <div className="gateway__table-number">{id}</div>
                <div className="gateway__table-name">
                  <img src={image} alt="" style={{width: '48px', height: '48px'}} />
                  <div>
                    {name}
                    <span>{index}</span>
                  </div>
                </div>
                <div className="gateway__table-price">${parseFloat(price).toFixed(2)} </div>
                <div className={increase < 0 ? "gateway__table-change gateway__table-change-minus" : "gateway__table-change gateway__table-change-plus"}>
                  {increase}%
                </div>
                <div className="gateway__table-chart">
                  <svg
                    width="138"
                    height="45"
                    viewBox="0 0 138 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M120.003 19.1752C122.031 19.6999 125.514 24.4936 134.286 40.6264C134.492 41.0052 134.894 41.25 135.325 41.25C135.974 41.25 136.5 41.7762 136.5 42.4254V42.75C136.5 43.5784 135.828 44.25 135 44.25H2.25C1.42157 44.25 0.75 43.5784 0.75 42.75V34.5C0.75 33.6716 1.42157 33 2.25 33H3.6057C4.15665 33 4.66327 32.698 4.92526 32.2133L11.8293 19.4407C11.9415 19.2332 12.1011 19.055 12.2951 18.9207L16.875 15.75L25.2131 9.01541C25.9457 8.42369 27.0359 8.64551 27.4791 9.47644L32.4 18.7031C32.5464 18.9776 32.7745 19.1997 33.0527 19.3388L39.4257 22.5253C39.8639 22.7445 40.3815 22.7357 40.8121 22.502L52.8769 15.9525C53.1208 15.8201 53.3233 15.6226 53.4616 15.382L61.1547 2.00267C61.5568 1.3034 62.4399 1.04731 63.1537 1.423L68.4663 4.21911C68.8088 4.39936 69.0683 4.705 69.1907 5.07215L73.5331 18.0993C73.7373 18.7119 74.3105 19.125 74.9561 19.125H78.1797C78.5471 19.125 78.9017 19.2598 79.1762 19.5039L87.8179 27.1854C88.4115 27.713 89.3135 27.6865 89.8751 27.1249L93.3074 23.6927C93.7892 23.2108 94.5352 23.1143 95.1238 23.4576L102.394 27.6985C102.848 27.9632 103.407 27.9713 103.868 27.7197L119.289 19.3082C119.51 19.188 119.76 19.1123 120.003 19.1752Z"
                      fill="url(#paint0_linear_1_430)"
                    />
                    <path
                      d="M0.75 33H3.60258C4.15518 33 4.66303 32.6962 4.92432 32.2092L12.4681 18.1503C12.6492 17.8129 12.9523 17.5576 13.3155 17.4365L18.0565 15.8562C18.2662 15.7863 18.4579 15.6708 18.6179 15.5182L25.1956 9.23939C25.9138 8.55391 27.0877 8.74257 27.5549 9.61854L32.4 18.7031C32.5464 18.9776 32.7745 19.1997 33.0527 19.3388L39.4257 22.5253C39.8639 22.7445 40.3815 22.7357 40.8121 22.502L52.8769 15.9525C53.1208 15.8201 53.3233 15.6226 53.4616 15.382L61.1547 2.00267C61.5568 1.3034 62.4399 1.04731 63.1537 1.423L68.4663 4.21911C68.8088 4.39936 69.0683 4.705 69.1907 5.07215L73.5331 18.0993C73.7373 18.7119 74.3105 19.125 74.9561 19.125H78.1797C78.5471 19.125 78.9017 19.2598 79.1762 19.5039L87.8179 27.1854C88.4115 27.713 89.3135 27.6865 89.8751 27.1249L93.3073 23.6927C93.7892 23.2108 94.5352 23.1143 95.1238 23.4576L102.316 27.6532C102.811 27.9419 103.427 27.9235 103.904 27.6056L114.375 20.625C123.239 15.4542 123.882 23.3066 133.072 40.4559C133.332 40.9409 133.843 41.25 134.393 41.25H137.625"
                      stroke="#DB5748"
                      stroke-width="2.25"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1_430"
                        x1="68.625"
                        y1="0.75"
                        x2="68.625"
                        y2="44.25"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#DB5748" stop-opacity="0.52" />
                        <stop offset="1" stop-color="#DB5748" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="gateway__table-trade">
                  <a className="gateway__table-trade-link" href={url}>
                    Trade
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gateway;
