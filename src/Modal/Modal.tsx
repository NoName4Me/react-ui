import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BaseProps, baseDefaultProps, basePropsType, NOOP, KeyCode } from '../common';
import Draggable from 'react-draggable';
import './index.scss';
import { bem } from '../utils';
import ReactDOM from 'react-dom';
import Footer, { FooterProps } from './Footer';
import Header, { HeaderProps } from './Header';

interface ModalProps extends BaseProps, FooterProps, HeaderProps {
  /** 是否打开弹层 */
  isOpen: boolean;
  /** 是否展示遮罩 */
  isShowMask: boolean;
  /** 是否可以点击遮罩关闭 */
  isMaskClickClosable: boolean;
  /** 是否支持 ESC 键关闭 */
  isEscapeKeyClosable: boolean;
  /** 是否可拖拽 */
  draggable: boolean;
  /** 是否展示右上角关闭按钮 */
  isShowClose: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 自定义标题内容 */
  header?: JSX.Element;
  /** 自定义底栏内容 */
  footer?: JSX.Element;
}

function Modal(props: ModalProps) {
  const {
    isOpen,
    draggable,
    isShowClose,
    title,
    onClose,
    isMaskClickClosable,
    isEscapeKeyClosable,
    isShowMask,
    header,
    footer,
    children,
    clsPrefix,
    style,
    ...rest
  } = props;
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      console.log('>>>', event.keyCode);
      if (event.keyCode === KeyCode.ESC) {
        onClose();
      }
    };
    // window.document.body.style.overflow = 'hidden'
    isOpen && isEscapeKeyClosable && window.addEventListener('keydown', handleKeydown);
    return () => {
      console.log('hahahahha');
      // window.document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen]);
  const cmpCls = `${clsPrefix}-Modal`;
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div
      {...rest}
      className={cmpCls}
      style={{
        ...style,
        transition: `opacity ${200}s ease-in-out`,
      }}
    >
      {isShowMask && <div className={bem(cmpCls, 'Mask')} onClick={isMaskClickClosable ? onClose : NOOP}></div>}
      <Draggable disabled={!draggable}>
        <div className={bem(cmpCls, 'Content')}>
          <div className={bem(cmpCls, 'Header', ['', { draggable }])}>
            {header || <Header title={title} cmpCls={cmpCls} isShowClose={isShowClose} onClose={onClose} />}
          </div>
          <div className={bem(cmpCls, 'Body')}>{children}</div>
          <div className={bem(cmpCls, 'Footer')}>{footer || <Footer onClose={onClose} />}</div>
        </div>
      </Draggable>
    </div>,
    document.body,
  );
}

Modal.propTypes = {
  ...basePropsType,
  /** 标题 */
  title: PropTypes.string,
  /** 是否打开弹层 */
  isOpen: PropTypes.bool,
  isShowMask: PropTypes.bool,

  /** 是否可以点击遮罩关闭 */
  isMaskClickClosable: PropTypes.bool,
  /** 是否支持 ESC 键关闭 */
  isEscapeKeyClosable: PropTypes.bool,
  /** 是否可拖拽 */
  draggable: PropTypes.bool,
  /** 是否展示右上角关闭按钮 */
  isShowClose: PropTypes.bool,
  /** 关闭回调 */
  onClose: PropTypes.func,
  /** 自定义标题内容 */
  header: PropTypes.element,
  /** 自定义底栏内容 */
  footer: PropTypes.element,
};

Modal.defaultProps = {
  ...baseDefaultProps,
  isShowMask: true,
  isOpen: false,
  onClose: NOOP,
  isMaskClickClosable: false,
  isEscapeKeyClosable: false,
  draggable: false,
  isShowClose: false,
};

export default Modal;
