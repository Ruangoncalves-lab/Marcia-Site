import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Spacer = ({ height }: { height: string }) => (
  <div style={{ height: height || "2rem" }} className="w-full" />
);

export const Button = ({
  text,
  link,
  variant,
  alignment,
}: {
  text: string;
  link: string;
  variant: "primary" | "secondary" | "outline";
  alignment: "left" | "center" | "right";
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "secondary":
        return "bg-orange-500 hover:bg-orange-600 text-white";
      case "outline":
        return "border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50";
      default:
        return "bg-emerald-700 hover:bg-emerald-800 text-white";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          alignment === "center"
            ? "center"
            : alignment === "right"
            ? "flex-end"
            : "flex-start",
      }}
    >
      <a
        href={link || "#"}
        className={`px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${getVariantClass()}`}
      >
        {text || "Saiba Mais"}
      </a>
    </div>
  );
};

export const Video = ({ url, ratio }: { url: string; ratio: string }) => {
  const getEmbedUrl = (rawUrl: string) => {
    if (rawUrl.includes("youtube.com/watch?v=")) {
      return rawUrl.replace("watch?v=", "embed/");
    }
    if (rawUrl.includes("youtu.be/")) {
      return rawUrl.replace("youtu.be/", "youtube.com/embed/");
    }
    return rawUrl;
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl group"
      style={{ aspectRatio: ratio || "16/9" }}
    >
      <iframe
        src={getEmbedUrl(url || "https://www.youtube.com/embed/dQw4w9WgXcQ")}
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export const Accordion = ({
  items,
}: {
  items: { title: string; content: string }[];
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto w-full">
      {items?.map((item, index) => (
        <div
          key={index}
          className="border border-emerald-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 text-left flex justify-between items-center transition-colors hover:bg-emerald-50/50"
          >
            <span className="font-bold text-gray-800 text-lg">
              {item.title}
            </span>
            <ChevronDown
              className={`w-6 h-6 text-emerald-600 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`transition-all duration-300 ease-in-out px-6 bg-emerald-50/20 ${
              openIndex === index
                ? "max-h-[500px] py-6 opacity-100 border-t border-emerald-50"
                : "max-h-0 py-0 opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-gray-600 leading-relaxed">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
