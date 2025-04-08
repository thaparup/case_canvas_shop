"use client";
import Phone from "@/comp/Phone";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes, useRef } from "react";
import { motion, useInView } from 'framer-motion'

const REVIEW_IMAGES = [
    "/testimonials/1.jpg",
    "/testimonials/2.jpg",
    "/testimonials/3.jpg",
    "/testimonials/4.jpg",
    "/testimonials/5.jpg",
    "/testimonials/6.jpg",
];

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
    return (
        <div
            className={cn(
                "border-4 border-black animate-fade-in rounded-[2.25rem] bg-red-400 p-6  shadow-xl shadow-slate-900/5",
                className
            )}
            {...props}
        >
            <Phone imgSrc={imgSrc} />
        </div>
    );
}

function splitArray(arr: Array<string>, partNumber: number) {
    const result: Array<Array<string>> = [];
    for (let i = 0; i < arr.length; i++) {
        const subArrayIndex = i % partNumber;
        if (!result[subArrayIndex]) result[subArrayIndex] = [];
        result[subArrayIndex].push(arr[i]);
    }
    return result;
}

const columns = splitArray(REVIEW_IMAGES, 3);

function ReviewColumn({
    reviews,
    className,
    reviewClassName,
    duration = 20,  // Duration is now a fixed number (seconds or milliseconds)
}: {
    reviews: string[];
    className?: string;
    reviewClassName?: (reviewIndex: number) => string;
    duration?: number;
}) {
    return (
        <div className="overflow-hidden h-full relative border-2 border-black px-0 ">
            <motion.div
                className="flex flex-col gap-8"
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration,  // Directly use the `duration` prop
                }}
            >
                {[...reviews, ...reviews].map((review, idx) => (
                    <Review
                        key={idx}
                        imgSrc={review}
                        className={reviewClassName?.(idx) || ""}
                    />
                ))}
            </motion.div>
        </div>
    );
}



function ReviewGrid() {

    return (
        <motion.div

            className="w-[75%] mx-auto border-4 border-green-500 relative mt-16 grid h-[45rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
            <>
                <ReviewColumn reviews={columns[0]} duration={30} />
                <ReviewColumn reviews={columns[1]} duration={40} />
                <ReviewColumn reviews={columns[2]} duration={30} />

            </>
            {/* <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100' />
            <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100' /> */}
        </motion.div>
    );
}

const Demo = () => {
    return (
        <MaxWidthWrapper className="relative  border-red-400 border-2">
            <img
                aria-hidden="true"
                src="/what-people-are-buying.png"
                className="absolute select-none hidden xl:block -left-32 top-1/3"
            />

            <ReviewGrid />
            <h1 className="py-90">hello</h1>
        </MaxWidthWrapper>
    );
};

export default Demo;
