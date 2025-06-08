'use client'
import React, { useEffect } from "react";
import { useAppstore } from "../../../store/store";
import { getListing } from "../../../lib/listings";
import { useAppSelector } from "../../../lib/hooks";
import { selectUserInfo } from "../../../lib/features/auth/authSlice";
import { toast } from "react-toastify";
import AppWrapper from "../../wrapper";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;
import { use } from 'react';
const Page = ({ params }) => {
    const unwrappedParams = use(params); // ✅ unwrap Promise
    const listingId = unwrappedParams.listing;

    const isLoggedIn = !!useAppSelector(selectUserInfo)?.id;
    const { currentListing, setCurrentListing } = useAppstore()
    useEffect(() => {
        if (!isLoggedIn) {
            toast.error("Vui lòng đăng nhập để xem thông tin điểm lưu trú");
            return;
        }
        else if (!listingId) {
            toast.error("Không tìm thấy thông tin điểm lưu trú");
            return;
        }
        else {
            const getData = async () => {
                const result = await getListing(listingId)
                setCurrentListing(result)
            }
            getData()
        }

    }, [listingId])
    return (
        <div>
            <AppWrapper>
                <Content>
                    {
                        currentListing && (
                            <div
                                style={{
                                    gridTemplateColumns: '70fr 30fr',
                                }}
                                className="px-20 pt-10 text-black grid gap-10">
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-5xl font-bold">{currentListing?.title}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Content>
            </AppWrapper>
        </div>
    );
};

export default Page;
