"use client";
import type { ReactNode } from "react";
import { SWRConfig } from "swr";

const SWRProvider = ({ children }: { children: ReactNode }) => {
	return <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>;
};

export default SWRProvider;
