"use client"
import React, { useState, useEffect } from 'react';
import './Home.css';


const Home = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const slides = [
    {
      img: 'https://framerusercontent.com/images/iP0BsyYh0IYgAchUCKTAQqclxyI.webp',
      caption: 'Hướng dẫn bảo quản đồ ăn khi vận chuyển',
    },
    {
      img: 'https://suno.vn/blog/wp-content/uploads/2018/06/Card-DanangShip-01-654x400.png',
      caption: 'Các quy tắc khi vận chuyển',
    },
    {
      img: 'https://www.gloriafood.com/wp-content/uploads/2021/03/How_to_Improve_Your_Food_Delivery_Service_in_2022_-_fb.png',
      caption: 'Giới thiệu tài xế mới',
    },
  ];

  // Hàm chuyển slide
  const plusSlides = (n) => {
    let newIndex = slideIndex + n;
    if (newIndex > slides.length) newIndex = 1;
    if (newIndex < 1) newIndex = slides.length;
    setSlideIndex(newIndex);
  };

  // Chuyển đến slide cụ thể
  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  // Tự động chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      plusSlides(1); // Tự động chuyển sang slide kế tiếp
    }, 3000); // Chuyển slide sau mỗi 3 giây

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <div className="home">
        <div className="home-slideshow">
            <div className="slideshow-container">
            {slides.map((slide, index) => (
                <div
                key={index}
                className={`my-slide-show fade ${index + 1 === slideIndex ? 'active' : ''}`}
                style={{ display: index + 1 === slideIndex ? 'block' : 'none' }}
                >
                <div className="numbertext">{index + 1} / {slides.length}</div>
                <img src={slide.img} alt={`Slide ${index + 1}`} />
                <div className="text">{slide.caption}</div>
                </div>
            ))}

            <button className="prev" onClick={() => plusSlides(-1)}>&#10094;</button>
            <button className="next" onClick={() => plusSlides(1)}>&#10095;</button>
            </div>
            <br />

            <div className="dot-action">
            {slides.map((_, index) => (
                <span
                key={index}
                className={`dot ${index + 1 === slideIndex ? 'active' : ''}`}
                onClick={() => currentSlide(index + 1)}
                ></span>
            ))}
            </div>
        </div>

        <div className="shipper-rating">
            <div className="shipper-rating-now">
                <h2>Điểm đánh giá</h2>
                <div className="rating-points">
                    <h1>4.2/5</h1>
                    <img src="" alt="" />
                </div>

            </div>
            <div className="recent-rating">
                <h2>Đánh giá gần đây</h2>
                <div className="recent-rating-table">
                    <thead className='recent-rating-table-head'>
                        <th>Khách hàng</th>
                        <th>Mã đơn hàng</th>
                        <th>Ngày</th>
                        <th>Đánh giá</th>
                        <th>Chi tiết</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="customer">
                                <img src="https://tiermaker.com/images/templates/skins-brawlhalla-red-raptor-august-2023-16119217/161192171693520922.png" alt=""/>
                                <span>Bảo Phạm</span>
                            </td>
                            <td>DH512312</td>
                            <td>12/12/2024</td>
                            <td ><strong>4.2 </strong></td>
                            <td>
                                <button className="detail-rating">Xem chi tiết</button>
                            </td>
                        </tr>

                        <tr>
                            <td className="customer">
                                <img src="https://ih1.redbubble.net/image.267957152.7604/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg" alt="" />
                                <span>Đạt Nguyễn</span>
                            </td>
                            <td>DH512312</td>
                            <td>12/12/2024</td>
                            <td ><strong>4.2 </strong></td>
                            <td>
                                <button className="detail-rating">Xem chi tiết</button>
                            </td>
                        </tr>

                        <tr>
                            <td className="customer">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYpISnKk43n1lEaWmNu8iPCF8GkqyDUPBG4w&s" alt="" />
                                <span>Minh Bùi</span>
                            </td>
                            <td>DH512312</td>
                            <td>12/12/2024</td>
                            <td ><strong>4.2 </strong></td>
                            <td>
                                <button className="detail-rating">Xem chi tiết</button>
                            </td>
                        </tr>

                        <tr>
                            <td className="customer">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjPhmSRxozdTdX8YU9zlFFAvrT5m7tb_msbQ&s" alt="" />
                                <span>Anh Bùi</span>
                            </td>
                            <td>DH512312</td>
                            <td>12/12/2024</td>
                            <td ><strong>4.2 </strong></td>
                            <td>
                                <button className="detail-rating">Xem chi tiết</button>
                            </td>
                        </tr>

                        <tr>
                            <td className="customer">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0S-tLjAFBx1gChNM0WQap6RxZfmkbRGu0g&s" alt="" />
                                <span>Duy Bảo</span>
                            </td>
                            <td>DH512312</td>
                            <td>12/12/2024</td>
                            <td ><strong>4.2 </strong></td>
                            <td>
                                <button className="detail-rating">Xem chi tiết</button>
                            </td>
                        </tr>
                    </tbody>
                </div>
            </div>
            
        </div>

      

    </div>
  );
};

export default Home;
