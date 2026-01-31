"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

const MouseEnterContext = createContext<
  React.MutableRefObject<boolean> | null
>(null);

export const CardContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseEntered = useRef(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;

    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseEnter = () => {
    if (!containerRef.current) return;
    mouseEntered.current = true;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    mouseEntered.current = false;
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={mouseEntered}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex items-center justify-center transition-transform duration-300 ease-out perspective-[1200px] ${className}`}
      >
        {children}
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative transform-style-preserve-3d transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  children,
  className,
  translateZ = "0",
  as: Tag = "div",
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  translateZ?: string | number;
  as?: any;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseEntered = useContext(MouseEnterContext);

  useEffect(() => {
    if (!ref.current || !mouseEntered) return;

    if (mouseEntered.current) {
      ref.current.style.transform = `translateZ(${translateZ}px)`;
    } else {
      ref.current.style.transform = `translateZ(0px)`;
    }
  }, [mouseEntered, translateZ]);

  return (
    <Tag
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};
