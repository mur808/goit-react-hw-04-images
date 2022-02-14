import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ images }) => {
  const [showModal, setShowModal] = useState(false);

  const togleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <li className={styles.ImageGalleryItem} key={images.id}>
      <img
        src={images.webformatURL}
        alt=""
        className={styles.ImageGalleryItem_image}
        onClick={togleModal}
      />
      {showModal && (
        <Modal onClose={togleModal}>
          <img src={images.largeImageURL} alt="" width="600px" />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.object,
};
export default ImageGalleryItem;
