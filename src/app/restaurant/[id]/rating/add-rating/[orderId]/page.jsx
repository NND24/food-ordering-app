"use client";
import Header from "../../../../../../components/header/Header";
import ChooseStarRating from "../../../../../../components/rating/ChooseStarRating";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useParams, useRouter } from "next/navigation";
import { useAddStoreRatingMutation } from "../../../../../../redux/features/rating/ratingApi";
import { useGetOrderDetailQuery } from "../../../../../../redux/features/order/orderApi";
import { useUploadImagesMutation } from "../../../../../../redux/features/upload/uploadApi";
import { FaXmark } from "react-icons/fa6";
import Heading from "../../../../../../components/Heading";
import { toast } from "react-toastify";

const page = () => {
  const { id: storeId, orderId } = useParams();
  const router = useRouter();

  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const [uploadedFile, setUploadedFile] = useState([]);
  const [dishes, setDishes] = useState([]);

  const [addStoreRating, { isSuccess: addRatingSuccess }] = useAddStoreRatingMutation();
  const [uploadImages] = useUploadImagesMutation();

  const { data: orderDetail, refetch: refetchGetOrderDetail } = useGetOrderDetailQuery(orderId);

  useEffect(() => {
    refetchGetOrderDetail();
  }, []);

  useEffect(() => {
    if (orderDetail) {
      const dishIds = orderDetail.data.items.map((item) => item.dish._id);
      setDishes(dishIds);
    }
  }, [orderDetail]);

  const handleUploadImage = async (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append("file", data[i]);
    }

    try {
      const result = await uploadImages(formData).unwrap();
      return result;
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
      return [];
    }
  };

  const handleAddRating = async () => {
    if (ratingValue === 0) {
      toast.error("Vui lòng chọn số sao để tiếp tục đánh giá!");
      return;
    }
    if (!comment) {
      toast.error("Vui lòng nhập đánh giá của bạn!");
      return;
    }

    if (uploadedFile) {
      const images = await handleUploadImage(uploadedFile);
      const data = { dishes, ratingValue, comment, images };
      await addStoreRating({ storeId, data });
    } else {
      const data = { dishes, ratingValue, comment };
      await addStoreRating({ storeId, data });
    }
  };

  useEffect(() => {
    if (addRatingSuccess) {
      toast.success("Đánh giá thành công!");
      router.push(`/restaurant/${storeId}`);
    }
  }, [addRatingSuccess]);

  return (
    <div className='px-[20px] md:pt-[110px] pb-[100px] bg-white'>
      <Heading title='Thêm đánh giá' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='bg-[#fff] lg:w-[60%] md:w-[80%] md:mx-auto md:overflow-hidden'>
        <div className='flex items-center gap-[30px] pt-[20px] md:hidden'>
          <Image src='/assets/arrow_left.png' alt='' width={30} height={30} onClick={() => router.back()} />
          <h3 className='flex-1 text-[#4A4B4D] text-[28px] font-bold'>Đánh giá</h3>
        </div>

        <div className='flex flex-col items-center justify-center my-[20px]'>
          <div className='relative w-[120px] pt-[120px] rounded-[8px] overflow-hidden'>
            <Image src={orderDetail?.data?.store?.avatar?.url || ""} alt='' layout='fill' objectFit='cover' />
          </div>
        </div>

        <div className='flex flex-col items-center justify-center py-[20px]'>
          <span className='text-[#4A4B4D] text-[26px] font-semibold text-center'>Đánh giá bữa ăn này</span>
          {orderDetail && (
            <span className='text-[#636464] text-[18px] text-center'>
              {`Bạn thấy món ăn hoặc thức uống từ ${orderDetail.data.store.name} như thế nào?`}
            </span>
          )}
        </div>

        <div className='flex items-center justify-center py-[20px]'>
          <ChooseStarRating ratingValue={ratingValue} setRatingValue={setRatingValue} />
        </div>

        <div className=' bg-[#e8e9e9] text-[#636464] p-[20px] mt-[30px] mb-[10px] rounded-[8px]'>
          <textarea
            name=''
            id=''
            placeholder='Vui lòng nhập đánh giá của bạn'
            className='bg-transparent w-full'
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
        </div>

        <div className='flex items-center justify-end gap-[10px]'>
          <Dropzone
            maxFiles={5}
            accept={{ "image/*": [] }}
            onDrop={(acceptedFiles) => {
              setUploadedFile([...uploadedFile, ...acceptedFiles]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className='w-full'>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className='w-fit flex gap-[4px] items-center ml-auto cursor-pointer'>
                    <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                      <Image
                        src='/assets/camera.png'
                        alt=''
                        layout='fill'
                        objectFit='contain'
                        className='rounded-[8px]'
                      />
                    </div>
                    <span className='text-[#4A4B4D] text-[18px] font-bold md:text-[16px]'>Thêm ảnh</span>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <div className='flex flex-wrap justify-end gap-4 mt-4'>
          {uploadedFile
            ?.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
            ?.map((file, index) => (
              <div className='relative w-[200px] h-[200px]' key={file.name}>
                <Image
                  loading='lazy'
                  layout='fill'
                  className='object-cover rounded-[8px]'
                  key={file.name}
                  src={file.preview}
                  alt=''
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />

                <FaXmark
                  onClick={() => {
                    setUploadedFile((prev) => prev.filter((_, i) => i !== index));
                  }}
                  className='absolute top-[5px] right-[5px] text-[20px] text-[#050505] bg-[#cccfd4] p-[4px] border-[1px] border-solid border-[#e4e6eb] rounded-full cursor-pointer'
                />
              </div>
            ))}
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 p-[15px] bg-[#fff] shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'>
        {orderDetail && dishes && (
          <div
            onClick={() => {
              handleAddRating();
            }}
            className='flex items-center justify-center rounded-[8px] bg-[#fc6011] text-[#fff] px-[20px] py-[15px] md:px-[8px] lg:w-[60%] md:w-[80%] md:mx-auto cursor-pointer shadow-md hover:shadow-lg'
          >
            <span className='text-[#fff] text-[20px] font-semibold md:text-[16px]'>Đánh giá</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
