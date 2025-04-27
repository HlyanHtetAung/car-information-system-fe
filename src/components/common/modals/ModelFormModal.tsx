"use client";

import { createBrand, getAllBrands, updateBrand } from "@/actions/brands";
import { createNewCar, updateCar } from "@/actions/cars";
import { createNewModel, getAllModels, updateModel } from "@/actions/models";
import { Button, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { message } from "antd";

function ModelFormModal({
  setConfirmLoading,
  setOpen,
  open,
  confirmLoading,
  selectedModel,
  setSelectedModel,
  setIsEditModel,
  fetchAllModels,
  isEditModel,
}: any) {
  const defaultValues = {
    modelName: "",
    brandId: "",
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
  const [allBrands, setAllBrands] = useState([]);

  const onSubmit = async (data: any) => {
    const { brandId, modelName } = data;

    const payload = {
      name: modelName,
      brandId,
    };

    try {
      if (selectedModel && isEditModel) {
        await updateModel(selectedModel.id, payload);
        messageApi.success("Model is successfully edited");
      } else {
        await createNewModel(payload);
        messageApi.success("New model is successfully added");
      }
      fetchAllModels();
      resetValue();
    } catch (error) {}
  };

  const resetValue = () => {
    reset();
    setOpen(false);
    setSelectedModel(null);
    setIsEditModel(false);
  };

  const fetchAllBrands = async () => {
    try {
      const response = await getAllBrands();
      setAllBrands(response.data);
    } catch (error) {}
  };

  // reseting the value to edit
  useEffect(() => {
    if (selectedModel && isEditModel) {
      setValue("modelName", selectedModel.name);
      setValue("brandId", selectedModel.brandId);
    }
  }, [selectedModel, isEditModel]);

  useEffect(() => {
    fetchAllBrands();
  }, []);

  return (
    <Modal
      title="Create New Model"
      open={open}
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
          <p>Model name</p>
          <Controller
            name="modelName"
            control={control}
            defaultValue=""
            rules={{ required: "Brand name is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Model name"
                status={errors.modelName ? "error" : ""}
                size="large"
              />
            )}
          />
        </div>
        <div>
          <p>Select Brand</p>
          <Controller
            name="brandId"
            control={control}
            rules={{ required: "Please select a brand" }}
            render={({ field }) => (
              <Select
                className="w-full"
                {...field}
                size="large"
                showSearch
                placeholder="Search to Select"
                optionFilterProp="label"
                status={errors.brandId ? "error" : ""}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={allBrands.map((brand: any) => ({
                  label: brand.name,
                  value: brand.id,
                }))}
                onChange={(value) => field.onChange(value)}
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

export default ModelFormModal;
