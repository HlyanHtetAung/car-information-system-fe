"use client";

import { createBrand, getAllBrands, updateBrand } from "@/actions/brands";
import { createNewCar, updateCar } from "@/actions/cars";
import { getAllModels } from "@/actions/models";
import { Button, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { message } from "antd";

function BrandFormModal({
  setConfirmLoading,
  setOpen,
  open,
  confirmLoading,
  isEditBrand,
  selectedBrand,
  setSelectedBrand,
  setIsEditBrand,
  fetchAllBrands,
}: any) {
  const defaultValues = {
    brandName: "",
  };

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = async (data: any) => {
    const { brandName } = data;

    const payload = {
      name: brandName,
    };

    try {
      if (selectedBrand && isEditBrand) {
        await updateBrand(selectedBrand.id, payload);
        messageApi.success("Brand name is successfully edited");
      } else {
        await createBrand(payload);
        messageApi.success("New brand is successfully added");
      }
      fetchAllBrands();
      resetValue();
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
    reset();
    setOpen(false);
    setSelectedBrand(null);
    setIsEditBrand(false);
  };

  // reseting the value to edit
  useEffect(() => {
    if (selectedBrand && isEditBrand) {
      setValue("brandName", selectedBrand.name);
    }
  }, [selectedBrand, isEditBrand]);

  return (
    <Modal
      title="Create New Brand"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={resetValue}
      footer={null}
    >
      {contextHolder}
      <form
        className="flex flex-col gap-[10px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <p>Brand Name</p>
          <Controller
            name="brandName"
            control={control}
            defaultValue=""
            rules={{ required: "Brand name is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Brand Name"
                status={errors.brandName ? "error" : ""}
                size="large"
              />
            )}
          />
        </div>
        <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
          Submit
        </Button>
      </form>
    </Modal>
  );
}

export default BrandFormModal;
