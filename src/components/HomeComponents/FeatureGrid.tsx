import Image from "next/image";

const features = [
    {
        title: "Hands-on Learning",
        description:
            "Gain practical skills through interactive exercises and real-world projects.",
    },
    {
        title: "Real-World Case Studies",
        description:
            "Learn from actual industry scenarios to apply concepts in real-life contexts.",
    },
    {
        title: "Career Advancement Support",
        description:
            "Benefit from job placement assistance, networking opportunities, and mentorship.",
    },
    {
        title: "Expert-Led Instruction",
        description:
            "Learn directly from seasoned professionals with proven industry expertise.",
    },
    {
        title: "Affordable Excellence",
        description:
            "Access high-quality education without breaking the bank.",
    },
    {
        title: "Virtual Live Sessions",
        description:
            "Engage with expert instructors through live virtual sessions after each module.",
    },
];

const FeatureItem = ({ title, description }: { title: string; description: string }) => (
    <div className="flex items-center gap-6 text-left">
        <Image
            src="/assets/images/bluestar.png"
            alt="Star Icon"
            className="w-[25px] h-[25px] relative -top-[25px]"
            width={100}
            height={100}
        />
        <div>
            <h3 className="text-[19.2px] font-normal">{title}</h3>
            <p className="text-sm pt-4">{description}</p>
        </div>
    </div>
);

const FeaturesGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1200px] mx-auto">
            {features.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
            ))}
        </div>
    );
};

export default FeaturesGrid;
