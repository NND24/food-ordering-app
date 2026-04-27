"use client";
import Header from "../../../components/header/Header";
import Heading from "../../../components/Heading";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../../../components/NavBar";
import React, { useEffect, useState } from "react";
import { useDeleteLocationMutation, useGetUserLocationsQuery } from "../../../redux/features/location/locationApi";
import { useSelector } from "react-redux";
import { haversineDistance } from "../../../utils/functions";
import { useStoreLocation } from "../../../context/StoreLocationContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

const page = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const { setStoreLocation, storeId } = useStoreLocation();

  const [currentPosition, setCurrentPosition] = useState(null);
  const [deleteLocationId, setDeleteLocationId] = useState("");

  const locationState = useSelector((state) => state?.location);
  const rawLocations = locationState?.userLocations;
  const userLocations = Array.isArray(rawLocations) ? rawLocations : [];

  const { refetch: refetchUserLocation } = useGetUserLocationsQuery();
  const [deleteLocation, { isSuccess: deleteLocationSuccess }] = useDeleteLocationMutation();

  useEffect(() => { refetchUserLocation(); }, [refetchUserLocation]);

  const homeLocation = userLocations.filter((l) => l.type === "home");
  const companyLocation = userLocations.filter((l) => l.type === "company");
  const familiarLocations = userLocations.filter((l) => l.type === "familiar");

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => setCurrentPosition([pos.coords.latitude, pos.coords.longitude]),
        () => {},
        { enableHighAccuracy: true, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(() => {
    if (deleteLocationSuccess) {
      toast.success("Xóa địa chỉ thành công!");
      refetchUserLocation();
      setDeleteLocationId("");
    }
  }, [deleteLocationSuccess]);

  const confirmDeleteLocation = async () => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa địa chỉ này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });
    if (result.isConfirmed && deleteLocationId) await deleteLocation(deleteLocationId);
    if (result.isDismissed) setDeleteLocationId("");
  };

  useEffect(() => {
    if (deleteLocationId) confirmDeleteLocation();
  }, [deleteLocationId]);

  const getLocCoords = (loc) => ({
    lat: loc.location?.coordinates?.[1],
    lon: loc.location?.coordinates?.[0],
  });

  const selectLocation = (loc) => {
    const { lat, lon } = getLocCoords(loc);
    setStoreLocation({
      address: loc.address,
      contactName: loc.contactName,
      contactPhonenumber: loc.contactPhonenumber,
      detailAddress: loc.detailAddress,
      name: loc.name,
      note: loc.note,
      lat,
      lon,
    });
    if (storeId) router.push(`/store/${storeId}/cart`);
  };

  const LocationCard = ({ loc, editHref, icon }) => (
    <div
      onClick={() => selectLocation(loc)}
      className='flex items-center gap-[14px] p-[14px] rounded-2xl
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        hover:border-[#fc6011] dark:hover:border-[#fc6011]
        hover:shadow-md transition-all duration-200 cursor-pointer mb-[10px]'
    >
      {/* Icon */}
      <div className='flex-shrink-0 w-[44px] h-[44px] rounded-full bg-orange-50 dark:bg-gray-700 flex items-center justify-center'>
        <div className='relative w-[22px] h-[22px]'>
          <Image src={icon} alt='' fill objectFit='contain' />
        </div>
      </div>

      {/* Info */}
      <div className='flex-1 min-w-0'>
        <p className='text-[16px] font-semibold text-gray-800 dark:text-gray-100 truncate'>{loc.name}</p>
        <div className='flex items-center gap-[6px] mt-[2px]'>
          {currentPosition && (
            <>
              <span className='text-[13px] text-[#fc6011] font-medium whitespace-nowrap'>
                {haversineDistance(currentPosition, [loc.location?.coordinates?.[1], loc.location?.coordinates?.[0]]).toFixed(1)} km
              </span>
              <span className='w-[3px] h-[3px] rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0' />
            </>
          )}
          <p className='text-[13px] text-gray-500 dark:text-gray-400 truncate'>{loc.address}</p>
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-[8px] flex-shrink-0'>
        <Link
          href={editHref}
          onClick={(e) => e.stopPropagation()}
          className='w-[34px] h-[34px] rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center justify-center transition'
        >
          <div className='relative w-[16px] h-[16px]'>
            <Image src='/assets/editing.png' alt='' fill objectFit='contain' />
          </div>
        </Link>
        <button
          onClick={(e) => { e.stopPropagation(); setDeleteLocationId(loc._id); }}
          className='w-[34px] h-[34px] rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center justify-center transition'
        >
          <div className='relative w-[16px] h-[16px]'>
            <Image src='/assets/trash.png' alt='' fill objectFit='contain' />
          </div>
        </button>
      </div>
    </div>
  );

  const AddCard = ({ href, icon, label, sub }) => (
    <Link
      href={href}
      className='flex items-center gap-[14px] p-[14px] rounded-2xl
        border-2 border-dashed border-gray-300 dark:border-gray-600
        hover:border-[#fc6011] dark:hover:border-[#fc6011] hover:bg-orange-50/50 dark:hover:bg-orange-900/10
        transition-all duration-200 cursor-pointer mb-[10px]'
    >
      <div className='flex-shrink-0 w-[44px] h-[44px] rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center'>
        <div className='relative w-[22px] h-[22px]'>
          <Image src={icon} alt='' fill objectFit='contain' />
        </div>
      </div>
      <div>
        <p className='text-[15px] font-semibold text-[#fc6011]'>{label}</p>
        {sub && <p className='text-[13px] text-gray-400 dark:text-gray-500'>{sub}</p>}
      </div>
    </Link>
  );

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
      <Heading title='Địa chỉ đã lưu' description='' keywords='' />
      <div className='hidden md:block'>
        <Header page='account' />
      </div>

      {/* Fixed mobile header */}
      <div className='fixed top-0 right-0 left-0 z-10 px-[16px] flex items-center gap-[16px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-[64px] md:hidden transition-colors duration-300'>
        <button
          onClick={() => router.push(storeId ? `/store/${storeId}/cart` : `/account`)}
          className='w-[36px] h-[36px] rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800'
        >
          <div className='relative w-[18px] h-[18px]'>
            <Image
              src={`/assets/arrow_left_long${theme === "dark" ? "_white" : ""}.png`}
              alt=''
              fill
              objectFit='contain'
            />
          </div>
        </button>
        <h3 className='text-[18px] font-bold text-gray-800 dark:text-gray-100'>Địa chỉ đã lưu</h3>
      </div>

      <div className='pt-[80px] pb-[100px] px-[16px] md:pb-[40px] lg:w-[60%] md:w-[80%] md:mx-auto'>

        {/* Fixed locations section */}
        <div className='mb-[8px]'>
          <p className='text-[13px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-[10px]'>
            Địa chỉ cố định
          </p>

          {homeLocation.length > 0 ? (
            <LocationCard
              loc={homeLocation[0]}
              editHref={`/account/location/edit-location/home/${homeLocation[0]._id}`}
              icon='/assets/home_green.png'
            />
          ) : (
            <AddCard href='/account/location/add-location/home' icon='/assets/add_home.png' label='Thêm nhà' />
          )}

          {companyLocation.length > 0 ? (
            <LocationCard
              loc={companyLocation[0]}
              editHref={`/account/location/edit-location/company/${companyLocation[0]._id}`}
              icon='/assets/briefcase_green.png'
            />
          ) : (
            <AddCard href='/account/location/add-location/company' icon='/assets/briefcase.png' label='Thêm công ty' />
          )}
        </div>

        {/* Familiar locations section */}
        <div className='mt-[20px]'>
          <p className='text-[13px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-[10px]'>
            Địa chỉ thân quen
          </p>

          {familiarLocations.map((loc) => (
            <LocationCard
              key={loc._id}
              loc={loc}
              editHref={`/account/location/edit-location/familiar/${loc._id}`}
              icon='/assets/favorite-active.png'
            />
          ))}

          <AddCard
            href='/account/location/add-location/familiar'
            icon='/assets/plus.png'
            label='Thêm địa chỉ mới'
            sub='Lưu làm địa chỉ thân quen'
          />
        </div>
      </div>

      <div className='block md:hidden'>
        <NavBar page='account' />
      </div>
    </div>
  );
};

export default page;
