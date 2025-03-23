"use client";
import Heading from "../../../../components/Heading";
import RatingBar from "../../../../components/rating/RatingBar";
import RatingItem from "../../../../components/rating/RatingItem";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useGetAllStoreRatingQuery } from "../../../../redux/features/rating/ratingApi";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";

const page = () => {
  const { id: storeId } = useParams();

  const [ratings, setRatings] = useState(0);

  const userState = useSelector((state) => state.user);
  const { currentUser } = userState;

  const { data: allStoreRating, refetch: refetchAllStoreRating } = useGetAllStoreRatingQuery({
    storeId,
    sort: "",
    limit: "10",
    page: "1",
  });

  useEffect(() => {
    if (allStoreRating) {
      const allRatings = allStoreRating.data.reduce(
        (acc, item) => {
          acc[item.ratingValue] = (acc[item.ratingValue] || 0) + 1;
          return acc;
        },
        { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      );

      setRatings(allRatings);
    }
  }, [allStoreRating]);

  return (
    <div>
      <Heading title='Nhận xét' description='' keywords='' />
      <div className='flex items-center gap-[30px] px-[20px] pt-[20px]'>
        <Link href={`/restaurant/${storeId}`}>
          <Image src='/assets/arrow_left.png' alt='' width={30} height={30} />
        </Link>
        <h3 className='text-[#4A4B4D] text-[28px] font-bold'>Đánh giá và nhận xét</h3>
      </div>

      <RatingBar ratings={ratings} />

      <div className='p-[20px]'>
        {allStoreRating &&
          allStoreRating.data.map((rating) => (
            <RatingItem
              key={rating._id}
              rating={rating}
              currentUser={currentUser}
              refetchAllStoreRating={refetchAllStoreRating}
            />
          ))}
      </div>
    </div>
  );
};

export default page;
