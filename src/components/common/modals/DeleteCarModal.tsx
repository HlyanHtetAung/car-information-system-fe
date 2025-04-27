"use client";

import { getAllBrands } from "@/actions/brands";
import { createNewCar, deleteCar, updateCar } from "@/actions/cars";
import { getAllModels } from "@/actions/models";
import { Button, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { message } from "antd";

function DeleteCarModal({
  setConfirmLoading,
  setOpen,
  open,
  selectedCar,
  setSelectedCar,
  setIsEditCarDetail,
  fetchAllCars,
}: any) {
  const [messageApi, contextHolder] = message.useMessage();

  const onDelete = async () => {
    const id = selectedCar.id;
    try {
      const response = await deleteCar(id);
      fetchAllCars();
      setOpen(false);
      messageApi.success("Successfully deleted");
    } catch (error) {}
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const resetValue = () => {
    setOpen(false);
    setSelectedCar(null);
    setIsEditCarDetail(false);
  };

  return (
    <Modal
      title="Delete Car"
      open={open}
      onOk={handleOk}
      //   confirmLoading={confirmLoading}
      onCancel={resetValue}
      footer={null}
    >
      {contextHolder}
      <p>Are you sure you want to delete?</p>
      <Button
        onClick={onDelete}
        style={{ marginTop: 16 }}
        color="danger"
        variant="filled"
      >
        Delete
      </Button>
    </Modal>
  );
}

export default DeleteCarModal;
