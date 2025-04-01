import { Modal } from "antd";
import React from "react";

export type CommonModalProps = {
  title: string;
  visible: boolean;
  onCancel: () => void;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  width?: number;
};

const CommonModal: React.FC<CommonModalProps> = ({
  title,
  visible,
  onCancel,
  onOk,
  okText,
  cancelText,
  children = <></>,
  style,
  width,
}) => {
  return (
    <Modal
      style={style}
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      width={width}
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
