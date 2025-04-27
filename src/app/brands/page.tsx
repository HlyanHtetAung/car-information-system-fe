"use client";

import { getAllBrands } from "@/actions/brands";
import BrandFormModal from "@/components/common/modals/BrandFormModal";
import { LIMIT } from "@/constants";
import { Space, Table, Tag, Button } from "antd";
import { useEffect, useState } from "react";

export default function Brands() {
  const [open, setOpen] = useState(false); // for brandFormModal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // for delete brandFormModal
  const [isEditBrand, setIsEditBrand] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState();
  const [allBrands, setAllBrands] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const fetchAllBrands = async (page = 1) => {
    try {
      const response = await getAllBrands(page);
      setAllBrands(response.data.data);
      setPagination({
        current: page,
        pageSize: LIMIT,
        total: response.data.total,
      });
    } catch (error) {
      console.log("Failed to fetch brands");
    }
  };

  // Cols definiton for brand table
  const columns = [
    {
      title: "Brand Id",
      dataIndex: "id",
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: "Brand name",
      dataIndex: "name",
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (data: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              selectBrandHandle(data);
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

  // show modal function for creating brand
  const showModal = () => {
    setOpen(true);
  };

  const selectBrandHandle = (data: any) => {
    setSelectedBrand(data);
    setIsEditBrand(true);
    showModal();
  };

  useEffect(() => {
    fetchAllBrands();
  }, []);

  // fetch brands pagination
  const handleTableChange = (pagination: any) => {
    fetchAllBrands(pagination.current);
  };

  return (
    <div className="bg-grey-500 flex-1 p-[30px]">
      <div className="flex items-center justify-between my-[20px]">
        <h3 className="text-lg font-bold">Brand List</h3>
        <Button type="primary" onClick={showModal}>
          Add New Brand
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={allBrands}
        rowKey={"id"}
        scroll={{ x: "max-content" }}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <BrandFormModal
        setConfirmLoading={setConfirmLoading}
        setOpen={setOpen}
        open={open}
        confirmLoading={confirmLoading}
        isEditBrand={isEditBrand}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        setIsEditBrand={setIsEditBrand}
        fetchAllBrands={fetchAllBrands}
      />
    </div>
  );
}
