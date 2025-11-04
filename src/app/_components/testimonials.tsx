"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "I had a fantastic experience with InSight's image analysis and Golden Ratio calculator. ",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Sophia Johnson",
        username: "@sophiajohnson",
        body: "InSight tool is incredibly intuitive and efficient. I was amazed by how easy it was to use and how accurate the results were.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        username: "@john",
        body: "I am extremely impressed with InSight's cutting-edge image analysis technology and golden ratio calculator.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Sophie Anderson",
        username: "@sophanderson",
        body: "I am beyond impressed with the innovative solutions provided by InSight. Their image analysis and Golden Ratio calculator are truly game-changers.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Alexis Bennett",
        username: "@alexisbennett",
        body: "InSight's innovative Image Analysis and Golden Ratio Calculator tools have revolutionized my workflow, enhancing my precision and efficiency.",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "James",
        username: "@james",
        body: "InSight's innovative image analysis and Golden Ratio Calculator tools have truly revolutionized our workflow.",
        img: "https://avatar.vercel.sh/james",
    },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string
    name: string
    username: string
    body: string
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    )
}

export function Testimonials() {
    return (
        <section id="features" className="relative mx-auto w-full max-w-6xl px-6 py-20">
            <motion.h3
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-8 text-center text-2xl font-semibold text-white sm:text-3xl"
            >
                Testimonials
            </motion.h3>
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
                <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
            </div>
            </section>
            
            )
}
