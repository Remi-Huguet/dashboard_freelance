"use client";

import { useCircularLoader } from "@/hooks/useCircularLoader";
import { useSkeletonLoader } from "@/hooks/useSkeletonLoader";
import { JSX } from "react";

interface LoadingDataProps {
    loading: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: unknown;
    errorMessage: string;
    noDataMessage: string;
    showSkeletonLoader: boolean;
    skeletonLoaderHeight?: string;
}

export default function LoadingData({ 
    loading, 
    isSuccess, 
    isError, 
    data, 
    errorMessage, 
    noDataMessage, 
    showSkeletonLoader,
    skeletonLoaderHeight = "100px"
}: LoadingDataProps): JSX.Element {
    const skeletonLoader = useSkeletonLoader(skeletonLoaderHeight);
    const circularLoader = useCircularLoader();

    const isDataEmpty =
        data == null ||
        (Array.isArray(data) && data.length === 0) ||
        (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0);
 
    return (
        <>
            {loading && (showSkeletonLoader ? skeletonLoader() : circularLoader())}
            {!loading && isError && <p className="text-gray-800">{errorMessage}</p>}
            {!loading && isSuccess && isDataEmpty && 
                <p className="text-gray-800">{noDataMessage}</p>
            }
        </>
    );
}
