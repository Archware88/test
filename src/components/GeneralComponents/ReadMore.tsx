"use client";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ReadMoreProps {
    html: string;
    wordLimit?: number;
    className?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({
    html,
    wordLimit = 400,
    className = "",
}) => {
    const [expanded, setExpanded] = useState(false);

    const getWordCount = (str: string) =>
        str.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;

    // Basic truncate function (preserves text, strips tags after limit)
    const truncateHTML = (html: string, limit: number): string => {
        const textContent = html.replace(/<[^>]+>/g, "").trim();
        const words = textContent.split(/\s+/);
        const truncated = words.slice(0, limit).join(" ");
        return truncated;
    };

    const isTruncated = useMemo(() => getWordCount(html) > wordLimit, [html, wordLimit]);
    const previewHtml = useMemo(() => truncateHTML(html, wordLimit), [html, wordLimit]);

    return (
        <div className={className}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={expanded ? "expanded" : "collapsed"}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: expanded || !isTruncated
                                ? html
                                : previewHtml + "...",
                        }}
                    />
                </motion.div>
            </AnimatePresence>
            {isTruncated && (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="text-blue-600 hover:underline text-sm mt-2 cusor-pointer"
                >
                    {expanded ? "Read Less" : "Read More"}
                </button>
            )}
        </div>
    );
};

export default ReadMore;
