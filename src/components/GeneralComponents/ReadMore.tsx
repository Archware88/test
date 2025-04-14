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

    const truncateHTML = (html: string, limit: number): string => {
        const div = document.createElement("div");
        div.innerHTML = html;
        const words: string[] = [];
        const traverse = (node: Node): string => {
            if (words.length >= limit) return "";
            if (node.nodeType === Node.TEXT_NODE) {
                const nodeWords = node.textContent?.trim().split(/\s+/) || [];
                const needed = limit - words.length;
                const slice = nodeWords.slice(0, needed);
                words.push(...slice);
                return slice.join(" ");
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tag = (node as Element).tagName.toLowerCase();
                const children = Array.from(node.childNodes)
                    .map(traverse)
                    .join("");
                return `<${tag}>${children}</${tag}>`;
            }
            return "";
        };
        return traverse(div);
    };

    const isTruncated = useMemo(() => getWordCount(html) > wordLimit, [html]);
    const previewHtml = useMemo(() => truncateHTML(html, wordLimit), [html]);

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
                            __html: expanded || !isTruncated ? html : previewHtml + "...",
                        }}
                    />
                </motion.div>
            </AnimatePresence>
            {isTruncated && (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="text-blue-600 hover:underline text-sm mt-2"
                >
                    {expanded ? "Read Less" : "Read More"}
                </button>
            )}
        </div>
    );
};

export default ReadMore;
