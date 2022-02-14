import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import API from './services/image-api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [imagesLength, setImagesLength] = useState(1);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    setStatus('pending');
    fetchImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const fetchImages = () => {
    API.fethcImages(searchValue, pageNumber).then(res => {
      if (res.data.total > 0) {
        setImages(prev => [...prev, ...res.data.hits]);
        setPageNumber(prev => prev + 1);
        setStatus('resolved');
        setImagesLength(res.data.hits.length);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } else {
        setStatus('rejected');
      }
    });
  };

  const searchSubmit = searchValue => {
    setSearchValue(searchValue);
    setImages([]);
    setPageNumber(1);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={searchSubmit} />

      {status === 'rejected' && <h1 className={styles.error}>Not found</h1>}

      {status === 'resolved' && <ImageGallery images={images} />}
      {status === 'pending' && <Loader />}
      {imagesLength === 12 && status === 'resolved' && <Button onLoadMore={fetchImages} />}

      <ToastContainer />
    </div>
  );
};

export default App;
