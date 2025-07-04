import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css'; // Ant Design v5
import chua from '../../assets/images/chua.jpg'
import lua from '../../assets/images/lua.jpg'
import voucher from '../../assets/images/voucher.jpg'
const slides = [
  {
    url: voucher.src,
    // title: 'Khám phá thế giới',
    // subtitle: 'Hành trình đến những vùng đất tuyệt đẹp',
  },
  {
    url: lua.src,
    title: 'Thiên nhiên kỳ diệu',
    subtitle: 'Cảm nhận sự hùng vĩ của tạo hóa',
  },
  {
    url: 'https://picsum.photos/id/1018/1920/1080',
    title: 'Cuộc sống muôn màu',
    subtitle: 'Góc nhìn mới về thế giới quanh ta',
  },
];

const ImageCarousel = () => {
  return (
    <Carousel draggable autoplay>
      {slides.map((slide, index) => (
        <div key={index}>
          <div style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
            <img
              src={slide.url}
              alt={`slide-${index}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(70%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                color: '#fff',
                textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
                padding: '0 20px',
                textAlign: 'center',
              }}
            >
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{slide.title}</h2>
              <p style={{ fontSize: '1.2rem' }}>{slide.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
