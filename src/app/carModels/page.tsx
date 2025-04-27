"use client";

import { getModelsAndBrandsCount } from "@/actions/cars";
import { getAllModels, getAllModelsByLimit } from "@/actions/models";
import ModelFormModal from "@/components/common/modals/ModelFormModal";
import { Space, Table, Button } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LIMIT } from "@/constants";

export default function CarModels() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditModel, setIsEditModel] = useState(false);
  const [selectedModel, setSelectedModel] = useState();
  const [allModels, setAllModels] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [brandCount, setBrandCount] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const fetchAllModels = async (page = 1) => {
    try {
      const response = await getAllModelsByLimit(page);

      setAllModels(response.data.data);

      setPagination({
        current: page,
        pageSize: LIMIT,
        total: response.data.total,
      });
    } catch (error) {
      console.log("Failed to fetch brands");
    }
  };

  // Cols definiton for car models table
  const columns = [
    {
      title: "Model Id",
      dataIndex: "id",
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: "Model name",
      dataIndex: "name",
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: "Brand name",
      dataIndex: "brand",
      render: (data: any) => <p>{data.name}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (data: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              selectModelHandle(data);
            }}
          >
            Edit
          </Button>
          {/* <Button onClick={() => {}} color="danger" variant="outlined">
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  const checkBrandsAndModelsExist = async () => {
    const response = await getModelsAndBrandsCount();
    const { brandCount } = response.data;
    setBrandCount(brandCount);
  };

  const showModal = () => {
    setOpen(true);
  };

  const selectModelHandle = (data: any) => {
    setSelectedModel(data);
    setIsEditModel(true);
    showModal();
  };

  // fetch brands pagination
  const handleTableChange = (pagination: any) => {
    fetchAllModels(pagination.current);
  };

  useEffect(() => {
    fetchAllModels();
    checkBrandsAndModelsExist();
  }, []);

  return (
    <div className="bg-grey-500 flex-1 p-[30px]">
      <div className="flex items-center justify-between my-[20px]">
        <h3 className="text-lg font-bold">Model List</h3>
        <div className="flex gap-[5px] items-center">
          {brandCount == 0 ? (
            <div className="flex gap-[5px] items-center">
              <p className="text-gray-400 font-semibold">
                Please add brand first
              </p>
              <Button type="primary" onClick={() => router.push("/brands")}>
                Go to Brand Page
              </Button>
            </div>
          ) : null}

          <Button
            type="primary"
            htmlType="button"
            onClick={showModal}
            disabled={brandCount == 0}
          >
            Add New Model
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={allModels}
        rowKey={"id"}
        scroll={{ x: "max-content" }}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <ModelFormModal
        setConfirmLoading={setConfirmLoading}
        setOpen={setOpen}
        open={open}
        confirmLoading={confirmLoading}
        isEditModel={isEditModel}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        setIsEditModel={setIsEditModel}
        fetchAllModels={fetchAllModels}
      />
    </div>
  );
}
