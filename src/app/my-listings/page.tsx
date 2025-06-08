'use client'
import ListView from "@/components/views/listView";
import AppWrapper from "../wrapper";
import { useAppSelector } from "@/lib/hooks";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
import { useEffect, useState } from "react";
import { getUserListings } from "@/lib/listings";
import ListUserListingsView from "@/components/views/ListUserListingsView";
import { useAppstore } from "@/store/store";
const Page = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const {setUserListings,userListings} = useAppstore();
  const[loading,setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
        setLoading(true);
      const result = await getUserListings(userInfo?.id);
      if(result){
        setUserListings(result);
      }
      setLoading(false);
    };
    if (!userInfo?.id) return;
    else {
      getData();
    }
  }, [userInfo?.id]);
  return (
    <div>
      <AppWrapper>
       <ListUserListingsView loading={loading}/>
      </AppWrapper>
    </div>
  );
};

export default Page;
