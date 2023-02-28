import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export function Modal(props) {
  const handleKeydown = e => {
    if (e.code === 'Escape') {
      props.onClose();
    }
  };

  const handleClickBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      props.onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  return createPortal(
    <div className={css.overlay} onClick={handleClickBackdrop}>
      <div className={css.modal}>
        <img src={props.imgUrl} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
