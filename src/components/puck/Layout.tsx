import type { ReactNode } from "react";

export const Section = ({
  padding,
  maxWidth,
  backgroundColor,
  backgroundImage,
  children,
}: {
  padding: string;
  maxWidth: string;
  backgroundColor: string;
  backgroundImage?: string;
  children: ReactNode;
}) => {
  return (
    <section
      className="relative w-full"
      style={{
        paddingTop: padding || "4rem",
        paddingBottom: padding || "4rem",
        backgroundColor: backgroundColor || "transparent",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="mx-auto px-4"
        style={{ maxWidth: maxWidth || "1200px" }}
      >
        {children}
      </div>
    </section>
  );
};

export const Columns = ({
  distribution,
  gap,
  column1,
  column2,
  column3,
}: {
  distribution: "1" | "1/2" | "1/3" | "2/3" | "1/1/1";
  gap: string;
  column1: ReactNode;
  column2: ReactNode;
  column3: ReactNode;
}) => {
  const getGridClass = () => {
    switch (distribution) {
      case "1/2":
        return "grid-cols-1 md:grid-cols-2";
      case "1/3":
        return "grid-cols-1 md:grid-cols-3";
      case "2/3":
        return "grid-cols-1 md:grid-cols-[2fr,1fr]";
      case "1/1/1":
        return "grid-cols-1 md:grid-cols-3";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <div className={`grid ${getGridClass()}`} style={{ gap: gap || "2rem" }}>
      <div className="w-full h-full">{column1}</div>
      {(distribution === "1/2" || distribution === "1/1/1" || distribution === "2/3") && (
        <div className="w-full h-full">{column2}</div>
      )}
      {distribution === "1/1/1" && <div className="w-full h-full">{column3}</div>}
    </div>
  );
};
