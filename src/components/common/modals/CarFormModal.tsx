"use client";

import { getAllBrands } from "@/actions/brands";
import { createNewCar, updateCar } from "@/actions/cars";
import { getAllModels } from "@/actions/models";
import { Button, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { message } from "antd";

function CarFormModal({
  setConfirmLoading,
  setOpen,
  open,
  confirmLoading,
  isEditCarDetail,
  selectedCar,
  setSelectedCar,
  setIsEditCarDetail,
  fetchAllCars,
}: any) {
  const defaultValues = {
    registrationNumber: "",
    brandId: "",
    modelId: "",
    year: "",
    color: "",
    price: "",
    notes: "",
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
  const [allModels, setAllModels] = useState([]);
  const onSubmit = async (data: any) => {
    const { registrationNumber, brandId, modelId, year, color, price, notes } =
      data;

    const payload = {
      registrationNumber,
      brandId,
      modelId,
      year: parseInt(year),
      color,
      price: parseInt(price),
      notes,
    };

    try {
      if (selectedCar && isEditCarDetail) {
        const response = await updateCar(selectedCar.id, payload);
        messageApi.success("Car data is successfully edited");
      } else {
        const response = await createNewCar(payload);
        messageApi.success("New car data is successfully added");
      }
      fetchAllCars();
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
    setSelectedCar(null);
    setIsEditCarDetail(false);
  };

  const fetchAllBrands = async () => {
    try {
      const response = await getAllBrands();
      setAllBrands(response.data);
    } catch (error) {}
  };

  const fetchAllModels = async () => {
    try {
      const response = await getAllModels();
      setAllModels(response.data);
    } catch (error) {}
  };

  // reseting the value to edit
  useEffect(() => {
    if (selectedCar && isEditCarDetail) {
      setValue("registrationNumber", selectedCar.registrationNumber);
      setValue("brandId", selectedCar.brandId);
      setValue("modelId", selectedCar.modelId);
      setValue("year", selectedCar.year);
      setValue("color", selectedCar.color);
      setValue("price", selectedCar.price);
      setValue("notes", selectedCar.notes);
    }
  }, [selectedCar, isEditCarDetail]);

  useEffect(() => {
    fetchAllBrands();
    fetchAllModels();
  }, []);

  return (
    <Modal
      title="Create New Car"
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
          <p>Registration number</p>
          <Controller
            name="registrationNumber"
            control={control}
            defaultValue=""
            rules={{ required: "Registration number is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Registration number"
                status={errors.registrationNumber ? "error" : ""}
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
        <div>
          <p>Select Modal</p>
          <Controller
            name="modelId"
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
                status={errors.modelId ? "error" : ""}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={allModels.map((model: any) => ({
                  label: model.name,
                  value: model.id,
                }))}
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </div>
        <div>
          <p>Year</p>
          <Controller
            name="year"
            control={control}
            rules={{
              required: "Year is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Year must be a number",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter year"
                size="large"
                status={errors.year ? "error" : ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  const onlyNums = rawValue.replace(/\D/g, "");
                  field.onChange(onlyNums);
                }}
              />
            )}
          />
        </div>
        <div>
          <p>Color</p>
          <Controller
            name="color"
            control={control}
            defaultValue=""
            rules={{ required: "Color is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter color"
                status={errors.color ? "error" : ""}
                size="large"
              />
            )}
          />
        </div>

        <div>
          <p>Price</p>
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Price must be a number",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter price"
                size="large"
                status={errors.price ? "error" : ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  const onlyNums = rawValue.replace(/\D/g, "");
                  field.onChange(onlyNums);
                }}
              />
            )}
          />
        </div>
        <div>
          <p>Notes</p>
          <Controller
            name="notes"
            control={control}
            // rules={{ required: "Notes is required" }}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Enter notes"
                rows={4}
                // status={errors.notes ? "error" : ""}
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

export default CarFormModal;
