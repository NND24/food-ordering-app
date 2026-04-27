"use client";
import Header from "../../../../../../components/header/Header";
import ChooseStarRating from "../../../../../../components/rating/ChooseStarRating";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useParams, useRouter } from "next/navigation";
import { useEditStoreRatingMutation, useGetDetailRatingQuery } from "../../../../../../redux/features/rating/ratingApi";
import { useUploadImagesMutation } from "../../../../../../redux/features/upload/uploadApi";
import { FaXmark } from "react-icons/fa6";
import Heading from "../../../../../../components/Heading";
import { toast } from "react-toastify";

const page = () => {
  const { id: storeId, ratingId } = useParams();
  const router = useRouter();

  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);

  const { data: detailRating, refetch } = useGetDetailRatingQuery(ratingId);
  const [editStoreRating, { isSuccess: editRatingSuccess }] = useEditStoreRatingMutation();
  const [uploadImages] = useUploadImagesMutation();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (detailRating) {
      setRatingValue(detailRating.ratingValue);
      setComment(detailRating.comment);
      setImages(detailRating.images);
    }
  }, [detailRating]);

  const handleUploadImage = async (data) => {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append("file", data[i]);
    }
    const result = await uploadImages({ data: formData, type: "ratings" }).unwrap();
    setImages((prev) => [...prev, ...result]);
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
    const data = { ratingValue, comment, images };
    await editStoreRating({ ratingId, data });
  };

  useEffect(() => {
    if (editRatingSuccess) {
      toast.success("Chỉnh sửa đánh giá thành công!");
      router.push(`/store/${storeId}`);
    }
  }, [editRatingSuccess]);

  return (
    <div className='px-4 md:pt-[110px] pb-[100px] bg-white dark:bg-gray-900 transition-colors duration-300'>
      <Heading title='Chỉnh sửa đánh giá' description='' keywords='' />
      <div className='hidden md:block'>
        <Header />
      </div>

      <div className='bg-white dark:bg-gray-800 dark:border dark:border-gray-700 lg:w-[60%] md:w-[80%] md:mx-auto rounded-xl shadow-md dark:shadow-gray-900 p-4 md:p-6 transition-colors'>
        <div className='flex items-center gap-4 pt-4 md:hidden'>
          <Image
            src='/assets/arrow_left.png'
            alt=''
            width={30}
            height={30}
            className='cursor-pointer hover:scale-110 transition-transform'
            onClick={() => router.back()}
          />
          <h3 className='flex-1 text-[#4A4B4D] dark:text-gray-100 text-2xl font-bold'>Đánh giá</h3>
        </div>

        {detailRating?.store && (
          <div className='flex flex-col items-center mt-6'>
            <div className='relative w-32 h-32 rounded-xl overflow-hidden shadow-lg'>
              <Image src={detailRating.store.avatar.url || ""} alt='' fill className='object-cover' />
            </div>
          </div>
        )}

        <div className='text-center mt-6 space-y-2'>
          <span className='text-[#4A4B4D] dark:text-gray-100 text-2xl font-semibold'>
            Chỉnh sửa đánh giá bữa ăn
          </span>
          {detailRating && (
            <p className='text-gray-600 dark:text-gray-300 text-lg'>
              Bạn thấy món ăn từ{" "}
              <span className='font-bold text-[#fc6011]'>{detailRating.store.name}</span> như thế nào?
            </p>
          )}
        </div>

        <div className='flex items-center justify-center py-6'>
          <ChooseStarRating ratingValue={ratingValue} setRatingValue={setRatingValue} />
        </div>

        <div className='bg-[#f2f3f5] dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-4 rounded-lg shadow-inner'>
          <textarea
            placeholder='Vui lòng nhập đánh giá của bạn'
            className='bg-transparent w-full resize-none focus:outline-none text-base dark:placeholder-gray-400'
            rows={4}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>

        <div className='flex justify-end mt-4'>
          <Dropzone
            maxFiles={5}
            accept={{ "image/*": [] }}
            onDrop={(acceptedFiles) => handleUploadImage(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <section className='w-full'>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className='w-fit flex gap-2 items-center ml-auto cursor-pointer'>
                    <div className='relative w-[25px] pt-[25px] md:w-[20px] md:pt-[20px]'>
                      <Image
                        src='/assets/camera.png'
                        alt=''
                        layout='fill'
                        objectFit='contain'
                        className='rounded-[8px]'
                      />
                    </div>
                    <span className='text-[#fc6011] font-medium hover:underline'>Thêm ảnh</span>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        {images.length > 0 && (
          <div className='flex flex-wrap gap-4 mt-4'>
            {images.map((image, index) => (
              <div className='relative w-[120px] h-[120px] rounded-lg overflow-hidden shadow-md' key={index}>
                <Image loading='lazy' fill className='object-cover' src={image.url} alt='' />
                <FaXmark
                  onClick={() => setImages((prev) => prev.filter((img) => img.url !== image.url))}
                  className='absolute top-2 right-2 text-xl text-white bg-black/50 p-1 rounded-full cursor-pointer hover:bg-black transition'
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900 transition-colors'>
        {detailRating && (
          <div
            onClick={handleAddRating}
            className='flex items-center justify-center rounded-lg bg-[#fc6011] text-white px-5 py-3 lg:w-[60%] md:w-[80%] md:mx-auto cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200'
          >
            <span className='text-white text-lg font-semibold'>Chỉnh sửa đánh giá</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
