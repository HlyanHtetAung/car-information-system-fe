"use client";

import { getAllCarsByLimit, getModelsAndBrandsCount } from "@/actions/cars";
import CarFormModal from "@/components/common/modals/CarFormModal";
import DeleteCarModal from "@/components/common/modals/DeleteCarModal";
import { LIMIT } from "@/constants";
import { Space, Table, Tag, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false); // for carFormModal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // for carFormModal
  const [isEditCarDetail, setIsEditCarDetail] = useState(false);
  const [selectedCar, setSelectedCar] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [allCars, setAllCars] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  // to track brand data and model is exist before createing car data
  const [brandCount, setBrandCount] = useState(0);
  const [modelCount, setModelCount] = useState(0);

  const fetchAllCars = async (page = 1) => {
    try {
      const response = await getAllCarsByLimit(page);

      setAllCars(response.data.data);
      setPagination({
        current: page,
        pageSize: LIMIT,
        total: response.data.total,
      });
    } catch (error) {
      console.log("Failed to fetch brands");
    }
  };

  const checkBrandsAndModelsExist = async () => {
    const response = await getModelsAndBrandsCount();
    const { brandCount, modelCount } = response.data;
    setBrandCount(brandCount);
    setModelCount(modelCount);
  };

  // Cols definiton for cars table
  const columns = [
    {
      title: "Registration Number",
      dataIndex: "registrationNumber",
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      render: (data: any) => <p>{data.name}</p>,
    },
    {
      title: "Modal",
      dataIndex: "model",
      render: (data: any) => <p>{data.name}</p>,
    },
    {
      title: "Year",
      dataIndex: "year",
      render: (data: any) => <p>{data}</p>,
    },
    {
      title: "Color",
      dataIndex: "color",
      render: (data: any) => <p>{data}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (data: any) => <p>{data}</p>,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      render: (data: any) => <p>{data}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (data: any) => (
        <Space size="middle">
          <Button onClick={() => selectCarHandle(data)}>Edit</Button>
          <Button
            onClick={() => showDeleteModal(data)}
            color="danger"
            variant="outlined"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setOpen(true);
  };

  const showDeleteModal = (data: any) => {
    setOpenDeleteModal(true);
    setSelectedCar(data);
  };

  const selectCarHandle = (data: any) => {
    setSelectedCar(data);
    setIsEditCarDetail(true);
    showModal();
  };

  // fetch brands pagination
  const handleTableChange = (pagination: any) => {
    fetchAllCars(pagination.current);
  };

  useEffect(() => {
    fetchAllCars();
    checkBrandsAndModelsExist();
  }, []);

  return (
    <div className="bg-grey-500 flex-1 p-[30px]">
      <div className="flex items-center justify-between my-[20px]">
        <h3 className="text-lg font-bold">Cars List</h3>
        <div className="flex items-center gap-[10px]">
          {brandCount == 0 ? (
            <div className="flex gap-[5px] items-center">
              <p className="text-gray-400 font-semibold">
                Please add brand first
              </p>
              <Button type="primary" onClick={() => router.push("/brands")}>
                Go to Brand Page
              </Button>
            </div>
          ) : brandCount > 0 && modelCount == 0 ? (
            <div className="flex items-center gap-[10px]">
              <p className="text-gray-400 font-semibold">
                Please add model first
              </p>

              <Button type="primary" onClick={() => router.push("/carModels")}>
                Go to Models Page
              </Button>
            </div>
          ) : null}

          <Button
            type="primary"
            onClick={showModal}
            disabled={brandCount == 0 || modelCount == 0}
          >
            Add New Car
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={allCars}
        rowKey={"registrationNumber"}
        scroll={{ x: "max-content" }}
        pagination={pagination}
        onChange={handleTableChange}
      />

      {/* Modals */}
      <CarFormModal
        setConfirmLoading={setConfirmLoading}
        setOpen={setOpen}
        open={open}
        confirmLoading={confirmLoading}
        isEditCarDetail={isEditCarDetail}
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
        setIsEditCarDetail={setIsEditCarDetail}
        fetchAllCars={fetchAllCars}
      />

      <DeleteCarModal
        setConfirmLoading={setConfirmLoading}
        setOpen={setOpenDeleteModal}
        open={openDeleteModal}
        // confirmLoading={confirmLoading}
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
        fetchAllCars={fetchAllCars}
      />
    </div>
  );
}
